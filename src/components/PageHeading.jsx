import { Link } from "react-router-dom";

export default function PageHeading({ eyebrow, title, accent, description, image, imageAlt, children }) {
  return (
    <section className={`page-hero${image ? " page-hero-with-image" : ""}`}>
      <div className="page-hero-copy">
        <p className="eyebrow"><Link to="/">SANIVER</Link> <span>/</span> {eyebrow}</p>
        <h1>{title} {accent && <span>{accent}</span>}</h1>
        {description && <p className="page-hero-description">{description}</p>}
        {children}
      </div>
      {image && <div className="page-hero-image"><img src={image} alt={imageAlt || ""} /></div>}
    </section>
  );
}