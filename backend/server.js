require('dotenv').config();
const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menu');  // ← ADD THIS
const paymentRoutes = require('./routes/payment');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// ADD THESE ROUTES:
app.use('/api/menu', menuRoutes);     // ← CRITICAL LINE
app.use('/api/payment', paymentRoutes);
app.use('/api/categories', require('./routes/categories'));
app.use('/api/promotions', require('./routes/promotions'));


app.get('/', async (req, res) => {
  res.json({ message: 'Supabase Restaurant API ✅' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Supabase API on port ${PORT}`);
});
