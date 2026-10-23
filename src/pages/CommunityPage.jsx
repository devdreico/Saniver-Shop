import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading.jsx";

const topics = ["Rutinas y hábitos", "Elegir un producto", "Cuidado personal", "Otro tema"];

export default function CommunityPage() {
  const [topic, setTopic] = useState(topics[0]);
  const [submitted, setSubmitted] = useState(false);
  const message = `Hola Saniver, quiero conversar sobre: ${topic}. ¿Me orientan?`;
  const whatsappUrl = `https://wa.me/573144572008?text=${encodeURIComponent(message)}`;

  return (
    <>
      <PageHeading eyebrow="COMUNIDAD SANIVER" title="Hablemos de salud" accent="con respeto." description="Un espacio amable para compartir intereses, resolver dudas sobre la tienda y encontrar recursos confiables." image="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=85" imageAlt="Personas conversando en grupo" />
      <section className="community-page section-wrap">
        <div className="community-page-copy"><p className="eyebrow">A TU RITMO, CON TU VOZ</p><h2>Preguntar es una forma de <span>participar.</span></h2><p>Elige un tema para iniciar una conversación con el equipo Saniver. No incluyas información médica privada: para orientación personal, habla directamente con un profesional de salud.</p><div className="community-values"><div><strong>01</strong><span>Escuchar sin juzgar</span></div><div><strong>02</strong><span>Compartir información general</span></div><div><strong>03</strong><span>Respetar la privacidad</span></div></div><a className="social-community" href="https://www.instagram.com/saniverco/" target="_blank" rel="noreferrer"><span className="social-glyph">◎</span><span><strong>Encuéntranos en Instagram</strong><br />@saniverco</span><span aria-hidden="true">↗</span></a></div>
        <form className="community-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); window.open(whatsappUrl, "_blank", "noopener,noreferrer"); }}><p className="eyebrow">INICIA UNA CONVERSACIÓN</p><h2>¿Qué tema te interesa?</h2><label htmlFor="community-topic">Selecciona una opción</label><select id="community-topic" value={topic} onChange={(event) => { setTopic(event.target.value); setSubmitted(false); }}>{topics.map((item) => <option key={item}>{item}</option>)}</select><p className="form-note">Se abrirá WhatsApp con un mensaje inicial. No solicitamos información médica personal.</p><button className="button button-red" type="submit">{submitted ? "Abrir WhatsApp de nuevo" : "Continuar por WhatsApp"} <span aria-hidden="true">↗</span></button><p className="community-form-success" aria-live="polite">{submitted ? "Tu mensaje está listo en WhatsApp." : ""}</p></form>
      </section>
      <section className="community-prompts"><div className="section-wrap"><p className="eyebrow">UNA COMUNIDAD TAMBIÉN SE CONSTRUYE CON CURIOSIDAD</p><h2>¿Por dónde empezamos?</h2><div className="prompt-grid"><article><span>01</span><h3>Cuéntanos qué te interesa</h3><p>Un tema de bienestar, un producto o una guía que te gustaría encontrar.</p></article><article><span>02</span><h3>Explora recursos confiables</h3><p>Consulta la wiki para leer información general y compartirla con tu entorno.</p><Link to="/wiki">Ir a las guías ↗</Link></article><article><span>03</span><h3>Conversemos con respeto</h3><p>Las experiencias compartidas acompañan, pero no reemplazan el consejo clínico.</p><a href="https://www.instagram.com/saniverco/" target="_blank" rel="noreferrer">Visitar Instagram ↗</a></article></div></div></section>
    </>
  );
}