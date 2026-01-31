// backend/config/db.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY  // ← This matches Render env var name
);

module.exports = supabase;
