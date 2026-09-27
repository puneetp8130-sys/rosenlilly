# Rosenlilly 🌸

Rosenlilly is a modern e-commerce storefront web application designed for browsing, selecting, and purchasing fresh flowers, bouquets, and thoughtful floral gifts. Built with React and Vite, the application delivers a fast, responsive user experience with client-side routing, interactive shopping workflows, and persistent local data storage.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development Commands](#development-commands)
- [Project Structure](#project-structure)
- [State Management & Persistence](#state-management--persistence)
- [Testing & Verification](#testing--verification)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Notes & Current Scope](#notes--current-scope)

---

## Project Overview

Rosenlilly serves as a client-side e-commerce storefront prototype. Visitors can browse a curated flower catalog, search by keyword, filter by categories and occasions, view detailed product pages, manage items in a shopping cart and wishlist, sign in or register an account, and complete an end-to-end checkout flow with persistent mock order creation.

All data persistence—including registered user credentials, active sessions, user-specific carts, wishlists, and order histories—is managed in the client browser through standard Web Storage (`localStorage`).

---

## Features

### 1. Product Catalogue
- Browse an assortment of flowers categorized into Roses, Bouquets, Lilies, Sunflowers, Orchids, and Mixed Flowers.
- Displays pricing, discount percentages, customer ratings, review counts, and special offer tags.

### 2. Search, Filter & Sort
- **Search**: Keyword search across flower names, categories, and descriptions via `/search?q=...`.
- **Category Filtering**: Filter products by floral category (Roses, Bouquets, Lilies, Sunflowers, Orchids, Mixed Flowers).
- **Occasion Filtering**: Filter by occasion tags such as Birthday and Anniversary.
- **Special Offers**: Toggle to view only discounted / promotional items.
- **Sorting**: Sort catalog listings by price (Low to High, High to Low), customer rating, or featured default.

### 3. Product Details
- Dedicated route (`/product/:id`) displaying rich product imagery and details.
- Real-time stock status, pricing comparison, star rating, and product descriptions.
- Quantity selector, quick "Add to Cart", "Buy Now", and wishlist toggling.
- Recommended related flowers carousel/grid based on the product category.

### 4. Shopping Cart
- User-specific shopping cart persisted across sessions.
- Dynamic quantity adjustment (+/-) and instant item removal.
- Real-time order summary calculation:
  - Subtotal computation.
  - Automatic discount application (10% off for orders ₹2,000 and above).
  - Dynamic delivery charge calculation (Free delivery on orders ₹999 and above, otherwise ₹49 standard).
- "Clear Cart" capability and direct path to checkout.

### 5. Wishlist
- User-specific wishlist (`/wishlist`) allowing shoppers to bookmark favorite flowers.
- Direct "Move to Cart" and "Remove from Wishlist" operations.
- Real-time counter badge synchronized with the global navigation bar.

### 6. Authentication & User Management
- **Registration**: Account creation with validation for full name, email, 10-digit phone number, and password.
- **Login**: Email and password authentication with redirect to the previous intended page.
- **Password Reset**: Multi-step password recovery flow (`/forgot-password`).
- **Protected Routes**: Route guards (`ProtectedRoute`) that require authentication before accessing the profile, checkout, or order pages.
- **Public Routes**: Route guard (`PublicRoute`) preventing already logged-in users from visiting login or register pages.
- **Profile Management**: Profile page (`/profile`) allowing users to edit account details (name, email, phone) and view lifetime order, wishlist, and cart counts.

### 7. Checkout & Orders
- Streamlined checkout flow (`/checkout`) with address entry, delivery type selection (Standard vs. Express), and payment method options (Cash on Delivery, Credit/Debit Card, UPI).
- Instant order creation with unique tracking IDs (`RL` prefixed timestamps).
- Automated cart clearance upon successful order submission.
- **Order Confirmation**: Dedicated success screen (`/order-success?orderId=...`).
- **Order History & Details**: Order list (`/orders`) and detailed individual order breakdown (`/orders/:orderId`) with status progression (Placed, Processing, Shipped, Delivered).

### 8. User Feedback & Responsiveness
- Toast notifications powered by `react-hot-toast` for cart, wishlist, auth, and checkout events.
- Fully responsive design supporting mobile, tablet, and desktop viewports.

---

## Tech Stack

- **Core Library**: [React 19](https://react.dev/) (`react` & `react-dom` v19.2)
- **Build Tool & Bundler**: [Vite 8](https://vite.dev/) (`vite` v8.2) with [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- **Routing**: [React Router 7](https://reactrouter.com/) (`react-router-dom` v7.18)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (`tailwindcss` & `@tailwindcss/vite` v4.3)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/) (`react-hot-toast` v2.6)
- **Linter & Static Analysis**: [ESLint 10](https://eslint.org/) with Flat Config (`eslint.config.js`), `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`

---

## Prerequisites

- **Node.js**: Node.js 18.x or 20+ (Node.js 22 is used in the CI/CD pipeline).
- **npm**: npm 9+ (bundled with Node.js).

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/puneetp8130-sys/rosenlilly.git
   cd rosenlilly
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the displayed local server address (by default `http://localhost:5173/rosenlilly/`).

---

## Development Commands

All available scripts are defined in `package.json`:

| Command | Description |
| --- | --- |
| `npm run dev` | Launches the local Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory. |
| `npm run lint` | Runs ESLint across all `.js` and `.jsx` files to enforce code style and React hook rules. |
| `npm run preview` | Starts a local web server serving the output from the `dist/` directory for production previewing. |

---

## Project Structure

```text
rosenlilly/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow for GitHub Pages
├── public/                     # Static public assets
├── src/
│   ├── assets/                 # Component-level static media and icons
│   ├── components/             # Reusable UI presentation components
│   │   ├── auth/               # Route guards (ProtectedRoute)
│   │   ├── common/             # Generic UI elements (Button, Loader, Modal)
│   │   ├── footer/             # Global footer
│   │   ├── home/               # Landing page sections (Hero, Categories, BestSelling, Offers, Reviews)
│   │   ├── navbar/             # Navigation header with live badge counters and search link
│   │   └── product/            # Product cards, grids, images, and ratings
│   ├── data/
│   │   └── products.js         # Static catalog data (flower listings, prices, categories, images)
│   ├── layouts/
│   │   └── MainLayout.jsx      # Top-level shell rendering Promo Bar, Navbar, Outlet, and Footer
│   ├── pages/                  # Page-level route views
│   │   ├── Cart.jsx            # Shopping cart management
│   │   ├── Category.jsx        # Category-based catalog browsing
│   │   ├── Checkout.jsx        # Multi-field checkout and payment selection
│   │   ├── ForgotPassword.jsx  # Multi-step password reset
│   │   ├── Home.jsx            # Storefront homepage
│   │   ├── Login.jsx           # User authentication
│   │   ├── NotFound.jsx        # 404 error page
│   │   ├── OrderDetails.jsx    # Individual order receipt and tracker
│   │   ├── Orders.jsx          # User order history
│   │   ├── OrderSucces.jsx     # Order confirmation screen
│   │   ├── ProductDetails.jsx  # Product detail view with gallery and purchase actions
│   │   ├── Products.jsx        # Main catalog with search params, filters, and sorting
│   │   ├── Profile.jsx         # User profile and account summary
│   │   ├── Register.jsx        # User registration
│   │   ├── Search.jsx          # Keyword search results view
│   │   └── Wishlist.jsx        # Saved flowers view
│   ├── routes/
│   │   ├── AppRoutes.jsx       # Route declarations and layout mapping
│   │   └── PublicRoute.jsx     # Route guard redirecting authenticated users away from auth pages
│   ├── utils/
│   │   └── storage.js          # Centralized localStorage helper functions and custom event dispatchers
│   ├── App.css                 # Application-wide supplementary CSS
│   ├── App.jsx                 # Root component mounting routes and toaster provider
│   ├── index.css               # Tailwind CSS setup and base styling rules
│   └── main.jsx                # Entry point configuring StrictMode and BrowserRouter
├── eslint.config.js            # ESLint flat configuration file
├── index.html                  # HTML entry template
├── package.json                # Project dependencies, metadata, and scripts
└── vite.config.js              # Vite configuration (plugins and base path)
```

---

## State Management & Persistence

Rosenlilly uses a lightweight, dependency-free state architecture composed of native React hooks combined with a centralized storage utility:

1. **Local Component State**: Standard React hooks (`useState`, `useMemo`, `useCallback`, `useEffect`) manage form inputs, visual states, and temporary data.
2. **Centralized Storage Access (`src/utils/storage.js`)**: All operations involving browser `localStorage` are centralized in `storage.js`. Direct `localStorage` reads and writes are avoided in component files.
3. **Storage Schema**:
   | Storage Key | Content | Purpose |
   | --- | --- | --- |
   | `currentUser` | Object | Active user profile (`id`, `name`, `email`, `phone`). |
   | `users` | Array of Objects | Registered user database. |
   | `cart_<userId>` | Array of Objects | User-specific cart items with quantities. |
   | `wishlist_<userId>` | Array of Objects | User-specific bookmarked products. |
   | `orders` | Array of Objects | Placed orders across the application. |
4. **Reactive Cross-Component Synchronization**:
   Components listen for and react to custom window events dispatched by `storage.js`:
   - `authChange`: Dispatched when users log in, update credentials, or log out.
   - `userChange`: Dispatched on profile edits.
   - `cartChange`: Dispatched when cart items or quantities change.
   - `wishlistChange`: Dispatched when wishlist items are added or removed.
   - `ordersChange`: Dispatched when an order is placed.

*Note: No external state container (such as Redux or Context providers) is used in this codebase.*

---

## Testing & Verification

The project does not currently configure an automated test runner (such as Vitest, Jest, or Cypress). Code verification is conducted through static analysis, build compilation, and manual testing:

1. **Linting Verification**:
   ```bash
   npm run lint
   ```
   Ensures compliance with ESLint rules, catches syntax errors, and validates React hook dependencies.

2. **Build Verification**:
   ```bash
   npm run build
   ```
   Ensures that all JSX and JavaScript modules transform cleanly without compilation or bundling errors.

3. **Manual Verification**:
   Use `npm run dev` or `npm run preview` to verify interactive features (catalog navigation, cart operations, wishlist toggles, authentication, and checkout) in the browser.

---

## Production Build

To create an optimized production build:

```bash
npm run build
```

Vite compiles and minifies all assets into the `dist/` folder:
- `dist/index.html`: Optimized HTML entry point.
- `dist/assets/*.js`: Bundled JavaScript chunks.
- `dist/assets/*.css`: Extracted and minified Tailwind stylesheet.

To inspect and test the production bundle locally:
```bash
npm run preview
```

---

## Deployment

### GitHub Pages (Configured via CI/CD)
The repository includes an automated GitHub Actions workflow in `.github/workflows/deploy.yml`. When changes are pushed to the `main` branch, the workflow:
1. Checks out the code.
2. Sets up Node.js 22.
3. Installs dependencies via `npm ci`.
4. Runs `npm run build`.
5. Uploads the `./dist` folder and deploys it to GitHub Pages.

Because the app is deployed to a subpath on GitHub Pages, the base path is configured in `vite.config.js`:
```javascript
export default defineConfig({
  base: "/rosenlilly",
  // ...
});
```
And `src/main.jsx` utilizes this base path for client-side routing:
```jsx
<BrowserRouter basename={import.meta.env.BASE_URL}>
  <App />
</BrowserRouter>
```

### Generic Static Hosting (Vercel, Netlify, Cloudflare Pages, S3/CloudFront)
To deploy to a custom root domain (e.g., `https://yourdomain.com/`):
1. In `vite.config.js`, adjust the `base` property to `"/"` (or remove the property to use Vite's default).
2. Configure your hosting platform to redirect all requests to `index.html` (Single Page Application rewrite rule). For example:
   - **Netlify**: Add a `_redirects` file with `/*  /index.html  200`.
   - **Vercel**: Add a `vercel.json` with a rewrite rule to `/index.html`.

---

## Notes & Current Scope

- **Front-End Prototype**: Rosenlilly is currently a client-side frontend prototype. It operates without a live backend API or cloud database.
- **Client-Side Storage**: All user registrations, logins, cart changes, and orders are stored in the client's local browser memory. Clearing browser storage will reset the application to its default state.
- **Simulated Transactions**: Checkout and payment options (Cash on Delivery, Card, UPI) are mock simulations; no actual financial processing or third-party payment gateways are involved.
- **Static Catalog**: Product inventory is statically served from `src/data/products.js`. Remote product images are loaded from Unsplash.
