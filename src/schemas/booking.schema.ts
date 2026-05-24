import { z } from 'zod';

export const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
  customerPhone: z.string().regex(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number'),
  customerEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  peopleCount: z.number().int().min(1, 'At least 1 person is required').max(50, 'Maximum 50 people allowed'),
  specialNote: z.string().max(200, 'Note is too long').optional(),
  slotId: z.string().min(1, 'Please select a slot'),
  offerId: z.string().min(1, 'Offer ID is required'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
