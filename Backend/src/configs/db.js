const mongoose = require("mongoose");

const connectToDB = async (uri) => {
  await mongoose.connect(uri);
  console.log("Connected to Database");
};

module.exports = connectToDB;