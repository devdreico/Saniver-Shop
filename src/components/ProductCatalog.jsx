import { useState } from "react";
import { products, productCategories } from "../data/products.js";
import { currency } from "../lib/cart.js";
import { Link } from "react-router-dom";

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <Link to={`/producto/${product.id}`} aria-label={`Ver ${product.name}`}><img src={product.imageUrl} alt={product.name} loading="lazy" /></Link>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3>
        <p className="product-detail">{product.detail}</p>
        <div className="product-buy">
          <span className="product-price">{currency.format(product.price)}</span>
          <button className="add-button" type="button" onClick={() => onAdd(product.id)} aria-label={`Añadir ${product.name} a la bolsa`}>+</button>
        </div>
      </div>
    </article>
  );
}

export default function ProductCatalog({ onAdd, initialCategory = "Todos", pageMode = false }) {
  const [activeFilter, setActiveFilter] = useState(productCategories.includes(initialCategory) ? initialCategory : "Todos");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("es");
  const visibleProducts = products.filter((product) => {
    const matchesFilter = activeFilter === "Todos" || product.category === activeFilter;
    const matchesQuery = `${product.name} ${product.category} ${product.detail}`.toLocaleLowerCase("es").includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });

  return (
    <section className={`shop-section section-wrap${pageMode ? " shop-page-section" : ""}`} id="tienda">
      <div className="section-heading shop-heading">
        <div><p className="eyebrow">{pageMode ? "CATÁLOGO SANIVER / 12 PRODUCTOS" : "CUIDARTE EMPIEZA POR ELEGIR"}</p><h2>{pageMode ? <>Encuentra tus <span>esenciales.</span></> : <>Una selección <span>para empezar.</span></>}</h2></div>
        <p>Productos de bienestar y cuidado para acompañar tu día a día. ¿No sabes cuál elegir? <a href="https://wa.me/573144572008" target="_blank" rel="noreferrer">Te orientamos por WhatsApp ↗</a></p>
      </div>
      <div className="shop-tools">
        <div className="filters" role="group" aria-label="Filtrar productos">
          {productCategories.map((category) => (
            <button key={category} className={`filter-button${activeFilter === category ? " active" : ""}`} type="button" onClick={() => setActiveFilter(category)}>
              {category === "Todos" ? <>Todo <span>{products.length}</span></> : category}
            </button>
          ))}
        </div>
        <label className="search-box">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar un producto" aria-label="Buscar productos" />
        </label>
      </div>
      <div className="product-grid" aria-live="polite">
        {visibleProducts.length ? visibleProducts.map((product, index) => (
          <div key={product.id} style={{ animationDelay: `${Math.min(index * 35, 245)}ms` }}><ProductCard product={product} onAdd={onAdd} /></div>
        )) : <p className="empty-results">No encontramos productos con esa búsqueda. Prueba con otras palabras.</p>}
      </div>
      <p className="catalog-note">Precios de muestra en pesos colombianos. Disponibilidad y venta de medicamentos sujetos a confirmación y regulación local. No reemplaza la orientación de un profesional de salud.</p>
    </section>
  );
}