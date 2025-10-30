import './AdminPanel.css';
import { useState } from 'react';

export default function AdminPanel() {
  const [vista, setVista] = useState('home');

  const cambiarVista = (id) => setVista(id);

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="logo">TumTum</div>
        <nav>
          <ul>
            <li><button onClick={() => cambiarVista('home')}>Inicio</button></li>
            <li><button onClick={() => cambiarVista('usuarios')}>Usuarios</button></li>
            <li><button onClick={() => cambiarVista('productos')}>Productos</button></li>
            <li><button onClick={() => cambiarVista('ordenes')}>Órdenes</button></li>
            <li><button onClick={() => {
              localStorage.removeItem('usuarioActivo');
              window.location.href = '/login';
            }}>Cerrar sesión</button></li>
          </ul>
        </nav>
      </aside>

      <main className="contenido">
        {vista === 'home' && (
          <section className="vista active">
            <h1>¡Hola Administrador!</h1>
            <p>Bienvenido al panel de control de TumTum.</p>
          </section>
        )}

        {vista === 'usuarios' && (
          <section className="vista">
            <h2>Usuarios registrados</h2>
            {/* Aquí irá la tabla y formulario de usuarios */}
          </section>
        )}

        {vista === 'productos' && (
          <section className="vista">
            <h2>Productos disponibles</h2>
            {/* Aquí irá la tabla y formulario de productos */}
          </section>
        )}

        {vista === 'ordenes' && (
          <section className="vista">
            <h2>Órdenes registradas</h2>
            {/* Aquí irá la tabla de órdenes */}
          </section>
        )}
      </main>
    </div>
  );
}
