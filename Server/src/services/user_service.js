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
            console.log(error, 11);
        }
    }

    async registration(userName, password) {
        // find if the user with this email is already exists
        // and some condition for that

        try {
            const candidate = await this.findOne("userName", userName);
            if (candidate) {
                return {
                    message: `User with this userName - ${userName} is already exists`,
                    status: 409,
                };
            }

            const hashPassword = await bcrypt.hash(password, 3);

            const user = await Users.create({
                userName,
                password: hashPassword,
                isActivated: true,
            });

            const userDto = new UserDto(user);
            const tokens = tokenService.generateToken({ ...userDto });

            // console.log(tokens, "tokens");
            // console.log(userDto, "dto");
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
            // console.log(error, "user_service")
            return error;
        }
    }

    async logIn(userName, password) {
        console.log("logIn", userName, password);
        try {
            const candidate = await Users.findOne({
                where: {
                    userName,
                },
            });
            console.log(candidate.password, "candidate");

            if (!candidate) {
                throw new Error("user not found");
            }

            const isPassEquals = await bcrypt.compare(
                password,
                candidate.password
            );
            console.log(isPassEquals);
            if (!isPassEquals) {
                throw new Error("password is not correct");
            }

            const userDto = new UserDto(candidate);
            const tokens = tokenService.generateToken({ ...userDto });
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
            console.log(error);
            return error
        }
    }

    async logOut (refreshToken) {
            const token = await tokenService.removeToken(refreshToken)
            return token
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
