const express = require('express');
const cors = require('cors');  // ← ADD THIS LINE
const app = express();

// ← ADD CORS BEFORE ALL ROUTES (THIS FIXES EVERYTHING)
app.use(cors({
  origin: [
    'https://digital-menu-dv7tk810k-ians-projects-15707d0d.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());

// Your existing routes
app.use('/api/menu', require('./routes/menu'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/promotions', require('./routes/promotions'));
app.use('/api/admin', require('./routes/admin'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
