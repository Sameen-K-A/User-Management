const express = require("express");
const Router = express.Router();
const controler = require("../controller/adminController");

Router.get("/fetchuser", controler.fetchuser);
Router.post("/editUser", controler.editUser);
Router.post("/deleteUser", controler.deleteUser);

module.exports = Router;