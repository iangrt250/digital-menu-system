const AdminDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">‚öôÔ∏è</span>
            </div>
            <div>
              <h1 className="text-2xl font-black">Admin Dashboard</h1>
              <p>Welcome back, {user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-xl font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700">
          <h2 className="text-2xl font-black mb-6">ÌΩî Menu Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Classic Burger', 'Margherita Pizza', 'French Fries'].map((item, i) => (
              <div key={i} className="bg-gray-700 p-6 rounded-xl hover:bg-gray-600 transition-all">
                <h3 className="font-bold text-xl mb-2">{item}</h3>
                <div className="flex justify-between">
                  <span className="text-green-400 font-bold">R89.99</span>
                  <button className="text-orange-400 hover:text-orange-300">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-3xl text-white">
            <div className="text-4xl mb-4">Ì≥ä</div>
            <h3 className="font-black text-xl mb-2">Stats</h3>
            <p className="text-blue-100">12 orders today</p>
          </div>
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl font-bold text-white hover:shadow-2xl transition-all">
            + Add New Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
