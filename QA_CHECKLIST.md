# Desktop QA Checklist

Use the same browser zoom and viewport for the clone and reference. The recommended baseline is Chrome at 1440 × 900 with 100% zoom. Capture screenshots at the initial viewport and at the same scroll offsets in both pages.

## Visual comparison

- [ ] Listing page: header, search control, title, hero photo grid, intro, booking card, sticky navigation, and section widths.
- [ ] Photo Tour: white overlay, sticky header, category cards, section labels, mosaic layout, hover zoom, and independent scrolling.
- [ ] Lightbox: centered image sizing, category title, photo counter, close/grip controls, bordered arrows, and transitions.
- [ ] Lower page: amenities, reviews and breakdown, location, host, Things to Know, nearby stays, and footer.
- [ ] Compare typography, line heights, colors, icon silhouettes, image crops, radii, shadows, and horizontal/vertical spacing.

## Interaction and accessibility

- [ ] Open Photo Tour from “Show all photos” and from a hero image; verify the matching category is brought into view.
- [ ] Open a gallery image and verify the matching photo, category, and 1-based counter in the Lightbox.
- [ ] Use the arrows and keyboard Left/Right; verify wraparound and URL state. The documented reference deep link `?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1024` should open photo 25 of 43.
- [ ] Close Lightbox with Grip, X, and Escape; verify return to the Photo Tour at the previous scroll position. Close Photo Tour and verify return to the listing and restored focus.
- [ ] Tab and Shift+Tab within each dialog; focus must remain inside while open and return to its trigger after close.
- [ ] Check section navigation active states while scrolling. Confirm the Photos tab returns to the top.
- [ ] Check amenities, description, review text, neighborhood expansion, guest count, dates, and nearby carousel with mouse and keyboard.
- [ ] Click both Reserve controls; confirm the “You won't be charged yet.” toast appears, is announced to assistive technology, and dismisses automatically.
- [ ] Verify all images and local font assets load, and check browser console/network for errors.

## Build and submission

- [ ] Run `npm ci` and `npm run build` from a clean checkout.
- [ ] Confirm `.claude/`, `ARCHITECTURE.md`, `architecture.svg`, `PROMPTS_USED.md`, and this checklist are present in the submission archive.

## Verification performed for this revision

- Production build completed successfully with `npm run build` after the photo deep-link and nearby carousel changes.
- Inspected the local app’s browser accessibility tree; the listing sections and the nearby five-card carousel controls are present.
- Opened the local app at `?modal=PHOTO_TOUR_SCROLLABLE&modalItem=1024`; its accessibility tree shows the Lightbox at `25 of 43`.
- Confirmed the bottom-page footer is now rendered by the application.
- Pixel-difference screenshots, keyboard interaction replay, and the reference’s direct deep-link rendering remain to be run in a browser session where the reference does not show a Vercel security checkpoint.
