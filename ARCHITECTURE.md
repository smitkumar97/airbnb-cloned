# Application and Production Architecture

The diagram separates the **implemented submission** from the **production-scale target**. This makes the current scope explicit while showing how a vacation-rental marketplace can grow without implying that backend services already exist in this clone.

![Current clone and production marketplace architecture](./architecture.svg)

## Current submission

- A desktop React 19 and Vite app styled with Tailwind and project CSS.
- Listing, review, amenity, nearby-stay data and 43 property photos are served from local typed modules and bundled assets.
- The Listing Page, Photo Tour, Lightbox, sticky section navigation, booking UI, and shared toast run in the browser. There is no backend, account system, search service, or payment processing in this implementation.
- The actual build gate is `npm ci` followed by `npm run build`, which runs TypeScript project checks and Vite production bundling.
- QA currently includes manual browser checks for screenshots, keyboard behavior, focus, ARIA structure, and image/font loading. Automated interaction and accessibility tests are future work.
- `.claude/agents/` contains UI, code-quality, and project-structure guidance for AI-assisted development.

## Production target

- Serve versioned frontend and media assets from a CDN with WAF protections, TLS, caching, and responsive image transformations.
- Route signed-in requests through an API gateway or BFF to independently scalable identity, listing, search, booking, payment, and messaging services.
- Use a relational database as the source of truth for users, listings, and reservations. Add read replicas for browse-heavy traffic and publish changes through a transactional outbox.
- Keep search documents in a dedicated geo-capable search index and refresh them asynchronously from listing events. Redis can support short-lived caches and rate limits, but must not become the booking source of truth.
- Revalidate availability transactionally during reservation and make booking/payment requests idempotent.
- Add automated unit, integration, accessibility, and browser interaction checks to CI before introducing staged deployments, canary rollout, monitoring, and recovery automation.
