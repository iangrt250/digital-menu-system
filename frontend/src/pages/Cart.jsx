// frontend/src/pages/Cart.jsx
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            {cart.map(item => (
              <div key={item._id} className="flex items-center p-4 border-b last:border-b-0">
                {item.imageUrl && (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                )}
                
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">R {item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="font-medium w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                
                <div className="text-right ml-6">
                  <p className="font-bold text-lg">R {(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm hover:text-red-700 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Clear All Items
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>R {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{totalPrice > 200 ? 'FREE' : 'R 29.99'}</span>
            </div>
            {totalPrice > 200 && (
              <div className="text-green-600 text-sm">
                🎉 You qualify for free delivery!
              </div>
            )}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>R {(totalPrice + (totalPrice > 200 ? 0 : 29.99)).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            
            <button
              onClick={() => navigate('/menu')}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p className="mb-1">✅ Secure checkout</p>
            <p className="mb-1">✅ 30-minute delivery guarantee</p>
            <p>✅ Free returns within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}