# Rosenlilly — Master Task Tracker

This is the master task tracker for Rosenlilly. Keep task status current here; keep technical decisions and architecture in `PROJECT_CONTEXT.md`.

## Status key

- `[x]` Complete
- `[ ]` Planned / incomplete
- `[~]` In progress
- `[!]` Blocked or requires a decision

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

## Highest priority — core journey correctness

- [x] Fix category navigation by standardizing catalogue-category links on `/flowers?category=<slug>`; unsupported occasion/offer links now lead to the full catalogue instead of a 404 page.
- [x] Read the `category` query parameter in `Products` and synchronize category filter controls with it.
- [x] Add working occasion (`/flowers?occasion=birthday`, `/flowers?occasion=anniversary`) and offer (`/flowers?offer=true`) catalogue filtering, synchronize UI filter controls with URL parameters, and connect navigation links.
- [x] Unify `ProductDetails` cart/wishlist operations with the shared user-scoped storage helpers (`cart_<userId>` and `wishlist_<userId>`), including a login gate and sync on auth/cart/wishlist changes.
- [x] Make login return the shopper to `location.state.from` when provided, otherwise return to `/`.
- [x] Verify the full shopper flow manually: category → product → cart → checkout → order confirmation → order history.

## Quality and maintainability

- [ ] Restore a clean `npm run lint`. Current issues include unused React imports, unused variables, and hook/state-effect rule violations.
- [ ] Replace malformed Tailwind arbitrary-value classes such as `min-h-[<560px>]` and `aspect-[<4/5>]` with valid Tailwind syntax; verify affected responsive layouts visually.
- [x] Remove confirmed debug `console.log` statements from routing, layout, and auth-guard components.
- [ ] Consolidate duplicated localStorage parsing and custom-event dispatching through `src/utils/storage.js`.
- [ ] Decide whether to adopt Redux. If it is not needed, remove the empty `src/redux` scaffolding; if it is needed, install/configure Redux Toolkit and migrate state deliberately.
- [ ] Either implement or remove empty placeholders: `src/services/api.js`, common UI components, and unused component files.
- [ ] Replace the default Vite README with setup, architecture, testing, and deployment documentation.

## Product and platform work

- [ ] Expand the catalogue and define a stable product schema (description, images, variants, availability, categories, and pricing).
- [ ] Add a backend/API and persistent database for users, products, carts, and orders.
- [ ] Replace browser-only authentication and plaintext localStorage passwords with secure, server-backed authentication.
- [ ] Integrate a real payment provider only after backend order validation exists.
- [ ] Add inventory, delivery-area, and delivery-date validation before promising same-day delivery.
- [ ] Add automated tests for routing, storage helpers, cart/wishlist mutations, checkout totals, and order ownership.

## Definition of done for new work

- [ ] The feature works through its relevant user flow.
- [ ] Routes, storage/API interactions, and UI states are consistent.
- [ ] `npm run build` succeeds.
- [ ] `npm run lint` succeeds (or any justified exception is documented before merging).
- [ ] `PROJECT_CONTEXT.md` and this tracker are updated when applicable.
