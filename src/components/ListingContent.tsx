import { useEffect, useRef, useState } from "react";
import {
  BedDouble,
  Camera,
  CarFront,
  Check,
  CircleCheck,
  ChevronLeft,
  ChevronRight,
  X,
  DoorOpen,
  House,
  KeyRound,
  Lightbulb,
  Map,
  MessageSquare,
  GraduationCap,
  PawPrint,
  ShieldAlert,
  Sparkles,
  Tag,
  Users,
  Utensils,
  Waves,
  Wifi,
  Fan,
  ShieldHalf,
  Bath,
  Shirt,
  Tv,
  Baby,
  Snowflake,
  BriefcaseBusiness,
  Refrigerator,
  Search,
  Microwave,
  CookingPot,
  Wine,
  Coffee,
  Sandwich,
  DoorClosed,
  TreePine,
  Dumbbell,
  SprayCan,
  CalendarDays,
  CalendarX,
  LockKeyhole,
  Plug,
  WashingMachine,
} from "lucide-react";
import { amenityList, listing, nearbyStays, reviews } from "../data/listing";
import { AirbnbAmenityIcon, hasAirbnbAmenityIcon } from "./AirbnbAmenityIcon";
import { BookingCard } from "./BookingCard";
import hostAvatar from "../assets/host.jpeg";
import laurelLeft from "../assets/laurel-left.png";
import laurelRight from "../assets/laurel-right.png";
import laurelOutlineLeft from "../assets/laurel-outline-left.svg";
import laurelOutlineRight from "../assets/laurel-outline-right.svg";

const amenityIcons = [
  Utensils,
  Wifi,
  Camera,
  CarFront,
  Waves,
  Waves,
  PawPrint,
  Camera,
  ShieldAlert,
  ShieldAlert,
];

const amenityCategoryIcons: Record<string, typeof Bath> = {
  Bathroom: Bath,
  "Bedroom and laundry": WashingMachine,
  Entertainment: Tv,
  Family: Baby,
  "Heating and cooling": Snowflake,
  "Home safety": ShieldAlert,
  "Internet and office": BriefcaseBusiness,
  "Kitchen and dining": Refrigerator,
  "Location features": DoorClosed,
  Outdoor: TreePine,
  "Parking and facilities": CarFront,
  Services: PawPrint,
};

const amenityItemIcons: Record<string, typeof Bath> = {
  Hairdryer: Plug,
  "Cleaning products": SprayCan,
  Shampoo: Bath,
  "Washing machine": WashingMachine,
  Hangers: Shirt,
  "Bed linen": BedDouble,
  "Room-darkening blinds": House,
  Iron: Shirt,
  "Clothes storage": Shirt,
  Cot: Baby,
  TV: Tv,
  "Air conditioning": Snowflake,
  "Ceiling fan": Fan,
  Wifi,
  Kitchen: CookingPot,
  Fridge: Refrigerator,
  Freezer: Snowflake,
  Microwave,
  "Cooking basics": CookingPot,
  "Crockery and cutlery": Utensils,
  Kettle: Coffee,
  Coffee,
  "Wine glasses": Wine,
  Toaster: Sandwich,
  Blender: CookingPot,
  Cooker: CookingPot,
  "Private entrance": DoorClosed,
  "Patio or balcony": TreePine,
  "Outdoor dining area": Utensils,
  "Free parking on premises": CarFront,
  Pool: Waves,
  "Hot tub": Waves,
  Gym: Dumbbell,
  "Pets allowed": PawPrint,
  "Cleaning available during stay": SprayCan,
  "Long-term stays allowed": CalendarDays,
  "Self check-in": LockKeyhole,
};

function AmenitiesDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const controls = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled])"
        ),
      ];
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  const categories = [
    ...new Set(amenityList.map((amenity) => amenity.category)),
  ];
  return (
    <div
      className="amenities-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="amenities-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="amenities-dialog-title"
        ref={dialogRef}
      >
        <header className="amenities-dialog-header">
          <button
            className="amenities-dialog-close"
            ref={closeRef}
            onClick={onClose}
            aria-label="Close amenities"
          >
            <X size={18} strokeWidth={1.7} />
          </button>
        </header>
        <div className="amenities-dialog-body">
          <h2 id="amenities-dialog-title">What this place offers</h2>
          {categories.map((category) => {
            const CategoryIcon = amenityCategoryIcons[category] || Sparkles;
            return (
              <section className="amenity-category" key={category}>
                <h3>{category}</h3>
                {amenityList
                  .filter((item) => item.category === category)
                  .map((item) => {
                    const ItemIcon =
                      amenityItemIcons[item.name] || CategoryIcon;
                    return (
                      <div
                        className={
                          item.available === false
                            ? "amenity-dialog-item unavailable"
                            : "amenity-dialog-item"
                        }
                        aria-disabled={item.available === false || undefined}
                        key={`${category}-${item.name}`}
                      >
                        {hasAirbnbAmenityIcon(item.name) ? (
                          <AirbnbAmenityIcon
                            className="amenity-custom-icon"
                            name={item.name}
                          />
                        ) : (
                          <ItemIcon
                            aria-hidden="true"
                            size={22}
                            strokeWidth={1.55}
                          />
                        )}
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ListingIntro() {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  return (
    <>
      <div className="listing-overview">
        <div>
          <h2>Entire serviced apartment in Candolim, India</h2>
          <p>
            3 guests <i /> 1 bedroom <i /> 1 bed <i /> 1 bathroom
          </p>
        </div>
      </div>
      <div className="guest-favourite-card">
        <div className="favourite-label">
          <img src={laurelOutlineLeft} alt="" />
          <b>
            Guest
            <br />
            favourite
          </b>
          <img
            className="laurel-outline-right"
            src={laurelOutlineRight}
            alt=""
          />
        </div>
        <p>
          One of the most loved homes on Airbnb,
          <br />
          according to guests
        </p>
        <div className="summary-rating">
          <strong>4.95</strong>
          <span>★★★★★</span>
        </div>
        <div className="summary-reviews">
          <strong>19</strong>
          <span>Reviews</span>
        </div>
      </div>
      <div className="host-summary">
        <img className="host-avatar" src={hostAvatar} alt="Mirashya Homes" />
        <div>
          <strong>Hosted by {listing.host.name}</strong>
          <span>2 years hosting</span>
        </div>
      </div>
      <div className="highlight-list">
        <div>
          <House />
          <span>
            <strong>Outdoor entertainment</strong>
            <small>
              The pool and alfresco dining are great for summer trips.
            </small>
          </span>
        </div>
        <div>
          <Fan />
          <span>
            <strong>Designed for staying cool</strong>
            <small>Beat the heat with the A/C and ceiling fan.</small>
          </span>
        </div>
        <div>
          <DoorOpen />
          <span>
            <strong>Self check-in</strong>
            <small>You can check in with the building staff.</small>
          </span>
        </div>
      </div>
      <div
        className={
          descriptionExpanded
            ? "description-block description-expanded"
            : "description-block"
        }
      >
        <p className="translated-note">
          Some info has been automatically translated.{" "}
          <button>Show original</button>
        </p>
        <p>{listing.description}</p>
        <button
          className="inline-action"
          aria-expanded={descriptionExpanded}
          onClick={() => setDescriptionExpanded(!descriptionExpanded)}
        >
          {descriptionExpanded ? "Show less" : "Show more"}{" "}
          <ChevronRight size={17} />
        </button>
      </div>
    </>
  );
}

function SleepSection() {
  return (
    <section className="detail-section sleep-section">
      <h2>Where you’ll sleep</h2>
      <div className="sleep-grid">
        <article>
          <img src={listing.photos[3].url} alt="Bedroom" />
          <strong>Bedroom</strong>
          <span>1 double bed</span>
        </article>
        <article>
          <img src={listing.photos[5].url} alt="Living room" />
          <strong>Living room</strong>
          <span>1 sofa</span>
        </article>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="amenities" className="detail-section amenities-section">
      <h2>What this place offers</h2>
      <div className="amenity-grid">
        {listing.amenities.slice(0, 10).map((amenity, index) => {
          const Icon = amenityIcons[index] || Sparkles;
          return (
            <div
              className={
                amenity.available === false ? "amenity unavailable" : "amenity"
              }
              key={amenity.name}
            >
              {hasAirbnbAmenityIcon(amenity.name) ? (
                <AirbnbAmenityIcon
                  className="amenity-custom-icon"
                  name={amenity.name}
                />
              ) : (
                <Icon size={23} strokeWidth={1.6} />
              )}
              <span>{amenity.name}</span>
            </div>
          );
        })}
      </div>
      <button className="outline-button" onClick={() => setShowAll(true)}>
        Show all 50 amenities
      </button>
      {showAll && <AmenitiesDialog onClose={() => setShowAll(false)} />}
    </section>
  );
}

function MiniCalendar({
  month,
  year,
  days,
  offset,
  selected,
  inRange = [],
}: {
  month: string;
  year: number;
  days: number;
  offset: number;
  selected: number[];
  inRange?: number[];
}) {
  return (
    <div className="month-calendar">
      <h3>
        {month} {year}
      </h3>
      <div className="weekday-row">
        {"SMTWTFS".split("").map((day, i) => (
          <b key={i}>{day}</b>
        ))}
      </div>
      <div className="day-grid">
        {Array.from({ length: offset }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const date = i + 1;
          const active = selected.includes(date);
          const disabled = month === "November" && date < 22;
          return (
            <button
              key={date}
              className={`${active ? "selected-day" : ""} ${
                inRange.includes(date) ? "in-range-day" : ""
              } ${disabled ? "disabled-day" : ""}`}
              disabled={disabled}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AvailabilitySection() {
  return (
    <section className="detail-section availability-section">
      <h2>5 nights in Candolim</h2>
      <p>18 Oct 2026 - 23 Oct 2026</p>
      <div className="calendar-months">
        <button className="month-arrow" aria-label="Previous month">
          <ChevronLeft />
        </button>
        <MiniCalendar
          month="October"
          year={2026}
          days={31}
          offset={4}
          selected={[18, 23]}
          inRange={[19, 20, 21, 22]}
        />
        <MiniCalendar
          month="November"
          year={2026}
          days={30}
          offset={0}
          selected={[]}
        />
        <button className="month-arrow" aria-label="Next month">
          <ChevronRight />
        </button>
      </div>
      <button className="clear-dates">Clear dates</button>
    </section>
  );
}

function RatingBreakdown() {
  const categories = [
    ["Cleanliness", "5.0", null],
    ["Accuracy", "5.0", CircleCheck],
    ["Check-in", "5.0", KeyRound],
    ["Communication", "5.0", MessageSquare],
    ["Location", "4.8", Map],
    ["Value", "4.8", Tag],
  ] as const;
  return (
    <div className="rating-breakdown">
      <div className="overall-bars">
        <b>Overall rating</b>
        {[5, 4, 3, 2, 1].map((value) => (
          <div key={value}>
            <span>{value}</span>
            <i>
              <b style={{ width: value === 5 ? "94%" : "8%" }} />
            </i>
          </div>
        ))}
      </div>
      {categories.map(([label, value, Icon]) => (
        <div className="rating-category" key={label}>
          <b>{label}</b>
          <strong>{value}</strong>
          {Icon ? (
            <Icon
              className="rating-category-icon"
              size={32}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          ) : (
            <AirbnbAmenityIcon
              name="Cleaning available during stay"
              className="rating-category-icon rating-cleanliness-icon"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ReviewSection() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [activeTopic, setActiveTopic] = useState("");
  const topics = [
    ["Comfort", 6],
    ["Accuracy", 5],
    ["Hot tub", 5],
    ["Condition", 4],
    ["Hospitality", 8],
    ["Cleanliness", 4],
    ["Amenities", 2],
    ["Decor", 2],
    ["Indoor spaces", 2],
    ["Location", 2],
  ] as const;
  return (
    <section className="wide-section reviews-section" id="reviews">
      <div className="review-hero">
        <div className="laurels">
          <img src={laurelLeft} alt="" />
          <b>4.95</b>
          <img src={laurelRight} alt="" />
        </div>
        <h2>Guest favourite</h2>
        <p>
          This home is a guest favourite based on ratings, reviews and
          <br />
          reliability
        </p>
        <button className="underlined">How reviews work</button>
      </div>
      <RatingBreakdown />
      <div className="review-topics" aria-label="Review topics">
        {topics.map(([topic, count], index) => (
          <button
            className={activeTopic === topic ? "topic-active" : ""}
            onClick={() => setActiveTopic(activeTopic === topic ? "" : topic)}
            key={topic}
          >
            <span>
              {
                ["🛏️", "✅", "🛁", "🧺", "🎁", "🧼", "🧳", "🛋️", "🪟", "📍"][
                  index
                ]
              }
            </span>
            {topic} <small>{count}</small>
          </button>
        ))}
      </div>
      <div className="review-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review.name}>
            <div className="review-author">
              <div className="avatar">
                {review.avatar ? (
                  <img src={review.avatar} alt="" />
                ) : (
                  review.name[0]
                )}
              </div>
              <span>
                <strong>{review.name}</strong>
                <small>{review.tenure}</small>
              </span>
            </div>
            <p className="review-date">
              ★★★★★ <span>· {review.date}</span>
            </p>
            <p
              className={
                expanded.includes(review.name)
                  ? "review-text expanded"
                  : "review-text"
              }
            >
              {review.text}
            </p>
            {review.text.length > 135 && (
              <button
                className="underlined"
                onClick={() =>
                  setExpanded((current) =>
                    current.includes(review.name)
                      ? current.filter((name) => name !== review.name)
                      : [...current, review.name]
                  )
                }
              >
                {expanded.includes(review.name) ? "Show less" : "Show more"}
              </button>
            )}
          </article>
        ))}
      </div>
      <button className="outline-button">Show all 19 reviews</button>
    </section>
  );
}

function LocationSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="wide-section location-section" id="location">
      <h2>Where you’ll be</h2>
      <p className="location-name">Candolim, Goa, India</p>
      <div className="map-panel">
        <div className="map-water" />
        <div className="map-road" />
        <div className="map-road second" />
        <span className="map-tree tree-one" />
        <span className="map-tree tree-two" />
        <div className="home-marker">
          <House size={25} />
        </div>
        <button className="map-search" aria-label="Search the map">
          <SearchIcon />
        </button>
        <div className="map-zoom">
          <button aria-label="Zoom in">+</button>
          <button aria-label="Zoom out">−</button>
        </div>
      </div>
      <p className="exact-location">
        Exact location will be provided after booking.
      </p>
      <h3>Neighbourhood highlights</h3>
      <p className="neighborhood-copy">
        Located in the heart of Candolim, Amor de Goa offers a peaceful stay
        with easy access to beaches, cafés, and popular attractions.
        {expanded &&
          " Candolim Beach, local restaurants, and North Goa attractions are a short trip away."}
      </p>
      <button className="underlined neighborhood-toggle" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Show less" : "Show more"} <ChevronRight size={14} aria-hidden="true" />
      </button>
    </section>
  );
}

function SearchIcon() {
  return <Search size={17} />;
}

function HostSection() {
  const cohosts = [
    { name: "Sharath", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces" },
    { name: "Aman Dev Pahwa", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=faces" },
    { name: "Maria Karen Priyanka", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" },
    { name: "Simran", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&crop=faces" },
    { name: "Pallavi", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces" },
    { name: "Sanyukta", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=96&h=96&fit=crop&crop=faces" },
    { name: "Shruti", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=96&h=96&fit=crop&crop=faces" },
    { name: "Amisha", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=96&h=96&fit=crop&crop=faces" },
  ];
  return (
    <section className="wide-section host-section">
      <h2>Meet your host</h2>
      <div className="host-layout">
        <div className="host-left">
          <div className="host-profile-card">
            <div className="host-profile-info">
              <img
                className="host-brand-avatar large"
                src={hostAvatar}
                alt="Mirashya Homes"
              />
              <div className="verified-mark">
                <Check size={12} />
              </div>
              <h3>
                Mirashya
                <br />
                Homes
              </h3>
              <small>Host</small>
            </div>
            <div className="host-stats">
              <strong>
                1,463<small>Reviews</small>
              </strong>
              <strong>
                4.68 <span aria-hidden="true">★</span><small>Rating</small>
              </strong>
              <strong>
                2<small>Years hosting</small>
              </strong>
            </div>
          </div>
          <p>
            <Lightbulb size={22} strokeWidth={1.8} aria-hidden="true" /> Born in the 80s
          </p>
          <p>
            <GraduationCap size={22} strokeWidth={1.8} aria-hidden="true" /> Where I went to school: NICMAR GOA
          </p>
        </div>
        <div className="host-right">
          <h3>Co-Hosts</h3>
          <div className="cohost-grid">
            {cohosts.map(({ name, image }) => (
              <span key={name}>
                <img className="cohost-avatar" src={image} alt="" />
                <span>{name}</span>
              </span>
            ))}
          </div>
          <h3>Host details</h3>
          <p>
            Response rate: 100%
            <br />
            Responds within an hour
          </p>
          <button className="message-host">Message host</button>
          <p className="safety-note">
            <ShieldHalf size={21} strokeWidth={1.8} aria-hidden="true" /> To help protect your payment, always use Airbnb to send money and communicate with hosts.
          </p>
        </div>
      </div>
    </section>
  );
}

function ThingsToKnow() {
  const columns = [
    [
      "Cancellation policy",
      "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund. Review this host’s full policy for details.",
      CalendarX,
    ],
    [
      "House rules",
      "Check-in after 2:00 pm\nCheckout before 11:00 am\n3 guests maximum",
      KeyRound,
    ],
    [
      "Safety & property",
      "Carbon monoxide alarm not reported\nSmoke alarm not reported\nExterior security cameras on property",
      ShieldHalf,
    ],
  ] as const;
  return (
    <section className="wide-section know-section">
      <h2>Things to know</h2>
      <div className="know-grid">
        {columns.map(([title, text, Icon]) => (
          <article key={title}>
            <Icon className="know-icon" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
            <a className="know-learn-more" href="#learn-more">Learn more</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function NearbySection() {
  const [page, setPage] = useState(0);
  const staysPerPage = 5;
  const lastPageStart = Math.max(0, nearbyStays.length - staysPerPage);
  const start = page === 0 ? 0 : lastPageStart;
  const visibleStays = nearbyStays.slice(start, start + staysPerPage);
  return (
    <section className="wide-section nearby-section">
      <div className="nearby-heading">
        <h2>More stays nearby</h2>
        <span aria-live="polite">{page + 1} / 2</span>
        <button
          disabled={page === 0}
          onClick={() => setPage(0)}
          aria-label="Previous stays"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          disabled={page === 1}
          onClick={() => setPage(1)}
          aria-label="Next stays"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="nearby-grid">
        {visibleStays.map((stay) => {
          return (
            <article key={stay.title}>
              <div className="nearby-image">
                <img src={stay.image} alt="" />
              </div>
              <div className="nearby-title">
                <strong>{stay.title}</strong>
              </div>
              <p>{stay.price} <span>★ {stay.rating}</span></p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ListingDetails({ onReserve }: { onReserve: () => void }) {
  return (
    <>
      <div className="detail-layout" id="details">
        <div className="detail-main-column">
          <ListingIntro />
          <SleepSection />
          <AmenitiesSection />
          <AvailabilitySection />
        </div>
        <BookingCard onReserve={onReserve} />
      </div>
      <ReviewSection />
      <LocationSection />
      <HostSection />
      <ThingsToKnow />
      <NearbySection />
    </>
  );
}

export function ListingOverviewBar() {
  return (
    <div className="listing-overview-bar">
      <div>
        <h2>Entire serviced apartment in Candolim, India</h2>
        <p>3 guests · 1 bedroom · 1 bed · 1 bathroom</p>
      </div>
      <div className="overview-symbols">
        <BedDouble />
        <Users />
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span>© 2026 Airbnb, Inc.</span>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
        <a href="#sitemap">Sitemap</a>
      </div>
      <div>
        <span>English (IN)</span>
        <span>₹ INR</span>
        <a href="#support">Support & resources</a>
      </div>
    </footer>
  );
}

export function OfferBadge() {
  return (
    <span className="offer-badge">
      <Tag size={14} /> 10% offer available
    </span>
  );
}
