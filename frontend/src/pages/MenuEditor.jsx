import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

export default function MenuEditor() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', category: 'Main' });
  const [editingId, setEditingId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('restaurantMenu');
    if (saved) {
      setMenuItems(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever menu changes
  useEffect(() => {
    localStorage.setItem('restaurantMenu', JSON.stringify(menuItems));
  }, [menuItems]);

  const addItem = () => {
    if (!newItem.name || !newItem.price) return;
    
    setMenuItems(prev => [...prev, {
      _id: 'item_' + Date.now(),
      ...newItem,
      price: parseFloat(newItem.price),
      image: 'https://via.placeholder.com/300x200?text=' + newItem.name
    }]);
    setNewItem({ name: '', price: '', category: 'Main' });
  };

  const updateItem = (id) => {
    setMenuItems(prev => prev.map(item => 
      item._id === id ? { ...item, ...newItem } : item
    ));
    setEditingId(null);
    setNewItem({ name: '', price: '', category: 'Main' });
  };

  const deleteItem = (id) => {
    setMenuItems(prev => prev.filter(item => item._id !== id));
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setNewItem({ name: item.name, price: item.price, category: item.category });
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-12 text-gray-800 flex items-center">
        <Save className="mr-4" size={48} />
        Menu Editor (Admin)
      </h1>

      {/* Add New Item */}
      <div className="bg-blue-50 p-8 rounded-2xl mb-12">
        <h2 className="text-2xl font-bold mb-6">Add New Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            placeholder="Item Name"
            className="p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
            placeholder="Price"
            className="p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            className="p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option>Main</option>
            <option>Appetizer</option>
            <option>Dessert</option>
            <option>Drink</option>
          </select>
        </div>
        <button
          onClick={addItem}
          className="mt-6 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 flex items-center"
        >
          <Plus className="mr-2" size={20} /> Add Item
        </button>
      </div>

      {/* Menu Items List */}
      <div className="space-y-4">
        {menuItems.map(item => (
          <div key={item._id} className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg">
            {editingId === item._id ? (
              // Edit Mode
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="p-3 border rounded-lg"
                />
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  className="p-3 border rounded-lg"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateItem(item._id)}
                    className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <h3 className="font-bold text-xl">{item.name}</h3>
                  <p className="text-green-600 text-lg">${item.price}</p>
                </div>
                <span className="text-gray-700">{item.category}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-green-50 rounded-xl text-center">
        <p className="text-lg font-semibold text-green-800">
          💡 Changes save instantly to localStorage. Refresh customer Menu page to see updates!
        </p>
      </div>
    </div>
  );
}
