const express = require('express');
const cors = require('cors');
const app = express();

// ✅ CRITICAL: CORS FIRST (before ALL routes)
app.use(cors({
  origin: [
    'https://digital-menu-ten-gamma.vercel.app',
    'https://digital-menu-*.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Your existing routes
app.use('/api/menu', require('./routes/menu'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/promotions', require('./routes/promotions'));
app.use('/api/admin', require('./routes/admin'));

const fileUpload = require('express-fileupload');
app.use(fileUpload({
  createParentPath: true
}));


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('✅ CORS enabled for Vercel + localhost');
});

module.exports = app;
