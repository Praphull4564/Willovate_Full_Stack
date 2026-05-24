import { useQuery } from '@tanstack/react-query';
import { publicOfferService } from '../services/publicOfferService';

export const PUBLIC_OFFERS_KEY = 'public_offers';
export const PUBLIC_OFFER_DETAILS_KEY = 'public_offer_details';
export const PUBLIC_OFFER_SLOTS_KEY = 'public_offer_slots';

export const usePublicOffers = () => {
  const { data: offers = [], isLoading, isError } = useQuery({
    queryKey: [PUBLIC_OFFERS_KEY],
    queryFn: publicOfferService.getAllOffers,
  });

  return { offers, isLoading, isError };
};

export const usePublicOfferDetails = (id?: string) => {
  const { data: offer = null, isLoading, isError } = useQuery({
    queryKey: [PUBLIC_OFFER_DETAILS_KEY, id],
    queryFn: () => id ? publicOfferService.getOfferDetails(id) : Promise.resolve(null),
    enabled: !!id,
  });

  return { offer, isLoading, isError };
};

export const usePublicOfferSlots = (offerId?: string) => {
  const { data: slots = [], isLoading, isError } = useQuery({
    queryKey: [PUBLIC_OFFER_SLOTS_KEY, offerId],
    queryFn: () => offerId ? publicOfferService.getOfferSlots(offerId) : Promise.resolve([]),
    enabled: !!offerId,
  });

  return { slots, isLoading, isError };
};
