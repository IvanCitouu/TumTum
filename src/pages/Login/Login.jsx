import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');

  const iniciarSesion = () => {
    if (!email || !clave) return alert("Completa los campos");

    const dominioValido = /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/;
    if (!dominioValido.test(email)) return alert("Correo no permitido");

    if (email === "admin@duoc.cl" && clave === "admin123") {
      localStorage.setItem("usuarioActivo", JSON.stringify({
        email,
        nombre: "Admin",
        rol: "administrador"
      }));
      alert("Bienvenido Administrador");
      return navigate("/admin");
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email === email && u.password === clave);

    if (!usuario) return alert("Credenciales incorrectas");

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    alert(`Bienvenido ${usuario.nombre || usuario.email}`);

    if (usuario.rol === "administrador" || usuario.rol === "vendedor") {
      navigate("/admin");
    } else {
      navigate("/productos");
    }
  };

  return (
    <>
  <Navbar />
    <main className="login-page">
      <div className="login-container">
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <button onClick={iniciarSesion}>Ingresar</button>
        <p className="registro-link">
          ¿No tienes una cuenta? <a href="/registro">Registro</a>
        </p>
      </div>
    </main>

    <footer>
      <p>&copy; 2025 TumTum Ropa. Todos los derechos reservados.</p>
    </footer>
  </>
  );
}