import './Inicio.css';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

export default function Inicio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: '/img/fondo1.jpg', title: 'NUEVO DROP' },
    { img: '/img/fondo2.jpg', title: 'REBAJAS' },
    { img: '/img/fondo3.jpg', title: 'NUEVO DROP' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const progress = document.getElementById('progress');
    if (progress) {
      progress.style.animation = 'none';
      void progress.offsetWidth;
      progress.style.animation = `progress 5000ms linear forwards`;
    }
  }, [currentSlide]);

  useEffect(() => {
    const scrollBtn = document.getElementById('scrollDown');
    const nextSection = document.getElementById('nextSection');
    const scrollToNext = () => nextSection?.scrollIntoView({ behavior: 'smooth' });

    scrollBtn?.addEventListener('click', scrollToNext);
    scrollBtn?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToNext();
      }
    });
  }, []);

  return (
    <>
      <Navbar />

      {/* Carrusel */}
      <div className="carousel" id="carousel">
        {slides.map((slide, i) => (
          <div key={i} className={`slide ${i === currentSlide ? 'active' : ''}`}>
            <img src={slide.img} alt={`Slide ${i + 1}`} />
            <div className="overlay">
              <h1>{slide.title}</h1>
              <Link to="/productos" className="cta-button">COMPRAR</Link>
            </div>
          </div>
        ))}
        <div className="progress-bar">
          <div className="progress-fill" id="progress" />
        </div>
        <div className="scroll-down" id="scrollDown" role="button" tabIndex={0}>
          &#x25BC;
        </div>
      </div>

      {/* Sección productos */}
      <div className="container">
        <h3>NUEVO DROP</h3>
        <section id="nextSection" className="productos">
          <div className="producto">
            <Link to="/producto/tank1">
              <img src="/img/7.png" alt="Tank1" />
              <h2>Elixir Gray Tank Top</h2>
              <p>$19.990</p>
            </Link>
          </div>
          <div className="producto">
            <Link to="/producto/beanie">
              <img src="/img/1.png" alt="Beanie" />
              <h2>Elixir Reversible Beanie</h2>
              <p>$9.990</p>
            </Link>
          </div>
          <div className="producto">
            <Link to="/producto/jorts">
              <img src="/img/3.png" alt="Jorts" />
              <h2>Elixir White Denim Set JORTS</h2>
              <p>$29.990</p>
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 TumTum Ropa. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
