import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');

  const iniciarSesion = async () => {
    if (!email || !clave) return alert("Completa los campos");

    const dominioValido = /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/;
    if (!dominioValido.test(email)) return alert("Correo no permitido");

    try {
      const res = await fetch("http://localhost:8080/tumtum/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correoUsuario: email,
          contraseniaUsuario: clave
        })
      });

      if (res.status === 404) {
        setMensaje("Usuario no encontrado");
      } else if (res.status === 401) {
        setMensaje("Contraseña incorrecta");
      } else if (!res.ok) {
        setMensaje("Error al iniciar sesión");
      } else {
        const usuario = await res.json();
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        alert(`Bienvenido ${usuario.nombreUsuario || usuario.correoUsuario}`);

        if (usuario.rolUsuario === "ADMIN" || usuario.rolUsuario === "VENDEDOR") {
          navigate("/admin");
        } else {
          navigate("/productos");
        }
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setMensaje("Error de conexión con el servidor");
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
          {mensaje && <p className="mensaje">{mensaje}</p>}
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
