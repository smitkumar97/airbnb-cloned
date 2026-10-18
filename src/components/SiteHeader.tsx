import { useEffect, useState } from "react";
import { Globe, Menu, Search } from "lucide-react";
import airbnbLogo from "../assets/airbnb-wordmark.svg";
import searchHouse from "../assets/searchbar-house.png";

const sections = [
  ["photos", "Photos"],
  ["amenities", "Amenities"],
  ["reviews", "Reviews"],
  ["location", "Location"],
] as const;

export function SiteHeader({
  rating,
  reviewCount,
  onReserve,
}: {
  rating: number;
  reviewCount: number;
  onReserve: () => void;
}) {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("photos");

  useEffect(() => {
    const update = () => {
      setCompact(window.scrollY > 620);
      const current = [...sections].reverse().find(([id]) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top <= 180;
      });
      if (current) setActive(current[0]);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (compact) {
    return (
      <header className="fixed inset-x-0 top-0 z-20 flex h-16 animate-[header-in_0.18s_ease-out] items-center justify-between border-b border-[#eee] bg-white px-[max(calc((100%_-_1103px)/2),32px)] shadow-[0_2px_5px_#00000008]">
        <nav
          className="listing-section-nav flex h-16 items-stretch gap-1"
          aria-label="Listing sections"
        >
          {sections.map(([id, label], index) => (
            <a
              key={id}
              className={`listing-section-link relative flex shrink-0 items-center px-2 text-[14.5px] leading-[20px] font-medium text-[#222] no-underline section-link-${index} ${
                active === id ? "is-active" : ""
              }`}
              href={`#${id}`}
              onClick={
                id === "photos"
                  ? (event) => {
                      event.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  : undefined
              }
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          className="flex items-center gap-[18px] border-0 bg-transparent p-0 text-left"
          onClick={onReserve}
        >
          <span className="text-sm leading-[19px]">
            <strong>₹28,499</strong> for 5 nights
            <br />
            <small className="text-xs">
              ★ {rating.toFixed(2)} · {reviewCount} reviews
            </small>
          </span>
          <b className="reserve-header-button rounded-full bg-gradient-to-r from-[#e61e4d] to-[#d70466] px-6 py-[11px] text-sm font-medium text-white">
            Reserve
          </b>
        </button>
      </header>
    );
  }

  return (
    <header className="relative z-10 flex h-[89px] items-center justify-between bg-white px-[max(calc((100%_-_1103px)/2),32px)]">
      <a
        className="flex h-8 w-[104px] shrink-0 translate-y-[-0.5px] items-center no-underline"
        href="#top"
        aria-label="Airbnb homepage"
      >
        <img
          className="block h-8 w-[103.4px] object-contain"
          src={airbnbLogo}
          alt="Airbnb"
        />
      </a>
      <div
        className="absolute left-1/2 flex h-12 w-[404px] -translate-x-1/2 translate-y-[-0.5px] items-center rounded-[40px] border border-[#ddd] px-2 shadow-[0_1px_2px_#00000014] transition-shadow duration-[180ms] hover:shadow-[0_2px_8px_#0002]"
        role="group"
        aria-label="Search stays"
      >
        <button className="flex h-12 w-[149px] shrink-0 items-center justify-start gap-2 rounded-[40px] bg-transparent pl-[10px] text-[15px] leading-5 font-medium tracking-[-0.08px] whitespace-nowrap">
          <img
            className="h-12 w-12 shrink-0 object-contain"
            src={searchHouse}
            alt=""
            aria-hidden="true"
          />
          Anywhere
        </button>
        <span className="h-6 w-px shrink-0 bg-[#ddd]" aria-hidden="true" />
        <button className="flex h-12 w-[88px] shrink-0 items-center justify-center rounded-[40px] bg-transparent text-[15px] leading-5 font-medium tracking-[-0.08px] whitespace-nowrap">
          Anytime
        </button>
        <span className="h-6 w-px shrink-0 bg-[#ddd]" aria-hidden="true" />
        <button className="flex h-12 w-[106px] shrink-0 items-center justify-center rounded-[40px] bg-transparent text-[15px] leading-5 font-normal tracking-[-0.08px] whitespace-nowrap text-[#717171]">
          Add guests
        </button>
        <button
          className="ml-2 grid h-8 w-8 shrink-0 place-items-center rounded-full border-0 bg-[#ff385c] p-0 text-white transition-colors hover:bg-[#e31c5f]"
          aria-label="Search"
        >
          <Search size={17} color="white" />
        </button>
      </div>
      <div className="flex translate-y-[-0.5px] items-center justify-end gap-2">
        <button className="h-11 w-[125.3px] shrink-0 whitespace-nowrap rounded-[22px] border-0 bg-transparent px-3 text-[14px] leading-5 font-medium tracking-[-0.08px] hover:bg-[#f7f7f7]">
          Become a host
        </button>
        <button
          className="grid h-10 w-10 place-items-center rounded-full border-0 bg-[#f2f2f2] transition-colors hover:bg-[#ebebeb]"
          aria-label="Choose a language and currency"
        >
          <Globe size={18} />
        </button>
        <button
          className="grid h-10 w-10 place-items-center rounded-full border-0 bg-[#f2f2f2] transition-colors hover:bg-[#ebebeb]"
          aria-label="Main navigation menu"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}

export function PageAnchor({ id }: { id: string }) {
  return <span id={id} className="scroll-mt-[75px]" aria-hidden="true" />;
}
