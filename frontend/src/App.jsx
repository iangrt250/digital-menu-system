import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500">
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🍔</span>
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">RESTAURANT</h1>
            </div>
            <Link 
              to="/admin/login" 
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-2xl font-bold transition-all"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-24 text-white text-center">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            Welcome to<br/>
            <span className="text-yellow-300">Flavor Town</span>
          </h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-95">
            Fresh ingredients. Bold flavors. Your restaurant is live!
          </p>
          <Link 
            to="/admin/login"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-12 py-6 rounded-2xl text-2xl font-black shadow-2xl hover:shadow-3xl transition-all"
          >
            👨‍💼 Manage Restaurant
          </Link>
        </div>
      </section>
    </div>
  );
}

export default App;