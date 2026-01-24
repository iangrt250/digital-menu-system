import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('/api/menu');
        setMenuItems(response.data);
      } catch (err) {
        setError('Failed to load menu items. Check if backend is running!');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-2xl text-gray-300">Loading delicious items...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Our Menu
        </h1>

        {menuItems.length === 0 ? (
          <p className="text-center text-xl text-gray-400">
            No items yet – add more via POST!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menuItems.map((item) => (
              <div
                key={item._id}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-gray-800"
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                  />
                ) : (
                  <div className="w-full h-56 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-6xl">
                    🍕
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {item.description || 'A classic favorite'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-amber-400">
                      R{Number(item.price).toFixed(2)}
                    </span>
                    <span className="px-4 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                      {item.category || 'Main'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}