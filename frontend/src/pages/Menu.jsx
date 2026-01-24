import { useState, useEffect } from 'react';
import ItemCard from '../components/ui/ItemCard';
import { useCart } from '../context/CartContext';



// In Menu.jsx, add this to the top
console.log('Menu component loaded');

// In the ItemCard usage:
<ItemCard 
  key={item._id} 
  item={item} 
  onAdd={(item) => {
    console.log('Adding item from Menu:', item);
    addToCart(item);
  }} 
/>
// Mock data as fallback
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
    description: 'Spicy buffalo wings with blue cheese',
    price: 149.99,
    category: 'Appetizer',
    imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80',
    available: true
  }
];

export default function Menu() {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState(MOCK_MENU); // Start with mock data
  const [loading, setLoading] = useState(false); // Start as false since we have mock
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        setBackendStatus('connecting');
        console.log('Testing backend connection...');
        
        // Use your actual backend URL
        const backendUrl = 'https://restaurant-backend-w94x.onrender.com';
        
        const response = await fetch(`${backendUrl}/api/health`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          mode: 'cors'
        });
        
        if (response.ok) {
          const healthData = await response.json();
          console.log('✅ Backend health:', healthData);
          setBackendStatus('connected');
          
          // Now try to fetch menu
          try {
            const menuResponse = await fetch(`${backendUrl}/api/menu`);
            if (menuResponse.ok) {
              const realData = await menuResponse.json();
              if (realData && realData.length > 0) {
                console.log(`✅ Loaded ${realData.length} items from backend`);
                setMenuItems(realData);
              } else {
                console.log('⚠️ Backend returned empty menu, using mock data');
                setBackendStatus('empty');
              }
            }
          } catch (menuError) {
            console.warn('Menu fetch failed, using mock data:', menuError);
            setBackendStatus('menu-failed');
          }
        } else {
          console.warn('Backend health check failed, using mock data');
          setBackendStatus('failed');
        }
      } catch (error) {
        console.error('Backend connection error:', error);
        setBackendStatus('error');
      } finally {
        setLoading(false);
      }
    };
    
    // Start checking backend
    testBackendConnection();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-xl">Loading menu from backend...</p>
          <p className="text-gray-600 mt-2">Status: {backendStatus}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">🍔 Ian Menu</h1>
        <div className={`px-3 py-1 rounded-full text-sm ${
          backendStatus === 'connected' ? 'bg-green-100 text-green-800' :
          backendStatus === 'failed' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {backendStatus === 'connected' ? '✅ Live Data' : 
           backendStatus === 'failed' ? '⚠️ Using Demo Data' : 
           '📱 Demo Mode'}
        </div>
      </div>
      
      {backendStatus !== 'connected' && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-yellow-800">
            <strong>Note:</strong> {backendStatus === 'failed' ? 
              'Backend connection failed. Showing demo menu.' :
              backendStatus === 'empty' ?
              'Backend is connected but menu is empty.' :
              'Using demo menu data.'}
          </p>
          <p className="text-yellow-700 text-sm mt-1">
            Backend URL: https://restaurant-backend-w94x.onrender.com
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {menuItems.map(item => (
          <ItemCard key={item._id} item={item} onAdd={addToCart} />
        ))}
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Showing {menuItems.length} items • 
          {backendStatus === 'connected' ? ' Connected to live backend' : ' Using demo data'}
        </p>
      </div>
    </div>
  );
}