import { listing } from "./data/listing";
import { ListingDetails } from "./components/ListingContent";
import { PhotoGallery } from "./components/PhotoGallery";
import { SiteHeader } from "./components/SiteHeader";

function App() {
  const reserve = () => {};

  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader
        rating={listing.rating}
        reviewCount={listing.reviewsCount}
        onReserve={reserve}
      />
      <main className="page-shell" id="main">
        <PhotoGallery photos={listing.photos} title={listing.title} />
        <ListingDetails />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
