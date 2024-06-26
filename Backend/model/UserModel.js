const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    profileURL: {
      type: String,
      default: undefined
    }
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;