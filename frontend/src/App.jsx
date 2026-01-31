import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu.jsx';
import Cart from './pages/Cart.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
EOF