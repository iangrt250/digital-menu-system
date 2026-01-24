import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function OrderSummary() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-lg">
          <span>Subtotal ({cart.length} items):</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Tax (10%):</span>
          <span>${(total * 0.1).toFixed(2)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between text-2xl font-bold">
            <span>Total:</span>
            <span>${(total * 1.1).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Link 
        to="/checkout" 
        className="w-full bg-green-500 text-white py-4 px-6 rounded-xl text-center font-semibold text-lg block hover:bg-green-600 transition-colors"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
