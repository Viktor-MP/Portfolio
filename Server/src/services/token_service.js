const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../db");
const { log } = require("winston");

const Tokens = db.tokens;

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30s",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    validateAccessToken(token) {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return tokenData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return tokenData;
        } catch (error) {
            return null;
        }
    }

    async findToken(initial, token) {
        const tokenData = await Tokens.findOne({
            where: {
                [initial]: token,
            },
        });
        return tokenData;
    }

    async saveToken(id, accessToken, refreshToken) {
        const tokenData = false;

        console.log({ user_id: id, accessToken, refreshToken });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await Tokens.create({
            user_id: id,
            accessToken,
            refreshToken,
        });
        return token;
    }

    async removeTokens(refreshToken) {
        const deletedToken = await Tokens.destroy({
            where: {
                refreshToken,
            },
        });

        console.log(deletedToken);
        return deletedToken;
    }
}

module.exports = new TokenService();
