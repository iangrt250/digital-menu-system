import { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@restaurant.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login success
    setTimeout(() => {
      onLogin({ email, role: 'admin' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-orange-500 flex items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 w-full max-w-md border border-white/20">
        <h1 className="text-4xl font-black text-white text-center mb-8">Ì¥ê Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-white/20 border border-white/30 rounded-xl text-white mb-6 focus:outline-none focus:border-orange-400"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-white/20 border border-white/30 rounded-xl text-white mb-8 focus:outline-none focus:border-orange-400"
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl text-xl font-black shadow-2xl hover:shadow-3xl transition-all"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-white/60 mt-4 text-sm">
          admin@restaurant.com / admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
