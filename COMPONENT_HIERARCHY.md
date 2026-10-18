# Airbnb Listing Page: Component Hierarchy

This hierarchy follows the inspected desktop listing reference and the project’s React + TypeScript + Tailwind conventions. Content and listing-specific values should come from typed data; components should receive them through props. State below describes the recommended owner for each interaction.

## Page tree

```text
App
├── Header
│   ├── BrandLink
│   ├── SearchBar
│   └── HeaderActions
├── Main
│   ├── ListingTitleBar
│   ├── ImageGallery
│   ├── ListingOverview
│   ├── ListingDetailsLayout
│   │   ├── ListingInfo
│   │   └── BookingCard
│   ├── SleepArrangements
│   ├── AmenitiesSection
│   ├── AvailabilityCalendar
│   ├── ReviewSection
│   ├── LocationSection
│   ├── HostSection
│   ├── ThingsToKnow
│   └── NearbyStays
├── Footer
└── ModalHost
    ├── GalleryModal
    ├── AmenitiesModal
    ├── ReviewsModal
    ├── ShareModal
    └── Booking/Guest popovers
```

`Main` owns page-level listing content and section anchors. `App` (or a small page context) owns which modal/popover is open so separate triggers cannot leave overlapping overlays active. Feature components own interaction state that is local to the feature, such as a selected calendar month or expanded description.

## Layout components

### `Header`

- **Props:** `activeSection?: ListingSection`; `compact?: boolean`; `priceSummary?: { total: number; currency: string; nights: number }`; `ratingSummary?: { rating: number; reviewsCount: number }`; `onSearch?(criteria: SearchCriteria): void`; `onOpenMenu?(): void`; `onOpenLanguage?(): void`; `onReserve?(): void`.
- **State:** Whether the full or compact header is shown (derived from scroll position); currently active section (derived from intersection/scroll); active search panel (`'location' | 'dates' | 'guests' | null`) if search behavior lives here.
- **Children:** `BrandLink`, `SearchBar`, `HeaderActions`, optionally `SectionNav`, `PriceSummary`, and `Button`.
- **Notes:** Keep scroll observation in a hook and update active section without forcing the full page to rerender on every scroll event.

### `Main`

- **Props:** `listing: Listing`; `reviews: Review[]`; `nearbyStays: NearbyStay[]`; `initialDates?: DateRange`; `onReserve?(booking: BookingSelection): void`; `onMessageHost?(): void`.
- **State:** Page-level overlay identity such as `activeOverlay: OverlayState`; selected date and guest values if they must be shared with the sticky booking summary/header; optional active review topic if filters affect results outside the review component.
- **Children:** `ListingTitleBar`, `ImageGallery`, `ListingOverview`, `ListingDetailsLayout`, `SleepArrangements`, `AmenitiesSection`, `AvailabilityCalendar`, `ReviewSection`, `LocationSection`, `HostSection`, `ThingsToKnow`, `NearbyStays`.
- **Notes:** Render page sections in semantic order (`<main>`, `<section>`) and provide stable IDs for sticky navigation anchors.

### `Footer`

- **Props:** `locale?: string`; `currency?: string`; `links?: FooterLink[]`; `copyrightYear?: number`.
- **State:** Optional open footer menu (`'language' | 'currency' | 'support' | null`).
- **Children:** `FooterLinkGroup[]`, `Button` or icon buttons for locale/currency/social controls.
- **Notes:** The reference view is focused on listing content; reproduce only the footer/navigation actually present in the full page capture.

## Feature components

### `ImageGallery`

- **Props:** `photos: ListingPhoto[]`; `listingTitle: string`; `onOpenViewer?(index: number): void`; `onSave?(): void`; `onShare?(): void`; `saved?: boolean`.
- **State:** Usually none when viewer state is lifted. If self-contained, `isViewerOpen` and `activePhotoIndex`.
- **Children:** Five `GalleryTile` items, `Button` for “Show all photos”, icon `Button`s for Share/Save, and optionally `GalleryModal` with `Avatar` not required.
- **Notes:** First image spans both rows; four secondary images form a 2×2 grid. Tiles are semantic buttons with descriptive accessible names. Viewer supports left/right arrows and Escape.

### `BookingCard`

- **Props:** `pricing: Listing['pricing']`; `dateRange: DateRange`; `guestCount: GuestCount`; `freeCancellationText: string`; `onDatesChange(range: DateRange): void`; `onGuestsChange(guests: GuestCount): void`; `onReserve(): void`; `onClaimOffer?(): void`; `offer?: BookingOffer`.
- **State:** Open popover (`'dates' | 'guests' | null`) if managed locally; number of guests if not controlled; pending submit/validation state; optionally selected offer state.
- **Children:** Optional `OfferBanner`, `PriceSummary`, `DateRangeControl`, `GuestSelector`, `CancellationNote`, primary `Button`, “You won’t be charged yet” note, and `ReportListingLink`.
- **Notes:** The reference card is sticky at the right of the primary detail layout, with white surface, soft shadow, 12 px radius, and large pink gradient Reserve button. Keep all computed totals in a price utility, not inside JSX.

### `ReviewSection`

- **Props:** `rating: number`; `reviewsCount: number`; `categoryRatings: RatingCategory[]`; `reviews: Review[]`; `topics: ReviewTopic[]`; `onShowAll?(): void`; `onHowReviewsWork?(): void`.
- **State:** `activeTopic: string | null`; expanded review IDs; whether the full review dialog is open if not lifted; carousel scroll offset for topic chips if needed.
- **Children:** `RatingOverview`, `RatingBreakdown`, topic `Badge`/filter buttons, `ReviewCard[]`, `Avatar`, `Rating`, “How reviews work” link, “Show more” buttons, and `ReviewsModal` or `Button` for “Show all”.
- **Notes:** Reference cards are in a two-column grid. Long reviews are clamped until expanded; topic chips scroll horizontally.

### `AmenitiesSection`

- **Props:** `amenities: Amenity[]`; `totalCount: number`; `visibleCount?: number` (reference shows an initial subset); `onShowAll?(): void`.
- **State:** Whether the full amenity list is open if the modal is not controlled by `Main`.
- **Children:** Section heading, `AmenityItem[]` in a two-column grid, outlined `Button`, optionally `AmenitiesModal`.
- **Notes:** Each item uses an icon and label. Unavailable amenities are visually muted/struck-through and must also expose availability in text for assistive technology.

### `AvailabilityCalendar`

- **Props:** `value: DateRange`; `unavailableDates?: string[]`; `monthsToShow?: number` (reference uses two); `onChange(range: DateRange): void`; `onClear(): void`.
- **State:** `visibleMonth` (first displayed month); selection phase (`'check-in' | 'check-out'`); hover date for range preview.
- **Children:** Month header with previous/next `Button`s, weekday labels, `CalendarDayButton[]`, selected-range summary, and clear dates action.
- **Notes:** Date controls need disabled, focused, selected, range, and hover states. Arrow key support moves through dates; month controls have accessible names.

### Supporting feature components

| Component | Props | State | Child components |
|---|---|---|---|
| `ListingTitleBar` | `title`, `saved`, `onShare`, `onSave` | None | Heading, `Button` icon actions |
| `ListingOverview` | `property`, `location`, `rating`, `reviewsCount`, `host` | None | Heading, facts line, `Rating`, host summary |
| `SleepArrangements` | `rooms: SleepRoom[]` | None | Section heading, `SleepRoomCard[]`, images |
| `HostSection` | `host: Host`, `coHosts: Host[]`, `onMessage` | Optional expanded host details | `Avatar`, `Rating`, `Badge`, `Button` |
| `LocationSection` | `location`, `neighborhoodText`, `mapCenter` | `zoom`, `isNeighborhoodExpanded` | Map panel, map controls (`Button`), show-more action |
| `ThingsToKnow` | `policies: PolicyGroup[]` | Optional expanded policy group | `PolicyCard[]`, links, `Badge` where needed |
| `NearbyStays` | `stays: NearbyStay[]` | `activeIndex`, saved stay IDs | `NearbyStayCard[]`, previous/next `Button`s, `Rating`, `Badge` |
| `Description` | `text`, `translated`, `originalText?` | `expanded`, `showOriginal` | Paragraph, inline `Button`/link |
| `PhotoViewer` | `photos`, `activeIndex`, `onIndexChange`, `onClose` | None if controlled | `Modal`, image, close/previous/next `Button`s, position `Badge` |

## Shared and UI components

### `Button`

- **Props:** `variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon'`; `size?: 'sm' | 'md' | 'lg'`; `type?: 'button' | 'submit' | 'reset'`; `disabled?: boolean`; `loading?: boolean`; `icon?: ReactNode`; `iconPosition?: 'start' | 'end'`; `fullWidth?: boolean`; `ariaLabel?: string`; standard button attributes; `children`.
- **State:** No internal state beyond transient press/hover/focus styling; loading/disabled are controlled by props.
- **Children:** Optional icon and label/children.
- **Notes:** Use a native `<button>`, visible focus ring, semantic disabled state, and design variants matching the reference. Reserve uses the pink gradient; outlined actions use a 1 px border and neutral hover fill.

### `Avatar`

- **Props:** `src?: string`; `name: string`; `size?: 'sm' | 'md' | 'lg'`; `alt?: string`; `verified?: boolean`; `className?: string`.
- **State:** `imageFailed` to fall back to initials.
- **Children:** Image or generated initials; optional verification `Badge`.
- **Notes:** Decorative avatars should use empty alt text when the visible name is adjacent. Avoid announcing the same name twice.

### `Rating`

- **Props:** `value: number`; `count?: number`; `showStars?: boolean`; `compact?: boolean`; `precision?: number`; `ariaLabel?: string`.
- **State:** None.
- **Children:** Star/icon, numeric value, optional review count.
- **Notes:** Use a consistent star graphic (Lucide `Star` or inline SVG) and provide a readable label such as “Rated 4.95 out of 5 from 19 reviews.”

### `Badge`

- **Props:** `tone?: 'neutral' | 'brand' | 'success' | 'warning'`; `size?: 'sm' | 'md'`; `icon?: ReactNode`; `children`; `className?`.
- **State:** None.
- **Children:** Optional icon and short text.
- **Notes:** Use for “Guest favourite”, host verification, offer/status, and small metadata. Keep badges non-interactive unless rendered as an explicit filter button.

### `Modal`

- **Props:** `open: boolean`; `title?: string`; `onClose(): void`; `size?: 'sm' | 'md' | 'lg' | 'full'`; `closeOnBackdrop?: boolean`; `closeOnEscape?: boolean`; `children`.
- **State:** None; visibility is controlled by the owning feature/page.
- **Children:** Close `Button`, optional title/header, body content, optional footer actions.
- **Notes:** Render through a portal; use `role="dialog"` and `aria-modal="true"`; trap focus, close on Escape when enabled, prevent background scroll, and return focus to the triggering control on close.

## Shared TypeScript contracts

```ts
export type ListingSection = 'photos' | 'amenities' | 'reviews' | 'location'

export interface DateRange {
  checkIn: string | null // ISO date, YYYY-MM-DD
  checkOut: string | null
}

export interface GuestCount {
  adults: number
  children: number
  infants: number
  pets: number
}

export interface ListingPhoto {
  url: string
  alt: string
}

export interface Amenity {
  id: string
  name: string
  category: string
  icon: string
  available: boolean
}

export interface Review {
  id: string
  author: { name: string; avatarUrl?: string; tenure: string }
  dateLabel: string
  rating: number
  body: string
  topicIds: string[]
}

export interface OverlayState {
  type: 'gallery' | 'amenities' | 'reviews' | 'share' | 'guests' | null
  photoIndex?: number
}
```

Keep these interfaces in `src/types/` and split them by domain as the implementation grows. If `src/types/listing.ts` already defines some of them, extend that file rather than duplicating types.
