export const CART_STORAGE_KEY = "saniver-cart";
export const WHATSAPP_URL = "https://wa.me/573144572008";

export const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function readCart(storage, products) {
  try {
    const cart = JSON.parse(storage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(cart)) return [];

    const productIds = new Set(products.map((product) => product.id));
    return cart.filter((item) => productIds.has(item.id) && Number.isInteger(item.quantity) && item.quantity > 0);
  } catch {
    return [];
  }
}

export function updateQuantity(cart, productId, change) {
  const existingItem = cart.find((item) => item.id === productId);
  if (!existingItem) return change > 0 ? [...cart, { id: productId, quantity: change }] : cart;

  const quantity = existingItem.quantity + change;
  if (quantity <= 0) return cart.filter((item) => item.id !== productId);
  return cart.map((item) => item.id === productId ? { ...item, quantity } : item);
}

export function getCartSummary(cart, products) {
  return cart.reduce((summary, item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return summary;
    return {
      itemCount: summary.itemCount + item.quantity,
      total: summary.total + product.price * item.quantity,
    };
  }, { itemCount: 0, total: 0 });
}

export function createWhatsAppUrl(cart, products) {
  const lines = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    return `- ${product.name} x${item.quantity} (${currency.format(product.price * item.quantity)})`;
  });
  const { total } = getCartSummary(cart, products);
  const message = [
    "Hola Saniver, quiero consultar disponibilidad de:",
    ...lines,
    `Subtotal de muestra: ${currency.format(total)}`,
    "¿Me ayudan a confirmar el total y la entrega?",
  ].join("\n");

  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}