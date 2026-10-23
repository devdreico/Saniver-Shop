import { Link } from "react-router-dom";
import Brand from "./Brand.jsx";

export default function SiteFooter() {
  return (
    <>
      <section className="contact-band">
        <span className="contact-plus" aria-hidden="true">+</span>
        <div><p className="eyebrow">ESTAMOS A UN MENSAJE</p><h2>¿En qué te podemos ayudar?</h2></div>
        <a href="https://wa.me/573144572008" target="_blank" rel="noreferrer">Escríbenos al <strong>314 457 2008</strong><span aria-hidden="true">↗</span></a>
      </section>
      <footer className="site-footer">
        <Brand footer />
        <p>Salud con criterio. Bienestar en comunidad.</p>
        <nav className="footer-links" aria-label="Navegación del pie de página">
          <Link to="/tienda">Tienda</Link><Link to="/wiki">Wiki</Link><Link to="/actualidad">Actualidad</Link><Link to="/comunidad">Comunidad</Link>
          <a href="https://www.instagram.com/saniverco/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="https://vialts.presentto.online" target="_blank" rel="noreferrer">VIALTS AI ↗</a>
        </nav>
        <small>© 2026 Saniver. Contenido informativo, no sustituye la consulta profesional.</small>
      </footer>
    </>
  );
}