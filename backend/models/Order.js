const mongoose = require('mongoose');

const Order = mongoose.models.Order || mongoose.model('Order', new mongoose.Schema({
  items: [{ name: String, price: Number, quantity: Number }],
  total: { type: Number, required: true },
  customerName: String,
  phone: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true }));

module.exports = Order;
