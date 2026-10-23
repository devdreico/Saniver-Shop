import { Link } from "react-router-dom";
import { products } from "../data/products.js";
import { articles } from "../data/articles.js";
import { guides } from "../data/guides.js";
import { currency } from "../lib/cart.js";

function AiBand() {
  return <section className="ai-band"><div className="ai-band-mark" aria-hidden="true">✳</div><div className="ai-band-copy"><p className="eyebrow">UNA NUEVA FORMA DE PREGUNTAR</p><h2>Tu curiosidad también<br />merece una respuesta.</h2></div><p>Explora VIALTS AI, una experiencia conversacional independiente para acompañar tus preguntas de bienestar.</p><a href="https://vialts.presentto.online" target="_blank" rel="noreferrer" className="button button-white">Conocer VIALTS AI <span aria-hidden="true">↗</span></a></section>;
}

function HomeHighlights({ onAdd }) {
  return (
    <>
      <section className="home-picks section-wrap">
        <div className="section-heading"><div><p className="eyebrow">UNA SELECCIÓN PARA EMPEZAR</p><h2>Pequeños esenciales, <span>grandes rutinas.</span></h2></div><Link className="text-link" to="/tienda">Ver los 12 productos <span aria-hidden="true">↗</span></Link></div>
        <div className="product-grid home-product-grid">{products.slice(0, 4).map((product) => <article className="product-card" key={product.id}><Link to={`/producto/${product.id}`} className="product-image-link"><div className="product-image"><span className="product-badge">{product.category}</span><img src={product.imageUrl} alt={product.name} loading="lazy" /></div></Link><div className="product-info"><p className="product-category">SANIVER / SELECCIÓN</p><h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3><p className="product-detail">{product.detail}</p><div className="product-buy"><span className="product-price">{currency.format(product.price)}</span><button className="add-button" type="button" onClick={() => onAdd(product.id)} aria-label={`Añadir ${product.name} a la bolsa`}>+</button></div></div></article>)}</div>
      </section>
      <section className="home-guides section-wrap"><div className="section-heading"><div><p className="eyebrow">WIKI SANIVER / INFORMACIÓN PARA TI</p><h2>Ideas claras para <span>cuidar lo cotidiano.</span></h2></div><Link className="text-link" to="/wiki">Explorar todas las guías <span aria-hidden="true">↗</span></Link></div><div className="home-guide-grid">{guides.slice(0, 3).map((guide, index) => <Link className={`home-guide-link ${guide.art}`} to={`/wiki/${guide.slug}`} key={guide.slug}><span className="home-guide-number">0{index + 1} / {guide.category}</span><span className="home-guide-symbol">{guide.symbol}</span><strong>{guide.title}</strong><span className="home-guide-read">{guide.readTime} de lectura ↗</span></Link>)}</div></section>
      <AiBand />
      <section className="home-reading section-wrap"><div className="section-heading"><div><p className="eyebrow">UN MOMENTO PARA PONERSE AL DÍA</p><h2>Leer también <span>es cuidarse.</span></h2></div><Link className="text-link" to="/actualidad">Visitar actualidad <span aria-hidden="true">↗</span></Link></div><div className="home-reading-grid">{articles.slice(0, 2).map((article, index) => <article className={`home-reading-card ${article.art}`} key={article.slug}><p className="eyebrow">0{index + 1} / {article.category}</p><h3>{article.title}</h3><p>{article.description}</p><Link to={`/actualidad/${article.slug}`} className="text-link">Leer nota <span aria-hidden="true">↗</span></Link></article>)}</div></section>
      <section className="home-community"><div className="section-wrap home-community-inner"><div><p className="eyebrow">HABLEMOS DE SALUD CON RESPETO</p><h2>La comunidad empieza <span>con una pregunta.</span></h2></div><Link className="button button-red" to="/comunidad">Visitar la comunidad <span aria-hidden="true">↗</span></Link></div></section>
    </>
  );
}

export default function HomePage({ onAdd }) {
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-copy"><p className="eyebrow"><span></span> UN ESPACIO PARA SENTIRTE MEJOR</p><h1>La salud se vive.<br /><span>La cuidamos juntos.</span></h1><p className="hero-description">Productos que eliges con confianza, información que sí se entiende y una comunidad que está contigo.</p><div className="hero-actions"><Link className="button button-red" to="/tienda">Explorar la tienda <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/wiki">Aprender algo nuevo <span aria-hidden="true">↓</span></Link></div><div className="hero-proof"><span className="proof-mark">+</span><span>Bienestar informado, todos los días.</span></div></div>
        <div className="hero-visual"><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85" alt="Profesional de salud conversando con una paciente" fetchPriority="high" /><div className="visual-note"><span className="note-icon">+</span><span><strong>Tu bienestar,</strong><br />sin complicaciones.</span></div><span className="visual-index">SANIVER / 01</span></div>
        <div className="hero-side-label">SALUD · COMUNIDAD · CONFIANZA</div>
      </section>
      <div className="trust-strip" aria-label="Lo que encuentras en Saniver"><span>01 <b>Compra con criterio</b></span><i></i><span>02 <b>Aprende a tu ritmo</b></span><i></i><span>03 <b>Conecta con tu comunidad</b></span><i></i><span>04 <b>Pregunta sin pena</b></span></div>
      <HomeHighlights onAdd={onAdd} />
    </>
  );
}