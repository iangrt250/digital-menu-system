const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/menu
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ available: true });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add menu item (admin)
const addMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getMenuItems, addMenuItem };
