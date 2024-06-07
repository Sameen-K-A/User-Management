const User = require("../model/UserModel");
const { createToken } = require("../config/jwt")
const dotenv = require("dotenv");
dotenv.config

const login = (req, res) => {
  try {
    const { email, password } = req.body;
    const orginalEmail = process.env.adminEmail;
    const orginalPassword = process.env.adminPassword;
    if (email == orginalEmail) {
      if (orginalPassword == password) {
        const token = createToken(email);
        res.send(token);
      } else {
        res.send("passwordwrong")
      }
    } else {
      res.send("EmailNotFound")
    }
  } catch (error) {
    console.log(error);
  }
}

const fetchuser = async (req, res) => {
  try {
    const usersList = await User.find({});
    res.json(usersList);
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async (req, res) => {
  try {
    const userID = req.body.userID;
    const deleteUser = await User.deleteOne({ _id: userID });
    res.send(deleteUser);
  } catch (error) {
    console.log(error);
  }
}

const editUser = async (req, res) => {
  try {
    const { userID, newName } = req.body;
    const updateUser = await User.updateOne({ _id: userID }, { name: newName });
    res.json(updateUser);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  login,
  fetchuser,
  deleteUser,
  editUser
};