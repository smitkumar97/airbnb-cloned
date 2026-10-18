import { useState } from 'react'
import { ChevronDown, Tag } from 'lucide-react'

export function BookingCard({ onReserve }: { onReserve: () => void }) {
  const [open, setOpen] = useState<'dates' | 'guests' | null>(null)
  const [checkIn, setCheckIn] = useState('2026-10-18')
  const [checkOut, setCheckOut] = useState('2026-10-23')
  const [guests, setGuests] = useState(2)

  const prettyDate = (date: string) => {
    const [year, month, day] = date.split('-')
    return `${month}/${day}/${year}`
  }

  return (
    <aside className="booking-column" aria-label="Reserve this stay">
      <div className="offer-banner">
        <Tag size={19} fill="#3d9c6c" color="#3d9c6c" />
        <div>Get 10% off your next stay.<br /><a href="#terms">Terms apply</a></div>
        <button>Claim</button>
      </div>
      <div className="booking-card" id="booking-card">
        <div className="booking-price"><strong>₹28,499</strong><span>for 5 nights</span></div>
        <div className="booking-fields">
          <button className={open === 'dates' ? 'field active' : 'field'} onClick={() => setOpen(open === 'dates' ? null : 'dates')}>
            <small>CHECK-IN</small><span>{prettyDate(checkIn)}</span>
          </button>
          <button className={open === 'dates' ? 'field active' : 'field'} onClick={() => setOpen(open === 'dates' ? null : 'dates')}>
            <small>CHECKOUT</small><span>{prettyDate(checkOut)}</span>
          </button>
          <button className="field guests-field" onClick={() => setOpen(open === 'guests' ? null : 'guests')}>
            <small>GUESTS</small><span>{guests} guests <ChevronDown size={16} /></span>
          </button>
        </div>
        {open === 'dates' && <div className="booking-popover date-popover">
          <label>Check-in<input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} /></label>
          <label>Checkout<input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} /></label>
          <button className="text-action" onClick={() => { setCheckIn(''); setCheckOut('') }}>Clear dates</button>
        </div>}
        {open === 'guests' && <div className="booking-popover guest-popover">
          <div><span><strong>Guests</strong><small>Ages 13 or above</small></span>
            <div className="stepper"><button disabled={guests <= 1} onClick={() => setGuests(Math.max(1, guests - 1))} aria-label="Remove guest">−</button><span>{guests}</span><button onClick={() => setGuests(Math.min(3, guests + 1))} aria-label="Add guest">+</button></div>
          </div>
          <button className="text-action" onClick={() => setOpen(null)}>Done</button>
        </div>}
        <div className="cancellation-note">Free cancellation before <strong>17 October</strong></div>
        <button className="reserve-button" onClick={onReserve}>Reserve</button>
        <p className="charge-note">You won’t be charged yet</p>
      </div>
      <a className="report-listing" href="#report">⚑ &nbsp;Report this listing</a>
    </aside>
  )
}
