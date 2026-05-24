import type { PublicSlot } from '../types/publicOffer.types';

export const validateCapacity = (slot: PublicSlot, requestedPeople: number): { isValid: boolean; reason?: string } => {
  if (slot.status === 'Full' || slot.availableCount <= 0) {
    return { isValid: false, reason: 'This slot is fully booked.' };
  }

  if (requestedPeople > slot.availableCount) {
    return { isValid: false, reason: `Only ${slot.availableCount} seats left in this slot.` };
  }

  return { isValid: true };
};

export const isOfferExpired = (endDate: string): boolean => {
  return new Date(endDate).getTime() - Date.now() <= 0;
};
