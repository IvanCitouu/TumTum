import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Producto.css';
import Navbar from '../../components/Navbar/Navbar';

export default function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/tumtum/productos/${id}`)
      .then(res => res.json())
      .then(p => {
        const adaptado = {
          id: p.idProducto.toString(),
          nombre: p.nombreProducto,
          categoria: p.categoriaProducto,
          precio: p.precioProducto,
          imagen: p.imgUrlProducto,
          stock: p.stockProducto,
          descripcion: p.descripcionProducto
        };
        setProducto(adaptado);
      })
      .catch(err => console.error('Error al cargar producto:', err));
  }, [id]);

  if (!producto) return <p>Producto no encontrado</p>;

  const agregarAlCarrito = () => {
    const talla = document.getElementById("talla").value;
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex(item => item.nombre === producto.nombre && item.talla === talla);

    if (index >= 0) {
      carrito[index].cantidad++;
    } else {
      carrito.push({
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        talla,
        cantidad: 1
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} (talla ${talla}) agregado al carrito`);
  };

  return (
    <>
      <Navbar />
      <main className="detalle-producto">
        <img src={producto.imagen} alt={producto.nombre} />
        <div className="info">
          <h1>{producto.nombre}</h1>
          <p className="precio">${producto.precio.toLocaleString("es-CL")}</p>
          <p>{producto.descripcion}</p>

          <div className="opciones">
            <label htmlFor="talla">Talla:</label>
            <select id="talla">
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>

            <div className="tabla-talles">
              <h3>Guía de talles</h3>
              <table>
                <thead>
                  <tr><th>Talle</th><th>Ancho</th><th>Largo</th></tr>
                </thead>
                <tbody>
                  <tr><td>S</td><td>57 cm</td><td>78 cm</td></tr>
                  <tr><td>M</td><td>60 cm</td><td>80 cm</td></tr>
                  <tr><td>L</td><td>62 cm</td><td>82 cm</td></tr>
                  <tr><td>XL</td><td>65 cm</td><td>84 cm</td></tr>
                </tbody>
              </table>
            </div>

            <button className="agregar-carrito" onClick={agregarAlCarrito}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2025 TumTum Ropa. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
