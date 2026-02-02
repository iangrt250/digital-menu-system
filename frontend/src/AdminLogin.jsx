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

    // ✅ MOCK LOGIN - Works INSTANTLY
    if (email === 'admin@restaurant.com' && password === 'admin123') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create fake token and user data
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-admin-token-2026';
      const mockUser = { email: 'admin@restaurant.com', role: 'admin' };
      
      localStorage.setItem('adminToken', mockToken);
      localStorage.setItem('adminUser', JSON.stringify(mockUser));
      
      navigate('/admin/dashboard');
      setLoading(false);
      return;
    }

    // ❌ Wrong credentials
    setTimeout(() => {
      setError('❌ Invalid email or password');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-orange-500 flex items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 w-full max-w-md border border-white/20 shadow-2xl">
        <h1 className="text-4xl font-black text-white text-center mb-8">🔐 Admin Portal</h1>
        
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
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 rounded-xl text-xl font-black shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className="mt-8 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-center text-emerald-100">
          <strong>✅ Works Immediately:</strong><br/>
          admin@restaurant.com / admin123
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
