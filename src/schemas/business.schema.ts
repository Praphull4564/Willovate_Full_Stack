import { z } from 'zod';
import { BUSINESS_TYPES } from '../constants/businessTypes';

export const businessSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessType: z.enum(BUSINESS_TYPES, {
    errorMap: () => ({ message: 'Please select a valid business type' }),
  } as any),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  openingTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  closingTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  logoUrl: z.string().optional(),
}).refine(
  (data) => {
    // Parse times to compare them
    const [openHours, openMinutes] = data.openingTime.split(':').map(Number);
    const [closeHours, closeMinutes] = data.closingTime.split(':').map(Number);
    const openDate = new Date(0, 0, 0, openHours, openMinutes);
    const closeDate = new Date(0, 0, 0, closeHours, closeMinutes);
    
    return openDate < closeDate;
  },
  {
    message: 'Closing time must be after opening time',
    path: ['closingTime'],
  }
);

export type BusinessFormData = z.infer<typeof businessSchema>;
