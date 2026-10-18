# Project Guidelines: Airbnb Clone (Desktop Only)

## Tech stack and visual target

- Frontend: React with Vite and Tailwind CSS.
- Icons: `lucide-react`.
- Match the desktop experience of https://airbnb-clone-umber-two.vercel.app as closely as possible.
- Do not add external UI component libraries such as shadcn/ui or MUI. Prefer custom Tailwind CSS for precise visual matching.

## Code quality

- Build clean, modular components in `src/components/`.
- Use semantic HTML and provide full accessibility, including appropriate ARIA, keyboard operation, and focus management.
- For relevant carousels or horizontal navigation, support the left and right arrow keys.
- Match interactive states and transitions to the reference, including hover, active, focus, and scroll behavior.
- Keep the implementation desktop-only; do not spend effort on responsive mobile layouts unless specifically requested.

## Feature boundaries and submission

- Keep listing content in typed data models and pass it into focused feature components; avoid putting listing-specific copy and prices directly into shared UI.
- Treat the listing page, photo tour, and single-photo lightbox as distinct views. Keep their state transitions explicit and share small UI primitives where that improves consistency.
- Preserve keyboard navigation and focus restoration when splitting overlays into components.
- Keep implementation original. Use the reference to reproduce visible behavior and styling; do not copy its application source.
- Final submission needs a high-level production architecture diagram and a record of the prompts used for AI-assisted development. Keep these as separate, easy-to-find deliverables and include them in the final project archive.
- Keep architecture proportionate to the assignment: the app can remain frontend-only, while the architecture diagram shows a plausible production-scale marketplace.
