require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./config/db');  // Updated import

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Test connection
app.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('test').select('*').limit(1);
    res.json({ 
      message: 'Supabase Restaurant API ✅', 
      connected: !error,
      env: process.env.NODE_ENV 
    });
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Supabase API on port ${PORT}`);
});
