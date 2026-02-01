import { useState, useEffect } from 'react';

function App() {
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    fetch(`${API_URL}/api/categories`).then(res => res.json()).then(setCategories);
    fetch(`${API_URL}/api/promotions`).then(res => res.json()).then(setPromotions);
  }, []);

  const loadCategoryItems = async (categoryId) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await fetch(`${API_URL}/api/menu?category_id=${categoryId}`);
    const items = await response.json();
    setCategoryItems(items);
    setActiveCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🍔</span>
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">RESTAURANT</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            Flavor<br/><span className="text-yellow-300">Explosion</span>
          </h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-95">
            Fresh. Bold. Unforgettable. Discover our menu today!
          </p>
        </div>
      </section>

      {/* 🔥 PROMOTIONS */}
      {promotions.length > 0 && (
        <section className="py-20 bg-white/90 backdrop-blur-xl -mt-12 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-4xl font-black text-center text-gray-900 mb-16 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🔥 Limited Time Deals
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {promotions.slice(0, 3).map(promo => (
                <div key={promo.id} className="group bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-10 text-white shadow-2xl hover:scale-105 transition-all duration-300 border-4 border-white/20">
                  <div className="text-5xl mb-6">🎉</div>
                  <h4 className="text-2xl font-black mb-4">{promo.title}</h4>
                  <p className="opacity-90 mb-8">{promo.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black">{promo.discount}% OFF</span>
                    <button 
                      onClick={() => alert(`${promo.title} - ${promo.discount}% OFF!`)}
                      className="bg-white text-orange-500 px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-orange-50 transition-all"
                    >
                      View Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="py-24 bg-gradient-to-b from-white/70 to-orange-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-black text-gray-900 mb-6">🍽️ Explore Categories</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find your favorites or discover something new</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => loadCategoryItems(category.id)}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-4 border-white/50 hover:border-orange-200 h-64 flex flex-col items-center justify-center text-center overflow-hidden"
              >
                <div 
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-4xl shadow-2xl mb-6 group-hover:scale-110 transition-all duration-300"
                >
                  <span>{category.icon}</span>
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {category.name}
                </h4>
                <p className="text-gray-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {activeCategory === category.id ? 'Loading...' : 'View Menu'}
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
              </button>
            ))}
          </div>

          {/* Category Items Preview */}
          {activeCategory && categoryItems.length > 0 && (
            <div className="mt-16">
              <h4 className="text-3xl font-black text-center mb-12">Featured Items</h4>
              <div className="grid md:grid-cols-3 gap-8">
                {categoryItems.slice(0, 6).map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
                    <h5 className="text-xl font-bold mb-4">{item.name}</h5>
                    <p className="text-gray-600 mb-6">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black text-green-600">R{item.price}</span>
                      <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-3xl">🍔</span>
          </div>
          <p className="text-xl mb-8 opacity-90">© 2026 Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
