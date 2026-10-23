import { useSearchParams } from "react-router-dom";
import PageHeading from "../components/PageHeading.jsx";
import ProductCatalog from "../components/ProductCatalog.jsx";

export default function ShopPage({ onAdd }) {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "Todos";

  return (
    <>
      <PageHeading eyebrow="LA TIENDA" title="Elige lo que" accent="va contigo." description="Suplementos, cuidado personal y básicos para el hogar. Explora con calma y pregunta cuando lo necesites." image="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1400&q=85" imageAlt="Productos de cuidado personal" />
      <ProductCatalog onAdd={onAdd} initialCategory={initialCategory} pageMode />
      <section className="shop-help section-wrap"><span className="contact-plus" aria-hidden="true">?</span><div><p className="eyebrow">TE ACOMPAÑAMOS A ELEGIR</p><h2>¿Quieres consultar un producto?</h2><p>Escríbenos y confirmamos disponibilidad, detalles y entrega.</p></div><a className="button button-red" href="https://wa.me/573144572008" target="_blank" rel="noreferrer">Consultar por WhatsApp <span aria-hidden="true">↗</span></a></section>
    </>
  );
}