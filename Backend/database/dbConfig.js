const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.monogoDB);
    console.log("Mongo Database is connected");
  } catch (error) {
    console.log("MongoDB is not connected", error);
  }
};

module.exports = connectDB;