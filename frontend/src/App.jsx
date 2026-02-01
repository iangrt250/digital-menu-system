import { useState, useEffect } from 'react';

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/menu`)
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500">
      {/* Burger King Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">🍔</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">RESTAURANT</h1>
                <p className="text-sm text-orange-600 font-medium">Have it your way</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#menu" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Menu</a>
              <a href="#deals" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Deals</a>
              <a href="#locations" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Locations</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Welcome to<br/>
            <span className="text-yellow-300">Flavor Town</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Fresh, fast, and delicious. Order now and taste the difference!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-12 py-4 rounded-full text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-200">
              Order Now
            </button>
            <button className="border-2 border-white/80 hover:border-white text-white px-12 py-4 rounded-full text-xl font-bold hover:bg-white/20 transition-all duration-200">
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Our Menu</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fresh ingredients. Bold flavors. Made just for you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menu.map((item) => (
              <div key={item.id} className="group bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-100">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🍔</span>
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-4 text-center group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h4>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">
                  {item.description || 'Freshly prepared with premium ingredients'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    R{item.price}
                  </span>
                  <span className="px-6 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-bold">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-4">
              <span className="text-2xl">🍔</span>
            </div>
          </div>
          <p className="text-xl mb-6 opacity-90">© 2026 Restaurant. Have it your way.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-75">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
