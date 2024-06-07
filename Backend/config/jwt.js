const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret_key = process.env.JWT_secret;

const createToken = (userID) => {
  const token = JWT.sign({ userID }, secret_key, { expiresIn: "1h" });
  return token;
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.send("Access_denied");
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.send("Access_denied");
  }
  JWT.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.send("authentication_failed");
    } else {
      next();
    }
  });
};

module.exports = { createToken, verifyToken };