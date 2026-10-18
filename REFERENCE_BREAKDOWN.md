# Airbnb Listing Reference Breakdown

Reference inspected: [airbnb-clone-umber-two.vercel.app](https://airbnb-clone-umber-two.vercel.app/)

The reference currently renders a listing titled **“Romantic Jacuzzi 1BHK Candolim | Mirashya UG10”** in Candolim, Goa. Measurements below were taken from the rendered page at a desktop viewport of approximately **1263 × 1214 px**. Content such as dates, price, rating, reviews, and photos belongs to the reference listing and should be represented as data rather than hard-coded into layout components.

## 1. Page frame and layout

- White page background, dark charcoal text, no prominent page background panels.
- A white global header occupies about **89 px** at the top. Its content is inset about **80 px** from each side at the inspected viewport.
- The listing content is centered in an approximately **1103 px** wide region (left edge x≈80, right edge x≈1183 at the inspected viewport).
- Main page order:
  1. Listing title and share/save actions.
  2. Five-image hero gallery.
  3. Two-column listing details and booking panel.
  4. Date calendar.
  5. Reviews.
  6. Map and neighborhood summary.
  7. Host profile and co-hosts.
  8. Things to know (cancellation, house rules, safety).
  9. Nearby listings carousel.
- Major lower-page sections use a thin light-gray divider and roughly **48 px** of vertical section padding.
- At the inspected desktop width, the listing summary uses a **635 px** left column and **372 px** booking column, separated by a broad gutter. The booking card is `position: sticky` with a top offset around **100 px** while the details column is in view.
- Scrolling changes the global header to a compact anchored section bar: **Photos / Amenities / Reviews / Location** on the left; price, rating/reviews, and a pink **Reserve** action on the right. The selected section receives an underline.
- Keep the page desktop-first as specified in the project guidelines; avoid introducing mobile-only layouts into the target implementation.

## 2. Component inventory

### Global header

- Airbnb wordmark at left.
- Centered segmented search pill with location, date, guest count, and circular pink search icon.
- Right-side **Become a host**, language/currency globe, and menu controls.
- Header is white with a subtle lower divider/shadow as it transitions into the sticky section bar.
- Search pill is a thin outlined capsule (about 48 px high, radius 40 px); segments are separated by fine vertical rules. Search icon is a 32 px pink circle.
- The two circular account controls are about 40 px and use a light-gray fill.

### Listing title row

- Left-aligned H1 title at about **26 px / 30 px line height / 500 weight**.
- Share and Save icon actions sit on the right on the same row. They are compact text buttons with icons and generous hit areas.
- The title begins around y=121; the gallery begins around y=173, leaving approximately 20–24 px between title row and gallery.

### Hero photo gallery

- Five photos in a **3-column / 2-row CSS grid**: the first photo spans both rows and is about half the overall width; the remaining four fill a 2×2 grid.
- At the inspected width: gallery x≈80, y≈173, w≈1103, h≈487; columns are approximately **551 / 268 / 268 px**, with **8 px** gaps.
- The outer gallery corners are rounded about **12 px**. Inner tile corners remain square so the gutters read as a single collage.
- Images use cover cropping. All tiles are clickable buttons and have listing-specific accessible names.
- A compact white **Show all photos** button with a grid icon overlays the lower-right image. It has a thin dark border, 8 px radius, and a soft shadow.
- Hover behavior observed in the page CSS: the image scales to roughly **1.04×**; some gallery tiles also dim slightly (brightness around **0.94**) and/or receive a faint dark overlay. The overlay button casts a subtle shadow.
- Clicking a tile or Show all photos should open a full-screen photo viewer/lightbox with previous/next controls and a close action.

### Listing summary and host highlights

- Two-column region starts about **48 px** below the gallery.
- Left column starts with “Entire serviced apartment in Candolim, India” in about **22 px / 26 px line height / 500 weight** and a smaller 14–16 px facts line (guest, bedroom, bed, bath).
- A bordered “Guest favourite” rating summary follows: laurels, short explanatory copy, rating, star row, and review count. It is a low, wide card with a 1 px pale border and rounded corners.
- Host row shows a circular brand/avatar, “Hosted by …”, and years hosting.
- Three listing highlight rows follow, each with a simple line icon, a short 16 px semibold label, and muted supporting text (examples: outdoor entertainment, staying cool, self check-in).
- A translation notice appears in a light-gray rounded panel with a **Show original** text link.
- Description text is clamped in the initial view; **Show more** expands it inline.

### Booking card and offer banner

- The sidebar begins with a separate bordered offer banner (“Get 10% off your next stay”, Terms apply, Claim).
- Booking card: white, approximately **372 px wide**, generous 24 px internal padding, softly rounded corners (about 12 px), and a diffused gray shadow.
- Top row shows a bold underlined total and a smaller “for N nights” label.
- Date fields are a bordered two-column check-in/check-out control; guest count spans the row below, with a chevron.
- Cancellation status appears in a pale-gray rounded strip.
- Large full-width **Reserve** button uses a left-to-right Airbnb pink gradient, white medium-weight text, pill radius, and about 48 px height. Subtext underneath says “You won’t be charged yet.”
- Report listing is a small, muted link beneath the booking card.
- Sticky booking sidebar ends after the listing details/calendar region rather than remaining at the viewport all the way down the page.
- On scroll, a condensed price/rating/Reserve group appears in the sticky section bar.
- Interactive states: date fields open the calendar, guest control opens a guest selector, Claim/Reserve are clear primary actions, and the reserve gradient darkens on hover.

### Date picker

- A “N nights in [city]” heading and selected date range appear above a two-month calendar.
- Two month grids are shown side-by-side with previous/next circular arrow controls. Month title is centered over each grid; weekday initials use compact bold text.
- Selected start/end dates are dark filled circles with white text; the inclusive range between them has a pale-gray fill. Unavailable dates are muted/struck through.
- **Clear dates** is a text action aligned below the calendars.
- Calendar spans the left content width; it is separated from adjacent content with thin horizontal rules.

### Sleep arrangements

- Heading “Where you’ll sleep” at the standard 22 px section-heading size.
- Two horizontally arranged room cards with wide photos, room title, and bed description. Each card is about half of the 635 px detail column, with rounded photo corners.

### Amenities

- Heading “What this place offers”.
- A two-column list of the first amenities, each with a 24 px line icon and text (examples include kitchen, Wi-Fi, dedicated workspace, parking, pool, hot tub, pets, cameras, alarms).
- Some amenities are visually crossed out or muted if unavailable.
- **Show all 50 amenities** is an outlined button with a 12 px radius; it opens a complete amenity dialog grouped by category.

### Reviews

- Full-width section separated by a divider, with approximately 48 px top/bottom padding.
- Centered “Guest favourite” rating treatment: large **4.95** figure between laurel graphics, title, short explanation, and **How reviews work** link.
- Rating breakdown runs horizontally below: overall rating distribution bars followed by category scores (cleanliness, accuracy, check-in, communication, location, value), each with score and large simple icon.
- Review-topic filters appear in a horizontally scrollable row of outlined pill chips. Each chip has a small colored emoji/icon, topic, and count. Chips have about 48 px height, 16 px radius, 1 px `#ddd` border.
- Review cards use a **two-column grid**. Each card contains a circular avatar/initial, guest name, Airbnb tenure, review date, star row, and review body. Long reviews truncate with a **Show more** action.
- **Show all 19 reviews** opens the full reviews view. “How reviews work” opens an explanatory dialog.

### Location and neighborhood

- Full-width section with a standard heading and location text.
- A wide map panel (about 1103 px) with rounded corners. The reference uses a pale stylized map: light blue water, pale green land, faint grid/roads, and a centered black home marker.
- Map controls: circular search control at upper left, plus/minus zoom controls at upper right. These are white, rounded, and softly shadowed.
- Under the map, muted “Exact location will be provided after booking” text; then a neighborhood subheading, short description, and **Show more** link.

### Host section

- Heading “Meet your host”, then a two-column composition.
- Left: a raised white profile card with host logo/avatar, host name/role, review count, rating, hosting duration, verification badge, and facts such as birth decade and education.
- Right: co-host avatars/names in a compact multi-column group, host details, response rate/time, and **Message host** button.
- A shield icon and payment-safety note sit beneath host information.

### Things to know

- Three text columns: **Cancellation policy**, **House rules**, and **Safety & property**.
- Each column has a heading, concise summary, and **Learn more** link. Keep vertical separators or gutters understated and align the columns evenly.

### Nearby listing carousel and footer

- “More stays nearby” followed by listing cards in a horizontal track. Each card has a large rounded image, listing title, price, rating, and a favorite icon.
- Carousel has a position indicator (e.g. “1 / 2”) and a next control; the next control advances the card track.
- Recreate any footer/navigation visible after this section only after matching the complete primary listing page above it.

## 3. Typography

- Reference font stack: **Airbnb Cereal VF**, then Circular, system UI, Roboto, Helvetica Neue, sans-serif. Airbnb Cereal is the visible brand face; use it if the project can include a licensed/available font asset, otherwise use a close system sans-serif fallback.
- Main text color is **`#222222`**. Secondary copy is typically **`#6a6a6a`** or **`#717171`**.
- Measured/visually sampled type scale:
  - Listing title: 26 px, 30 px line height, weight 500.
  - Section titles: 22 px, 26 px line height, weight 500.
  - Card/feature headings: 16–18 px, medium weight.
  - Body and control labels: 14–16 px; most regular body copy is 14 px.
  - Micro labels such as CHECK-IN / CHECKOUT: 10–12 px, bold, uppercase.
- Overall typographic feel is compact and high legibility, with headings medium rather than heavy bold. Links commonly use medium weight and underline.

## 4. Color palette and surfaces

| Role | Reference value | Use |
|---|---|---|
| Primary text | `#222222` | Headings, body, icons |
| Muted text | `#6A6A6A` / `#717171` | Metadata, helper text, muted links |
| Airbnb pink | `#FF385C` | Wordmark, search accent, key brand accent |
| Reserve gradient | `linear-gradient(to right, #E61E4D, #E31C5F 50%, #D70466)` | Primary booking action |
| Reserve hover | `linear-gradient(to right, #D81B5F, #C31A5B 50%, #BD0463)` | Reserve hover state |
| Surface white | `#FFFFFF` | Page, cards, controls |
| Soft gray 100 | `#F7F7F7` | Secondary controls, muted strips |
| Soft gray 200 | `#F2F2F2` | Control hover fills |
| Soft gray 300 | `#EBEBEB` | Divider lines, disabled/quiet surfaces |
| Border | `#DDDDDD` | Outlined buttons, chips, fields |
| Card border | `rgba(0,0,0,.08)` | Subtle card outlines |
| Card shadow | `0 6px 16px rgba(0,0,0,.12)` | Booking/profile cards |

Pink is reserved for brand/primary actions; most interface surfaces are white, with neutral gray borders and backgrounds.

## 5. Spacing, borders, and shape language

- Desktop side inset: about **80 px** at a 1263 px viewport; keep the main content centered and capped near 1100 px for this reference composition.
- Header: roughly 89 px total height; logo and controls are vertically centered.
- Title-to-gallery spacing: about 20 px. Gallery-to-summary spacing: about 48 px.
- Gallery gap: **8 px**; gallery corner radius: **12 px**.
- Primary details grid: left **635 px**, right **372 px**, with generous separation.
- Major section rhythm: thin `#EBEBEB` divider and **48 px** vertical breathing room.
- Buttons: compact text/icon buttons around 8 px radius; general outline actions around 12 px; review chips around 16 px; pill actions use fully rounded ends.
- Booking/form borders are 1 px. Cards use light borders plus a soft shadow; avoid heavy outlines or strong elevation.

## 6. Interaction and states to build

| Area | Actions/states |
|---|---|
| Header search | Location, dates, and guest controls open their respective search panels; search icon submits the selected search. |
| Header account controls | Language/currency and menu buttons open anchored menus. |
| Sticky section bar | Tabs scroll to Photos, Amenities, Reviews, and Location; active section is underlined. Reserve remains available in the compact bar. |
| Photo gallery | Tile opens the photo viewer; previous/next photo; close; Show all photos; image hover scales slightly and receives a light dim overlay. |
| Share / Save | Share opens the share panel; Save toggles saved state and its icon/label. |
| Booking | Check-in/out open calendar; previous/next month; date selection updates nights and price; Clear dates resets; guest row opens guest count popover; Reserve begins booking flow. |
| Description / location copy | Show more expands text; Show original switches to source language; neighborhood Show more expands the local description. |
| Amenities | Show all opens full amenity dialog; close action restores listing. |
| Reviews | Topic chips select/filter a topic; Show more expands a review; Show all opens complete review list; How reviews work opens explainer. |
| Map | Search and zoom controls; map marker remains visible and centered. |
| Host | Message host opens a conversation/contact flow. |
| Nearby stays | Next advances the listing carousel; cards and favorite buttons remain independently interactive. |
| Keyboard/accessibility | All controls are keyboard reachable, have visible focus, semantic button/link roles and accessible names. Photo carousel should support left/right arrows and Escape to close. Dialogs should trap focus while open and return focus to their trigger on close. |

### Hover, active, and focus treatment

- Secondary outlined/round controls generally shift to a light-gray fill (`#F7F7F7` / `#F2F2F2`) on hover.
- Search pill gains a subtle shadow (`0 2px 8px rgba(0,0,0,.12)`) on hover.
- Gallery photos zoom slightly and receive a low-opacity black overlay; the gallery action button uses a soft shadow.
- Reserve keeps the vivid pink gradient and darkens toward magenta on hover.
- Links darken toward black and retain an underline where shown.
- Date cells, chips, menu rows, and carousel controls need distinct hover/selected/disabled states. Keep focus outlines visible and equivalent in prominence to the site's other interaction feedback.

## Suggested component tree

```text
App
├── SiteHeader
│   ├── SearchBar
│   ├── LanguageCurrencyMenu
│   └── MainMenu
├── ListingPage
│   ├── ListingTitleBar
│   ├── PhotoGallery
│   │   └── PhotoViewerDialog
│   ├── StickySectionNav
│   ├── ListingDetailLayout
│   │   ├── ListingOverview
│   │   ├── GuestFavouriteSummary
│   │   ├── HostSummary
│   │   ├── ListingHighlights
│   │   ├── Description
│   │   ├── SleepArrangements
│   │   ├── AmenitiesPreview
│   │   ├── BookingSidebar
│   │   └── BookingCalendar
│   ├── ReviewsSection
│   │   ├── RatingOverview
│   │   ├── ReviewTopicFilters
│   │   └── ReviewCardList
│   ├── LocationSection
│   ├── HostSection
│   ├── ThingsToKnow
│   └── NearbyStaysCarousel
└── SiteFooter
```

Keep listing, host, review, amenity, and nearby-stay content in typed data modules so these presentational components can be tuned against the reference without changing data shape.
