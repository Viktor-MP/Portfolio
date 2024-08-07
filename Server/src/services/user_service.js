const bcrypt = require("bcrypt");
const db = require("../db");
const Users = db.users;
const Tokens = db.tokens;

const tokenService = require("./token_service");
const UserDto = require("../dtos/user-dto");

const ApiError = require("../exceptions/api-error");
const { Sequelize } = require("sequelize");
// const tokenModel = require("../db/Token_model");

class UserService {
    async findOne(initial, state) {
        try {
            const searchingInit = await Users.findOne({
                where: Sequelize.where(
                    Sequelize.literal(`BINARY ${initial}`),
                    state
                ),
            });
            if (searchingInit === null) {
                throw new Error(`${state} is not found`);
            }

            return searchingInit;
        } catch (error) {
            console.log(error, 28);
            error = `${state} is not found`;
            // throw new error 
        }
    
    }

    async registration(userName, password) {
        try {
            const candidate = await this.findOne("userName", userName);
            if (candidate) {
                throw ApiError.BadRequest(
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
        // console.log("logIn", userName, password);
        try {
            const candidate = await Users.findOne({
                where: {
                    userName,
                },
            });
            // console.log( "candidate hashed password", candidate.password,);

            if (!candidate) {
                return {
                    message: "user not found",
                    status: 404,
                    name: "userName",
                };
            }

            const isPassEquals = await bcrypt.compare(
                password,
                candidate.password
            );

            if (!isPassEquals) {
                return {
                    message: "password is not correct",
                    status: 401,
                    name: "userPass",
                };
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
            return error;
        }
    }

    async logOut(refreshToken) {
        const token = await tokenService.removeTokens(refreshToken);
        return token;
    }

    async refreshToken(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = tokenService.findToken(
            "refreshToken",
            refreshToken
        );

        if (!userData || !tokenFromDB) throw ApiError.UnauthorizedError();
        console.log(userData.id, "userDataId 121");
        const user = await this.findOne("id", userData.id);

        if (!user) return ApiError.UnauthorizedError();

        console.log(user, "user_service 127");

        const userDto = new UserDto(user);
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
    }

    async findAll() {
        // Users.findAll().then((res) => console.log(res));
        const allUsers = await Users.findAll();
        console.log(allUsers);
        return allUsers;
    }

    async deleteAllUsers() {
        const deletedUsers = await Users.destroy({ where: {} });
        console.log(deletedUsers);
    }
}

module.exports = new UserService();
