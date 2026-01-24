export default function ItemCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
      <img 
        src={item.imageUrl || item.image} 
        alt={item.name} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
      <p className="text-gray-600 mb-2">{item.description}</p>
      <p className="text-green-600 font-bold mb-4">R {item.price.toFixed(2)}</p>
      
      <button 
        onClick={onAdd}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}