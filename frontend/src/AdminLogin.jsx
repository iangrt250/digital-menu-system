import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-12 max-w-md w-full border border-white/30 shadow-2xl">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-4">Admin Portal</h1>
          <p className="text-white/80">Sign in to manage your restaurant</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-4 rounded-2xl">
              {error}
            </div>
          )}
          
          <div>
            <input
              type="email"
              placeholder="admin@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:border-orange-400 transition-all"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:border-orange-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-2xl text-xl font-black shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-white/60 text-sm">
          Default: <strong>admin@restaurant.com</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
