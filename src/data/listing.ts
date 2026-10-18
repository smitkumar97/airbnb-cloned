import type { Listing, ListingAmenity } from '../types/listing'
import { listingPhotos } from './photos'

export const listing: Listing = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  rating: 4.95,
  reviewsCount: 19,
  location: {
    city: 'Candolim',
    region: 'Goa',
    country: 'India',
    coordinates: { latitude: 15.5162, longitude: 73.7626 },
  },
  host: {
    name: 'Mirashya Homes',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&h=240&q=85',
    yearsHosting: 2,
    isSuperhost: true,
    responseRate: '100%',
    responseTime: 'within an hour',
    languages: ['English', 'Hindi'],
  },
  photos: listingPhotos,
  pricing: {
    currency: 'INR',
    pricePerNight: 5699.8,
    cleaningFee: 0,
    serviceFee: 0,
    taxes: 0,
  },
  amenities: [
    { name: 'Kitchen', category: 'Kitchen' },
    { name: 'Wi-Fi', category: 'Essentials' },
    { name: 'Dedicated workspace', category: 'Essentials' },
    { name: 'Free parking on premises', category: 'Essentials' },
    { name: 'Pool', category: 'Outdoor' },
    { name: 'Hot tub', category: 'Outdoor' },
    { name: 'Pets allowed', category: 'Essentials' },
    { name: 'Exterior security cameras on property', category: 'Safety' },
    { name: 'Carbon monoxide alarm', category: 'Safety', available: false },
    { name: 'Smoke alarm', category: 'Safety', available: false },
  ],
  description:
    '🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴',
  property: { guests: 3, bedrooms: 1, beds: 1, bathrooms: 1, type: 'Entire serviced apartment' },
}

export const reviews = [
  { name: 'Amit', tenure: '2 months on Airbnb', date: '1 week ago', rating: 5, avatar: '', text: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.' },
  { name: 'Aheesh', tenure: '3 years on Airbnb', date: '2 weeks ago', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces', text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.' },
  { name: 'Samiksha', tenure: '8 months on Airbnb', date: 'May 2026', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces', text: 'The host was really great help.' },
  { name: 'Vedant', tenure: '4 years on Airbnb', date: 'May 2026', rating: 5, avatar: '', text: 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine. The highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa.' },
  { name: 'Vaibhav S', tenure: '3 years on Airbnb', date: 'May 2026', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&crop=faces', text: "Great great experience living out there, can't expect more, will always look for it in the future and will recommend my friends too." },
  { name: 'Mohd', tenure: '5 years on Airbnb', date: 'May 2026', rating: 5, avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=96&h=96&fit=crop&crop=faces', text: 'Great place. Exactly as described in the listing.' },
]

export const nearbyStays = [
  { title: 'Beautiful Studio with a view to die for', price: '₹23,600', rating: '4.91', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop' },
  { title: 'NAQAB - 1bhk with private pool', price: '₹42,218', rating: '4.95', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop' },
  { title: 'Greentique Luxury Flat with plunge pool, Calangute', price: '₹44,506', rating: '4.94', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop' },
  { title: 'The Tropical Studio | 5 mins to Beach', price: '₹22,824', rating: '4.96', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop' },
  { title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute', price: '₹39,942', rating: '4.95', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop' },
  { title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool', price: '₹45,648', rating: '5.0', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop' },
  { title: 'Luxury Apt | Private Pool | 6 Mins from Beach', price: '₹48,786', rating: '4.93', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&sat=-12' },
  { title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.', price: '₹22,824', rating: '4.92', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&sat=-18' },
]

export const amenityList: ListingAmenity[] = [
  ...[
    ['Bathroom', 'Hairdryer'], ['Bathroom', 'Cleaning products'], ['Bathroom', 'Shampoo'], ['Bathroom', 'Hot water'], ['Bathroom', 'Shower gel'],
    ['Bedroom and laundry', 'Washing machine'], ['Bedroom and laundry', 'Hangers'], ['Bedroom and laundry', 'Bed linen'], ['Bedroom and laundry', 'Room-darkening blinds'], ['Bedroom and laundry', 'Iron'], ['Bedroom and laundry', 'Clothes storage'], ['Bedroom and laundry', 'Cot'],
    ['Entertainment', 'TV'], ['Family', 'Cot'], ['Heating and cooling', 'Air conditioning'], ['Heating and cooling', 'Ceiling fan'],
    ['Home safety', 'Exterior security cameras on property'], ['Home safety', 'Carbon monoxide alarm'], ['Home safety', 'Smoke alarm'],
    ['Internet and office', 'Wifi'], ['Internet and office', 'Dedicated workspace'],
    ['Kitchen and dining', 'Kitchen'], ['Kitchen and dining', 'Fridge'], ['Kitchen and dining', 'Freezer'], ['Kitchen and dining', 'Microwave'], ['Kitchen and dining', 'Cooking basics'], ['Kitchen and dining', 'Crockery and cutlery'], ['Kitchen and dining', 'Kettle'], ['Kitchen and dining', 'Coffee'], ['Kitchen and dining', 'Wine glasses'], ['Kitchen and dining', 'Toaster'], ['Kitchen and dining', 'Blender'], ['Kitchen and dining', 'Cooker'],
    ['Location features', 'Private entrance'], ['Outdoor', 'Patio or balcony'], ['Outdoor', 'Outdoor dining area'],
    ['Parking and facilities', 'Free parking on premises'], ['Parking and facilities', 'Pool'], ['Parking and facilities', 'Hot tub'], ['Parking and facilities', 'Gym'],
    ['Services', 'Pets allowed'], ['Services', 'Cleaning available during stay'], ['Services', 'Long-term stays allowed'], ['Services', 'Self check-in'],
  ].map(([category, name]) => ({ category, name, available: !['Carbon monoxide alarm', 'Smoke alarm'].includes(name) })) as ListingAmenity[],
]
