const logger = require("../logger/logger");

const bcrypt = require("bcrypt");

const userService = require("../services/user_service")



class UserRout_controller {
    async registration(req, res, next) {


        try {
            const { userName, userPass, checkPass } = req.body;
            // Basic validation (e.g., password match)
            if (userPass !== checkPass) {
                return res.status(400).json({ message: "Passwords do not match" });
            }

            const userData = await userService.registration(userName, userPass);

            console.log(userData, 22)
            // // Process the data (e.g., validate, save to database, etc.)
            // // console.log("Received data:", { userName, userPass, checkPass });
    
            // // Send a response back to the client
            // res.status(200).json({
            //     message: "You are registered successfully",
            //     data: { userName, userPass, checkPass },
            // });

            return res.json(userData)
            
        } catch (error) {
            console.log(error)
        }


    }

    async login(req, res, next) {
        try {
        } catch (error) {}
    }

    async logout(req, res, next) {
        try {
        } catch (error) {}
    }
    async refresh(req, res, next) {
        try {
        } catch (error) {}
    }
}

module.exports = new UserRout_controller();
