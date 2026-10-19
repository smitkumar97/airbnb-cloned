import { useCallback, useState } from "react";
import { listing } from "./data/listing";
import { Footer, ListingDetails } from "./components/ListingContent";
import { PhotoGallery } from "./components/PhotoGallery";
import { SiteHeader } from "./components/SiteHeader";
import { Toast } from "./components/Toast";

function App() {
  const [reserveToastVisible, setReserveToastVisible] = useState(false);
  const reserve = useCallback(() => setReserveToastVisible(true), []);
  const dismissReserveToast = useCallback(
    () => setReserveToastVisible(false),
    []
  );

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
        <ListingDetails onReserve={reserve} />
      </main>
      {/* <Footer /> */}
      <Toast
        message="You won't be charged yet."
        visible={reserveToastVisible}
        onDismiss={dismissReserveToast}
      />
    </div>
  );
}

export default App;
