// routes/menu.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define a simple MenuItem schema (do this once - move to models later if you want)
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },          // e.g. "Pizza", "Burger", "Drink"
  imageUrl: { type: String },           // optional for frontend display
  available: { type: Boolean, default: true }
});

// Create the model (collection will be "menuitems" - lowercase plural)
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// GET /api/menu - Fetch all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();  // finds ALL documents in menuitems collection
    res.json(items);
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({ message: 'Server error fetching menu items' });
  }
});

const { getMenuItems, addMenuItem } = require('../controllers/menuController');

router.get('/', getMenuItems);
router.post('/', addMenuItem);

// Optional: POST /api/menu - Add a new item (for admin/testing)
router.post('/', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error adding menu item:', err);
    res.status(400).json({ message: 'Error adding item', error: err.message });
  }
});

module.exports = router;