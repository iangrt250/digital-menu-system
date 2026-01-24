export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
        <p className="text-black">Welcome to the restaurant admin panel</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <a href="/admin/orders" className="block">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg cursor-pointer">
            <h3 className="text-xl font-bold text-black mb-2">Ì≥ã Order Management</h3>
            <p className="text-black">View and manage customer orders</p>
          </div>
        </a>
        
        <a href="/admin/menu" className="block">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg cursor-pointer">
            <h3 className="text-xl font-bold text-black mb-2">Ì≥ù Menu Editor</h3>
            <p className="text-black">Edit restaurant menu items</p>
          </div>
        </a>
        
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-black mb-2">Ì≥ä Analytics</h3>
          <p className="text-black">View restaurant statistics</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-black">Quick Actions</h2>
        <div className="space-y-4">
          <a href="/" className="block text-blue-600 hover:underline">‚Üê Back to Public Menu</a>
          <a href="/admin-login" className="block text-green-600 hover:underline">Admin Login Page</a>
        </div>
      </div>
    </div>
  );
}
