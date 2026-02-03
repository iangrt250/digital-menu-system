import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://restaurant-api-nssp.onrender.com';
    
    // Load menu
    fetch(`${API_URL}/api/menu`)
      .then(res => res.json())
      .then(data => {
        setMenu(data);
        setLoading(false);
      })
      .catch(() => {
        setMenu([]); // Mock data if API fails
        setLoading(false);
      });

    // Mock categories (CORS safe)
    setCategories([
      {id: 1, name: 'Burgers', icon: '🍔', color: '#FF6B35'},
      {id: 2, name: 'Pizza', icon: '🍕', color: '#F7931E'},
      {id: 3, name: 'Sides', icon: '🍟', color: '#FFD23F'},
      {id: 4, name: 'Desserts', icon: '🍰', color: '#FF69B4'},
      {id: 5, name: 'Drinks', icon: '🥤', color: '#00CED1'}
    ]);
  }, []);

  // Hero slideshow
  const heroImages = [
    'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=1400&h=800&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&h=800&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1579586140626-3ff1e6639440?w=1400&h=800&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400&h=800&fit=crop&crop=center&auto=format&q=80',
    'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=1400&h=800&fit=crop&crop=center&auto=format&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl animate-bounce mb-8">🍔</div>
          <div className="text-2xl">Loading delicious menu...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header - Admin login removed */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xl border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl">🍔</span>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Flavor Town
                </h1>
                <p className="text-lg text-gray-600 font-semibold">Restaurant & Grill</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Slideshow */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-screen absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${heroImages[currentSlide]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-black/40 to-red-600/30" />
        </div>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto px-6 h-screen flex items-center justify-center text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight drop-shadow-2xl">
              Welcome to<br className="md:block" />
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                Flavor Town
              </span>
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Fresh ingredients, bold flavors, made with love. 
              <br className="md:hidden" /> Order now or visit us today!
            </p>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-black text-center text-gray-900 mb-16">🍽️ Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map(cat => (
              <div key={cat.id} className="group text-center p-8 rounded-3xl bg-gradient-to-b from-gray-50 to-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border hover:border-orange-200">
                <div className="text-5xl mb-4" style={{ color: cat.color }}>
                  {cat.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-24 bg-gradient-to-b from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">⭐ Featured Items</h3>
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
                  <span className="text-6xl drop-shadow-lg">🍔</span>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h4 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 mb-6 leading-relaxed min-h-[4rem]">
                    {item.description || 'Freshly prepared with premium ingredients'}
                  </p>
                  
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
              <div className="text-8xl mb-8 opacity-20">🍽️</div>
              <h3 className="text-4xl font-black text-gray-500 mb-4">Menu Coming Soon!</h3>
              <p className="text-xl text-gray-400 mb-8">Our menu will be available shortly</p>
            </div>
          )}
        </div>
      </section>

      {/* Rest of your sections (CTA, Footer) can go here */}
    </>
  );
}

export default App;
