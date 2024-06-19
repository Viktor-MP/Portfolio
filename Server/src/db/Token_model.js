const { DataTypes } = require("sequelize");
const usersModel = require("./User_model");

const tokenModel = (sequelize) => {
    return sequelize.define(
        "Tokens",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            accessToken: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            refreshToken: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                // references: {
                //     model: usersModel, // Reference to the User model
                //     key: "id",
                // },
                allowNull: false,
            },
        },
        {
            tableName: "tokens",
        }
    );
};

module.exports = tokenModel;
