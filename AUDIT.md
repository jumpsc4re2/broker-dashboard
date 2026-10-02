# Broker Board — factual technical audit

Audit scope: the checked-out files under `frontend/` and `backend/`. Claims below are based on source/configuration inspection and local `npm run build`/`npm run lint` runs on 2026-10-01. “Works” means the code path exists and is wired as shown; it does not mean the feature is production-ready. No live deployment was found or tested.

## 1. PRODUCT & SCOPE

### What the product is

- The repository presents a broker/admin dashboard for viewing forex-style accounts, open positions, closed trades, moderators, currencies, and symbols. The data model is in `backend/prisma/schema.prisma`; the navigation and routes are in `frontend/src/main.tsx` and `frontend/src/layout/side-bar/AppSidebarContent.tsx`.
- The apparent users are internal administrators/moderators. The database has `Moderator.isSuperAdmin`, but there is no user login/account relationship or permission implementation. `backend/prisma/schema.prisma`, `backend/prisma/seed.ts`.
- The login screen asks for “Admin ID” and “Admin Password,” but it only validates locally, waits one second, and logs the submitted data. It does not call the backend or create a session. `frontend/src/pages/auth-pages/login/LoginForm.tsx:10-29`.

### Pages/features actually wired

- Dashboard (`/`): renders four hardcoded revenue cards and several charts. The chart/card data is defined in frontend files, not fetched from the API. `frontend/src/pages/dashboard/Dashboard.tsx:1-44` and `frontend/src/pages/dashboard/`.
- Accounts (`/accounts`): fetches `GET http://localhost:3000/api/accounts` and displays the response in a table. The “Add Account” dialog validates with Zod but only waits, logs, and closes; it does not POST. `frontend/src/pages/accounts/Accounts.tsx:18-42`, `frontend/src/pages/accounts/CreateAccountDialog.tsx:45-61`.
- Account profile (`/accounts/:id`): opens a WebSocket and filters streamed positions by `accountId`; account summary values are hardcoded, and update/delete actions do not call the backend. `frontend/src/pages/accounts/account-profile/AccountProfile.tsx:75-98`, `:116-145`, `:157-263`.
- Positions (`/positions`): consumes the backend WebSocket’s `positions:update` messages and renders a table. `frontend/src/pages/positions/PositionsPage.tsx:12-35`.
- Trades (`/trades`): fetches `GET /api/trades` and displays the result. `frontend/src/pages/trades/TradesPage.tsx:11-31`.
- Currencies (`/currencies`): fetches `GET /api/currencies` through a small custom hook and displays the result. `frontend/src/hooks/useCurrencies.ts:4-27`, `frontend/src/pages/currencies/CurrenciesPage.tsx:1-21`.
- Symbols (`/symbols`): fetches `GET /api/symbols` and displays the result. `frontend/src/pages/symbols/SymbolsPage.tsx:8-36`.
- Moderators (`/moderators`): fetches `GET /api/moderators` and displays the result. `frontend/src/pages/moderators/ModeratorsPage.tsx:8-37`.
- Login (`/login`): the form UI and client-side validation render, but authentication is a stub. `frontend/src/main.tsx:49-52`, `frontend/src/pages/auth-pages/login/LoginForm.tsx:10-29`.

### Clearly stubbed/placeholder

- Activity and Settings are headings only. Profile is also a heading only. `frontend/src/pages/activity/ActivityPage.tsx:1-9`, `frontend/src/pages/settings/SettingsPage.tsx:1-9`, `frontend/src/pages/profile/ProfilePage.tsx:1-9`.
- Chat is static sample data; selecting a contact is an anchor to `#`, and sending only logs to the console and clears the input. There is no chat backend or WebSocket message handling. `frontend/src/pages/chat/ContactsSection.tsx:12-58`, `frontend/src/pages/chat/MessagesSection.tsx:12-105`.
- Dashboard values are generic/template-like: “Product Revenue,” “Total Orders,” “System Revenue,” and “Company Revenue” are hardcoded props. `frontend/src/pages/dashboard/Dashboard.tsx:11-35`.
- “Forgot your password?” is `href="#"`. Logout is a menu item without an event handler. `frontend/src/pages/auth-pages/login/LoginForm.tsx:55-60`, `frontend/src/layout/side-bar/AppSidebarFooter.tsx:50-74`.

## 2. TECH STACK

- Frontend: React 19, TypeScript 5.9, Vite 7, React Router 7, Tailwind CSS 4 via `@tailwindcss/vite`, shadcn-style/Radix UI components, TanStack React Table 8, Recharts 2, React Hook Form 7, Zod 4, `next-themes`, Sonner, Lucide, `date-fns`, `countries-list`. Declared ranges are in `frontend/package.json`; installed versions are visible from the local `npm list --depth=0` run and lockfile.
- Backend: Node 20 is pinned through Volta; TypeScript 5.9, Express 4, `ws` 8, CORS 2, Prisma 6, PostgreSQL. `backend/package.json`, `backend/src/index.ts:1-38`, `backend/prisma/schema.prisma:1-4`.
- Runtime dependency confirmed from the supplied Docker Desktop screenshot: a running container named `broker-postgres` uses the `postgres` image and publishes host port `5433` to container port `5432`. This matches the backend connection string’s `localhost:5433`. The container is external runtime state, not configuration represented in the repository. Evidence: `backend/.env` and the supplied Docker Desktop screenshot.
- Package manager: npm, evidenced by `package-lock.json` in both app directories and npm scripts. `frontend/package-lock.json`, `backend/package-lock.json`.
- Build tooling: frontend `tsc -b && vite build`; backend `tsc`; development uses Vite and `tsx watch`. `frontend/package.json`, `backend/package.json`.
- The frontend declares no React Query, SWR, Redux, Zustand, or equivalent server/global state library. `frontend/package.json`.

## 3. ARCHITECTURE

### Annotated tree (2–3 levels)

```text
broker-dashboard/
├── frontend/
│   ├── src/
│   │   ├── pages/              route-level screens, mostly feature folders
│   │   ├── components/         shared UI and data-table components
│   │   ├── layout/             root, app shell, header, sidebar
│   │   ├── hooks/              theme, mobile, currency fetch, utility hooks
│   │   ├── theme/              theme context/provider
│   │   ├── lib/                formatting and utility helpers
│   │   └── types/              chat/message types
│   ├── vite.config.ts
│   ├── eslint.config.js
│   └── package.json
└── backend/
    ├── src/
    │   ├── index.ts            Express/HTTP/WebSocket bootstrap
    │   ├── routes/             one router per read-only resource
    │   └── socket/PriceSimulator.ts
    ├── prisma/
    │   ├── schema.prisma       PostgreSQL schema
    │   ├── seed.ts             destructive demo seed
    │   └── migrations/         one initial migration
    ├── tsconfig.json
    └── package.json
```

Evidence: directory layout from `frontend/src/` and `backend/src/`; route registration is in `frontend/src/main.tsx:27-55` and `backend/src/index.ts:22-28`.

### Organization and routing

- The frontend is route/page-oriented with shared UI primitives, not a complete domain/service-layer architecture. Routes are declared centrally with `createBrowserRouter`. `frontend/src/main.tsx:27-55`.
- All application routes are nested under `AppLayout`; `/login` is under `AuthLayout`, but there is no guard separating them. `frontend/src/main.tsx:32-52`.
- The backend is a thin Express bootstrap plus one router per resource. Each router creates its own `PrismaClient`, rather than receiving the singleton created in `src/index.ts`. `backend/src/index.ts:12-28`, `backend/src/routes/accounts.ts:1-5`, and the other route files.

### Data flow and state

- REST reads use native `fetch` directly inside `useEffect` or a custom hook. There is no cache, deduplication, invalidation, retry policy, abort controller, or shared API client. `frontend/src/pages/accounts/Accounts.tsx:18-42`, `frontend/src/pages/trades/TradesPage.tsx:11-31`, `frontend/src/hooks/useCurrencies.ts:10-25`.
- The positions page and account profile use local component state fed by a raw browser `WebSocket`. `frontend/src/pages/positions/PositionsPage.tsx:7-35`, `frontend/src/pages/accounts/account-profile/AccountProfile.tsx:28-98`.
- Table sorting, filtering, visibility, selection, column order, and client pagination live in `DataTable` local state. `frontend/src/components/data-table/DataTableComponent.tsx:47-79`.
- Theme choice and color-theme choice are persisted in `localStorage`; no business data or auth state is persisted. `frontend/src/theme/theme-provider.tsx:20-63`.
- URL state is limited to router location and the account `:id` parameter. `frontend/src/main.tsx:35-46`, `frontend/src/pages/accounts/account-profile/AccountProfile.tsx:34-35`.

## 4. AUTH & AUTHORIZATION

- There is no backend login endpoint. The only backend endpoints are the resource GET routes registered in `backend/src/index.ts:22-28`; none checks an `Authorization` header or session.
- The frontend login form has client-side Zod validation only. Its submit handler delays for one second and logs credentials; it does not navigate, call `fetch`, store a token, or set user state. `frontend/src/pages/auth-pages/login/LoginForm.tsx:10-29`.
- There is no token, cookie, refresh, expiry, logout, protected-route component, auth context, or redirect. The router renders `AppLayout` routes directly without a guard. `frontend/src/main.tsx:27-52`.
- The schema contains `Moderator.isSuperAdmin`, but no role enum, permission map, middleware, route guard, or UI role check exists. `backend/prisma/schema.prisma:39-45`; `backend/src/` has no auth/guard middleware files.
- Security consequence: every resource route and the unauthenticated WebSocket are reachable to any client that can reach the server. `backend/src/index.ts:22-35`, all files under `backend/src/routes/`.

## 5. REAL-TIME / WEBSOCKET

### Connection and message contract

- The backend attaches a `ws` `WebSocketServer` to the HTTP server with no path restriction or authentication. `backend/src/index.ts:30-35`.
- Each connection receives a JSON message once per second with shape `{ type: "positions:update", payload: PositionWithLiveData[] }`. `backend/src/socket/PriceSimulator.ts:4-14`, `:25-58`.
- The frontend creates `ws://localhost:3000` in Positions and Account Profile, parses every message, accepts only `positions:update`, and replaces local state. `frontend/src/pages/positions/PositionsPage.tsx:12-34`, `frontend/src/pages/accounts/account-profile/AccountProfile.tsx:75-98`.

### Reliability and behavior gaps

- There is cleanup on component unmount via `ws.close()`, and the server clears its interval on `close`. `frontend/src/pages/positions/PositionsPage.tsx:34`, `frontend/src/pages/accounts/account-profile/AccountProfile.tsx:97`, `backend/src/socket/PriceSimulator.ts:51-57`.
- There is no reconnect, exponential backoff, heartbeat/ping, authentication, sequence number, timestamp, stale-data indicator, disconnected-state UI, throttling, batching, or message schema validation. The client’s `onclose` only logs. `frontend/src/pages/positions/PositionsPage.tsx:26-34`; `backend/src/socket/PriceSimulator.ts:16-58`.
- The “loading” implementation is race-prone: it schedules `setIsLoading(true)` with `setTimeout(..., 0)` while `onopen` may immediately set it false, and it treats socket open—not first data message—as readiness. `frontend/src/pages/positions/PositionsPage.tsx:12-19`.
- The backend reads every position from PostgreSQL separately for every connected client every second. There is no broadcast fan-out, shared snapshot, connection limit, backpressure handling, or query optimization. `backend/src/socket/PriceSimulator.ts:30-47`.

### Is it real trading data?

- It is a demo simulator, not a market-data integration. For each position, `currentPrice` is `openPrice + (Math.random() - 0.5) * 0.002`; P&L is a simple price-difference × volume × 1000 calculation, with a sign inversion for sells. `backend/src/socket/PriceSimulator.ts:16-28`.
- The seed data is fixed sample data: 5 accounts, 10 positions, 10 trades, 3 moderators, 10 currencies, and 10 symbols. `backend/prisma/seed.ts:5-25`, `:26-172`.

## 6. COMPONENTS & UI

- The UI is custom composition around shadcn/Radix-style primitives under `src/components/ui`; `components.json` identifies the shadcn configuration and Lucide icon library. `frontend/components.json`, `frontend/src/components/ui/`.
- Shared composition includes `AppLayout`, `Header`, `AppSidebar`, `DataTable`, `DataTableColumnHeader`, `DataTableFooter`, `ThemeProvider`, and form primitives. `frontend/src/layout/`, `frontend/src/components/data-table/`, `frontend/src/theme/`.
- Components are TypeScript/TSX, but type discipline is uneven: the generic table exposes `buttons?: any[]`, and several column definitions do not match the Prisma response shape exactly. `frontend/src/components/data-table/DataTableComponent.tsx:36-45`, `frontend/src/pages/trades/columns.tsx:8-19`.

### Tables

- Pagination, sorting, filtering, row selection, visibility, and column ordering are client-side TanStack Table features. `frontend/src/components/data-table/DataTableComponent.tsx:47-79`.
- The backend returns complete arrays with no `page`, `limit`, `offset`, cursor, total, or filter query handling. `backend/src/routes/*.ts`.
- The shared search input always targets the `id` column and says “Search by Id...”; there is no global search or per-field filter UI. `frontend/src/components/data-table/DataTableComponent.tsx:84-91`.
- Column headers can sort and hide columns; header drag-and-drop changes order in local state. There is no persistence. `frontend/src/components/data-table/DataTableColHeader.tsx:22-62`, `frontend/src/components/data-table/DataTableComponent.tsx:115-143`.'
'- There is no row virtualization. All fetched rows are rendered into a normal HTML table. `frontend/src/components/data-table/DataTableComponent.tsx:145-201`.
- Row actions mostly copy IDs; account create/update/delete buttons do not mutate backend data. `frontend/src/pages/accounts/columns.tsx`, `frontend/src/pages/accounts/account-profile/AccountProfile.tsx:157-263`.'
'
### Charts, forms, theme, states

- Charts use Recharts and mostly literal arrays. For example, the profit chart embeds a large date/value array and only switches between two local series. `frontend/src/pages/dashboard/profit-barchart/ProfitBarchart.tsx:19-111`, `:127-216`.'
'- Forms use React Hook Form + Zod on the login, create-account, and account-update UIs, but only the login/create/update client handlers exist; there are no server-side validators. `frontend/src/pages/auth-pages/login/LoginForm.tsx:1-29`, `frontend/src/pages/accounts/CreateAccountDialog.tsx:1-61`, `frontend/src/pages/accounts/account-profile/AccountProfile.tsx:43-74`.'
'- Dark/light/system and a custom color theme are supported through `next-themes`-style local theme code and `localStorage`. `frontend/src/theme/theme-provider.tsx:1-67`, `frontend/src/layout/AppLayout.tsx:10-24`.'
'- Responsive classes and a mobile sidebar hook exist. `frontend/src/hooks/use-mobile.ts`, `frontend/src/layout/side-bar/`, `frontend/src/pages/chat/ContactsSection.tsx:58-125`.'
'- Tables have loading, generic error, and empty states. REST fetches do not check `response.ok`, so HTTP error responses can be treated as JSON data rather than errors. `frontend/src/components/data-table/DataTableComponent.tsx:145-201`, `frontend/src/pages/accounts/Accounts.tsx:18-42`.'
'
## 7. BACKEND

### Endpoint inventory

All listed endpoints are unauthenticated `GET` routes; no POST/PUT/PATCH/DELETE routes exist.

| Method | Path | Purpose | Auth |
|---|---|---|---|
| GET | `/api/accounts` | List accounts, newest first | None |
| GET | `/api/positions` | List positions with limited account fields | None |
| GET | `/api/trades` | List trades with limited account fields | None |
| GET | `/api/moderators` | List moderators, newest first | None |
| GET | `/api/currencies` | List currencies, newest first | None |
| GET | `/api/symbols` | List symbols, newest first | None |'
'
Evidence: route registration in `backend/src/index.ts:22-28`; implementations in `backend/src/routes/accounts.ts`, `positions.ts`, `trades.ts`, `moderators.ts`, `currencies.ts`, and `symbols.ts`.

### Models and persistence

- PostgreSQL is configured through `DATABASE_URL`; Prisma models are Account, Position, Trade, Moderator, Currency, and Symbol. `backend/prisma/schema.prisma:1-60`.
- Account email, moderator email, currency name, and symbol name are unique; positions/trades have indexes on `accountId`; deleting an account cascades to positions/trades. `backend/prisma/schema.prisma:10-60`, `backend/prisma/migrations/20260618041840_init/migration.sql`.
- Monetary and price fields use PostgreSQL `DOUBLE PRECISION`/Prisma `Float`, not decimal/numeric. This is risky for financial calculations. `backend/prisma/schema.prisma:13-35`, migration SQL.

### Validation, errors, pagination, operations

- Route handlers perform no request validation because they accept no write requests and use no query parameters. `backend/src/routes/*.ts`.
- Each handler catches database errors, logs the full error object server-side, and returns a fixed 500 JSON message. There is no centralized error middleware, request ID, structured logger, or error taxonomy. `backend/src/routes/accounts.ts:6-15` and equivalent routes.
- There is no pagination, filtering, sorting parameter validation, rate limiting, health endpoint, metrics, or audit log. `backend/src/index.ts`, `backend/src/routes/*.ts`.
- CORS allows only `http://localhost:5173` and only four methods, which is a local-development setting rather than deployment configuration. `backend/src/index.ts:16-21`.
- Each route instantiates a new `PrismaClient`; the bootstrap also instantiates one for the simulator. This is inconsistent and can create excessive database connections. `backend/src/index.ts:12-28`, `backend/src/routes/*.ts`.

### Fragile/insecure or tutorial-like aspects

- The backend has no auth, no authorization, no input validation, no rate limiting, no security headers, no request logging, and no graceful shutdown. `backend/src/index.ts`, `backend/package.json`.
- The seed script deletes all six entity groups before inserting demo data. Running `npm run seed` is destructive. `backend/prisma/seed.ts:5-11`.
- The simulator’s price/P&L math is generic demo math and does not use symbol metadata, bid/ask, contract size, currency conversion, market sessions, or persisted price state. `backend/src/socket/PriceSimulator.ts:16-28`.

## 8. QUALITY & ENGINEERING PRACTICES

- Backend TypeScript is strict and its production compile passed locally. `backend/tsconfig.json`; command: `npm run build`.
- Frontend TypeScript is strict with `noUnusedLocals` and `noUnusedParameters`. The current local production build passes, but the drag-and-drop packages used by `frontend/src/components/ui/sortable.tsx` are installed in `node_modules` without being declared in `frontend/package.json`, so a clean install is not reproducible from the manifest alone. `frontend/tsconfig.app.json`, `frontend/src/components/ui/sortable.tsx`, `frontend/package.json`; command: `npm run build`.
- Frontend lint is configured with ESLint 9, TypeScript ESLint, React, hooks, import sorting, unused-import checks, and Prettier. The command currently reports 10 errors and 62 warnings, including prop-types errors in TypeScript components and hook/compiler errors. `frontend/eslint.config.js`; command: `npm run lint`.
- There are no test scripts, test files, coverage configuration, error boundary, or end-to-end setup in either package. `frontend/package.json`, `backend/package.json`, and repository file inventory.
- Accessibility is partial: labels and some `aria-label`s exist, but there is no accessibility test setup; the table uses draggable headers and generic anchors, and several links are `href="#"`. `frontend/src/components/data-table/DataTableComponent.tsx:115-143`, `frontend/src/pages/chat/ContactsSection.tsx:61-123`, `frontend/src/pages/auth-pages/login/LoginForm.tsx:55-60`.
- README quality is inadequate for an auditor: the frontend README is the unchanged “React + TypeScript + Vite + shadcn/ui” template and contains no setup, architecture, API, environment, or deployment instructions. `frontend/README.md`.
- No OpenAPI/Swagger files or setup scripts exist. No Dockerfile or compose file was found, so the `broker-postgres` container appears to be manually created or managed outside this repository. No GitHub Actions workflow or deployment manifest was found. The only backend environment file is `backend/.env`.
- Git history is weak: the root repository has one `Initial commit` containing the original frontend template; the current frontend and backend application content is largely uncommitted/untracked after the restructure. `.git`, `git log/status`, `frontend/`, `backend/`.
- Deployment status is unverified. The source contains local URLs (`localhost:3000`, `localhost:5173`) and the supplied screenshot confirms a local Docker PostgreSQL dependency, but there is no deployment configuration or evidence that the application itself is live outside the local environment. `frontend/src/pages/*`, `backend/src/index.ts`, `backend/.env`.

## 9. PERFORMANCE & SECURITY

### Performance

- There is no route-level code splitting or lazy loading; all route components are imported eagerly in `src/main.tsx`. `frontend/src/main.tsx:9-25`.
- Dashboard charts embed large literal datasets in the client bundle. `frontend/src/pages/dashboard/profit-barchart/ProfitBarchart.tsx`, `frontend/src/pages/dashboard/revenue-chart/RevenueChart.tsx`.
- REST tables fetch complete datasets and then filter/sort/paginate in the browser. This will not scale with account, position, trade, or moderator volume. `frontend/src/components/data-table/DataTableComponent.tsx:68-79`, `backend/src/routes/*.ts`.
- The WebSocket issues one database query per client per second and sends the entire position set, causing work and network traffic proportional to connection count × position count. `backend/src/socket/PriceSimulator.ts:30-47`.
- There is little deliberate memoization: the shared table is recreated during render, while only selected chart totals use `useMemo`. `frontend/src/components/data-table/DataTableComponent.tsx:68-79`, `frontend/src/pages/dashboard/profit-barchart/ProfitBarchart.tsx:127-137`.

### Security

- All API and WebSocket access is unauthenticated. `backend/src/index.ts:22-35`.
- The backend enables CORS for a fixed local origin but has no authentication, authorization, CSRF strategy, rate limit, security headers, TLS configuration, or origin validation for WebSockets. `backend/src/index.ts`, `backend/package.json`.
- Frontend forms validate locally, but there is no server-side input validation because there are no write endpoints. If writes are added, the current UI validation cannot be treated as a security control. `frontend/src/pages/accounts/CreateAccountDialog.tsx:20-61`, `backend/src/routes/`.
- React’s normal text rendering provides baseline escaping for displayed strings, and no `dangerouslySetInnerHTML` use was found in application source. That does not compensate for missing authentication or server-side authorization. `frontend/src/`.
- `backend/.env` contains a plaintext PostgreSQL connection string with credentials. It is local configuration and should not be committed or exposed. `backend/.env`.
- The backend error responses avoid returning raw errors to clients, but server logs use `console.error` and there is no redaction policy. `backend/src/routes/*.ts`.

## 10. HONEST GAPS

### TODOs, hardcoded data, dead/duplicated/inconsistent code

- No application TODO/FIXME implementation backlog was found in the tracked frontend/backend source, but absence of TODOs is not evidence of completeness. The visible gaps are represented by stubs and no-op handlers instead: `LoginForm.tsx`, `CreateAccountDialog.tsx`, `AccountProfile.tsx`, `ActivityPage.tsx`, `SettingsPage.tsx`, `ProfilePage.tsx`, and `MessagesSection.tsx`.
- Hardcoded dashboard metrics and chart series are not backed by the backend. `frontend/src/pages/dashboard/Dashboard.tsx`, `frontend/src/pages/dashboard/*`.
- Chat contacts/messages, user identity, account-profile summary values, and some avatar URLs are hardcoded. `frontend/src/pages/chat/ContactsSection.tsx`, `frontend/src/pages/chat/MessagesSection.tsx`, `frontend/src/pages/accounts/account-profile/AccountProfile.tsx:116-145`, `frontend/src/layout/side-bar/AppSidebarFooter.tsx`.
- The frontend type contracts are inconsistent with the backend: for example, the backend Trade has `type`, `symbol: string`, and `closePrice`, while the frontend `Trade` type declares `trade`, `symbol: number`, and omits `closePrice`. `backend/prisma/schema.prisma:27-38`, `frontend/src/pages/trades/columns.tsx:8-19`.
- The same raw-fetch/loading/error pattern is duplicated across Accounts, Trades, Symbols, Moderators, and the currency hook. `frontend/src/pages/accounts/Accounts.tsx`, `TradesPage.tsx`, `SymbolsPage.tsx`, `ModeratorsPage.tsx`, `hooks/useCurrencies.ts`.
- `src/components/ui/sortable.tsx` appears to be unused template code, but it is included in TypeScript compilation and currently breaks the production build because its dependencies are not declared. `frontend/src/components/ui/sortable.tsx`, `frontend/package.json`.
- The frontend has a `src/providers` directory in the working tree but no provider is wired in the shown entry point; `main.tsx` only renders `Toaster`, `RouterProvider`, and route layouts. `frontend/src/providers`, `frontend/src/main.tsx`.
- Theme provider is nested both at RootLayout and AppLayout, creating two theme-provider instances for application routes. `frontend/src/layout/RootLayout.tsx`, `frontend/src/layout/AppLayout.tsx:10-24`.
- REST routes each create their own Prisma client instead of sharing the bootstrap client. `backend/src/index.ts:12`, `backend/src/routes/*.ts`.

### Ten weakest points to flag in code review

1. No real authentication or authorization; all API and WebSocket data is public to reachable clients. `backend/src/index.ts`, `frontend/src/main.tsx`.
2. Login, logout, password reset, account creation, account update, and account deletion are UI simulations rather than implemented workflows. `frontend/src/pages/auth-pages/login/LoginForm.tsx`, `CreateAccountDialog.tsx`, `AccountProfile.tsx`, `AppSidebarFooter.tsx`.
3. Frontend production builds rely on undeclared drag-and-drop dependencies present only in the current `node_modules`; a clean install may fail. `frontend/src/components/ui/sortable.tsx`; `frontend/package.json`.
4. The financial data model uses floating-point values and the simulator uses arbitrary P&L math. `backend/prisma/schema.prisma`, `backend/src/socket/PriceSimulator.ts`.
5. WebSocket reliability is incomplete: no auth, reconnect, heartbeat, backoff, schema validation, stale indicator, or high-frequency control. `backend/src/socket/PriceSimulator.ts`, `frontend/src/pages/positions/PositionsPage.tsx`.
6. Backend reads are unpaginated and the WebSocket re-queries/sends every position once per client per second. `backend/src/routes/*.ts`, `backend/src/socket/PriceSimulator.ts`.
7. There is no server-side validation, centralized error handling, rate limiting, structured logging, health check, or graceful shutdown. `backend/src/index.ts`, `backend/src/routes/*.ts`.
8. Dashboard and chat are sample/template content presented in product routes, so apparent product scope is larger than the implemented scope. `frontend/src/pages/dashboard/`, `frontend/src/pages/chat/`.
9. There are no automated tests, CI/CD workflows, deployment manifests, API docs, or meaningful README. `frontend/package.json`, `backend/package.json`, `frontend/README.md`.
10. Repository hygiene is weak: the root repository has one initial commit with substantial uncommitted/untracked application work after the restructure. `.git`, `frontend/`, `backend/`.

### Bottom line

The repository is a local demo/admin-dashboard prototype with several read-only database views and a simple simulated live-position stream. It is not an authenticated broker administration system: write operations, identity, RBAC, production market data, durable real-time behavior, tests, deployment, and operational/security controls are absent or incomplete. The backend TypeScript compiles; the frontend does not currently pass its production build or lint gate. Evidence: the files and command results cited throughout this document.
