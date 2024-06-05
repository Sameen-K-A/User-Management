const User = require("../model/UserModel");
const bcrypt = require("bcrypt");

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
        res.json(userData)
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

const profileImgEdit = async (req, res) => {
  const { imgURL, id } = req.body;
  console.log(imgURL);
  const updateUser = await User.updateOne({ _id: id }, { profileURL: imgURL });
  res.json(updateUser);
}

module.exports = {
  loginPost,
  registerPost,
  profileImgEdit
}