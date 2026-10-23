import { useState } from "react";
import { NavLink } from "react-router-dom";
import Brand from "./Brand.jsx";

const navigation = [
  ["Tienda", "/tienda"],
  ["Guías", "/wiki"],
  ["Actualidad", "/actualidad"],
  ["Comunidad", "/comunidad"],
];

export default function SiteHeader({ itemCount, onOpenCart, cartButtonRef }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="announcement">
        <span>Tu salud, con información y acompañamiento</span>
        <a href="https://wa.me/573144572008" target="_blank" rel="noreferrer">¿Tienes dudas? Escríbenos <span aria-hidden="true">↗</span></a>
      </div>
      <header className="site-header">
        <Brand />
        <nav className={`main-nav${menuOpen ? " open" : ""}`} aria-label="Navegación principal">
          {navigation.map(([label, href]) => (
            <NavLink key={href} to={href} onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>{label}</NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <a className="ai-link" href="https://vialts.presentto.online" target="_blank" rel="noreferrer"><span className="ai-spark" aria-hidden="true">✳</span> VIALTS AI <span aria-hidden="true">↗</span></a>
          <button ref={cartButtonRef} className="cart-trigger" type="button" onClick={onOpenCart} aria-label={`Abrir bolsa, ${itemCount} productos`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.4L22 9H6M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" /></svg>
            <span>Bolsa</span><span className="cart-count" aria-live="polite">{itemCount}</span>
          </button>
        </div>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span></span><span></span></button>
      </header>
    </>
  );
}