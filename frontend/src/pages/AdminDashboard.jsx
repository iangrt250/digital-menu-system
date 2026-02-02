import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchMenu();
  }, [navigate]);

  const fetchMenu = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const API_URL = import.meta.env.VITE_API_URL || 'https://restaurant-api-nssp.onrender.com';
      
      const response = await fetch(`${API_URL}/api/admin/menu`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }

      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-2xl text-white">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 mb-12 border border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-2xl">‚öôÔ∏è</span>
            </div>
            <div>
              <h1 className="text-3xl font-black">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your restaurant menu</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 mb-8">
              <h2 className="text-2xl font-black mb-6 flex items-center">
                ÌΩî Menu Items ({menuItems.length})
                <Link to="/admin/add-item" className="ml-auto bg-green-600 hover:bg-green-500 px-6 py-2 rounded-xl font-bold ml-4">
                  + Add New
                </Link>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.slice(0, 6).map(item => (
                  <div key={item.id} className="group bg-gray-700/50 p-6 rounded-2xl hover:bg-gray-600 transition-all border border-gray-600 hover:border-orange-500">
                    <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black text-green-400">R{item.price}</span>
                      <div className="space-x-2">
                        <button className="text-orange-400 hover:text-orange-300">Edit</button>
                        <button className="text-red-400 hover:text-red-300">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-3xl text-white text-center">
              <div className="text-4xl mb-4">Ì≥ä</div>
              <h3 className="font-black text-xl mb-2">Today</h3>
              <p className="text-3xl font-black">12 Orders</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl text-white text-center">
              <div className="text-4xl mb-4">Ì≤∞</div>
              <h3 className="font-black text-xl mb-2">Revenue</h3>
              <p className="text-3xl font-black">R1,247</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
