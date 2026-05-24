import type { PublicOffer, SearchFilters } from '../types/publicOffer.types';

export const filterOffers = (offers: PublicOffer[], filters: SearchFilters): PublicOffer[] => {
  let result = [...offers];

  // 1. Search Term (match title or business)
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    result = result.filter(
      (o) => o.title.toLowerCase().includes(term) || o.businessName.toLowerCase().includes(term)
    );
  }

  // 2. Category
  if (filters.category && filters.category !== 'All') {
    result = result.filter((o) => o.category.toLowerCase() === filters.category?.toLowerCase());
  }

  // 3. Price Range
  if (filters.minPrice !== undefined) {
    result = result.filter((o) => o.offerPrice >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((o) => o.offerPrice <= filters.maxPrice!);
  }

  // 4. Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case 'price_desc':
        result.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      case 'discount_desc':
        result.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      case 'ending_soon':
        result.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        break;
    }
  }

  return result;
};
