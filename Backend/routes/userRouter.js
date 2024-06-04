const express = require("express");
const Router = express.Router();
const controler = require("../controller/userController");

Router.post("/loginPost", controler.loginPost);
Router.post("/registerPost", controler.registerPost);
Router.post("/profileImgEdit", controler.profileImgEdit);

module.exports = Router;