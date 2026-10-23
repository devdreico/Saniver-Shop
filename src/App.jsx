import { useEffect, useRef, useState } from "react";
import ProductCatalog from "./components/ProductCatalog.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import { products } from "./data/products.js";
import { CART_STORAGE_KEY, readCart, updateQuantity } from "./lib/cart.js";

const navigation = [
  ["Tienda", "#tienda"],
  ["Wiki de salud", "#wiki"],
  ["Actualidad", "#actualidad"],
  ["Comunidad", "#comunidad"],
];

function Brand({ footer = false }) {
  return <a className={`brand${footer ? " footer-brand" : ""}`} href="#inicio" aria-label="Saniver, inicio"><img src="/saniver-logo.png" alt="" /><span>saniver<span className="brand-dot">.</span></span></a>;
}

function SiteHeader({ itemCount, onOpenCart, cartButtonRef }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement">
        <span>Tu salud, con información y acompañamiento</span>
        <a href="https://wa.me/573144572008" target="_blank" rel="noreferrer">¿Tienes dudas? Escríbenos <span aria-hidden="true">↗</span></a>
      </div>
      <header className="site-header">
        <Brand />
        <nav className={`main-nav${menuOpen ? " open" : ""}`} aria-label="Navegación principal">
          {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="ai-link" href="https://vialts.presentto.online" target="_blank" rel="noreferrer"><span className="ai-spark" aria-hidden="true">✳</span> VIALTS AI <span aria-hidden="true">↗</span></a>
          <button ref={cartButtonRef} className="cart-trigger" type="button" onClick={onOpenCart} aria-label={`Abrir bolsa, ${itemCount} productos`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.4L22 9H6M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" /></svg>
            <span>Bolsa</span><span className="cart-count" aria-live="polite">{itemCount}</span>
          </button>
        </div>
        <button className="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span></span><span></span></button>
      </header>
    </>
  );
}

function Hero() {
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span></span> UN ESPACIO PARA SENTIRTE MEJOR</p>
          <h1>La salud se vive.<br /><span>La cuidamos juntos.</span></h1>
          <p className="hero-description">Productos que eliges con confianza, información que sí se entiende y una comunidad que está contigo.</p>
          <div className="hero-actions"><a className="button button-red" href="#tienda">Explorar la tienda <span aria-hidden="true">↗</span></a><a className="text-link" href="#wiki">Aprender algo nuevo <span aria-hidden="true">↓</span></a></div>
          <div className="hero-proof"><span className="proof-mark">+</span><span>Bienestar informado, todos los días.</span></div>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85" alt="Profesional de salud conversando con una paciente" />
          <div className="visual-note"><span className="note-icon">+</span><span><strong>Tu bienestar,</strong><br />sin complicaciones.</span></div>
          <span className="visual-index">SANIVER / 01</span>
        </div>
        <div className="hero-side-label">SALUD · COMUNIDAD · CONFIANZA</div>
      </section>
      <div className="trust-strip" aria-label="Lo que encuentras en Saniver"><span>01 <b>Compra con criterio</b></span><i></i><span>02 <b>Aprende a tu ritmo</b></span><i></i><span>03 <b>Conecta con tu comunidad</b></span><i></i><span>04 <b>Pregunta sin pena</b></span></div>
    </>
  );
}

function AiBand() {
  return <section className="ai-band"><div className="ai-band-mark" aria-hidden="true">✳</div><div className="ai-band-copy"><p className="eyebrow">UNA NUEVA FORMA DE PREGUNTAR</p><h2>Tu curiosidad también<br />merece una respuesta.</h2></div><p>Explora VIALTS AI, una experiencia conversacional independiente para acompañar tus preguntas de bienestar.</p><a href="https://vialts.presentto.online" target="_blank" rel="noreferrer" className="button button-white">Conocer VIALTS AI <span aria-hidden="true">↗</span></a></section>;
}

function KnowledgeSection() {
  const guides = [
    { tag: "BOTIQUÍN EN CASA · 5 MIN", title: "Un botiquín útil, sin acumular de más", art: "art-red", symbol: "+", caption: <>Lo básico<br />también cuenta.</>, text: "Revisa fechas de vencimiento, conserva los productos en su empaque original y guárdalos en un lugar fresco, seco y fuera del alcance de niños. Incluye solo artículos adecuados para tu hogar; consulta a un profesional sobre medicamentos y dosis. Si hay una emergencia, contacta los servicios de urgencias." },
    { tag: "CUIDADO PERSONAL · 4 MIN", title: "Protección solar en tu rutina diaria", art: "art-pink", symbol: "☼", caption: <>Todos los días,<br />a tu manera.</>, text: "Elige un protector solar de amplio espectro adecuado para tu piel y sigue las indicaciones de su etiqueta. Aplícalo según las instrucciones y reaplícalo cuando corresponda, especialmente después de nadar o sudar. La sombra, la ropa y los sombreros también ayudan a protegerte." },
    { tag: "BIENESTAR · 3 MIN", title: "Suplementos: preguntas antes de elegir", art: "art-lime", symbol: "◉", caption: <>Pequeños hábitos,<br />gran constancia.</>, text: "Antes de empezar un suplemento, revisa el listado de ingredientes y consulta a un profesional si tomas medicamentos, tienes una condición de salud o estás en embarazo o lactancia. Más no siempre es mejor: respeta las indicaciones del empaque y evita combinar productos sin orientación." },
  ];

  return (
    <section className="knowledge-section section-wrap" id="wiki">
      <div className="section-heading"><div><p className="eyebrow">WIKI SANIVER / PARA LEER SIN AFÁN</p><h2>Entender también <span>es cuidarte.</span></h2></div><a className="text-link" href="#guias">Ver todas las guías <span aria-hidden="true">↘</span></a></div>
      <div className="guide-grid" id="guias">
        {guides.map((guide, index) => <article className="guide-card" key={guide.title}><div className={`guide-art ${guide.art}`}><span className="art-tag">GUÍA 0{index + 1}</span><span className="art-symbol">{guide.symbol}</span><span className="art-caption">{guide.caption}</span></div><div className="guide-info"><p className="eyebrow">{guide.tag}</p><h3>{guide.title}</h3><details><summary>Leer guía</summary><p>{guide.text}</p></details></div></article>)}
      </div>
      <p className="medical-note"><span>i</span> El contenido de esta biblioteca es informativo. No reemplaza el diagnóstico, tratamiento ni la consulta con un profesional de salud.</p>
    </section>
  );
}

function NewsSection() {
  const articles = [
    { category: "HÁBITOS · 4 MIN", title: "Una rutina de bienestar no necesita ser perfecta para ser tuya.", description: "La constancia puede comenzar con cambios sencillos, realistas y adaptados a tu vida.", href: "#comunidad" },
    { category: "CONSUMO INFORMADO · 3 MIN", title: "Aprende a leer la etiqueta antes de llevar un suplemento.", description: "Ingredientes, porción sugerida y advertencias: lo que conviene revisar primero.", href: "#guias" },
    { category: "COMUNIDAD · 2 MIN", title: "Hacer preguntas también es parte de cuidarse.", description: "Una conversación abierta puede ayudarte a encontrar orientación confiable.", href: "#comunidad" },
  ];

  return <section className="news-section" id="actualidad"><div className="section-wrap"><div className="section-heading"><div><p className="eyebrow">SANIVER / NOTAS PARA ESTAR AL DÍA</p><h2>La salud también <span>se conversa.</span></h2></div><span className="updated-label">EDICIÓN 01 · OCTUBRE 2026</span></div><div className="news-grid">{articles.map((article, index) => <article className="news-item" key={article.title}><span className="news-number">0{index + 1}</span><div><p className="eyebrow">{article.category}</p><h3>{article.title}</h3><p>{article.description}</p><a href={article.href}>Leer la nota <span aria-hidden="true">↗</span></a></div></article>)}</div></div></section>;
}

function CommunitySection() {
  return <section className="community-section section-wrap" id="comunidad"><div className="community-image"><img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85" alt="Personas reunidas en una conversación comunitaria" /><span className="community-image-label">HAY ESPACIO PARA TI.</span></div><div className="community-copy"><p className="eyebrow">NO TIENES QUE HACERLO EN SOLITARIO</p><h2>Un lugar donde<br />tu voz <span>también cuenta.</span></h2><p>Saniver es para compartir preguntas, intercambiar experiencias y acercarnos a información de salud con respeto. Sin juicios, a tu ritmo.</p><a className="button button-red" href="https://www.instagram.com/saniverco/" target="_blank" rel="noreferrer">Encuéntranos en Instagram <span aria-hidden="true">↗</span></a><p className="social-handle">@saniverco</p></div></section>;
}

function SiteFooter() {
  return <><section className="contact-band"><span className="contact-plus" aria-hidden="true">+</span><div><p className="eyebrow">ESTAMOS A UN MENSAJE</p><h2>¿En qué te podemos ayudar?</h2></div><a href="https://wa.me/573144572008" target="_blank" rel="noreferrer">Escríbenos al <strong>314 457 2008</strong><span aria-hidden="true">↗</span></a></section><footer className="site-footer"><Brand footer /><p>Salud con criterio. Bienestar en comunidad.</p><div className="footer-links"><a href="#tienda">Tienda</a><a href="#wiki">Wiki</a><a href="https://www.instagram.com/saniverco/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://vialts.presentto.online" target="_blank" rel="noreferrer">VIALTS AI ↗</a></div><small>© 2026 Saniver. Contenido informativo, no sustituye la consulta profesional.</small></footer></>;
}

export default function App() {
  const [cart, setCart] = useState(() => readCart(window.localStorage, products));
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef(null);
  const triggerRef = useRef(null);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      setToastMessage("No se pudo guardar la bolsa en este dispositivo.");
    }
  }, [cart]);

  useEffect(() => {
    document.body.classList.toggle("cart-open", cartOpen);
    return () => document.body.classList.remove("cart-open");
  }, [cartOpen]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  function addProduct(productId) {
    setCart((currentCart) => updateQuantity(currentCart, productId, 1));
    setToastMessage("Añadido a tu bolsa.");
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMessage(""), 2200);
  }

  function closeCart() {
    setCartOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && cartOpen) closeCart();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cartOpen]);

  return (
    <>
      <SiteHeader itemCount={itemCount} cartButtonRef={triggerRef} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <ProductCatalog onAdd={addProduct} />
        <AiBand />
        <KnowledgeSection />
        <NewsSection />
        <CommunitySection />
      </main>
      <SiteFooter />
      <CartDrawer cart={cart} isOpen={cartOpen} onClose={closeCart} onChangeQuantity={(productId, change) => setCart((current) => updateQuantity(current, productId, change))} />
      <div className={`toast${toastMessage ? " visible" : ""}`} role="status" aria-live="polite">{toastMessage}</div>
    </>
  );
}