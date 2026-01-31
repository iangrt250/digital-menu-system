// backend/config/db.js
const { createClient } = require('@supabase/supabase-js');

console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ SET' : '❌ MISSING');
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? '✅ SET' : '❌ MISSING');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY  // This line is crashing
);

module.exports = supabase;
