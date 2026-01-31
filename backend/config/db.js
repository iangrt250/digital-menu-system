const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Debug logs
console.log('Supabase URL:', supabaseUrl ? '✅' : '❌ MISSING');
console.log('Supabase Key:', supabaseKey ? `${supabaseKey.slice(0, 20)}...` : '❌ MISSING');

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = supabase;
