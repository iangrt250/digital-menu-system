// frontend/src/pages/Checkout.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create order object
      const order = {
        customer: formData,
        items: cart,
        total: totalPrice,
        paymentMethod,
        status: 'pending',
        orderDate: new Date().toISOString()
      };

      // In a real app, you would send this to your backend
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(order)
      // });
      
      // For demo, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate fake order ID
      const fakeOrderId = 'ORD-' + Date.now();
      setOrderId(fakeOrderId);
      setOrderSuccess(true);
      
      // Clear cart after successful order
      clearCart();
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Order failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-black mb-4">Order Confirmed!</h1>
          <p className="text-black mb-2">Thank you for your order!</p>
          <p className="text-black mb-6">Order ID: <span className="font-bold">{orderId}</span></p>
          
          <div className="bg-white rounded-lg p-6 mb-6">
            <h3 className="font-bold text-lg mb-4 text-black">Order Summary</h3>
            {cart.map(item => (
              <div key={item._id} className="flex justify-between py-2 border-b border-gray-300">
                <span className="text-black">{item.name} x {item.quantity}</span>
                <span className="text-black">R {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg pt-4 mt-2 border-t border-gray-300">
              <span className="text-black">Total</span>
              <span className="text-black">R {totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="text-black mb-6">
            {paymentMethod === 'cash' 
              ? 'Please have cash ready when our delivery arrives.' 
              : 'Your payment has been processed successfully.'}
          </p>
          
          <button
            onClick={() => navigate('/menu')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="text-5xl mb-4 text-black">🛒</div>
        <h1 className="text-2xl font-bold mb-4 text-black">Your cart is empty</h1>
        <p className="text-black mb-6">Add some delicious items from our menu first!</p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          View Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 text-black">
      <h1 className="text-3xl font-bold mb-8 text-black">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Order Summary */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg">
                <div>
                  <h3 className="font-medium text-black">{item.name}</h3>
                  <p className="text-black text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-black">R {(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-black text-sm">R {item.price.toFixed(2)} each</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between mb-2 text-black">
              <span>Subtotal</span>
              <span>R {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-black">
              <span>Delivery Fee</span>
              <span>R {totalPrice > 200 ? '0.00' : '29.99'}</span>
            </div>
            {totalPrice > 200 && (
              <div className="text-black text-sm mb-2">
                🎉 Free delivery on orders over R200!
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
              <span className="text-black">Total</span>
              <span className="text-black">R {(totalPrice + (totalPrice > 200 ? 0 : 29.99)).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Right Column: Checkout Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-black">Delivery Information</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="082 123 4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-black">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="Cape Town"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-black">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="123 Main Street, Suburb"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="8001"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-black">Order Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="Special instructions, dietary requirements, etc."
                />
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-black">Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 border rounded-lg text-left transition-colors ${paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border mr-3 ${paymentMethod === 'cash' ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                      {paymentMethod === 'cash' && (
                        <div className="w-3 h-3 bg-white rounded-full m-auto"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-black">Cash on Delivery</p>
                      <p className="text-sm text-black">Pay when you receive your order</p>
                    </div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg text-left transition-colors ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border mr-3 ${paymentMethod === 'card' ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                      {paymentMethod === 'card' && (
                        <div className="w-3 h-3 bg-white rounded-full m-auto"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-black">Credit/Debit Card</p>
                      <p className="text-sm text-black">Pay securely online</p>
                    </div>
                  </div>
                </button>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-black text-sm">
                    Note: Card payment integration coming soon. For now, please select Cash on Delivery.
                  </p>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                  Processing Order...
                </span>
              ) : (
                `Place Order - R ${(totalPrice + (totalPrice > 200 ? 0 : 29.99)).toFixed(2)}`
              )}
            </button>
            
            <p className="text-black text-sm mt-4 text-center">
              By placing your order, you agree to our Terms & Conditions
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}