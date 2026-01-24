import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Menu from './pages/Menu';       // ← Your real menu page with data fetch
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              HomeCart
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Menu
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-300 hover:text-white transition-colors font-medium relative"
              >
                Cart
                {/* Optional: future cart count badge */}
                {/* <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2 py-1">3</span> */}
              </Link>
              <Link 
                to="/checkout" 
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen bg-gray-950 text-gray-100">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Optional: Add 404 later */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;