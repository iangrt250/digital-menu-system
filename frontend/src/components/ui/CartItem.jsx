import { useCart } from '../../context/CartContext';
import { Trash2 } from 'lucide-react';

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow border">
      <img src={item.image || 'https://via.placeholder.com/80x80'} 
           alt={item.name} 
           className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-2xl font-bold text-green-600">${item.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={() => removeFromCart(item._id)}  // Fix: Use _id
          className="text-red-500 hover:text-red-700 p-1"
        >
          <Trash2 size={20} />
        </button>

      </div>
    </div>
  );
}
