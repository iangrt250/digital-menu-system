import CartItem from '../components/ui/CartItem';
import OrderSummary from '../components/ui/OrderSummary';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-4xl font-bold mb-12 text-gray-800">🛒 Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-xl text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => <CartItem key={item.id} item={item} />)}
          </div>
          <OrderSummary />
        </div>
      )}
    </div>
  );
}
