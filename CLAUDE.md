# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (Rails, repo root)
- `bin/rails db:create db:migrate` — set up the database (Postgres, via `compose.yml`/`docker-compose up`)
- `bin/rails s` — run the API server alone (port 3000)
- `bin/dev` — run backend + frontend + Postgres together via `foreman start -f Procfile.dev` (see Procfile.dev for the three process lines; the backend one explicitly pins `-p 3000` since foreman otherwise auto-offsets ports per process line)
- `bundle exec rspec` — run the full test suite (this project uses RSpec exclusively; the Minitest `test/` directory is unused Rails scaffold)
  - single file: `bundle exec rspec spec/models/chat_spec.rb`
  - single example: `bundle exec rspec spec/models/chat_spec.rb:12`
- `bin/rubocop` — lint (Omakase Rails style); CI runs `bin/rubocop -f github`
- `bin/brakeman` / `bin/bundler-audit` — security static analysis / gem vulnerability scan (both run in CI)

### Frontend (`frontend/`, separate Vite + React app)
- `npm install`
- `npm run dev` — dev server (port 5173)
- `npm run build` / `npm run lint` (oxlint)
- Vite is pinned to v5/6 (classic esbuild/rollup) rather than the newer Rolldown-based default — the scaffolder's default version had a broken native-binding install on this machine.

## Architecture

- **Two independent processes.** Rails runs `config.api_only = true` and serves JSON only; the React app in `frontend/` is a fully separate Vite dev server. They only communicate over HTTP (`fetch`/`axios` from the browser to `http://localhost:3000/api/v1/...`). There is no asset pipeline integration between them.
- **Devise + devise-jwt gotcha in API-only mode.** `config.api_only = true` strips session middleware, but Devise/Warden still writes to the session internally on every `sign_in`/`sign_up` call (used internally for `JTIMatcher` bookkeeping), even though actual authentication is JWT-based. Without a session store this raises `ActionDispatch::Request::Session::DisabledSessionError`. Fix is in `config/application.rb`: manually re-adding `ActionDispatch::Cookies` + `ActionDispatch::Session::CacheStore` to the middleware stack. Don't remove this.
- **Auth flow.** `User` includes `Devise::JWT::RevocationStrategies::JTIMatcher` (revocation via the `jti` column) and a custom `jwt_payload` that merges `first_name` into the token claims. The JWT itself comes back in the **`Authorization` response header**, not the JSON body, on the signup/login routes (custom path names in `config/routes.rb`: `/api/v1/signup`, `/api/v1/login`, `/api/v1/logout`). Devise's default parameter sanitizer only whitelists `email`/`password`, so `first_name`/`last_name` are explicitly permitted in `app/controllers/users/registrations_controller.rb` — any new required sign-up field needs the same treatment.
- **CORS exposes `Authorization` explicitly.** `config/initializers/cors.rb` sets `expose: ["Authorization"]` — browsers hide custom response headers from JS by default, so without this the frontend cannot read the JWT off the login/signup response at all, even though curl/Postman (non-browser clients) can see it fine.
- **API controllers are participant-scoped, not role-scoped.** Everything under `app/controllers/api/v1/` inherits from `BaseController`, which enforces `before_action :authenticate_user!`. There's no admin/owner distinction — `ChatsController`/`MessagesController` both repeat a `chat.users.include?(current_user)` check to scope access to the two participants of a chat (404 for anyone else, including other authenticated users).
- **Domain model and invariants enforced at both DB and model layer:**
  - `Chat` belongs to `sender`/`recipient` (both `User`); a unique *unordered* pair is enforced by a DB partial index on `LEAST(sender_id, recipient_id), GREATEST(sender_id, recipient_id)` plus a matching model validation, and self-chats are blocked (`recipient_id != sender_id`).
  - `Message` validates that its `sender` is one of the chat's two participants.
- **RabbitMQ is not implemented yet**, despite the project name — there's no `bunny` gem or publisher/consumer code in the codebase. Real-time delivery currently doesn't exist; the API is plain synchronous REST.
- **Dev process orchestration** (`Procfile.dev`, run via `bin/dev`) starts Rails, Vite, and Postgres (`docker-compose up`, no `-d`, since foreman expects a foreground process per line) together.
