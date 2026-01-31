import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu.jsx';
import Cart from './pages/Cart.jsx';

// API URL configuration
const API_URL = import.meta.env.VITE_API_URL || 'https://restaurant-api-nssp.onrender.com';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu apiUrl={API_URL} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;