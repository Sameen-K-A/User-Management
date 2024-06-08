const express = require("express");
const Router = express.Router();
const controler = require("../controller/adminController");
const { verifyToken } = require("../config/jwt")

Router.post("/login", controler.login);
Router.get("/fetchuser", verifyToken, controler.fetchuser);
Router.post("/editUser", verifyToken, controler.editUser);
Router.post("/deleteUser", verifyToken, controler.deleteUser);

module.exports = Router;