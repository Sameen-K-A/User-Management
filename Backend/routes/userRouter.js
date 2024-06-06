const express = require("express");
const Router = express.Router();
const controler = require("../controller/userController");
const upload = require("../config/multer");

Router.post("/loginPost", controler.loginPost);
Router.post("/registerPost", controler.registerPost);
Router.post("/editProfile", upload.single('newImage'), controler.editProfile);

module.exports = Router;