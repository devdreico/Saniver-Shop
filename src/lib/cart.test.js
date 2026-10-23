import { describe, expect, it } from "vitest";
import { createWhatsAppUrl, getCartSummary, readCart, updateQuantity } from "./cart.js";

const products = [
  { id: "vitamina-c", name: "Vitamina C", price: 24900 },
  { id: "omega-3", name: "Omega 3", price: 52900 },
];

describe("cart utilities", () => {
  it("ignores malformed and unknown saved items", () => {
    const storage = { getItem: () => JSON.stringify([{ id: "vitamina-c", quantity: 2 }, { id: "missing", quantity: 1 }, { id: "omega-3", quantity: 0 }]) };
    expect(readCart(storage, products)).toEqual([{ id: "vitamina-c", quantity: 2 }]);
  });

  it("updates and removes quantities immutably", () => {
    const cart = [{ id: "vitamina-c", quantity: 1 }];
    expect(updateQuantity(cart, "vitamina-c", 1)).toEqual([{ id: "vitamina-c", quantity: 2 }]);
    expect(updateQuantity(cart, "vitamina-c", -1)).toEqual([]);
    expect(cart).toEqual([{ id: "vitamina-c", quantity: 1 }]);
  });

  it("summarizes quantities and includes the selection in the WhatsApp order", () => {
    const cart = [{ id: "vitamina-c", quantity: 2 }, { id: "omega-3", quantity: 1 }];
    expect(getCartSummary(cart, products)).toEqual({ itemCount: 3, total: 102700 });
    const url = new URL(createWhatsAppUrl(cart, products));
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toContain("Vitamina C x2");
    expect(url.searchParams.get("text")).toContain("Subtotal de muestra");
  });
});