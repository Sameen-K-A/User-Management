const User = require("../model/UserModel");

const userlist = async (req, res) => {
  try {
    const usersList = await User.find({});
    res.json(usersList);
  } catch (error) {
    console.log(error);
  }
}

const blockUser = async (req, res) => {
  try {
    const userID = req.body.userID;
    const updateUser = await User.updateOne({ _id: userID }, { isBlocked: true });
    res.send(updateUser);
  } catch (error) {
    console.log(error);
  }
}

const unblockUser = async (req, res) => {
  try {
    const userID = req.body.userID;
    const updateUser = await User.updateOne({ _id: userID }, { isBlocked: false });
    res.send(updateUser);
  } catch (error) {
    console.log(error);
  }
}

const editUser = async (req, res) => {
  try {
    const {id, newName} = req.body;
    const updateUser = await User.updateOne({ _id: id }, {name : newName});
    res.json(updateUser);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  userlist,
  blockUser,
  unblockUser,
  editUser
};