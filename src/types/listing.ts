export interface ListingPhoto {
  url: string
  alt: string
  category: string
  categoryDetails?: string
}

export interface ListingAmenity {
  name: string
  category: string
  available?: boolean
}

export interface Listing {
  title: string
  rating: number
  reviewsCount: number
  location: {
    city: string
    region: string
    country: string
    coordinates: { latitude: number; longitude: number }
  }
  host: {
    name: string
    avatarUrl: string
    yearsHosting: number
    isSuperhost: boolean
    responseRate: string
    responseTime: string
    languages: string[]
  }
  photos: ListingPhoto[]
  pricing: {
    currency: 'INR'
    pricePerNight: number
    cleaningFee: number
    serviceFee: number
    taxes: number
  }
  amenities: ListingAmenity[]
  description: string
  property: {
    guests: number
    bedrooms: number
    beds: number
    bathrooms: number
    type: string
  }
}
