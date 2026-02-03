import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
        setMenu([]); 
        setLoading(false);
      });
  }, []);

  // Filter menu by selected category
  const filteredMenu = selectedCategory === 'all' 
    ? menu 
    : menu.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());

  // Category click handler
  const handleCategoryClick = (categoryName) => {
    const catValue = categoryName.toLowerCase();
    setSelectedCategory(catValue === selectedCategory ? 'all' : catValue);
    
    // Scroll to menu section smoothly
    setTimeout(() => {
      document.getElementById('menu-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  // YOUR SUPABASE STORAGE IMAGES - HERO
  const heroImages = [
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/pizza.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/fries.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/dessert.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/drink.jpg'
  ];

  // SUPABASE STORAGE IMAGES - CATEGORIES (FIXED: No whitespace, small gaps, no borders)
  const categories = [
    {id: 1, name: 'All', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burgers-cat.jpg', color: '#FF6B35'},
    {id: 2, name: 'Burgers', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burgers-cat.jpg', color: '#FF6B35'},
    {id: 3, name: 'Pizza', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/pizza-cat.jpg', color: '#F7931E'},
    {id: 4, name: 'Sides', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/sides-cat.jpg', color: '#FFD23F'},
    {id: 5, name: 'Desserts', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/desserts-cat.jpg', color: '#FF69B4'},
    {id: 6, name: 'Drinks', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/drinks-cat.jpg', color: '#00CED1'},
    {id: 7, name: 'Strips', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/strips-cat.jpg', color: '#659191'},
    {id: 8, name: 'Wings', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/wings-cat.jpg', color: '#300c7d'},
    {id: 9, name: 'Hot Drinks', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/hot-cat.jpg', color: '#194e4f'}
  ];

  // Slideshow auto-rotate - 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500">
        <div className="text-center text-white">
          <div className="text-6xl animate-bounce mb-8">🍔</div>
          <div className="text-2xl">Loading delicious menu...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xl border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl">🍔</span>
              </div>
              <div>
                <h1 className="text-2xl lg:text-2xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Tapiwa
                </h1>
                <p className="text-lg text-gray-600 font-semibold">Restaurant & Grill</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SLIDESHOW */}
      <section className="relative h-screen w-full overflow-hidden -mt-24 pt-28">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
            style={{ 
              backgroundImage: `url(${heroImages[currentSlide]})`,
            }}
          />
        </div>

        {/* Slide Dots */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? 'bg-white w-12 scale-125 shadow-lg' : 
                  'bg-white/60 hover:bg-white hover:scale-110 w-3'
              }`}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES WITH FIXED SPACING (Small gaps, no whitespace, no borders) */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-black text-center text-gray-900 mb-16">🍽️ Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
            {categories.map(cat => {
              const isActive = selectedCategory === 'all' 
                ? cat.name === 'All' 
                : selectedCategory.toLowerCase() === cat.name.toLowerCase();
              
              return (
                <div 
                  key={cat.id} 
                  className={`group text-center p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                    isActive
                      ? 'ring-4 ring-orange-400 bg-gradient-to-br from-orange-50 to-red-50 shadow-xl scale-105'
                      : 'bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl'
                  }`}
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  <div className="w-full h-32 mb-4 rounded-xl overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burger.jpg';
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h4>
                  {isActive && (
                    <div className="text-orange-500 text-sm font-bold">
                      {filteredMenu.length} items
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MENU ITEMS - FILTERED */}
      <section id="menu-section" className="py-24 bg-gradient-to-b from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              {selectedCategory === 'all' ? '🍔 Our Menu' : `🍔 ${selectedCategory.toUpperCase()}`}
            </h3>
            <p className="text-xl text-gray-700">
              {filteredMenu.length} delicious {selectedCategory === 'all' ? 'items' : selectedCategory.toLowerCase()} available
            </p>
          </div>

          {filteredMenu.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMenu.map((item) => (
                <article 
                  key={item.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 hover:border-orange-200 hover:-translate-y-3"
                >
                  <div className="h-56 bg-gradient-to-br from-orange-400 via-red-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                    {item.image_url ? (
                      <img 
                        src={`${item.image_url.startsWith('http') ? item.image_url : `https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/${item.image_url}`}`} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <span className="text-6xl drop-shadow-lg absolute inset-0 flex items-center justify-center z-10" style={{display: item.image_url ? 'none' : 'flex'}}>
                      🍔
                    </span>
                  </div>

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
          ) : (
            <div className="col-span-full text-center py-32">
              <div className="text-8xl mb-8 opacity-20">🍽️</div>
              <h3 className="text-4xl font-black text-gray-500 mb-4">
                No {selectedCategory} items yet
              </h3>
              <p className="text-xl text-gray-400 mb-8">
                Check back soon for delicious {selectedCategory} options!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* DOWNLOAD APP SECTION */}
      <section className="py-24 bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">📱 Download The App</h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">Order your favorite meals on the go!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="group bg-black hover:bg-gray-900 text-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 hover:-translate-y-1">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.06 2.47-1.3.03-1.64-.82-3.11-.83-1.45-.01-1.98.78-2.86.78-.91 0-2.02-.47-2.93-.91-.33-.16-.66-.58-.88-.94-.13-.2-.25-.53-.25-.82 0-.84.49-1.85 1.32-1.85.23 0 .46.06.66.26.63.59 1.43 1 2.23 1.23.3.08.71.04 1.02-.22.36-.31.55-.83.55-1.21 0-.39-.14-.9-.6-1.43-1.29-1.52-2.46-3.24-2.47-5.25.01-2.92 2.33-5.15 5.25-5.16 2.94.01 5.23 2.27 5.25 5.17 0 .96-.36 2.07-1.04 2.95-.29.77-.72 1.5-1.22 2.19-.09.12-.18.24-.26.36-.18.26-.42.6-.42.98 0 .66.47 1.38 1.24 1.38.47 0 .89-.27 1.14-.66.17-.27.29-.72.29-1.15 0-.29-.07-.57-.2-.82-.27-.52-.73-1-.73-1.6 0-1.79 1.44-3.19 3.23-3.19s3.23.62 3.23 3.2c0 1.77-1.14 3.18-2.7 3.62 1.12.17 2.05.73 2.66 1.54.66.88 1.02 2.02 1.02 3.25 0 2.74-2.2 5-5 5-.83 0-1.63-.23-2.37-.65-.26-.15-.5-.38-.71-.64-.21-.25-.39-.57-.39-.96 0-.46.31-.88.8-1.02z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold opacity-90 mb-1">Download on the</p>
                <p className="text-2xl font-black">App Store</p>
              </div>
            </a>

            <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer" className="group bg-white hover:bg-gray-50 border-4 border-gray-200 hover:border-gray-300 text-gray-900 p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 hover:-translate-y-1">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border-2 border-gray-200">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.12 3.45c-.78.78-.78 2.05 0 2.83L8.85 12l-4.73 5.72c-.78.78-.78 2.05 0 2.83.39.39.9.59 1.41.59.52 0 1.03-.2 1.42-.59l7.13-7.12c.39-.39.59-.9.59-1.42 0-.52-.2-1.03-.59-1.42L7.95 3.86a2.07 2.07 0 0 0-1.83-.59c-.51 0-1.03.2-1.42.59zM21 6.5l-3.5 3.5V19h-2v-8.5L13 6.5H9L12.5 10 16 6.5h2z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold opacity-90 mb-1">GET IT ON</p>
                <p className="text-2xl font-black">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* SIGN IN SECTION */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ 
            backgroundImage: `url(${heroImages[0]})`,
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-black text-gray-900 mb-4">👋 Sign In</h3>
              <p className="text-xl text-gray-600">Welcome back! Please sign in to your account</p>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 text-lg"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-8 rounded-2xl font-black text-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                Sign In
              </button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-orange-500 font-semibold hover:text-orange-600">Sign up here</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 border-t border-orange-500/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h4 className="text-2xl font-black mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Tapiwa
              </h4>
              <p className="text-gray-400 mb-6">Restaurant & Grill - Taste the difference</p>
              <div className="flex justify-center md:justify-start space-x-6">
                <a href="#" className="text-xl hover:text-orange-400 transition-colors">📘</a>
                <a href="#" className="text-xl hover:text-orange-400 transition-colors">📷</a>
                <a href="#" className="text-xl hover:text-orange-400 transition-colors">🐦</a>
              </div>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-6">Quick Links</h5>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Menu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Locations</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-6">Contact Info</h5>
              <div className="space-y-3 text-gray-400">
                <p>📍 Cape Town, Western Cape</p>
                <p>📞 +27 123 456 789</p>
                <p>✉️ info@tapiwa.co.za</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2026 Tapiwa Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* FIXED START ORDER BUTTON */}
      <Link 
        to="/menu" 
        className="fixed bottom-8 right-8 z-[100] bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-6 rounded-full shadow-2xl hover:shadow-3xl text-xl font-black w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse"
      >
        🛒
      </Link>
    </>
  );
}

export default App;
