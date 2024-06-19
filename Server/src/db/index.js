const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        dialect: "mysql",
        host: process.env.MYSQL_HOST_local,
        logging: (msg) => console.log(msg),
    },
    console.log("connected to sequelize")
);

const Users = require("./User_model")(sequelize);
const Tokens = require("./Token_model")(sequelize);

Users.hasMany(Tokens, { foreignKey: "user_id" });
Tokens.belongsTo(Users, { foreignKey: "user_id" });

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch((err) => {
        console.error("Unable to create tables, shutting down...", err);
    });

module.exports = {
    sequelize: sequelize,
    users: Users,
    tokens: Tokens,
};
