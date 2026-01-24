import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
             Tapiwa Restaurant
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/menu" className="text-gray-700 hover:text-blue-600 font-medium">
              Menu
            </Link>
            
            <Link to="/cart" className="relative">
              <span className="text-gray-700 hover:text-blue-600 font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <Link to="/checkout" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
