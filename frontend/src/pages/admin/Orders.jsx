// frontend/src/pages/admin/Orders.jsx
import { useState } from 'react';

const initialOrders = [
  {
    id: 'ORD-12345',
    customer: 'John Doe',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 129.99 },
      { name: 'Coca-Cola', quantity: 2, price: 19.99 }
    ],
    total: 169.97,
    status: 'pending',
    date: '2024-01-20 14:30',
    address: '123 Main St, Cape Town'
  },
  {
    id: 'ORD-12344',
    customer: 'Jane Smith',
    items: [
      { name: 'Cheeseburger', quantity: 1, price: 89.99 }
    ],
    total: 89.99,
    status: 'delivered',
    date: '2024-01-20 12:15',
    address: '456 Oak Ave, Johannesburg'
  },
  {
    id: 'ORD-12343',
    customer: 'Bob Johnson',
    items: [
      { name: 'Chicken Wings', quantity: 2, price: 149.99 },
      { name: 'Coca-Cola', quantity: 1, price: 19.99 }
    ],
    total: 319.97,
    status: 'preparing',
    date: '2024-01-20 11:45',
    address: '789 Pine Rd, Durban'
  }
];

export default function OrderManagement() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('all');

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Order Management</h1>
        <p className="text-black">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          All Orders
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('preparing')}
          className={`px-4 py-2 rounded-lg ${filter === 'preparing' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          Preparing
        </button>
        <button
          onClick={() => setFilter('delivered')}
          className={`px-4 py-2 rounded-lg ${filter === 'delivered' ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          Delivered
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-black">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-black">{order.customer}</div>
                    <div className="text-xs text-black">{order.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-black">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-black">R {order.total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-black bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => {/* View details */}}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold mb-2 text-black">Today's Orders</h3>
          <p className="text-3xl font-bold text-black">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold mb-2 text-black">Revenue Today</h3>
          <p className="text-3xl font-bold text-black">
            R {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold mb-2 text-black">Average Order Value</h3>
          <p className="text-3xl font-bold text-black">
            R {(orders.reduce((sum, order) => sum + order.total, 0) / orders.length || 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}