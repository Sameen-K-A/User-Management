const express = require("express");
const app = express();
const connectDB = require("./database/dbConfig");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const adminRouter = require("./routes/adminRouter");
const cors = require("cors");

connectDB()
app.use(express.json());
app.use(cors());
app.use("/admin", adminRouter);

app.listen(port, console.log(`Server is started at port number ${port}`));