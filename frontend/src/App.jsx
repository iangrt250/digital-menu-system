
// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/admin/Dashboard';
import OrderManagement from './pages/admin/Orders';
import MenuEditor from './pages/admin/MenuEditor';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Show Navbar for all routes except admin pages */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>
        
        <main className="pt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Menu />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Admin Routes - Simple access */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<OrderManagement />} />
            <Route path="/admin/menu" element={<MenuEditor />} />
            
            {/* Direct link to admin */}
            <Route path="/admin-login" element={
              <div className="container mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
                <div className="space-y-4 max-w-md mx-auto">
                  <a 
                    href="/admin" 
                    className="block bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-700"
                  >
                    🚀 Go to Admin Dashboard
                  </a>
                  <a 
                    href="/" 
                    className="block text-blue-600 hover:underline"
                  >
                    ← Back to main menu
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;