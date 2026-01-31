const express = require('express');
const router = express.Router();
const supabase = require('../config/db');

// GET /api/menu
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .order('category');
    
    if (error) throw error;
    res.json(data || []);  // Empty array if no data
  } catch (error) {
    console.error('Menu error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
