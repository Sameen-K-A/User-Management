const express = require("express");
const Router = express.Router();
const controler = require("../controller/adminController");

Router.get("/fetchuser", controler.fetchuser);
Router.post("/editUser", controler.editUser);
Router.post("/blockUser", controler.blockUser);
Router.post("/unblockUser", controler.unblockUser);

module.exports = Router;