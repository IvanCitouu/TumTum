import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar-grid">
      <nav className="menu">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>
      <div className="navbar__centro">
        <Link to="/" className="logo">
          <img src="/img/logo.png" alt="Logo TumTum" />
        </Link>
      </div>
      <div className="acciones">
        <Link to="/login"><img src="/img/Inicio.jpg" alt="Iniciar sesión" /></Link>
        <Link to="/carrito"><img src="/img/Carro.jpg" alt="Carrito" /></Link>
      </div>
    </header>
  );
}
