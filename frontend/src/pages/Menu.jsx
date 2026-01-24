import { useState } from 'react';
import ItemCard from '../components/ui/ItemCard';
import { useCart } from '../context/CartContext';

const MOCK_MENU = [
  {
    _id: '1',
    name: 'Margherita Pizza',
    description: 'Classic tomato and mozzarella cheese',
    price: 129.99,
    category: 'Pizza',
    imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80',
    available: true
  },
  {
    _id: '2',
    name: 'Cheeseburger',
    description: 'Beef patty with cheese, lettuce, tomato',
    price: 89.99,
    category: 'Burger',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    available: true
  },
  {
    _id: '3',
    name: 'Coca-Cola',
    description: '330ml can',
    price: 19.99,
    category: 'Drink',
    available: true
  },
  {
    _id: '4',
    name: 'Chicken Wings',
    description: 'Spicy buffalo wings with blue cheese dip',
    price: 149.99,
    category: 'Appetizer',
    imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80',
    available: true
  }
];

export default function Menu() {
  const { addToCart } = useCart();
  const [menuItems] = useState(MOCK_MENU);

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item.name);
    addToCart(item);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-medium">✅ Restaurant Menu</p>
        <p className="text-green-700 text-sm">Click "Add to Cart" on any item below</p>
      </div>
      
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🍽️ Our Menu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <ItemCard 
            key={item._id} 
            item={item} 
            onAdd={() => handleAddToCart(item)} 
          />
        ))}
      </div>
      
      <div className="mt-8 text-center text-gray-500">
        <p>{menuItems.length} delicious items available</p>
      </div>
    </div>
  );
}