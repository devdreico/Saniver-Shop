import { useEffect, useRef } from "react";
import { products } from "../data/products.js";
import { createWhatsAppUrl, currency, getCartSummary } from "../lib/cart.js";

export default function CartDrawer({ cart, isOpen, onClose, onChangeQuantity }) {
  const closeButton = useRef(null);
  const { itemCount, total } = getCartSummary(cart, products);

  useEffect(() => {
    if (isOpen) closeButton.current?.focus();
  }, [isOpen]);

  return (
    <>
      <div className="cart-overlay" hidden={!isOpen} onClick={onClose} />
      <aside className={`cart-drawer${isOpen ? " open" : ""}`} aria-label="Tu bolsa de compra" aria-hidden={!isOpen} inert={!isOpen}>
        <div className="cart-header">
          <div><p className="eyebrow">SANIVER / TU SELECCIÓN</p><h2>Tu bolsa <span className="drawer-count">({itemCount})</span></h2></div>
          <button ref={closeButton} type="button" className="cart-close" onClick={onClose} aria-label="Cerrar bolsa">×</button>
        </div>
        <div className="cart-items" hidden={cart.length === 0}>
          {cart.map((item) => {
            const product = products.find((entry) => entry.id === item.id);
            if (!product) return null;
            return (
              <article className="cart-line" key={product.id}>
                <img src={product.imageUrl} alt="" />
                <div>
                  <h3>{product.name}</h3><p>{currency.format(product.price)} c/u</p>
                  <div className="quantity-control">
                    <button type="button" onClick={() => onChangeQuantity(product.id, -1)} aria-label={`Quitar una unidad de ${product.name}`}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onChangeQuantity(product.id, 1)} aria-label={`Añadir una unidad de ${product.name}`}>+</button>
                  </div>
                </div>
                <span className="cart-line-price">{currency.format(product.price * item.quantity)}</span>
              </article>
            );
          })}
        </div>
        {cart.length === 0 && <div className="cart-empty visible"><span>+</span><p>Tu bolsa está lista<br />para lo que necesitas.</p><a href="#tienda" className="text-link cart-shop-link" onClick={onClose}>Ir a la tienda ↗</a></div>}
        <div className="cart-footer">
          <div className="cart-total"><span>Subtotal de muestra</span><strong>{currency.format(total)}</strong></div>
          <p>El total y la disponibilidad se confirman por WhatsApp.</p>
          <a className="button button-red checkout-button" href={createWhatsAppUrl(cart, products)} target="_blank" rel="noreferrer">Continuar por WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </aside>
    </>
  );
}