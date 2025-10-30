import './Productos.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function Productos() {
  const [vista, setVista] = useState('grande');
  const [orden, setOrden] = useState('nombre');
  const [busqueda, setBusqueda] = useState('');
  const [resaltado, setResaltado] = useState(null);
  const contenedorRef = useRef(null);

  const productos = [
    { id: 'camiseta', nombre: 'Camiseta de Fútbol Elixir 10 Navy Blue', precio: 35990, imagen: '/img/image.png' },
    { id: 'tank', nombre: 'Elixir Basket Tank Top', precio: 28000, imagen: '/img/2.png' },
    { id: 'beanie', nombre: 'Elixir Reversible Beanie', precio: 9990, imagen: '/img/1.png' },
    { id: 'jorts', nombre: 'Elixir White Denim Set JORTS', precio: 29990, imagen: '/img/3.png' },
    { id: 'jacket', nombre: 'Elixir Raw Denim Set JACKET', precio: 29990, imagen: '/img/4.png' },
    { id: 'pantalon', nombre: 'Elixir X Cozy DETACHABLE jeans', precio: 89990, imagen: '/img/5.png' },
    { id: 'pantalon1', nombre: 'Elixir White Leather Tribal Pants', precio: 59990, imagen: '/img/6.png' },
    { id: 'tank1', nombre: 'Elixir Gray Tank Top', precio: 19990, imagen: '/img/7.png' },
  ];

  const productosOrdenados = [...productos].sort((a, b) => {
    if (orden === 'asc') return a.precio - b.precio;
    if (orden === 'desc') return b.precio - a.precio;
    return a.nombre.localeCompare(b.nombre);
  });

  const resultados = productosOrdenados.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const cambiarVista = (tipo) => setVista(tipo);

  const resaltarProducto = (id) => {
    setResaltado(id);
    setTimeout(() => setResaltado(null), 1500);
  };

  useEffect(() => {
    if (resaltado) {
      const el = document.getElementById(resaltado);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('resaltado');
        const timeout = setTimeout(() => {
          el.classList.remove('resaltado');
        }, 1500);
        return () => clearTimeout(timeout);
      }
    }
  }, [resaltado]);

  return (
    <>
      <Navbar />

      <div className="buscador-contenedor">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        {busqueda && (
          <div id="resultados-busqueda">
            {resultados.map((p) => (
              <div
                key={p.id}
                className="resultado-item"
                onClick={() => {
                  resaltarProducto(p.id);
                  setBusqueda('');
                }}
              >
                <img src={p.imagen} alt={p.nombre} />
                <h3>{p.nombre}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="toolbar">
        <div className="view-buttons">
          <button onClick={() => cambiarVista('grande')}>
            <img src="/img/11.png" alt="Vista grande" />
          </button>
          <button onClick={() => cambiarVista('mediano')}>
            <img src="/img/22.png" alt="Vista mediana" />
          </button>
          <button onClick={() => cambiarVista('pequeño')}>
            <img src="/img/33.png" alt="Vista lista" />
          </button>
        </div>

        <div className="acciones">
          <label htmlFor="sort">ORDENAR POR</label>
          <select id="sort" value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="nombre">Nombre</option>
            <option value="asc">Precio: Menor a Mayor</option>
            <option value="desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      <section className={`productos vista-${vista}`} ref={contenedorRef}>
        {productosOrdenados.map((p) => (
          <div
            key={p.id}
            id={p.id}
            className={`producto ${resaltado === p.id ? 'resaltado' : ''}`}
          >
            <Link to={`/producto/${p.id}`}>
              <img src={p.imagen} alt={p.nombre} />
              <h2>{p.nombre}</h2>
              <p>${p.precio.toLocaleString()}</p>
            </Link>
          </div>
        ))}
      </section>

      <footer>
        <p>&copy; 2025 TumTum Ropa. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
