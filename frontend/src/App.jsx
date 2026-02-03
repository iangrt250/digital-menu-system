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

  // SUPABASE STORAGE IMAGES - CATEGORIES (Upload these to your bucket)
  const categories = [
    {id: 1, name: 'Burgers', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/burgers-cat.jpg', color: '#FF6B35'},
    {id: 2, name: 'Pizza', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/pizza-cat.jpg', color: '#F7931E'},
    {id: 3, name: 'Sides', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/sides-cat.jpg', color: '#FFD23F'},
    {id: 4, name: 'Desserts', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/desserts-cat.jpg', color: '#FF69B4'},
    {id: 5, name: 'Drinks', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/drinks-cat.jpg', color: '#00CED1'},
    {id: 5, name: 'Strips', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/strips-cat.jpg', color: '#659191'},
    {id: 5, name: 'Wings', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/wings-cat.jpg', color: '#300c7d'},
     {id: 5, name: 'Hot Drinks', image: 'https://vccnhuhodkdxvesrtlxc.supabase.co/storage/v1/object/public/menu-images/hot-cat.jpg', color: '#194e4f'}

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                    {cat.icon || '🍽️'}
                  </div>
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
    </>
  );
}

export default App;
