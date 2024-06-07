const express = require("express");
const Router = express.Router();
const controler = require("../controller/userController");
const upload = require("../config/multer");
const { verifyToken } = require("../config/jwt")

Router.post("/loginPost", controler.loginPost);
Router.post("/registerPost", controler.registerPost);
Router.post("/editProfile", verifyToken, upload.single('newImage'), controler.editProfile);

module.exports = Router;