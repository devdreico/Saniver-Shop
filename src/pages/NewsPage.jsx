import { Link, useParams } from "react-router-dom";
import PageHeading from "../components/PageHeading.jsx";
import { articles } from "../data/articles.js";

function ArticleCard({ article, index }) {
  return (
    <article className="news-card">
      <Link to={`/actualidad/${article.slug}`} className={`news-card-art ${article.art}`} aria-label={`Leer: ${article.title}`}><span>0{index + 1} / {article.readTime}</span><strong>{article.category}</strong></Link>
      <div className="news-card-content"><p className="eyebrow">{article.category} · {article.readTime}</p><h2><Link to={`/actualidad/${article.slug}`}>{article.title}</Link></h2><p>{article.description}</p><Link to={`/actualidad/${article.slug}`} className="text-link">Leer nota <span aria-hidden="true">↗</span></Link></div>
    </article>
  );
}

export default function NewsPage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (slug) {
    if (!article) return <PageHeading eyebrow="ACTUALIDAD" title="Esta nota" accent="no existe." description="Vuelve a actualidad para descubrir más artículos." />;
    return <><PageHeading eyebrow="SANIVER / ACTUALIDAD" title="Ideas para" accent="estar al día." /><article className="editorial-detail section-wrap"><div className={`editorial-cover ${article.art}`}><span>{article.category} · {article.readTime}</span><strong>0{articles.indexOf(article) + 1}</strong></div><div className="editorial-body"><p className="eyebrow">ACTUALIDAD SANIVER / {article.category}</p><h1>{article.title}</h1><p className="editorial-intro">{article.description}</p><div className="editorial-prose">{article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><aside className="medical-note"><span>i</span> Este artículo comparte información general y no sustituye la consulta con profesionales de salud.</aside><Link to="/actualidad" className="text-link editorial-back">← Volver a actualidad</Link></div></article></>;
  }

  return <><PageHeading eyebrow="SANIVER / ACTUALIDAD" title="Salud que" accent="se conversa." description="Lecturas breves y claras para entender tendencias, hábitos y decisiones cotidianas con criterio." image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=85" imageAlt="Persona leyendo una publicación" /><section className="news-library section-wrap"><div className="section-heading"><div><p className="eyebrow">NOTAS EDITORIALES / {articles.length} LECTURAS</p><h2>Ideas para tu <span>día a día.</span></h2></div><Link to="/wiki" className="text-link">Consultar guías <span aria-hidden="true">↗</span></Link></div><div className="news-library-grid">{articles.map((item, index) => <ArticleCard article={item} index={index} key={item.slug} />)}</div></section></>;
}