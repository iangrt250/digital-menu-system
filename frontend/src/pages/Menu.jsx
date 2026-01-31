import { useState, useEffect } from 'react';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    fetch(`${API_URL}/api/menu`)
      .then(res => res.json())
      .then(data => {
        console.log('Menu data:', data);
        setMenu(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Menu error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading delicious menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-16 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          í½” Restaurant Menu
        </h1>
        
        {menu.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 mb-4">No items available</p>
            <p className="text-lg text-gray-400">Admin needs to add menu items.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menu.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description || 'Delicious restaurant favorite!'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-green-600">
                    R{item.price}
                  </span>
                  <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
