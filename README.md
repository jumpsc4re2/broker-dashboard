# Broker Dashboard

A local broker administration dashboard with a React frontend, an Express/Prisma backend, PostgreSQL storage, and simulated live position updates over WebSockets.

> Status: under active development. Auth/RBAC are in progress.

## Features

The following behavior is implemented in the current code:

- Dashboard page with locally defined revenue cards and Recharts-based sample charts.
- Account, trade, currency, symbol, and moderator list pages backed by backend GET endpoints.
- Positions table fed by a WebSocket stream from the backend.
- Account profile route with streamed positions filtered by account ID.
- Client-side table sorting, filtering by ID, pagination, row selection, column visibility, and local column reordering.
- Client-side form validation for the login, create-account, and account-update forms.
- Light, dark, system, and color-theme selection persisted in browser local storage.
- Seed data for accounts, positions, trades, moderators, currencies, and symbols.

The login form, account create/update/delete actions, chat, profile, settings, activity, and dashboard data loading are not connected to backend workflows. See Roadmap.

## Tech stack

Versions below are the declared package versions/ranges in the application manifests.

### Frontend

- React ^19.2.0
- TypeScript ~5.9.3
- Vite ^7.2.4
- React Router ^7.12.0
- Tailwind CSS ^4.1.17
- TanStack React Table ^8.21.3
- Recharts ^2.15.4
- React Hook Form ^7.71.1
- Zod ^4.3.6
- shadcn/Radix-style UI components with Lucide icons

Manifest: frontend/package.json

### Backend

- Node.js 20.20.2 pinned through Volta
- TypeScript ^5.8.3
- Express ^4.21.2
- Prisma and @prisma/client ^6.9.0
- ws ^8.21.0
- cors ^2.8.5
- PostgreSQL

Manifest: backend/package.json

## Architecture

~~~text
broker-dashboard/
├── frontend/
│   ├── src/pages/       Route-level screens and feature pages
│   ├── src/components/  Shared UI and data-table components
│   ├── src/layout/      Application shell, header, and sidebar
│   ├── src/hooks/       Browser and data-fetching hooks
│   ├── src/theme/       Theme context and provider
│   └── package.json
├── backend/
│   ├── src/index.ts     Express and WebSocket bootstrap
│   ├── src/routes/      Read-only resource routers
│   ├── src/socket/      Simulated position price feed
│   ├── prisma/          Schema, migration, and seed data
│   └── package.json
└── README.md
~~~

### Frontend

Routes are declared in frontend/src/main.tsx. The application shell is provided by AppLayout; the login route is rendered under AuthLayout. REST pages use native fetch calls in components or hooks. There is no shared query cache or global business-state store.

### REST API

The backend registers these unauthenticated read-only routes:

| Method | Path | Purpose |
| --- | --- | --- |
| GET | /api/accounts | List accounts |
| GET | /api/positions | List positions with account summary fields |
| GET | /api/trades | List trades with account summary fields |
| GET | /api/moderators | List moderators |
| GET | /api/currencies | List currencies |
| GET | /api/symbols | List symbols |

Route registration is in backend/src/index.ts; implementations are in backend/src/routes/.

### Database

Prisma uses PostgreSQL through the DATABASE_URL environment variable. The schema is in backend/prisma/schema.prisma, and the initial migration is in backend/prisma/migrations/.

### WebSocket price feed

The backend opens a WebSocket server on the same HTTP server and sends a positions:update JSON message once per second. The payload contains positions with a randomly varied current price and calculated P&L. It is demo data, not a market-data integration. The implementation is in backend/src/socket/PriceSimulator.ts; frontend consumers are frontend/src/pages/positions/PositionsPage.tsx and frontend/src/pages/accounts/account-profile/AccountProfile.tsx.

## Getting Started

### Prerequisites

- Node.js 20.20.2 or a compatible Node.js 20 release
- npm
- Docker Desktop, or a PostgreSQL server reachable from the backend
- Ports 5433, 3000, and 5173 available for the default local setup

### 1. Start PostgreSQL

The current local setup uses a PostgreSQL container published on host port 5433.

For a new local container:

~~~bash
docker run --name broker-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=change-me-local \
  -e POSTGRES_DB=brokerdb \
  -p 5433:5432 \
  -d postgres
~~~

If the container already exists:

~~~bash
docker start broker-postgres
~~~

### 2. Install dependencies

Run these commands from the repository root:

~~~bash
cd backend
npm ci

cd ../frontend
npm ci
~~~

### 3. Configure the backend environment

Copy the example environment file:

~~~bash
cd backend
cp .env.example .env
~~~

For the Docker command above, set DATABASE_URL in backend/.env to:

~~~dotenv
DATABASE_URL="postgresql://postgres:change-me-local@localhost:5433/brokerdb"
PORT=3000
~~~

The current backend does not implement JWT authentication; JWT_SECRET in .env.example is not currently used by the code.

### 4. Apply the database migration and seed data

Run from backend/:

~~~bash
npx prisma generate
npx prisma migrate deploy
npm run seed
~~~

The seed script clears the existing demo tables before inserting its sample records. Do not run it against data that must be preserved.

### 5. Run the backend

In one terminal:

~~~bash
cd backend
npm run dev
~~~

The backend listens on http://localhost:3000 by default.

For a compiled backend instead:

~~~bash
cd backend
npm run build
npm run start
~~~

### 6. Run the frontend

In a second terminal:

~~~bash
cd frontend
npm run dev
~~~

Vite serves the frontend at its default local address, normally http://localhost:5173.

To build and preview the frontend:

~~~bash
cd frontend
npm run build
npm run preview
~~~

## Verification commands

~~~bash
cd backend
npm run build

cd ../frontend
npm run build
npm run lint
~~~

`npm run lint` and `npm run build` pass; lint still emits warnings but no errors.

## Screenshots

<!-- PLACEHOLDER: Add screenshots here. -->

## Demo

<!-- PLACEHOLDER: Add a demo URL here when one exists. -->

## Roadmap

These items are not implemented in the current code:

- Backend authentication, sessions/tokens, logout, protected routes, and role-based authorization.
- Create, update, and delete API endpoints for accounts and other resources.
- Server-side request validation, pagination, filtering, rate limiting, and API documentation.
- Production market-data integration. The current WebSocket feed is randomized demo data.
- WebSocket authentication, reconnection, heartbeat, stale-state handling, and backoff.
- Backend-backed dashboard metrics and charts.
- Functional chat, activity, profile, settings, password reset, and logout workflows.
- Automated unit, integration, and end-to-end tests.
- Deployment configuration and CI/CD workflows.
