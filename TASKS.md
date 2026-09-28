# Rosenlilly — Master Task Tracker

This is the master task tracker for Rosenlilly. Keep task status current here; keep technical decisions and architecture in `PROJECT_CONTEXT.md`.

## Status key

- `[x]` Complete
- `[ ]` Planned / incomplete
- `[~]` In progress
- `[!]` Blocked or requires a decision

---

## Completed

- [x] Establish Vite + React application shell and shared layout.
- [x] Build responsive storefront home sections: hero, categories, offers, best sellers, and reviews.
- [x] Add a static eight-product flower catalogue.
- [x] Implement product search and catalogue sorting/filter controls.
- [x] Implement local registration, login, logout, profile edit, and password-reset flows.
- [x] Implement user-scoped cart and wishlist flows from product cards.
- [x] Implement a local checkout flow, order creation, order list, order details, and order-success page.
- [x] Protect profile, orders, checkout, and order-success routes.
- [x] Add project source-of-truth documentation (`PROJECT_CONTEXT.md` and this tracker).

---

## Highest priority — Core journey correctness

- [x] Fix category navigation by standardizing catalogue-category links on `/flowers?category=<slug>`.
- [x] Read the `category` query parameter in `Products` and synchronize category filter controls with it.
- [x] Add working occasion and offer catalogue filtering and synchronize UI filter controls with URL parameters.
- [x] Unify `ProductDetails` cart/wishlist operations with shared user-scoped storage helpers.
- [x] Make login return the shopper to `location.state.from` when provided.
- [x] Verify the full shopper flow manually: category → product → cart → checkout → order confirmation → order history.

---

## Quality and maintainability

- [x] Restore a clean `npm run lint`.
- [x] Replace malformed Tailwind arbitrary-value classes with valid Tailwind syntax.
- [x] Remove confirmed debug `console.log` statements.
- [x] Consolidate duplicated localStorage parsing and custom-event dispatching through `src/utils/storage.js`.
- [x] Decide whether to adopt Redux; remove unused Redux scaffolding because the current architecture does not use Redux.
- [x] Remove unused `src/services/api.js` and confirmed unused placeholders.
- [x] Replace the default Vite README with setup, architecture, testing, and deployment documentation.

---

# Product and platform work

## Backend and database

- [ ] Add a backend/API architecture for the production application.
- [ ] Add persistent database storage for users, products, carts, orders, and related entities.
- [ ] Define backend database models for users, products, categories, carts, orders, order items, payments, addresses, and delivery slots.
- [ ] Replace client-only product data with backend/API-driven product data.
- [ ] Add API validation and consistent error-response handling.
- [ ] Add API authentication and authorization middleware.
- [ ] Add request validation and sanitization.
- [ ] Add centralized backend error handling and logging.

## Authentication and security

- [ ] Replace browser-only authentication with secure server-backed authentication.
- [ ] Never store plaintext passwords; hash passwords securely on the server.
- [ ] Implement secure session/token handling.
- [ ] Add protected backend routes and role-based authorization.
- [ ] Add user account verification/recovery flows.
- [ ] Add rate limiting for authentication-sensitive endpoints.
- [ ] Review CORS, security headers, cookies/tokens, and environment-secret handling.
- [ ] Remove all production secrets from source code and client bundles.

---

# Admin Panel

## Admin foundation

- [ ] Create a dedicated admin application/route structure.
- [ ] Implement admin authentication.
- [ ] Implement role-based access control for admin users.
- [ ] Protect all admin routes from normal shoppers.
- [ ] Create an admin dashboard with key business metrics.

## Product management

- [ ] Add product list/table with search, filtering, sorting, and pagination.
- [ ] Add create-product functionality.
- [ ] Add edit-product functionality.
- [ ] Add product deletion/archive functionality.
- [ ] Add product image management.
- [ ] Manage product categories and occasions.
- [ ] Manage pricing, discounts, offers, availability, and stock.
- [ ] Add product status controls such as active/inactive/out-of-stock.

## Order management

- [ ] Add admin order list.
- [ ] Add order search/filter/sort.
- [ ] Add order details view.
- [ ] Allow authorized admins to update order status.
- [ ] Add order lifecycle states such as pending, confirmed, preparing, dispatched, delivered, cancelled, and refunded.
- [ ] Record order-status history/audit information.

## Customer management

- [ ] Add customer list.
- [ ] Add customer search and filtering.
- [ ] Add customer profile/details view.
- [ ] Allow authorized admin actions on customer accounts.
- [ ] Display customer order history.

## Admin operations

- [ ] Add inventory management.
- [ ] Add delivery-area management.
- [ ] Add delivery-slot/date management.
- [ ] Add coupon/discount management.
- [ ] Add basic sales/order analytics.
- [ ] Add admin activity/audit logs.

---

# Payments and checkout

- [ ] Integrate a real payment provider only after backend order validation exists.
- [ ] Create server-side payment/order verification.
- [ ] Handle successful, failed, cancelled, and pending payments.
- [ ] Prevent duplicate order creation/payment processing.
- [ ] Store payment status securely.
- [ ] Implement refund handling where supported.
- [ ] Ensure checkout totals are calculated and validated server-side.

---

# Inventory and delivery

- [ ] Add server-side inventory tracking.
- [ ] Prevent checkout when requested quantity exceeds available stock.
- [ ] Add inventory reservation during checkout where required.
- [ ] Add delivery-area/pincode validation.
- [ ] Add delivery-date availability validation.
- [ ] Add delivery-slot selection.
- [ ] Validate same-day delivery eligibility before promising it.
- [ ] Add delivery charges/rules.
- [ ] Display delivery availability consistently across product and checkout pages.

---

# Customer experience

- [ ] Add product reviews and ratings.
- [ ] Add related/recommended products.
- [ ] Add recently viewed products.
- [ ] Improve product image gallery/zoom.
- [ ] Add wishlist persistence through the backend.
- [ ] Add customer order tracking.
- [ ] Add order cancellation rules.
- [ ] Add reorder functionality.
- [ ] Add coupon application at checkout.
- [ ] Add transactional order confirmation notifications.
- [ ] Add email/SMS/WhatsApp notification integration where appropriate.
- [ ] Improve empty, loading, error, and success states throughout the application.

---

# Search, catalogue and SEO

- [ ] Expand the product catalogue with production-quality product data.
- [x] Define stable product/category/occasion schemas.
- [ ] Improve catalogue filtering and sorting.
- [ ] Add pagination or infinite loading for larger catalogues.
- [ ] Improve product search relevance.
- [ ] Add SEO-friendly page metadata.
- [ ] Add product structured data where appropriate.
- [ ] Add sitemap generation.
- [ ] Add robots.txt configuration.
- [ ] Add canonical URLs where needed.
- [ ] Review social sharing metadata for product pages.

---

# Performance and responsive UX

- [ ] Optimize product/image loading.
- [ ] Add responsive image handling.
- [ ] Lazy-load suitable images/components.
- [ ] Review bundle size and unnecessary dependencies.
- [ ] Optimize large catalogue rendering.
- [ ] Test mobile, tablet, and desktop layouts.
- [ ] Test major browsers.
- [ ] Review accessibility of navigation, forms, buttons, dialogs, and images.
- [ ] Add keyboard navigation where appropriate.
- [ ] Verify sufficient color contrast and visible focus states.

---

# Testing

## Frontend

- [ ] Add an automated frontend test framework.
- [ ] Add tests for routing.
- [ ] Add tests for storage helpers.
- [ ] Add tests for cart mutations.
- [ ] Add tests for wishlist mutations.
- [ ] Add tests for checkout calculations.
- [ ] Add tests for order ownership.
- [ ] Add tests for authentication flows.
- [ ] Add tests for catalogue filtering/search.

## Backend

- [ ] Add backend unit tests.
- [ ] Add API integration tests.
- [ ] Add authentication/authorization tests.
- [ ] Add payment/order validation tests.
- [ ] Add inventory validation tests.

## End-to-end

- [ ] Add end-to-end tests for the main shopper journey.
- [ ] Add end-to-end tests for admin workflows.
- [ ] Add regression tests for critical checkout/payment flows.

---

# Deployment and DevOps

- [ ] Define production frontend deployment.
- [ ] Define production backend deployment.
- [ ] Configure production database.
- [ ] Configure environment variables/secrets securely.
- [ ] Add CI checks for lint and build.
- [ ] Run automated tests in CI.
- [ ] Add preview/staging environment.
- [ ] Add production deployment workflow.
- [ ] Add database migration strategy.
- [ ] Add backup/recovery strategy.
- [ ] Add production logging and monitoring.
- [ ] Add error monitoring.
- [ ] Configure domain and HTTPS.
- [ ] Review production security configuration.

---

# Documentation

- [x] Maintain `README.md` with setup, architecture, testing, and deployment documentation.
- [x] Maintain `PROJECT_CONTEXT.md` as the technical source of truth.
- [ ] Document backend API endpoints.
- [ ] Document database schema.
- [ ] Document authentication/authorization architecture.
- [ ] Document admin roles and permissions.
- [ ] Document payment/order lifecycle.
- [ ] Document deployment and environment configuration.
- [ ] Document contribution/development workflow.

---

# Definition of Done for New Work

- [ ] Feature works through its relevant user flow.
- [ ] Routes, storage/API interactions, and UI states are consistent.
- [ ] Loading, empty, error, and success states are handled.
- [ ] Authentication/authorization requirements are enforced where applicable.
- [ ] `npm run build` succeeds.
- [ ] `npm run lint` succeeds, or any justified exception is documented before merging.
- [ ] Automated tests are added/updated for applicable functionality.
- [ ] `PROJECT_CONTEXT.md` and this tracker are updated when applicable.
- [ ] Changes are reviewed before commit.
- [ ] No secrets or sensitive configuration are committed.
