require("dotenv").config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const connectToDB = require("./src/configs/db");
const userRouter = require("./src/routes/user.routes");
const itemRouter = require("./src/routes/item.routes");


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/user', userRouter);
app.use('/items', itemRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my OLX API!" });
});

app.listen(PORT, async () => {
  try {
    await connectToDB(process.env.mongo_URI);
    console.log(`Server is running at port: ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});