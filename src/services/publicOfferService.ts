import { api } from './api';
import type { PublicOffer, PublicSlot } from '../types/publicOffer.types';
import { demoPublicOffers, demoPublicSlots, fallbackOfferImage } from '../data/demoData';

const getItems = (payload: any): any[] => {
  const data = payload?.data ?? payload;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

// Map backend OfferResponseDto → PublicOffer
const fromOfferResponse = (d: any): PublicOffer => ({
  id: d.id,
  businessName: d.businessName ?? 'SmartOffer Business',
  businessType: d.businessType,
  title: d.title,
  description: d.description,
  category: d.category,
  originalPrice: Number(d.originalPrice),
  offerPrice: Number(d.offerPrice),
  discountPercentage: Number(d.discountPercentage),
  imageUrl: d.imageUrl ?? fallbackOfferImage,
  startDate: d.startDate,
  endDate: d.endDate,
  totalAvailableSlots: d.totalCapacity ?? 0,
  status: d.status,
  rating: 4.5,
  reviewCount: 0,
});

// Map backend SlotResponseDto → PublicSlot
const fromSlotResponse = (d: any): PublicSlot => ({
  id: d.id,
  offerId: d.offerId,
  date: d.slotDate ? d.slotDate.split('T')[0] : '',
  startTime: d.startTime,
  endTime: d.endTime,
  availableCount: d.availableCount,
  status: d.availableCount === 0 ? 'Full' : 'Available',
});

export const publicOfferService = {
  getAllOffers: async (): Promise<PublicOffer[]> => {
    try {
      const response = await api.get('/offers', { params: { pageSize: 50 } });
      const offers = getItems(response.data)
        .filter((o: any) => o.status === 'Active')
        .map(fromOfferResponse);
      return offers.length > 0 ? offers : demoPublicOffers;
    } catch {
      return demoPublicOffers;
    }
  },

  getOfferDetails: async (id: string): Promise<PublicOffer | null> => {
    try {
      const response = await api.get(`/offers/${id}`);
      const data = response.data.data ?? response.data;
      return fromOfferResponse(data);
    } catch {
      return demoPublicOffers.find((offer) => offer.id === id) ?? null;
    }
  },

  getOfferSlots: async (offerId: string): Promise<PublicSlot[]> => {
    try {
      const response = await api.get(`/offers/${offerId}/slots`);
      const slots = getItems(response.data).map(fromSlotResponse);
      return slots.length > 0 ? slots : demoPublicSlots.filter((slot) => slot.offerId === offerId);
    } catch {
      return demoPublicSlots.filter((slot) => slot.offerId === offerId);
    }
  },
};
