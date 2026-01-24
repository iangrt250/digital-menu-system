// frontend/src/pages/admin/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple demo authentication
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Try admin/admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">🍽️ Restaurant Admin</h1>
          <p className="text-black mt-2">Sign in to access the admin panel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-black">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              placeholder="admin"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-black">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center text-black text-sm">
          <p>Demo credentials: admin / admin123</p>
        </div>
      </div>
    </div>
  );
}