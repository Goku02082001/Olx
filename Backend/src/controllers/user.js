require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.Schema');


const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ error: 'User already registered' });
    }
    const user = new userModel({ name, email, password });
    user.password = await bcrypt.hash(password, 8);
    await user.save();

    
    res.status(201).json({ msg: "User registered successfully." });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: 'User not found. Please provide correct credentials.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).send({ error: 'Please provide correct Password.' });
    }

    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.send({ token ,user:user.name,userId:user._id, favourites: user.favourites});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { register, login };
