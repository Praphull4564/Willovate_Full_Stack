export interface PublicOffer {
  id: string;
  businessType?: string;
  businessName: string;
  title: string;
  description: string;
  category: string;
  originalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  imageUrl: string;
  startDate: string; // ISO
  endDate: string; // ISO
  totalAvailableSlots: number;
  status: 'Active' | 'Ending Soon' | 'Expired';
  rating?: number;
  reviewCount?: number;
}

export interface PublicSlot {
  id: string;
  offerId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  availableCount: number;
  status: 'Available' | 'Fast Filling' | 'Full';
}

export interface SearchFilters {
  searchTerm?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  date?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'discount_desc' | 'ending_soon';
}
