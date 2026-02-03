import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setMenu([]); 
        setLoading(false);
      });
  }, []);

  // YOUR SUPABASE STORAGE IMAGES - HERO
  const heroImages = [
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burger.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/pizza.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/fries.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/dessert.jpg',
    'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/drink.jpg'
  ];

  // SUPABASE STORAGE IMAGES - CATEGORIES (Fixed IDs)
  const categories = [
    {id: 1, name: 'Burgers', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burgers-cat.jpg', color: '#FF6B35'},
    {id: 2, name: 'Pizza', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/pizza-cat.jpg', color: '#F7931E'},
    {id: 3, name: 'Sides', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/sides-cat.jpg', color: '#FFD23F'},
    {id: 4, name: 'Desserts', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/desserts-cat.jpg', color: '#FF69B4'},
    {id: 5, name: 'Drinks', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/drinks-cat.jpg', color: '#00CED1'},
    {id: 6, name: 'Strips', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/strips-cat.jpg', color: '#659191'},
    {id: 7, name: 'Wings', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/wings-cat.jpg', color: '#300c7d'},
    {id: 8, name: 'Hot Drinks', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/hot-cat.jpg', color: '#194e4f'}
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

      {/* Categories - REAL SUPABASE IMAGES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-black text-center text-gray-900 mb-16">🍽️ Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map(cat => (
              <div key={cat.id} className="group text-center p-8 rounded-3xl bg-gradient-to-b from-gray-50 to-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border hover:border-orange-200 overflow-hidden">
                {/* Category Image */}
                <div className="w-full h-32 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-300 relative">
                  <img 
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    🍽️
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD APP SECTION */}
      <section className="py-24 bg-gradient-to-b from-yellow-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">📱 Download The App</h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">Order your favorite meals on the go!</p>
          </div>

          {/* App Store Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Apple App Store */}
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-black hover:bg-gray-900 text-white p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 hover:-translate-y-1"
            >
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

            {/* Google Play Store */}
            <a 
              href="https://play.google.com/store/apps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white hover:bg-gray-50 border-4 border-gray-200 hover:border-gray-300 text-gray-900 p-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 hover:-translate-y-1"
            >
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

          {/* Phone mockup */}
          <div className="mt-20 opacity-20">
            <div className="w-64 h-128 bg-gray-300 rounded-3xl mx-auto relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl opacity-30 animate-pulse"></div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
