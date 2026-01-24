// frontend/src/pages/admin/MenuEditor.jsx
import { useState } from 'react';

const initialMenuItems = [
  {
    _id: '1',
    name: 'Margherita Pizza',
    description: 'Classic tomato and mozzarella cheese',
    price: 129.99,
    category: 'Pizza',
    imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
    available: true
  },
  {
    _id: '2',
    name: 'Cheeseburger',
    description: 'Beef patty with cheese, lettuce, tomato',
    price: 89.99,
    category: 'Burger',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    available: true
  },
  {
    _id: '3',
    name: 'Chicken Wings',
    description: 'Spicy buffalo wings with blue cheese dip',
    price: 149.99,
    category: 'Appetizer',
    imageUrl: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400',
    available: false
  }
];

const categories = ['Pizza', 'Burger', 'Drink', 'Appetizer', 'Dessert', 'Main Course'];

export default function MenuEditor() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Pizza',
    imageUrl: '',
    available: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      setMenuItems(menuItems.map(item => 
        item._id === editingItem._id 
          ? { ...formData, _id: editingItem._id, price: parseFloat(formData.price) }
          : item
      ));
    } else {
      // Add new item
      const newItem = {
        ...formData,
        _id: Date.now().toString(),
        price: parseFloat(formData.price)
      };
      setMenuItems([...menuItems, newItem]);
    }
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Pizza',
      imageUrl: '',
      available: true
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      imageUrl: item.imageUrl,
      available: item.available
    });
    setShowForm(true);
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(menuItems.filter(item => item._id !== itemId));
    }
  };

  const toggleAvailability = (itemId) => {
    setMenuItems(menuItems.map(item => 
      item._id === itemId ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black">Menu Editor</h1>
          <p className="text-black">Manage your restaurant menu items</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
        >
          + Add New Item
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-black">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Item Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="Margherita Pizza"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Price (R) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="129.99"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-black">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-black">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg text-black"
                  placeholder="Describe your menu item..."
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-black">Available for ordering</label>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
              >
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Pizza',
                    imageUrl: '',
                    available: true
                  });
                }}
                className="bg-gray-300 text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow overflow-hidden">
            {item.imageUrl && (
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-black">{item.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              
              <p className="text-black mb-2">{item.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-black">R {item.price.toFixed(2)}</span>
                <span className="text-sm bg-gray-100 text-black px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleAvailability(item._id)}
                  className={`flex-1 py-2 rounded ${item.available ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                >
                  {item.available ? 'Make Unavailable' : 'Make Available'}
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Statistics */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-black">Menu Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-black">Total Items</p>
            <p className="text-2xl font-bold text-black">{menuItems.length}</p>
          </div>
          <div>
            <p className="text-black">Available Items</p>
            <p className="text-2xl font-bold text-black">
              {menuItems.filter(item => item.available).length}
            </p>
          </div>
          <div>
            <p className="text-black">Categories</p>
            <p className="text-2xl font-bold text-black">
              {[...new Set(menuItems.map(item => item.category))].length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}