const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  purchases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
}, {
  timestamps: true,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
