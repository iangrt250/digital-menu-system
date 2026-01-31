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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
  {menu.map(item => (
    <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <p className="text-2xl font-bold text-green-600">R{item.price}</p>
      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mt-2">
        {item.category}
      </span>
    </div>
  ))}
</div>
