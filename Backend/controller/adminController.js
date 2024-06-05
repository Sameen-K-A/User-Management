const User = require("../model/UserModel");

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
    const { id, newName } = req.body;
    const updateUser = await User.updateOne({ _id: id }, { name: newName });
    res.json(updateUser);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchuser,
  deleteUser,
  editUser
};