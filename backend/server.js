// Load environment FIRST
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const menuRoutes = require('./routes/menu');

connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api/payment', require('./routes/payment'));

// Routes
app.use('/api/menu', menuRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Restaurant API ✅', 
    env: process.env.NODE_ENV 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
