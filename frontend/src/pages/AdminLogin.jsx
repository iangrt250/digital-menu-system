import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@restaurant.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://restaurant-api-nssp.onrender.com';
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-orange-500 flex items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 w-full max-w-md border border-white/20 shadow-2xl">
        <h1 className="text-4xl font-black text-white text-center mb-8">Ì¥ê Admin Portal</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-4 rounded-2xl mb-6 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-white/20 border border-white/30 rounded-xl text-white mb-6 focus:outline-none focus:border-orange-400 placeholder-white/60"
            placeholder="admin@restaurant.com"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-white/20 border border-white/30 rounded-xl text-white mb-8 focus:outline-none focus:border-orange-400 placeholder-white/60"
            placeholder="admin123"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 rounded-xl text-xl font-black shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-gray-800/50 rounded-xl text-center text-white/70 text-sm">
          <strong>Demo Credentials:</strong><br/>
          admin@restaurant.com / admin123
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
