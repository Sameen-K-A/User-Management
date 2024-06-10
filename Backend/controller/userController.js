const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { createToken } = require("../config/jwt");

const hashFunction = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log("Something wrong in password hashed", error);
  }
};

const loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const bcryptPassword = await bcrypt.compare(password, userData.password);
      if (bcryptPassword == true) {
        const token = createToken(userData._id);
        res.json({userData, token})
      } else {
        res.send("wrongPassword")
      }
    } else {
      res.send("notFound");
    }
  } catch (error) {
    console.log(error);
  }
}

const registerPost = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const existUser = await User.findOne({ email: email });
  if (!existUser) {
    const hashedPassword = await hashFunction(password);
    const userData = {
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    };
    const createUser = await User.create(userData);
    res.json(createUser);
  } else {
    res.send("UserExist");
  }
}

const editProfile = async (req, res) => {
  const { userID, name, phone } = req.body;
  const file = req.file;
  const updatedData = {
    name: name,
    phone: phone,
    ...(file && { profileURL: file.originalname })
  }
  const updateUser = await User.updateOne({ _id: userID }, updatedData);
  res.send(updateUser);
}

module.exports = {
  loginPost,
  registerPost,
  editProfile
}