# Chat app via RabbitMQ

A chat application with a Rails API backend and a React frontend, communicating over JSON/HTTP with JWT auth.
(currently in process, only backend, no frontend yet)

## Tech stack

### Backend — Rails (API-only, repo root)
- **Ruby on Rails 8.1** — JSON-only, no server-rendered views
- **PostgreSQL** — primary database, run via `compose.yml` (Docker)
- **Devise + devise-jwt** — authentication
- **rack-cors** — CORS config
- **Puma** — app server
- **RSpec** (+ FactoryBot, Faker, Shoulda Matchers) — test suite
- **Rubocop** (Omakase style), **Brakeman**, **bundler-audit** — linting / static security analysis, run in CI
- **Solid Cache / Solid Queue / Solid Cable** — Rails 8 defaults
- 
### Frontend — React (`frontend/`)
- **React**
- **Vite 6** — dev server (port 5173) and build tool (pinned to the classic esbuild/rollup toolchain rather than the newer Rolldown default)
- *Planned:* **react-router-dom** — client-side routing not yet added
- No state/data-fetching library yet — current plan is plain `fetch` to the Rails API

### Dev orchestration
- **Foreman** (`Procfile.dev`, via `bin/dev`) — runs Rails, Vite, and Postgres together as one command
- **Docker Compose** — Postgres container

### Planned / not yet implemented
- **RabbitMQ** (via the `bunny` gem) — real-time message delivery, this isn't wired up yet. The API is currently plain synchronous REST (request/response only, no push/async delivery)

## Architecture notes

The Rails API and React app are two fully independent processes with no asset-pipeline integration — they only talk over HTTP (`http://localhost:3000/api/v1/...`). See `CLAUDE.md` for details on the Devise/JWT setup, CORS, and domain model (chats, messages, participant scoping).

## Getting started

```bash
bin/rails db:create db:migrate   # set up the database
bin/dev                          # runs backend (3000) + frontend (5173) + Postgres together
```

Backend only: `bin/rails s`. Frontend only: `cd frontend && npm install && npm run dev`.

Run tests: `bundle exec rspec`. Lint: `bin/rubocop` (backend), `cd frontend && npm run lint` (frontend).
