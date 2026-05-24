import type { BusinessType } from '../constants/businessTypes';

export interface BusinessProfile {
  id?: string;
  businessName: string;
  businessType: BusinessType;
  ownerName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  openingTime: string;
  closingTime: string;
  logoUrl?: string;
}
