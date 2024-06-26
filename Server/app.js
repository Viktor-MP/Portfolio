require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 5001;
const bodyParser = require("body-parser");
const router = require("./src/routes/router");
const errorMiddleware = require("./src/middlewares/error-middleware");

// access for every user
const cors = require("cors");
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);

// Use body-parser middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api", router);
app.use(errorMiddleware);

// Front app run requests
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const startApp = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port - ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startApp();
