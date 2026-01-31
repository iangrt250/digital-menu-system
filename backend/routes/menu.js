// backend/routes/menu.js
const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
  try {
    const { data: menu, error } = await supabase
      .from('menu')
      .select('*')
      .order('category');
    
    if (error) throw error;
    res.json(menu || []);
  } catch (error) {
    console.error('Menu query error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
