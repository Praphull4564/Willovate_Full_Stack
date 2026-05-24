export const OFFER_STATUSES = ['Draft', 'Active', 'Paused', 'Expired', 'Cancelled'] as const;

export type OfferStatus = typeof OFFER_STATUSES[number];
