export const SLOT_STATUSES = ['Available', 'Full', 'Closed', 'Expired', 'Cancelled'] as const;

export type SlotStatus = typeof SLOT_STATUSES[number];
