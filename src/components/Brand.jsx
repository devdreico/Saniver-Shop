import { Link } from "react-router-dom";
import logo from "../../saniver-logo.png";

export default function Brand({ footer = false }) {
  return (
    <Link className={`brand${footer ? " footer-brand" : ""}`} to="/" aria-label="Saniver, inicio">
      <img src={logo} alt="" />
      <span>saniver<span className="brand-dot">.</span></span>
    </Link>
  );
}