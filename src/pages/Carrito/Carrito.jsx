import { useState, useEffect } from 'react';
import './Carrito.css';
import Navbar from '../../components/Navbar/Navbar';

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(datos);

    const user = JSON.parse(localStorage.getItem('usuarioActivo'));
    setUsuario(user);
  }, []);

  const actualizarCarrito = (nuevo) => {
    setCarrito(nuevo);
    localStorage.setItem('carrito', JSON.stringify(nuevo));
  };

  const sumar = (index) => {
    const nuevo = [...carrito];
    nuevo[index].cantidad++;
    actualizarCarrito(nuevo);
  };

  const restar = (index) => {
    const nuevo = [...carrito];
    if (nuevo[index].cantidad > 1) {
      nuevo[index].cantidad--;
    } else {
      nuevo.splice(index, 1);
    }
    actualizarCarrito(nuevo);
  };

  const eliminar = (index) => {
    if (confirm(`¿Eliminar "${carrito[index].nombre}" del carrito?`)) {
      const nuevo = [...carrito];
      nuevo.splice(index, 1);
      actualizarCarrito(nuevo);
    }
  };

  const vaciarCarrito = () => {
    actualizarCarrito([]);
  };

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    if (!usuario) {
      alert("Debes iniciar sesión para finalizar la compra");
      return;
    }

    setCargando(true);

    const pedido = {
      estadoPedido: "Pendiente",
      correoClientePedido: usuario.correoUsuario,
      nombreClientePedido: usuario.nombreUsuario,
      totalPedido: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
      detalles: carrito.map(item => ({
        idProducto: item.id,
        cantidadDetalle: item.cantidad,
        precioUnitario: item.precio, // Agregado
        nombreProducto: item.nombre  // Agregado
      }))
    };

    console.log("Enviando pedido al backend:", pedido);

    try {
      const res = await fetch("http://localhost:8080/tumtum/pedidos", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(pedido)
      });

      // Obtener la respuesta completa del servidor
      const responseText = await res.text();
      console.log("Respuesta del servidor:", responseText);

      if (!res.ok) {
        // Si hay error, mostrar más detalles
        let mensajeError = `Error ${res.status}: `;
        try {
          const errorData = JSON.parse(responseText);
          mensajeError += errorData.message || errorData.error || responseText;
        } catch {
          mensajeError += responseText || "Error desconocido del servidor";
        }
        throw new Error(mensajeError);
      }

      // Procesar respuesta exitosa
      const respuestaExito = JSON.parse(responseText);
      console.log("Pedido creado exitosamente:", respuestaExito);

      localStorage.removeItem("carrito");
      setCarrito([]);
      alert("¡Gracias por tu compra! Pedido registrado correctamente.");

    } catch (err) {
      console.error("Error completo al finalizar compra:", err);
      alert(`No se pudo registrar el pedido: ${err.message}`);
    } finally {
      setCargando(false);
    }
  };

  const totalGeneral = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <>
      <Navbar />
      <main className="carrito-page">
        <h1>Carrito de Compras</h1>
        
        {cargando && (
          <div className="cargando">
            <p>Procesando pedido...</p>
          </div>
        )}
        
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <table className="tabla-carrito">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={item.imagen} alt={item.nombre} width="50" />
                      <p>{item.nombre}</p>
                      <small>Talla: {item.talla}</small>
                    </td>
                    <td>${item.precio.toLocaleString("es-CL")}</td>
                    <td>
                      <button onClick={() => restar(index)} disabled={cargando}>-</button>
                      {item.cantidad}
                      <button onClick={() => sumar(index)} disabled={cargando}>+</button>
                    </td>
                    <td>${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                    <td>
                      <button onClick={() => eliminar(index)} disabled={cargando}>X</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="resumen">
              <p><strong>Total general:</strong> ${totalGeneral.toLocaleString("es-CL")}</p>
              <button onClick={vaciarCarrito} disabled={cargando}>
                Vaciar carrito
              </button>
              <button onClick={finalizarCompra} disabled={cargando}>
                {cargando ? 'Procesando...' : 'Finalizar compra'}
              </button>
            </div>
          </>
        )}
      </main>
      <footer>
        <p>&copy; 2025 TumTum Ropa. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}