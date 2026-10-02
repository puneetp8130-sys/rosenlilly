# Rosenlilly Backend API

Backend service for the Rosenlilly flower storefront application.

## Tech Stack

- **Node.js** with ES Modules (`type: module`)
- **Express.js** 4.x
- **MongoDB** + **Mongoose** for database
- **Cors** for cross-origin resource sharing
- **Helmet** for secure HTTP headers
- **Morgan** for HTTP request logging
- **Dotenv** for environment variable management

## Prerequisites

- **Node.js** 18+
- **MongoDB** 6+ running on `127.0.0.1:27017` (or configure `MONGODB_URI`)

## Directory Structure

```text
server/
├── .env                  # Local environment configuration (gitignored)
├── .env.example          # Template environment configuration
├── package.json          # Server dependencies and scripts
├── README.md             # Documentation
└── src/
    ├── app.js            # Express application instance & middleware pipeline
    ├── server.js         # HTTP server entry point, MongoDB connection & graceful shutdown
    ├── config/
    │   ├── env.js        # Centralized environment variable loader
    │   └── database.js   # MongoDB/Mongoose connection & status
    ├── middlewares/
    │   ├── errorHandler.js   # Centralized error handler
    │   └── notFoundHandler.js # 404 Route Not Found handler
    ├── models/
    │   ├── User.js       # User schema (auth deferred to Phase 3)
    │   ├── Category.js   # Product category schema
    │   ├── Product.js    # Product schema
    │   ├── Cart.js       # Shopping cart schema
    │   ├── Wishlist.js   # Wishlist schema
    │   └── Order.js      # Order schema
    ├── routes/
    │   ├── index.js      # API router root
    │   └── health.routes.js # /api/health endpoint
    └── seeds/
        ├── seed.js           # Main seed runner script
        ├── products.seed.js  # Product seed data (8 products)
        └── categories.seed.js # Category seed data (6 categories)
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` if not already present:
```bash
cp .env.example .env
```

Environment variables:

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/rosenlilly` |

### 3. Seed the Database
```bash
npm run seed
```
Seeds 6 categories and 8 products. This command is idempotent — running it multiple times will not create duplicates.

### 4. Start Development Server
```bash
npm run dev
```

### 5. Start Production Server
```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description | Expected Status |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Service health + database status | `200 OK` |
| `ALL` | `/api/*` (unmatched) | Route not found | `404 Not Found` |

### Health Endpoint Response

```json
{
  "success": true,
  "message": "Rosenlilly API is running",
  "environment": "development",
  "database": {
    "status": "connected"
  }
}
```
