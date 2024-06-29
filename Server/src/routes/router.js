const user_service = require("../services/user_service");
const UserRout_controller = require("./userRout_controller");
// const {body} = require("express-validator")
const authMiddleware = require("../middlewares/auth-middleware")


const Router = require("express").Router;
// console.log(UserRout_controller)
const router = new Router();

router.post("/candidate/exists", UserRout_controller.checkUser);

router.post("/registration", UserRout_controller.registration);
router.post("/login", UserRout_controller.login);
router.post("/logout", UserRout_controller.logout);
router.get("/refresh", UserRout_controller.refresh);
router.get("/users", authMiddleware , UserRout_controller.getUsers)

module.exports = router;
