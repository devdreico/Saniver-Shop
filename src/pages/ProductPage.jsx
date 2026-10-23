import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeading from "../components/PageHeading.jsx";
import { products } from "../data/products.js";
import { currency } from "../lib/cart.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ProductPage({ onAdd }) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  const [quantity, setQuantity] = useState(1);
  if (!product) return <NotFoundPage />;

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <>
      <nav className="breadcrumb section-wrap" aria-label="Ruta de navegación"><Link to="/">Inicio</Link><span>/</span><Link to="/tienda">Tienda</Link><span>/</span><span>{product.name}</span></nav>
      <section className="product-detail-page section-wrap">
        <div className="product-detail-media"><img src={product.imageUrl} alt={product.name} /><span className="product-badge">{product.category}</span></div>
        <div className="product-detail-copy"><p className="eyebrow">SANIVER / {product.category.toUpperCase()}</p><h1>{product.name}</h1><p className="product-detail-subtitle">{product.detail}</p><p className="product-detail-price">{currency.format(product.price)}</p><p className="product-detail-disclaimer">Precio de muestra. La disponibilidad y el total final se confirman por WhatsApp antes de completar tu pedido.</p><div className="product-detail-controls"><div className="stepper" aria-label="Cantidad"><button type="button" aria-label="Restar una unidad" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button><span aria-live="polite">{quantity}</span><button type="button" aria-label="Sumar una unidad" onClick={() => setQuantity((current) => current + 1)}>+</button></div><button className="button button-red" type="button" onClick={() => onAdd(product.id, quantity)}>Añadir a la bolsa <span aria-hidden="true">↗</span></button></div><div className="product-detail-meta"><p><strong>Entrega:</strong> consulta opciones y cobertura por WhatsApp.</p><p><strong>Orientación:</strong> pregunta al equipo antes de comprar medicamentos OTC.</p><p><strong>Información:</strong> lee siempre el empaque y sus advertencias.</p></div><a className="text-link" href="https://wa.me/573144572008" target="_blank" rel="noreferrer">Consultar este producto por WhatsApp ↗</a></div>
      </section>
      <section className="product-extra section-wrap"><div><p className="eyebrow">COMPRA CON INFORMACIÓN</p><h2>Lo esencial, <span>sin letra pequeña.</span></h2></div><p>Revisa el empaque, sus ingredientes y sus instrucciones de uso. Los medicamentos y suplementos pueden no ser adecuados para todas las personas. Consulta a un profesional de salud o al farmacéutico si tienes dudas.</p></section>
      {related.length > 0 && <section className="related-products section-wrap"><div className="section-heading"><div><p className="eyebrow">TAMBIÉN EN {product.category.toUpperCase()}</p><h2>Quizá te interese <span>también.</span></h2></div><Link to="/tienda" className="text-link">Ver tienda <span aria-hidden="true">↗</span></Link></div><div className="related-grid">{related.map((item) => <Link className="related-card" to={`/producto/${item.id}`} key={item.id}><img src={item.imageUrl} alt="" loading="lazy" /><span>{item.name}</span><strong>{currency.format(item.price)}</strong></Link>)}</div></section>}
    </>
  );
}