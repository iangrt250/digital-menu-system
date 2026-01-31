import { useState, useEffect } from 'react';
import ItemCard from '../components/ui/ItemCard';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read from localStorage instead of API
    const savedMenu = localStorage.getItem('restaurantMenu');
    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu));
    }
    setLoading(false);
  }, []);

  // Listen for storage changes (different tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedMenu = localStorage.getItem('restaurantMenu');
      if (savedMenu) {
        setMenuItems(JSON.parse(savedMenu));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return <div className="container mx-auto p-12"><p className="text-2xl">Loading menu...</p></div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🍔 Menu</h1>
      {menuItems.length === 0 ? (
        <p className="text-xl text-gray-500">No items available. Admin needs to add menu items.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <ItemCard key={item._id} item={item} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
