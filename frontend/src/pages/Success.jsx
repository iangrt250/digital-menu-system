import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12">
      <div className="text-center max-w-md mx-auto bg-white rounded-2xl shadow-xl p-12">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8">Thank you for your order. We'll prepare it shortly.</p>
        <Link 
          to="/"
          className="inline-flex items-center bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all"
        >
          <ArrowLeft className="mr-2" size={20} />
          Order More
        </Link>
      </div>
    </div>
  );
}
