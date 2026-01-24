import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react'; // npm install lucide-react

export default function Navbar() {
  const { cart } = useCart();
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">🍕 FoodHub</Link>
          <Link to="/cart" className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            <ShoppingCart size={20} />
            <span>{cart.length}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
