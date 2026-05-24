export const BUSINESS_TYPES = [
  'Restaurant',
  'Gym',
  'Salon',
  'Clinic',
  'Coaching',
  'Turf',
  'Other',
] as const;

export type BusinessType = typeof BUSINESS_TYPES[number];
