import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  Grip,
  Heart,
  Share,
  X,
} from "lucide-react";
import type { ListingPhoto } from "../types/listing";

interface PhotoGalleryProps {
  photos: ListingPhoto[];
  title: string;
  onSave?: () => void;
}

type GalleryView = "tour" | "lightbox";

// The reference route uses its own photo IDs. Keep the one documented deep
// link mapped to our matching zero-based listing photo index.
const referencePhotoIds: Record<string, number> = { "1024": 24 };

function photoIndexFromUrl(item: string | null, photoCount: number) {
  if (!item) return 0;
  const referenceIndex = referencePhotoIds[item];
  if (referenceIndex !== undefined && referenceIndex < photoCount)
    return referenceIndex;
  const index = Number(item);
  return Number.isInteger(index) && index >= 0 && index < photoCount ? index : 0;
}

export function PhotoGallery({ photos, title, onSave }: PhotoGalleryProps) {
  const query = new URLSearchParams(window.location.search);
  const queryOpensTour = query.get("modal") === "PHOTO_TOUR_SCROLLABLE";
  const queryOpensPhoto = queryOpensTour && query.has("modalItem");
  const [view, setView] = useState<GalleryView | null>(() =>
    queryOpensPhoto ? "lightbox" : queryOpensTour ? "tour" : null
  );
  const [activePhoto, setActivePhoto] = useState(() =>
    queryOpensPhoto ? photoIndexFromUrl(query.get("modalItem"), photos.length) : 0
  );
  const [startCategory, setStartCategory] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const galleryScrollTopRef = useRef(0);
  const pendingCategoryScrollRef = useRef(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
  const visiblePhotos = photos.slice(0, 5);
  const photosByCategory = useMemo(
    () =>
      [...new Set(photos.map((photo) => photo.category))].map((category) => ({
        category,
        details: photos.find((photo) => photo.category === category)
          ?.categoryDetails,
        photos: photos
          .map((photo, index) => ({ photo, index }))
          .filter(({ photo }) => photo.category === category),
      })),
    [photos]
  );

  const scrollCategoryTo = (category: string) => {
    const target = categoryRefs.current[category];
    const scroller = galleryScrollRef.current;
    if (!target || !scroller) return;
    const top =
      scroller.scrollTop +
      target.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top -
      120;
    scroller.scrollTo({ top, behavior: "smooth" });
  };

  const openTour = (category: string | null, trigger: HTMLElement) => {
    returnFocusRef.current = trigger;
    setStartCategory(category);
    galleryScrollTopRef.current = 0;
    pendingCategoryScrollRef.current = category !== null;
    setView("tour");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?modal=PHOTO_TOUR_SCROLLABLE${window.location.hash}`
    );
  };

  const closeTour = () => {
    setView(null);
    setStartCategory(null);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${window.location.hash}`
    );
    requestAnimationFrame(() => returnFocusRef.current?.focus());
  };

  const openPhoto = (index: number) => {
    galleryScrollTopRef.current =
      galleryScrollRef.current?.scrollTop ?? galleryScrollTopRef.current;
    pendingCategoryScrollRef.current = false;
    setActivePhoto(index);
    setView("lightbox");
    const modalItem = index === 24 ? "1024" : String(index);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?modal=PHOTO_TOUR_SCROLLABLE&modalItem=${modalItem}${window.location.hash}`
    );
  };

  const returnToTour = () => {
    setView("tour");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?modal=PHOTO_TOUR_SCROLLABLE${window.location.hash}`
    );
  };
  const changePhoto = (direction: number) => {
    setActivePhoto((index) => {
      const next = (index + direction + photos.length) % photos.length;
      const modalItem = next === 24 ? "1024" : String(next);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?modal=PHOTO_TOUR_SCROLLABLE&modalItem=${modalItem}${window.location.hash}`
      );
      return next;
    });
  };

  useEffect(() => {
    if (!view) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => {
      if (view === "tour" && galleryScrollRef.current) {
        if (pendingCategoryScrollRef.current && startCategory)
          scrollCategoryTo(startCategory);
        else galleryScrollRef.current.scrollTop = galleryScrollTopRef.current;
        pendingCategoryScrollRef.current = false;
      }
      closeButtonRef.current?.focus();
    });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (view === "lightbox") returnToTour();
        else closeTour();
      }
      if (view === "lightbox" && event.key === "ArrowRight") {
        event.preventDefault();
        changePhoto(1);
      }
      if (view === "lightbox" && event.key === "ArrowLeft") {
        event.preventDefault();
        changePhoto(-1);
      }
      if (event.key === "Tab") {
        const controls = [
          ...document.querySelectorAll<HTMLElement>(
            "[data-photo-dialog] button:not(:disabled)"
          ),
        ];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [view, startCategory, photos.length]);

  return (
    <section
      id="photos"
      className="gallery-section"
      aria-label="Photos of this place"
    >
      <div className="listing-title-row">
        <h1>{title}</h1>
        <div className="title-actions">
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
          >
            <Share size={16} /> Share
          </button>
          <button
            aria-pressed={saved}
            onClick={() => {
              setSaved(!saved);
              onSave?.();
            }}
          >
            <Heart
              size={17}
              fill={saved ? "#ff385c" : "none"}
              color={saved ? "#ff385c" : "currentColor"}
            />{" "}
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
      <div className="hero-gallery">
        {visiblePhotos.map((photo, index) => (
          <button
            className={`gallery-photo photo-${index + 1}`}
            key={photo.url}
            onClick={(event) => openTour(photo.category, event.currentTarget)}
            aria-label={`View ${photo.category} photos`}
          >
            <img src={photo.url} alt={photo.alt} />
          </button>
        ))}
        <button
          className="show-photos"
          onClick={(event) => openTour(null, event.currentTarget)}
        >
          <Grid2X2 size={15} /> Show all photos
        </button>
      </div>

      {view === "tour" && (
        <div
          ref={galleryScrollRef}
          className="photo-tour fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-white text-[#222]"
          role="dialog"
          aria-modal="true"
          aria-label="Photo tour"
          data-photo-dialog
        >
          <div className="photo-tour-header sticky top-0 z-10 grid h-[88px] grid-cols-[1fr_auto_1fr] items-center bg-white px-8">
            <button
              ref={closeButtonRef}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-[#f7f7f7]"
              onClick={closeTour}
              aria-label="Back to listing"
            >
              <ChevronLeft size={28} />
            </button>
            <span className="text-md font-medium">Photo tour</span>
            <div className="flex justify-end gap-1">
              <button
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-[#f7f7f7]"
                onClick={() =>
                  navigator.clipboard?.writeText(window.location.href)
                }
                aria-label="Share photo tour"
              >
                <Share size={17} />
              </button>
              <button
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-[#f7f7f7]"
                aria-pressed={saved}
                onClick={() => {
                  setSaved(!saved);
                  onSave?.();
                }}
                aria-label="Save listing"
              >
                <Heart
                  size={19}
                  fill={saved ? "#ff385c" : "none"}
                  color={saved ? "#ff385c" : "currentColor"}
                />
              </button>
            </div>
          </div>
          <div className="photo-tour-content mx-auto max-w-[976px] pb-16">
            <nav
              className="photo-category-nav grid grid-cols-8 gap-x-3 gap-y-3"
              aria-label="Photo categories"
            >
              {photosByCategory.map(({ category, photos: categoryPhotos }) => (
                <button
                  key={category}
                  className="photo-category-card text-left"
                  onClick={() => scrollCategoryTo(category)}
                  aria-label={`View ${category} photos`}
                >
                  <img src={categoryPhotos[0].photo.url} alt="" />
                  <span>{category}</span>
                </button>
              ))}
            </nav>
            <div className="photo-tour-rooms">
              {photosByCategory.map(
                ({ category, details, photos: categoryPhotos }) => (
                  <section
                    key={category}
                    ref={(node) => {
                      categoryRefs.current[category] = node;
                    }}
                    className="photo-tour-room scroll-mt-[220px]"
                  >
                    <div className="photo-tour-room-copy">
                      <h2>{category}</h2>
                      {details && <p>{details}</p>}
                    </div>
                    <div
                      className={`photo-tour-mosaic photo-tour-mosaic-${Math.min(
                        categoryPhotos.length,
                        3
                      )}`}
                    >
                      {categoryPhotos.map(({ photo, index }) => (
                        <button
                          key={`${category}-${index}`}
                          className="photo-tour-image"
                          onClick={() => openPhoto(index)}
                          aria-label={`Open photo ${index + 1} of ${
                            photos.length
                          }, ${category}`}
                        >
                          <img
                            src={photo.url}
                            alt={photo.alt}
                            loading={index < 5 ? "eager" : "lazy"}
                          />
                        </button>
                      ))}
                    </div>
                  </section>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {view === "lightbox" && (
        <div
          className="photo-lightbox fixed inset-0 z-[110] flex flex-col bg-white text-[#222]"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          data-photo-dialog
        >
          <header className="photo-lightbox-header relative z-20 grid h-[72px] shrink-0 grid-cols-[1fr_auto_1fr] items-center pl-4 pr-6">
            <button
              ref={closeButtonRef}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-[#f7f7f7]"
              onClick={returnToTour}
              aria-label="Back to all photos"
            >
              <Grip size={18} />
            </button>
            <span className="text-base font-medium leading-5">
              {photos[activePhoto].category}
            </span>
            <div className="flex items-center justify-end gap-5">
              <span className="text-sm tabular-nums">
                {activePhoto + 1} of {photos.length}
              </span>
              <button
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-[#f7f7f7]"
                onClick={returnToTour}
                aria-label="Close photo"
              >
                <X size={20} />
              </button>
            </div>
          </header>
          <div className="relative flex min-h-0 flex-1 -translate-y-14 items-center justify-center px-20 pb-8 pt-4">
            <img
              className="max-h-[68vh] max-w-[85vw] object-contain"
              src={photos[activePhoto].url}
              alt={photos[activePhoto].alt}
            />
          </div>
          <button
            className="photo-lightbox-arrow left-4"
            onClick={() => changePhoto(-1)}
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="photo-lightbox-arrow right-4"
            onClick={() => changePhoto(1)}
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </section>
  );
}
