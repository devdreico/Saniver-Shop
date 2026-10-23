import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return <section className="not-found section-wrap"><p className="eyebrow">SANIVER / 404</p><h1>Esta página <span>no está aquí.</span></h1><p>Puede que el enlace haya cambiado. Vuelve al inicio o explora la tienda.</p><div className="hero-actions"><Link className="button button-red" to="/">Ir al inicio <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/tienda">Explorar productos <span aria-hidden="true">↗</span></Link></div></section>;
}