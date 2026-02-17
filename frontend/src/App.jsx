import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // SUPABASE STORAGE IMAGES - HERO
  const heroImages = [
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/pizza.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/fries.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/dessert.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/drink.jpg'
  ];

  // SUPABASE STORAGE IMAGES - APP BANNERS
  const appStoreBanner = 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/app-store-ios.jpg';
  const googlePlayBanner = 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/google-play-android.jpg';

  // SUPABASE STORAGE IMAGES - CATEGORIES WITH ROUTE PATHS
  const categories = [
    {id: 1, name: 'All', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burgers-cat.jpg', color: '#FF6B35', path: '/menu/all'},
    {id: 2, name: 'Burgers', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burgers-cat.jpg', color: '#FF6B35', path: '/menu/burgers'},
    {id: 3, name: 'Pizza', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/pizza-cat.jpg', color: '#F7931E', path: '/menu/pizza'},
    {id: 4, name: 'Sides', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/sides-cat.jpg', color: '#FFD23F', path: '/menu/sides'},
    {id: 5, name: 'Desserts', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/desserts-cat.jpg', color: '#FF69B4', path: '/menu/desserts'},
    {id: 6, name: 'Drinks', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/drinks-cat.jpg', color: '#00CED1', path: '/menu/drinks'},
    {id: 7, name: 'Strips', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/strips-cat.jpg', color: '#659191', path: '/menu/strips'},
    {id: 8, name: 'Wings', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/wings-cat.jpg', color: '#300c7d', path: '/menu/wings'},
    {id: 9, name: 'Hot Drinks', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/hot-cat.jpg', color: '#194e4f', path: '/menu/hot-drinks'}
  ];

  // Slideshow auto-rotate - 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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

      {/* CATEGORIES - KFC STYLE LAYOUT */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-black text-center text-gray-900 mb-12">🍽️ Explore Categories</h3>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Click any category to browse our delicious menu items
          </p>
          
          <div className="flex flex-col space-y-8">
            {/* Top Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.slice(0, 4).map(cat => (
                <Link
                  key={cat.id}
                  to={cat.path}
                  className="
                    relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl
                    transition-all duration-300 cursor-pointer border-2 group h-48
                    border-gray-100 hover:border-orange-300 hover:-translate-y-2
                  "
                >
                  <div className="w-full h-3/4 overflow-hidden">
                    <img 
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burger.jpg';
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <h4 className="text-xl font-bold text-white text-center drop-shadow-lg">
                      {cat.name}
                    </h4>
                    <p className="text-white/90 text-sm text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Menu
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-orange-500/90 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    →
                  </div>
                </Link>
              ))}
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-3 gap-4">
              {categories.slice(4, 7).map(cat => (
                <Link
                  key={cat.id}
                  to={cat.path}
                  className="
                    relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl
                    transition-all duration-300 cursor-pointer border-2 group h-40
                    border-gray-100 hover:border-orange-300 hover:-translate-y-1
                  "
                >
                  <div className="w-full h-2/3 overflow-hidden">
                    <img 
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                  </div>
                  <div className="p-4 bg-white/90 backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-gray-900 text-center group-hover:text-orange-600 transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-gray-500 text-center mt-1">Tap to explore</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.slice(7).map(cat => (
                <Link
                  key={cat.id}
                  to={cat.path}
                  className="
                    relative bg-gradient-to-br from-white to-orange-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl
                    transition-all duration-300 cursor-pointer border-2 group h-40 flex items-center p-4
                    border-gray-100 hover:border-orange-400 hover:-translate-y-2 hover:scale-[1.02]
                  "
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden mr-4 flex-shrink-0 shadow-lg">
                    <img 
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      Discover our finest {cat.name.toLowerCase()}
                    </p>
                  </div>
                  <div className="ml-4 text-2xl text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD APP SECTION - IMAGES AS BANNERS */}
      <section className="py-24 bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">📱 Download The App</h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">Order your favorite meals on the go!</p>
          </div>

          {/* MAIN APP STORE BUTTONS WITH IMAGES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            {/* iOS App Store - IMAGE SHOWS HERE */}
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 hover:-translate-y-2 overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity z-10 group-hover:scale-110">
                <img 
                  src={appStoreBanner}
                  alt="Download on App Store"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burger.jpg';
                  }}
                />
              </div>
              <div className="relative z-20 pl-20">
                <p className="text-sm font-semibold opacity-90 mb-1">Download on the</p>
                <p className="text-2xl font-black">App Store</p>
              </div>
            </a>

            {/* Android Google Play - IMAGE SHOWS HERE */}
            <a 
              href="https://play.google.com/store/apps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-700 hover:to-green-700 text-gray-900 p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 hover:-translate-y-2 overflow-hidden border-4 border-white/20"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity z-10 group-hover:scale-110 border-2 border-white/30">
                <img 
                  src={googlePlayBanner}
                  alt="Get it on Google Play"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burger.jpg';
                  }}
                />
              </div>
              <div className="relative z-20 pl-20">
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
                <li><Link to="/menu/all" className="hover:text-white transition-colors">Full Menu</Link></li>
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
        to="/menu/all" 
        className="fixed bottom-8 right-8 z-[100] bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-6 rounded-full shadow-2xl hover:shadow-3xl text-xl font-black w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse"
      >
        🛒
      </Link>
    </>
  );
}

export default App;
