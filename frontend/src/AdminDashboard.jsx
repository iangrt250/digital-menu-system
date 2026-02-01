import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/menu`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Admin Header */}
      <header className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-2xl font-black">Admin Dashboard</h1>
                <p className="text-gray-400">Manage your restaurant</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-xl font-bold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Link to="/admin/menu" className="group bg-gradient-to-r from-orange-500 to-red-600 p-8 rounded-3xl text-white hover:shadow-2xl transition-all hover:scale-105">
            <div className="text-4xl mb-4">🍔</div>
            <h2 className="text-2xl font-black mb-2">Menu Management</h2>
            <p className="opacity-90">{menuItems.length} items</p>
          </Link>
          <Link to="/admin/categories" className="group bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-3xl text-white hover:shadow-2xl transition-all hover:scale-105">
            <div className="text-4xl mb-4">📂</div>
            <h2 className="text-2xl font-black mb-2">Categories</h2>
            <p className="opacity-90">Manage categories</p>
          </Link>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700">
          <h3 className="text-2xl font-black mb-8">Recent Menu Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.slice(0, 6).map(item => (
              <div key={item.id} className="group bg-gray-700/50 p-6 rounded-2xl hover:bg-gray-600 transition-all hover:scale-105">
                <h4 className="font-bold text-xl mb-2">{item.name}</h4>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-green-400">R{item.price}</span>
                  <Link to={`/admin/menu/${item.id}`} className="text-orange-400 hover:text-orange-300 font-bold">
                    Edit →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
