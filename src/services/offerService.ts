import { api } from './api';
import type { Offer, CreateOfferDTO } from '../types/offer.types';
import { demoOffers } from '../data/demoData';

const getItems = (payload: any): any[] => {
  const data = payload?.data ?? payload;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

// Map backend response → frontend Offer
const fromResponse = (d: any): Offer => ({
  id: d.id,
  businessId: d.businessId,
  businessName: d.businessName,
  businessType: d.businessType,
  title: d.title,
  description: d.description,
  category: d.category,
  originalPrice: Number(d.originalPrice),
  offerPrice: Number(d.offerPrice),
  discountPercentage: Number(d.discountPercentage),
  startDate: d.startDate ? d.startDate.split('T')[0] : '',
  endDate: d.endDate ? d.endDate.split('T')[0] : '',
  startTime: d.startTime,
  endTime: d.endTime,
  totalCapacity: d.totalCapacity,
  maxBookingPerCustomer: d.maxBookingPerCustomer,
  termsAndConditions: d.termsAndConditions ?? '',
  status: d.status,
});

// Map frontend DTO → backend create payload
const toCreateDto = (dto: CreateOfferDTO, businessId: string) => ({
  businessId,
  title: dto.title,
  description: dto.description,
  category: dto.category,
  originalPrice: dto.originalPrice,
  offerPrice: dto.offerPrice,
  startDate: dto.startDate,
  endDate: dto.endDate,
  startTime: dto.startTime,
  endTime: dto.endTime,
  totalCapacity: dto.totalCapacity,
  maxBookingPerCustomer: dto.maxBookingPerCustomer,
  termsAndConditions: dto.termsAndConditions,
  status: dto.status ?? 'Active',
});

export const offerService = {
  getOffers: async (): Promise<Offer[]> => {
    try {
      const response = await api.get('/offers', { params: { pageSize: 50 } });
      const offers = getItems(response.data).map(fromResponse);
      return offers.length > 0 ? offers : demoOffers;
    } catch {
      return demoOffers;
    }
  },

  getOfferById: async (id: string): Promise<Offer | null> => {
    try {
      const response = await api.get(`/offers/${id}`);
      const data = response.data.data ?? response.data;
      return fromResponse(data);
    } catch {
      return demoOffers.find((offer) => offer.id === id) ?? null;
    }
  },

  createOffer: async (dto: CreateOfferDTO, businessId?: string): Promise<Offer> => {
    const resolvedBusinessId = businessId ?? await getDefaultBusinessId();
    if (!resolvedBusinessId) {
      throw new Error('Create a business profile before creating offers.');
    }

    const response = await api.post('/offers', toCreateDto(dto, resolvedBusinessId));
    const data = response.data.data ?? response.data;
    return fromResponse(data);
  },

  updateOffer: async (id: string, dto: Partial<CreateOfferDTO>): Promise<Offer> => {
    const existing = await offerService.getOfferById(id);
    if (!existing) {
      throw new Error('Offer not found.');
    }

    const response = await api.put(`/offers/${id}`, { ...existing, ...dto });
    const data = response.data.data ?? response.data;
    return fromResponse(data);
  },

  deleteOffer: async (id: string): Promise<void> => {
    await api.delete(`/offers/${id}`);
  },
};

const getDefaultBusinessId = async (): Promise<string | undefined> => {
  const response = await api.get('/business');
  const raw = response.data.data ?? response.data;
  const businesses = Array.isArray(raw) ? raw : getItems(raw);
  return businesses[0]?.id;
};
