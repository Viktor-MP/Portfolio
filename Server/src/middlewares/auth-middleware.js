const ApiError = require("../exceptions/api-error");
const token_service = require("../services/token_service");

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) return next(ApiError.UnauthorizedError());
        console.log("authorization started");

        const accessToken = authorizationHeader.split(" ")[1];
        const tokenData = token_service.validateAccessToken(accessToken);

        if (!tokenData) return next(ApiError.UnauthorizedError());

        req.user = tokenData;
        next();
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
};
