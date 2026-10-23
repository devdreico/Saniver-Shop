import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeading from "../components/PageHeading.jsx";
import { guides } from "../data/guides.js";

function GuideCard({ guide, index }) {
  return (
    <article className="guide-card">
      <Link to={`/wiki/${guide.slug}`} className={`guide-art ${guide.art}`} aria-label={`Leer guía: ${guide.title}`}>
        <span className="art-tag">GUÍA 0{index + 1} / {guide.readTime}</span>
        <span className="art-symbol">{guide.symbol}</span>
        <span className="art-caption">{guide.caption}</span>
      </Link>
      <div className="guide-info"><p className="eyebrow">{guide.category}</p><h2><Link to={`/wiki/${guide.slug}`}>{guide.title}</Link></h2><p className="guide-summary">{guide.summary}</p><Link className="text-link" to={`/wiki/${guide.slug}`}>Leer guía <span aria-hidden="true">↗</span></Link></div>
    </article>
  );
}

function GuideDetail({ guide }) {
  return (
    <article className="editorial-detail section-wrap">
      <div className={`editorial-cover ${guide.art}`}><span>{guide.category} · {guide.readTime}</span><strong>{guide.symbol}</strong></div>
      <div className="editorial-body"><p className="eyebrow">GUÍA SANIVER / {guide.category}</p><h1>{guide.title}</h1><p className="editorial-intro">{guide.summary}</p><div className="editorial-prose">{guide.sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}</div><aside className="medical-note"><span>i</span> Esta guía es informativa y no sustituye el diagnóstico, tratamiento ni la consulta con un profesional de salud.</aside><Link to="/wiki" className="text-link editorial-back">← Volver a todas las guías</Link></div>
    </article>
  );
}

export default function WikiPage() {
  const { slug } = useParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const selectedGuide = slug ? guides.find((guide) => guide.slug === slug) : null;
  const visibleGuides = useMemo(() => guides.filter((guide) => {
    const matchesCategory = category === "Todas" || guide.category === category;
    return matchesCategory && `${guide.title} ${guide.summary} ${guide.category}`.toLocaleLowerCase("es").includes(query.trim().toLocaleLowerCase("es"));
  }), [category, query]);

  if (slug) {
    if (!selectedGuide) return <PageHeading eyebrow="GUÍAS" title="Esta guía" accent="no existe." description="Vuelve a la biblioteca para explorar los temas disponibles." />;
    return <><PageHeading eyebrow="BIBLIOTECA DE SALUD" title="Entender también" accent="es cuidarte." description="Información general, clara y sin reemplazar la orientación profesional." /><GuideDetail guide={selectedGuide} /><section className="related-products section-wrap"><div className="section-heading"><div><p className="eyebrow">MÁS PARA LEER</p><h2>Otras guías <span>Saniver.</span></h2></div><Link to="/wiki" className="text-link">Ver biblioteca <span aria-hidden="true">↗</span></Link></div><div className="guide-grid related-guides">{guides.filter((guide) => guide.slug !== slug).slice(0, 3).map((guide, index) => <GuideCard guide={guide} index={index} key={guide.slug} />)}</div></section></>;
  }

  return (
    <>
      <PageHeading eyebrow="WIKI SANIVER" title="Información clara," accent="decisiones tuyas." description="Guías prácticas para entender mejor productos y hábitos de bienestar. Lee a tu ritmo y consulta a profesionales cuando necesites orientación personal." image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=85" imageAlt="Profesional revisando información de salud" />
      <section className="editorial-library section-wrap"><div className="library-tools"><div><p className="eyebrow">BIBLIOTECA / {guides.length} GUÍAS</p><h2>¿Qué quieres <span>entender hoy?</span></h2></div><label className="search-box"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar una guía" aria-label="Buscar guías" /></label></div><div className="filters editorial-filters" role="group" aria-label="Filtrar guías por tema">{["Todas", ...new Set(guides.map((guide) => guide.category))].map((item) => <button key={item} className={`filter-button${category === item ? " active" : ""}`} type="button" onClick={() => setCategory(item)}>{item}</button>)}</div><div className="guide-grid library-grid">{visibleGuides.length ? visibleGuides.map((guide, index) => <GuideCard guide={guide} index={index} key={guide.slug} />) : <p className="empty-results">No encontramos guías para esa búsqueda.</p>}</div><p className="medical-note"><span>i</span> El contenido es informativo. No reemplaza el diagnóstico, tratamiento ni la consulta con un profesional de salud.</p></section>
    </>
  );
}