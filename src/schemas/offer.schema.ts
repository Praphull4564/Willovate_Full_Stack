import { z } from 'zod';
import { OFFER_STATUSES } from '../constants/offerStatus';

export const offerSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(2, 'Category is required'),
  originalPrice: z.coerce.number().positive('Original price must be greater than 0'),
  offerPrice: z.coerce.number().positive('Offer price must be greater than 0'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid start time'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid end time'),
  totalCapacity: z.coerce.number().positive('Total capacity must be greater than 0'),
  maxBookingPerCustomer: z.coerce.number().positive('Must be greater than 0'),
  termsAndConditions: z.string().min(5, 'Terms and conditions are required'),
  status: z.enum(OFFER_STATUSES).optional(),
}).refine(
  (data) => data.offerPrice < data.originalPrice,
  {
    message: 'Offer price must be less than the original price',
    path: ['offerPrice'],
  }
).refine(
  (data) => new Date(data.endDate) >= new Date(data.startDate),
  {
    message: 'End date must be after or equal to start date',
    path: ['endDate'],
  }
).refine(
  (data) => data.maxBookingPerCustomer <= data.totalCapacity,
  {
    message: 'Max bookings per customer cannot exceed total capacity',
    path: ['maxBookingPerCustomer'],
  }
);

export type OfferFormData = z.infer<typeof offerSchema>;
