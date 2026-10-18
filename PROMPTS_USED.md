# AI-Assisted Development Prompt Log

This log records the development prompts in their original sequence. Older turns are summarized for readability; the entries below describe the intent and requested changes rather than reproducing every message verbatim.

1. Create the project-root `.claude/` directory and a UI specialist agent configuration for code quality and project structure.
2. Initialize a React + Vite + Tailwind project, add `lucide-react`, establish `src/components`, `src/data`, and `src/types`, and create typed Airbnb listing mock data with at least ten property photos.
3. Inspect the provided Airbnb listing reference and document its layout, components, typography, palette, spacing, and interactive states.
4. Document the component hierarchy, including layout, feature, and shared UI components with props, state, and child components.
5. Compare the implementation to the reference and improve visual fidelity. Continue checking the reference before each subsequent visual change.
6. Match the header: logo and home search icon assets, search bar sizing and typography, host/menu controls, hover colors, and faded icon treatment.
7. Implement the Photo Tour and Lightbox views with category selection, image navigation, modal behavior, close/back controls, keyboard arrows, and independent gallery scrolling. Use the local photo dataset and match the reference route behavior.
8. Refine gallery controls, icons, typography, spacing, animation, and focus/close behavior against the reference.
9. Add the sticky listing section navigation and active-section state while scrolling.
10. Refine the listing intro and description expand/collapse behavior to match the reference.
11. Match the amenities dialog, including typography, icons, unavailable/struck-through items, and modal behavior.
12. Use the supplied Airbnb font asset and refine rating/laurel visuals, rating breakdown icons, and review controls.
13. Refine the location section, host section, Things to Know section, and nearby stays carousel, including the requested icons, copy expansion, host images, and five-card desktop layout.
14. Review the assignment as an evaluator: outline a testing strategy, estimate the score, identify concrete gaps, then fix those gaps in priority order.

## Development constraints carried through the prompts

- Desktop listing experience only.
- Use React, Vite, Tailwind CSS, and `lucide-react`; do not add a UI component library.
- Keep implementation original and use the reference as a visual/behavioral target.
- Include the agent configs and production-scale architecture diagram in the submission.
- Do not publish the project to a public GitHub repository.
