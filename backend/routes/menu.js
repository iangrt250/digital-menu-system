const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu ORDER BY category');
    res.json(result.rows);
  } catch (error) {
    console.error('Menu query error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
