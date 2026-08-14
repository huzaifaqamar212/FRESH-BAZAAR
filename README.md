# 🥬 FreshBazaar — Grocery E-commerce Frontend

React + Vite + Tailwind CSS + Framer Motion + React Router. Karachi-style online grocery
store (Imtiaz / BinHashim inspired) with PKR pricing, 30 realistic products, deals,
category filters, and a persistent cart.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Features
- **Home** — hero, category grid, deals banner, featured + deals sections
- **Shop** — category filter, price range slider, search (synced to URL), sort, deals-only toggle
- **Product Detail** — qty selector, stock warnings, related products, add-to-cart bounce
- **Cart** — qty +/- with stock limits, remove, savings breakdown, free-delivery progress
- **Checkout** — validated UI form (name / 03xx phone / address), delivery slots, payment options (demo only)
- **Order Success** — animated confirmation with order ID
- Cart state via **Context API + useReducer**, persisted to **localStorage**
- **Framer Motion**: staggered card entrance, cart-badge & add-to-cart bounce, layout animations
- Sticky navbar with live cart badge, fully responsive, reduced-motion respected

## Notes
- `source.unsplash.com` is deprecated, so product images use working `images.unsplash.com`
  CDN links per category, with an inline SVG fallback if any image fails to load.
