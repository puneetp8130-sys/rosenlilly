# Rosenlilly — Project Context

## Purpose and current scope

Rosenlilly is a client-side flower storefront prototype. It lets visitors browse a small flower catalogue, search and sort products, create a local account, manage a cart and wishlist, place a mock order, and view locally stored orders.

The project is currently a front-end prototype. It has no server, database, payment provider, inventory service, or production authentication system.

## Technology

- React 19 with Vite 8
- React Router DOM for navigation
- Tailwind CSS 4 for styling
- `react-hot-toast` for notifications
- JavaScript/JSX (no TypeScript)
- ESLint for static checks

## Runtime architecture

`src/main.jsx` creates the React root, wraps the app in `BrowserRouter`, and imports global styles. `src/App.jsx` renders `AppRoutes` and the toaster.

`src/routes/AppRoutes.jsx` defines public and protected page routes. `src/layouts/MainLayout.jsx` provides the offer bar, navbar, page outlet, and footer shared by the routed pages.

Pages are composed from reusable presentation components in `src/components`. Product catalogue data is hard-coded in `src/data/products.js`; it currently contains eight products with remote Unsplash image URLs.

## State and persistence

The application currently uses browser `localStorage` rather than Redux or an API:

| Key | Purpose |
| --- | --- |
| `users` | Registered local accounts, including passwords (prototype only). |
| `currentUser` | Current signed-in user. |
| `cart_<userId>` | Signed-in user's cart. |
| `wishlist_<userId>` | Signed-in user's wishlist. |
| `orders` | All locally placed orders; pages filter by `userId`. |

Custom browser events (`authChange`, `cartChange`, `wishlistChange`, `ordersChange`, and `userChange`) keep some components in sync.

`src/utils/storage.js` contains shared helpers for current-user cart/wishlist access, but not every page uses them yet.

## Directory guide

```text
src/
  components/       Reusable navbar, home, product, common, and auth UI
  data/             Static catalogue data
  layouts/          Shared layout
  pages/            Route-level storefront and account pages
  redux/            Empty store and slice scaffolding; not active
  routes/           Route definitions and guards
  services/         Empty API service placeholder
  utils/            Browser-storage helpers
```

## Current routes

| Path | Page | Access |
| --- | --- | --- |
| `/` | Home | Public |
| `/flowers` | Product catalogue | Public |
| `/categories` | Category landing page | Public |
| `/search?q=<query>` | Search results | Public |
| `/product/:id` | Product details | Public |
| `/login`, `/register`, `/forgot-password` | Local account flows | Public |
| `/cart`, `/wishlist` | Shopper state | Public, but actions require login |
| `/profile`, `/orders`, `/orders/:orderId`, `/checkout`, `/order-success` | Account/order flows | Protected |

Catalogue category browsing uses `/flowers?category=<catalogue-slug>`. The catalogue reads this parameter and keeps it synchronized when shoppers use its category controls. Birthday, anniversary, and offer navigation currently lead to the full catalogue because the static product data has no occasion or offer classifications.

## Known technical constraints

- Authentication and passwords are not secure because they run entirely in the browser. Never treat the current implementation as production-ready authentication.
- Product data, pricing, delivery promises, reviews, and stock are static mock data.
- Redux (`src/redux`) and API (`src/services/api.js`) are scaffolding only.
- The production build passes, but the lint command currently fails. See `TASKS.md` for tracked remediation.

## Development commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Change principles

- Preserve the existing Tailwind visual language unless a task explicitly changes design.
- Keep all shopper state storage consistent through shared helpers and user-scoped keys.
- Prefer completing the core customer journey before adding new features.
- Update this file when architecture, persistence, routes, or platform decisions change; update `TASKS.md` when task status changes.
