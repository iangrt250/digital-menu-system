import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://restaurant-api-nssp.onrender.com';
    
    // Load menu
    fetch(`${API_URL}/api/menu`)
      .then(res => res.json())
      .then(data => {
        setMenu(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Load categories
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(setCategories);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl animate-bounce mb-8">ÌΩî</div>
          <div className="text-2xl">Loading delicious menu...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header - Always Visible */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xl border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl">ÌΩî</span>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Flavor Town
                </h1>
                <p className="text-lg text-gray-600 font-semibold">Restaurant & Grill</p>
              </div>
            </div>
            <Link 
              to="/admin/login"
              className="group bg-gradient-to-r from-gray-900 to-gray-800 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>Ì±®‚ÄçÌ≤º</span>
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Welcome to<br className="md:block" />
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Flavor Town
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Fresh ingredients, bold flavors, made with love. 
            <br className="md:hidden" /> Order now or visit us today!
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-4xl font-black text-center text-gray-900 mb-16">ÌΩΩÔ∏è Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map(cat => (
                <div key={cat.id} className="group text-center p-8 rounded-3xl bg-gradient-to-b from-gray-50 to-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border hover:border-orange-200">
                  <div className="text-5xl mb-4" style={{ color: cat.color || '#FF6B35' }}>
                    {cat.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Menu Items */}
      <section className="py-24 bg-gradient-to-b from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">‚≠ê Featured Items</h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">Our most popular dishes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.slice(0, 8).map((item) => (
              <article 
                key={item.id}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 hover:border-orange-200 hover:-translate-y-3"
              >
                {/* Image/Emoji */}
                <div className="h-56 bg-gradient-to-br from-orange-400 via-red-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="text-6xl drop-shadow-lg">ÌΩî</span>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h4 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 mb-6 leading-relaxed min-h-[4rem]">
                    {item.description || 'Freshly prepared with premium ingredients'}
                  </p>
                  
                  {/* Price + Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                      R{item.price}
                    </span>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all group-hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {menu.length === 0 && (
            <div className="col-span-full text-center py-32">
              <div className="text-8xl mb-8 opacity-20">ÌΩΩÔ∏è</div>
              <h3 className="text-4xl font-black text-gray-500 mb-4">Menu Coming Soon!</h3>
              <p className="text-xl text-gray-400 mb-8">Admin needs to add delicious items</p>
              <Link 
                to="/admin/login"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-4 rounded-2xl text-2xl font-black shadow-2xl hover:shadow-3xl transition-all"
              >
                Ì±®‚ÄçÌ≤º Add Menu Items
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-4xl md:text-5xl font-black mb-8">Ready to Order?</h3>
          <p className="text-xl mb-12 opacity-90">Download app or order online for fast delivery!</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-12 py-6 rounded-3xl text-2xl font-black shadow-2xl hover:shadow-3xl transition-all">
              ÌΩî Order Now
            </button>
            <Link 
              to="/admin/login"
              className="border-4 border-white/50 hover:border-white text-white px-12 py-6 rounded-3xl text-2xl font-bold hover:bg-white/20 transition-all"
            >
              Manage Restaurant
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-8 md:mb-0">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4 shadow-2xl">
                <span className="text-3xl">ÌΩî</span>
              </div>
              <h3 className="text-2xl font-black mb-2">Flavor Town</h3>
              <p className="text-gray-400">Your favorite restaurant</p>
            </div>
            <div className="space-y-4 text-sm opacity-75">
              <Link to="/admin/login" className="block hover:text-orange-400 transition-colors">Admin Portal</Link>
              <a href="#" className="block hover:text-orange-400 transition-colors">Contact</a>
              <a href="#" className="block hover:text-orange-400 transition-colors">About</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            ¬© 2026 Flavor Town Restaurant. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
