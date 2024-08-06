const mongoose = require('mongoose');

const categoriesEnum = [
  'Cars',
  'Motorcycles',
  'Mobile Phones',
  'Houses & Apartments',
  'Scooters',
  'Commercial & Other Vehicles',
  'Houses & Apartments'
];

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: 'unsold' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ownerName: {type: String},
  image: { type: String },
  location: { type: String },
  description: { type: String },
  categories: { type: String, enum: categoriesEnum },
  createdAt: { type: Date, default: Date.now }
});

const itemModel = mongoose.model('Item', itemSchema);
module.exports = itemModel;
