import { lazy, Suspense, useEffect, useRef, useState } from "react";
import CartDrawer from "./components/CartDrawer.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { articles } from "./data/articles.js";
import { guides } from "./data/guides.js";
import { products } from "./data/products.js";
import { CART_STORAGE_KEY, readCart, updateQuantity } from "./lib/cart.js";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ShopPage = lazy(() => import("./pages/ShopPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const WikiPage = lazy(() => import("./pages/WikiPage.jsx"));
const NewsPage = lazy(() => import("./pages/NewsPage.jsx"));
const CommunityPage = lazy(() => import("./pages/CommunityPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

const pageMetadata = {
  "/": ["Saniver | Salud con criterio", "Productos de salud, guías confiables y una comunidad que te acompaña."],
  "/tienda": ["Tienda | Saniver", "Explora suplementos, cuidado personal y productos para tu botiquín."],
  "/wiki": ["Guías de salud | Saniver", "Información clara para tomar decisiones de bienestar con criterio."],
  "/actualidad": ["Actualidad | Saniver", "Ideas, novedades y conversaciones alrededor del bienestar."],
  "/comunidad": ["Comunidad | Saniver", "Comparte hábitos, ideas y preguntas en el espacio de comunidad Saniver."],
};

export function AppContent() {
  const location = useLocation();
  const [cart, setCart] = useState(() => readCart(window.localStorage, products));
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef(null);
  const triggerRef = useRef(null);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      setToastMessage("No se pudo guardar la bolsa en este dispositivo.");
    }
  }, [cart]);

  useEffect(() => {
    document.body.classList.toggle("cart-open", cartOpen);
    return () => document.body.classList.remove("cart-open");
  }, [cartOpen]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  useEffect(() => {
    const slug = location.pathname.split("/").at(-1);
    const product = location.pathname.startsWith("/producto/") ? products.find((item) => item.id === slug) : null;
    const guide = location.pathname.startsWith("/wiki/") ? guides.find((item) => item.slug === slug) : null;
    const article = location.pathname.startsWith("/actualidad/") ? articles.find((item) => item.slug === slug) : null;
    const [title, description] = product
      ? [`${product.name} | Saniver`, `${product.name}, ${product.detail}. Consulta disponibilidad por WhatsApp.`]
      : guide
        ? [`${guide.title} | Saniver`, guide.summary]
        : article
          ? [`${article.title} | Saniver`, article.description]
          : pageMetadata[location.pathname] || ["Saniver | Salud con criterio", "Salud con criterio. Bienestar en comunidad."];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && cartOpen) closeCart();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cartOpen]);

  function addProduct(productId, quantity = 1) {
    setCart((currentCart) => updateQuantity(currentCart, productId, quantity));
    setToastMessage("Añadido a tu bolsa.");
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMessage(""), 2200);
  }

  function closeCart() {
    setCartOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <>
      <SiteHeader itemCount={itemCount} cartButtonRef={triggerRef} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Suspense fallback={<div className="route-loading" role="status">Saniver está preparando esta página…</div>}>
          <Routes>
            <Route path="/" element={<HomePage onAdd={addProduct} />} />
            <Route path="/tienda" element={<ShopPage onAdd={addProduct} />} />
            <Route path="/producto/:productId" element={<ProductPage onAdd={addProduct} />} />
            <Route path="/wiki" element={<WikiPage />} />
            <Route path="/wiki/:slug" element={<WikiPage />} />
            <Route path="/actualidad" element={<NewsPage />} />
            <Route path="/actualidad/:slug" element={<NewsPage />} />
            <Route path="/comunidad" element={<CommunityPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
      <CartDrawer cart={cart} isOpen={cartOpen} onClose={closeCart} onChangeQuantity={(productId, change) => setCart((current) => updateQuantity(current, productId, change))} />
      <div className={`toast${toastMessage ? " visible" : ""}`} role="status" aria-live="polite">{toastMessage}</div>
    </>
  );
}

export default function App() {
  return <BrowserRouter><AppContent /></BrowserRouter>;
}