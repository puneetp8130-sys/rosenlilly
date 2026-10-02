# Rosenlilly — Project Context

## Purpose and current scope

Rosenlilly is a flower storefront application. It lets visitors browse a small flower catalogue, search and sort products, create a local account, manage a cart and wishlist, place a mock order, and view locally stored orders.

The project has a React frontend and an Express backend with a MongoDB database layer. The frontend currently uses localStorage for state; the backend provides the database foundation for future API-driven state management. Authentication, payment, and production inventory are not yet implemented.

## Technology

- React 19 with Vite 8 (Frontend)
- React Router DOM for navigation
- Tailwind CSS 4 for styling
- `react-hot-toast` for notifications
- JavaScript/JSX (no TypeScript)
- ESLint for static checks
- Node.js + Express 4 with ES Modules (Backend in `server/`)
- MongoDB + Mongoose (Database layer)
- Cors, Helmet, Morgan, Dotenv (Backend middlewares)

## Runtime architecture

`src/main.jsx` creates the React root, wraps the app in `BrowserRouter` using Vite's `BASE_URL` as its basename, and imports global styles. `src/App.jsx` renders `AppRoutes` and the toaster. This keeps client-side routing aligned with the `/rosenlilly` deployment base.

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

`src/utils/storage.js` contains shared helpers for current-user cart/wishlist access. Product details now uses these helpers; other pages still contain duplicated browser-storage logic that should be consolidated later.

## Directory guide

```text
src/                Frontend React source
  components/       Reusable navbar, home, product, common, and auth UI
  data/             Static catalogue data
  layouts/          Shared layout
  pages/            Route-level storefront and account pages
  routes/           Route definitions and guards
  utils/            Browser-storage helpers
server/             Backend Express API + MongoDB database layer
  src/
    config/         Environment and database configuration
    middlewares/    Error & 404 handling middlewares
    models/         Mongoose schemas (User, Category, Product, Cart, Wishlist, Order)
    routes/         API routing (including /api/health)
    seeds/          Database seed data and runner script
    app.js          Express application configuration
    server.js       Server startup, MongoDB connection & graceful shutdown
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

Catalogue browsing supports `category` (`/flowers?category=<slug>`), `occasion` (`/flowers?occasion=<birthday|anniversary>`), and `offer` (`/flowers?offer=true`). Filters are intentionally combinable (e.g., selecting a category maintains any active occasion and offer filters, and vice versa). Selecting "All" or toggling off a filter clears only that specific parameter, while the empty-state action resets all filters. Static product data in `src/data/products.js` classifies items with `occasions` (`["birthday"]`, `["anniversary"]`) and a single canonical boolean `offer` field determined by a defensible discount rule (`(oldPrice - price) / oldPrice >= 0.22`).

## Known technical constraints

- Authentication and passwords are not secure because they run entirely in the browser. Never treat the current implementation as production-ready authentication.
- Product data, pricing, delivery promises, reviews, and stock are static mock data.
- Both `npm run build` and `npm run lint` pass cleanly with zero errors.
- Unused/placeholder files exist: `Button.jsx`, `Loader.jsx`, `Modal.jsx` (empty stubs), `ProductGrid.jsx`, `ProductImage.jsx`, `ProductInfo.jsx`, `Footer.jsx`, and unwired `PublicRoute.jsx`.

## Development commands

### Frontend
```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend (in server/)
```bash
npm install
npm run seed    # Seed categories and products into MongoDB
npm run dev     # Start development server (requires MongoDB)
npm start       # Start production server
```

## Change principles

- Preserve the existing Tailwind visual language unless a task explicitly changes design.
- Keep all shopper state storage consistent through shared helpers and user-scoped keys.
- Prefer completing the core customer journey before adding new features.
- Update this file when architecture, persistence, routes, or platform decisions change; update `TASKS.md` when task status changes.
