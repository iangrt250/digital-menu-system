const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const JWT_SECRET = 'your-super-secret-jwt-key-change-this';

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error || !admin || !bcrypt.compareSync(password, admin.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { email: admin.email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all menu items (admin only)
router.get('/menu', verifyAdmin, async (req, res) => {
  const { data } = await supabase.from('menu').select('*');
  res.json(data || []);
});

// Add new menu item
router.post('/menu', verifyAdmin, async (req, res) => {
  const { name, description, price, category_id } = req.body;
  const { data, error } = await supabase
    .from('menu')
    .insert([{ name, description, price, category_id }])
    .select();
  if (error) return res.status(400).json({ error });
  res.json(data[0]);
});

// Update menu item
router.put('/menu/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase
    .from('menu')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) return res.status(400).json({ error });
  res.json(data[0]);
});

// Delete menu item
router.delete('/menu/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('menu').delete().eq('id', id);
  if (error) return res.status(400).json({ error });
  res.json({ success: true });
});

module.exports = router;  // Export just the router
