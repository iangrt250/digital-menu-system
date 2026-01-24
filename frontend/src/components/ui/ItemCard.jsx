export default function ItemCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
      <img 
        src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
        alt={item.name} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
      <p className="text-2xl font-bold text-green-600 mb-4">
        ${item.price.toFixed(2)}
      </p>
      <button 
        onClick={() => onAdd(item)}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}
