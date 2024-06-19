const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../db");
const { log } = require("winston");

const Tokens = db.tokens;

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30m",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(id, accessToken, refreshToken) {
        console.log("tokenData");
        console.log(accessToken, 1)
        console.log(refreshToken, 1)

        // const tokenData = await Tokens.findOne({
        //     where: {
        //         id: id,
        //     }
        // });
        const tokenData = false
        console.log("finding");
        console.log(tokenData);

        console.log({ user_id: id, accessToken, refreshToken });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }


        const token = await Tokens.create({ user_id: id, accessToken ,refreshToken });
        console.log(token, "token service")
        return token;
    }
}

module.exports = new TokenService();
