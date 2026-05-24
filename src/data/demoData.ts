import type { Offer } from '../types/offer.types';
import type { Slot } from '../types/slot.types';
import type { PublicOffer, PublicSlot } from '../types/publicOffer.types';
import type { AdminBooking } from '../types/bookingAdmin.types';
import type { RevenueDataPoint, DashboardSummary, ActivityItem } from '../types/analytics.types';

const today = new Date('2026-05-24T00:00:00');
const isoDate = (daysAhead: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0];
};

export const fallbackOfferImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1d4ed8"/>
          <stop offset="55%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#0f766e"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)"/>
      <circle cx="180" cy="170" r="120" fill="rgba(255,255,255,0.12)"/>
      <circle cx="1010" cy="140" r="180" fill="rgba(255,255,255,0.08)"/>
      <circle cx="930" cy="650" r="220" fill="rgba(255,255,255,0.08)"/>
      <text x="80" y="640" fill="white" font-family="Arial, sans-serif" font-size="76" font-weight="700">Smart Offer</text>
      <text x="80" y="710" fill="rgba(255,255,255,0.82)" font-family="Arial, sans-serif" font-size="34">Demo-ready fallback artwork</text>
    </svg>
  `);

const imageThemes: Record<string, { start: string; end: string; accent: string }> = {
  Food: { start: '#f97316', end: '#7c2d12', accent: '#fdba74' },
  Fitness: { start: '#2563eb', end: '#0f172a', accent: '#38bdf8' },
  Beauty: { start: '#db2777', end: '#4c1d95', accent: '#f9a8d4' },
  Healthcare: { start: '#0f766e', end: '#0f172a', accent: '#5eead4' },
  Sports: { start: '#16a34a', end: '#14532d', accent: '#86efac' },
  Education: { start: '#7c3aed', end: '#312e81', accent: '#c4b5fd' },
  Wellness: { start: '#0891b2', end: '#164e63', accent: '#67e8f9' },
  Entertainment: { start: '#dc2626', end: '#7f1d1d', accent: '#fca5a5' },
  Activities: { start: '#ca8a04', end: '#713f12', accent: '#fde68a' },
};

const shorten = (value: string, max = 22) => (value.length > max ? `${value.slice(0, max - 1)}…` : value);

const buildOfferImage = (title: string, category: string) => {
  const theme = imageThemes[category] ?? { start: '#1d4ed8', end: '#0f172a', accent: '#93c5fd' };
  const shortTitle = shorten(title, 24);
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${theme.start}"/>
            <stop offset="100%" stop-color="${theme.end}"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#bg)"/>
        <circle cx="980" cy="100" r="200" fill="${theme.accent}" fill-opacity="0.18"/>
        <circle cx="170" cy="670" r="250" fill="${theme.accent}" fill-opacity="0.12"/>
        <rect x="74" y="78" width="210" height="52" rx="26" fill="rgba(255,255,255,0.15)"/>
        <text x="108" y="112" fill="white" font-family="Arial, sans-serif" font-size="28" font-weight="700">${category}</text>
        <rect x="74" y="486" width="420" height="170" rx="32" fill="rgba(15,23,42,0.24)" stroke="rgba(255,255,255,0.18)"/>
        <text x="106" y="566" fill="white" font-family="Arial, sans-serif" font-size="58" font-weight="700">${shortTitle}</text>
        <text x="106" y="620" fill="rgba(255,255,255,0.84)" font-family="Arial, sans-serif" font-size="24">Limited-time curated booking experience</text>
        <rect x="840" y="520" width="210" height="120" rx="30" fill="rgba(255,255,255,0.10)"/>
        <text x="890" y="575" fill="white" font-family="Arial, sans-serif" font-size="34" font-weight="700">SMART</text>
        <text x="890" y="612" fill="rgba(255,255,255,0.76)" font-family="Arial, sans-serif" font-size="24">OFFER</text>
      </svg>
    `)
  );
};

export const demoOffers: Offer[] = [
  ['Lunch Hour Deal', 'Food', 499, 299, 24],
  ['Gym Trial Slot', 'Fitness', 499, 99, 30],
  ['Salon Happy Hour', 'Beauty', 899, 499, 18],
  ['Doctor Consultation Discount', 'Healthcare', 700, 399, 16],
  ['Turf Morning Slot Offer', 'Sports', 1800, 999, 20],
  ['Coaching Demo Class', 'Education', 999, 149, 28],
  ['Spa Relaxation Hour', 'Wellness', 1499, 799, 14],
  ['Gaming Zone Power Pass', 'Entertainment', 699, 349, 25],
  ['Dental Checkup Camp', 'Healthcare', 1200, 499, 12],
  ['Cafe Evening Combo', 'Food', 599, 349, 22],
  ['Yoga Sunrise Batch', 'Fitness', 399, 99, 20],
  ['Kids Activity Workshop', 'Activities', 799, 399, 18],
].map(([title, category, originalPrice, offerPrice, totalCapacity], index) => ({
  id: `demo-offer-${index + 1}`,
  businessId: 'demo-business-1',
  businessName: 'Willovate Demo Studio',
  businessType: category === 'Food' ? 'Restaurant' : category === 'Fitness' ? 'Gym' : 'Other',
  title: String(title),
  description: `${title} with polished demo content and reliable local fallback data.`,
  category: String(category),
  originalPrice: Number(originalPrice),
  offerPrice: Number(offerPrice),
  discountPercentage: Math.round(((Number(originalPrice) - Number(offerPrice)) / Number(originalPrice)) * 100),
  startDate: isoDate(0),
  endDate: isoDate(21),
  startTime: '09:00:00',
  endTime: '21:00:00',
  totalCapacity: Number(totalCapacity),
  maxBookingPerCustomer: 2,
  termsAndConditions: 'Valid for demo and presentation purposes.',
  status: 'Active',
}));

export const demoSlots: Slot[] = demoOffers.flatMap((offer, index) => ([
  {
    id: `demo-slot-${index + 1}-a`,
    offerId: offer.id,
    slotDate: isoDate((index % 6) + 1),
    startTime: '10:00:00',
    endTime: '11:00:00',
    capacity: Math.max(8, Math.floor(offer.totalCapacity / 2)),
    bookedCount: (index % 4) + 2,
    availableCount: Math.max(1, Math.max(8, Math.floor(offer.totalCapacity / 2)) - ((index % 4) + 2)),
    status: 'Available',
  },
  {
    id: `demo-slot-${index + 1}-b`,
    offerId: offer.id,
    slotDate: isoDate((index % 6) + 2),
    startTime: '17:00:00',
    endTime: '18:00:00',
    capacity: Math.max(8, Math.floor(offer.totalCapacity / 2)),
    bookedCount: (index % 3) + 1,
    availableCount: Math.max(1, Math.max(8, Math.floor(offer.totalCapacity / 2)) - ((index % 3) + 1)),
    status: 'Available',
  },
]));

export const demoPublicOffers: PublicOffer[] = demoOffers.map((offer, index) => ({
  id: offer.id,
  businessType: offer.businessType,
  businessName: offer.businessName ?? 'Willovate Demo Studio',
  title: offer.title,
  description: offer.description,
  category: offer.category,
  originalPrice: offer.originalPrice,
  offerPrice: offer.offerPrice,
  discountPercentage: offer.discountPercentage,
  imageUrl: buildOfferImage(offer.title, offer.category),
  startDate: offer.startDate,
  endDate: offer.endDate,
  totalAvailableSlots: demoSlots.filter((slot) => slot.offerId === offer.id).reduce((sum, slot) => sum + slot.availableCount, 0),
  status: 'Active',
  rating: 4.6,
  reviewCount: 24 + index * 3,
}));

export const demoPublicSlots: PublicSlot[] = demoSlots.map((slot) => ({
  id: slot.id,
  offerId: slot.offerId,
  date: slot.slotDate,
  startTime: slot.startTime,
  endTime: slot.endTime,
  availableCount: slot.availableCount,
  status: slot.availableCount <= 0 ? 'Full' : slot.availableCount < 3 ? 'Fast Filling' : 'Available',
}));

export const demoAdminBookings: AdminBooking[] = demoOffers.slice(0, 10).map((offer, index) => {
  const slot = demoSlots.find((item) => item.offerId === offer.id)!;
  const statuses: AdminBooking['status'][] = ['Confirmed', 'Pending', 'Completed', 'Cancelled', 'Confirmed', 'Completed', 'Pending', 'Confirmed', 'No Show', 'Completed'];
  return {
    id: `demo-booking-${index + 1}`,
    referenceId: `BKG-DEMO-${1001 + index}`,
    offerId: offer.id,
    slotId: slot.id,
    customerName: ['Aarav', 'Riya', 'Kabir', 'Sara', 'Myra', 'Dev', 'Nisha', 'Tara', 'Ishaan', 'Anaya'][index],
    customerPhone: `90000000${(index + 1).toString().padStart(2, '0')}`,
    customerEmail: `guest${index + 1}@demo.com`,
    peopleCount: index % 3 === 0 ? 2 : 1,
    specialNote: index % 2 === 0 ? 'Demo booking' : '',
    totalPrice: offer.offerPrice,
    status: statuses[index],
    createdAt: new Date(`2026-05-${String(14 + index).padStart(2, '0')}T10:00:00Z`).toISOString(),
    updatedAt: new Date(`2026-05-${String(14 + index).padStart(2, '0')}T12:00:00Z`).toISOString(),
    offerTitle: offer.title,
    slotDate: slot.slotDate,
    slotStartTime: slot.startTime,
    slotEndTime: slot.endTime,
    paymentStatus: index % 4 === 0 ? 'Paid' : 'Pending',
  };
});

export const demoRevenueTrends: RevenueDataPoint[] = Array.from({ length: 10 }).map((_, index) => ({
  date: isoDate(index - 9),
  revenue: 1200 + index * 420 + (index % 2) * 250,
  bookings: 4 + (index % 5) + index,
}));

export const demoDashboardSummary: DashboardSummary = {
  totalOffers: demoOffers.length,
  activeOffers: demoOffers.length - 1,
  totalBookings: demoAdminBookings.length,
  todayBookings: 3,
  totalCapacity: demoSlots.reduce((sum, slot) => sum + slot.capacity, 0),
  bookedSeats: demoSlots.reduce((sum, slot) => sum + slot.bookedCount, 0),
  availableSeats: demoSlots.reduce((sum, slot) => sum + slot.availableCount, 0),
  conversionRate: 68,
  trends: {
    totalOffers: 12,
    activeOffers: 8,
    totalBookings: 16,
    todayBookings: 5,
    totalCapacity: 10,
    bookedSeats: 18,
    availableSeats: -4,
    conversionRate: 6,
    revenue: 22,
    bookings: 16,
    conversion: 6,
  },
};

export const demoActivity: ActivityItem[] = [
  {
    id: 'demo-activity-1',
    type: 'booking_created',
    title: 'New Booking',
    description: 'A Gym Trial Slot booking was created by Aarav.',
    timestamp: new Date('2026-05-24T09:00:00Z').toISOString(),
  },
  {
    id: 'demo-activity-2',
    type: 'offer_activated',
    title: 'Offer Activated',
    description: 'Salon Happy Hour was pushed live for afternoon traffic.',
    timestamp: new Date('2026-05-24T07:30:00Z').toISOString(),
  },
  {
    id: 'demo-activity-3',
    type: 'slot_filled',
    title: 'Slot Filling Fast',
    description: 'Turf Morning Slot Offer crossed 80% capacity.',
    timestamp: new Date('2026-05-23T18:15:00Z').toISOString(),
  },
];
