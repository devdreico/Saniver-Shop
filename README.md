# Saniver Shop

Tienda y comunidad de salud construida con React 19 y Vite 7.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Desarrollo

```sh
npm install
npm run dev
```

Vite mostrará la dirección local para abrir la tienda.

## Páginas

- `/` inicio y selecciones editoriales
- `/tienda` catálogo filtrable por `?categoria=Suplementos`
- `/producto/:productId` ficha de cada producto y selección de cantidad
- `/wiki` biblioteca y `/wiki/:slug` guías individuales
- `/actualidad` artículos y `/actualidad/:slug` lectura completa
- `/comunidad` selección de tema con inicio de conversación por WhatsApp

## Validación y producción

```sh
npm test
npm run build
npm run preview
```

El carrito se conserva en el navegador y genera un borrador de pedido para confirmar disponibilidad y entrega por WhatsApp. Los precios del catálogo son de muestra; no hay pagos ni inventario conectados a un servidor.