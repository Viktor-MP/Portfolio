const bcrypt = require("bcrypt");
const db = require("../db");
const Users = db.users;

const tokenService = require("./token_service");
const UserDto = require("../dtos/user-dto");

class UserService {
    async findOne(initial, state) {
        try {
            const searchingInit = await Users.findOne({
                where: {
                    [initial]: state,
                },
            });

            return searchingInit;
        } catch (error) {
            console.log(error);
        }
    }
    
    async registration(userName, password) {
        // find if the user with this email is already exists
        // and some condition for that

        try {
            const candidate = await this.findOne("userName", userName);
            if (candidate) {
                throw new Error(
                    `User with this userName - ${userName} is already exists`
                );
            }

            const hashPassword = await bcrypt.hash(password, 3);

            const user = await Users.create({
                userName,
                password: hashPassword,
                isActivated: true,
            });

            const userDto = new UserDto(user);
            const tokens = tokenService.generateToken({ ...userDto });
            console.log(tokens, "tokens");
            console.log(userDto, "dto");
            await tokenService.saveToken(
                userDto.id,
                tokens.accessToken,
                tokens.refreshToken
            );

            return {
                ...tokens,
                user: userDto,
            };
            
        } catch (error) {
            console.log(error, "user_service")
        }

        
    }

    async findAll() {
        // Users.findAll().then((res) => console.log(res));
        const allUsers = await Users.findAll();
        console.log(allUsers);
    }

    async deleteAllUsers() {
        const deletedUsers = await Users.destroy({ where: {} });
        console.log(deletedUsers);
    }
}

module.exports = new UserService();
