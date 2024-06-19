// const registrationReq = require("../requests/postReq/registrationPostReq");


const UserRout_controller = require("./userRout_controller");

const Router = require("express").Router;
console.log(UserRout_controller)
const router = new Router();
router.post(
    "/registration",
    UserRout_controller.registration
);

// router.post("/login", registrationReq);
// router.post("/logout", registrationReq);
router.get("/refresh", (req, res) => {
    
    res.status(200).json({
        message: "You are registered successfully",
        data: "hello"
    });
});




module.exports = router