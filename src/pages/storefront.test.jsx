import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AppContent } from "../App.jsx";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.restoreAllMocks();
});

function renderRoute(path) {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  return render(<MemoryRouter initialEntries={[path]}><AppContent /></MemoryRouter>);
}

describe("Saniver storefront routes", () => {
  it("opens a category-filtered shop directly from its URL", async () => {
    renderRoute("/tienda?categoria=Suplementos");

    expect(await screen.findByRole("heading", { name: "Encuentra tus esenciales." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Vitamina D3" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Protector solar SPF 50+" })).not.toBeInTheDocument();
  });

  it("adds a requested quantity from a product detail to the WhatsApp cart", async () => {
    const user = userEvent.setup();
    renderRoute("/producto/vitamina-d3");

    expect(await screen.findByRole("heading", { name: "Vitamina D3" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Sumar una unidad" }));
    await user.click(screen.getByRole("button", { name: "Añadir a la bolsa" }));
    await user.click(screen.getByRole("button", { name: "Abrir bolsa, 2 productos" }));

    expect(screen.getAllByText(/77\.800/)).toHaveLength(2);
    expect(screen.getByRole("link", { name: /Continuar por WhatsApp/ })).toHaveAttribute("href", expect.stringContaining("Vitamina%20D3%20x2"));
  });

  it("starts a community conversation with the selected topic", async () => {
    const user = userEvent.setup();
    const openWindow = vi.spyOn(window, "open").mockImplementation(() => null);
    renderRoute("/comunidad");

    await user.selectOptions(await screen.findByRole("combobox", { name: "Selecciona una opción" }), "Cuidado personal");
    await user.click(screen.getByRole("button", { name: /Continuar por WhatsApp/ }));

    await waitFor(() => expect(openWindow).toHaveBeenCalledWith(expect.stringContaining("Cuidado%20personal"), "_blank", "noopener,noreferrer"));
    expect(screen.getByText("Tu mensaje está listo en WhatsApp.")).toBeInTheDocument();
  });
});