import type { OfferStatus } from '../constants/offerStatus';

export interface Offer {
  id: string;
  businessId?: string;
  businessName?: string;
  businessType?: string;
  title: string;
  description: string;
  category: string;
  originalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  totalCapacity: number;
  maxBookingPerCustomer: number;
  termsAndConditions: string;
  status: OfferStatus;
}

export type CreateOfferDTO = Omit<Offer, 'id' | 'status'> & { status?: OfferStatus };
