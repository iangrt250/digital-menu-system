const express = require('express');
const router = express.Router();
const supabase = require('../config/db');

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .order('category');
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add more routes...
module.exports = router;
