import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio';
import Productos from './pages/Productos/Productos';
import Producto from './pages/Producto/Producto';
import Contacto from './pages/Contacto/Contacto';
import Carrito from './pages/Carrito/Carrito';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import AdminPanel from './pages/AdminPanel/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
