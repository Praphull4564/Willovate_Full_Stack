import { api } from './api';
import type { BusinessProfile } from '../types/business.types';

// Map frontend type → backend DTO field names
const toCreateDto = (profile: BusinessProfile) => ({
  name: profile.businessName,
  businessType: profile.businessType,
  ownerName: profile.ownerName,
  phone: profile.phoneNumber,
  email: profile.email,
  address: profile.address,
  city: profile.city,
  openingTime: profile.openingTime,
  closingTime: profile.closingTime,
  logoUrl: profile.logoUrl ?? null,
});

// Map backend response → frontend type
const fromResponse = (d: any): BusinessProfile => ({
  id: d.id,
  businessName: d.name,
  businessType: d.businessType,
  ownerName: d.ownerName,
  phoneNumber: d.phone,
  email: d.email,
  address: d.address,
  city: d.city,
  openingTime: d.openingTime,
  closingTime: d.closingTime,
  logoUrl: d.logoUrl ?? undefined,
});

export const businessService = {
  getBusinessProfile: async (): Promise<BusinessProfile | null> => {
    try {
      const response = await api.get('/business');
      const raw = response.data.data ?? response.data;
      // Backend returns array; take first
      const list = Array.isArray(raw) ? raw : [raw];
      return list.length > 0 ? fromResponse(list[0]) : null;
    } catch {
      return null;
    }
  },

  createBusinessProfile: async (profile: BusinessProfile): Promise<BusinessProfile> => {
    const response = await api.post('/business', toCreateDto(profile));
    const data = response.data.data ?? response.data;
    return fromResponse(data);
  },

  updateBusinessProfile: async (id: string, profile: BusinessProfile): Promise<BusinessProfile> => {
    const response = await api.put(`/business/${id}`, toCreateDto(profile));
    const data = response.data.data ?? response.data;
    return fromResponse(data);
  },
};
