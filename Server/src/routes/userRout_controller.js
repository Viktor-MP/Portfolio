const logger = require("../logger/logger");

const bcrypt = require("bcrypt");
const db = require("../db");
const Users = db.users;

const userService = require("../services/user_service");
const UserDto = require("../dtos/user-dto");
const tokenService = require("../services/token_service");

class UserRout_controller {
    async checkUser(req, res, next) {
        const { key, value } = req.body;
        console.log(key, value, 1);
        const isUserExists = await userService.findOne(key, value);
        console.log(isUserExists, "isUserExists");
        if (isUserExists) {
            return res.status(200).json({ error: "User already exists" });
        }
        return res.status(200).json({ message: `${value} - is ready to use` });
    }

    async registration(req, res, next) {
        try {
            const { userName, userPass, checkPass } = req.body;

            // Basic validation (e.g., password match)
            if (userPass !== checkPass) {
                return res
                    .status(400)
                    .json({ message: "Passwords do not match" });
            }

            try {
                const userData = await userService.registration(
                    userName,
                    userPass
                );
                console.log(userData);
                if (userData.user) {
                    res.cookie("refreshToken", userData.refreshToken, {
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                    });
                    userData.message = "User created successfully";
                    return res.status(201).json(userData);
                }
                return res.status(409).json({ error: "User already exists" });
            } catch (error) {
                const errorMessage = {}; // next(error.message, "message");
                errorMessage.error =
                    "An error occurred while creating the user";

                return res.status(500).json(errorMessage);
            }
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { userName, userPass } = req.body;

            const userData = await userService.logIn(userName, userPass);
            if (userData.user) {
                res.cookie("refreshToken", userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                userData.message = " Successful login";
                return res.status(201).json(userData);
            }
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logOut(refreshToken);
            res.clearCookie("refreshToken");

            return res.json(token);
        } catch (error) {
            next(error);
        }
    }


    async refresh(req, res, next) {
        try {
            console.log("refreshing 94")
            const { refreshToken } = req.cookies;
            console.log(req.cookies)
            const userData = await userService.refreshToken(refreshToken);
            console.log(userData, "userRout 87");
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }


    async getUsers (req, res, next) {
        try {
            const users  = await userService.findAll();
            return res.json(users)
            
        } catch (error) {
            next(error)
        }

    }

}

module.exports = new UserRout_controller();
