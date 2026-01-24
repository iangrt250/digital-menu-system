const mongoose = require('mongoose');

// Check if model exists before creating
const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: String,
  description: String,
  available: { type: Boolean, default: true }
}, { timestamps: true }));

module.exports = MenuItem;
