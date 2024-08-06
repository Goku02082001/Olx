require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.Schema");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    console.log(req.user._id)
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." ,error: error});
  }
};

module.exports = authMiddleware;
