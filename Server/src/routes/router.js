// const registrationReq = require("../requests/postReq/registrationPostReq");

const user_service = require("../services/user_service");
const userRout_controller = require("./userRout_controller");
const UserRout_controller = require("./userRout_controller");

const Router = require("express").Router;
// console.log(UserRout_controller)
const router = new Router();

router.post("/candidate/exists", UserRout_controller.checkUser);

router.post("/registration", UserRout_controller.registration);
router.post("/login", userRout_controller.login);
router.post("/logout", userRout_controller.logout);



// router.post("/logout", registrationReq);
router.get("/refresh", (req, res) => {
    res.status(200).json({
        message: "You are registered successfully",
        data: "hello",
    });
});

module.exports = router;
