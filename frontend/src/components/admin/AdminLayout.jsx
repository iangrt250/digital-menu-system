// frontend/src/components/admin/AdminLayout.jsx
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/orders', label: 'Orders', icon: '📋' },
    { path: '/admin/menu', label: 'Menu', icon: '📝' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-black">🍽️ Restaurant Admin</h1>
              <p className="text-black text-sm">Administration Panel</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/menu" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Public Menu →
              </Link>
              <button className="bg-gray-200 text-black px-4 py-2 rounded-lg">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow p-4">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-black hover:bg-gray-100'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-black mb-2">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-black">Today's Orders:</span>
                    <span className="font-bold text-black">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Revenue Today:</span>
                    <span className="font-bold text-black">R 849.95</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}