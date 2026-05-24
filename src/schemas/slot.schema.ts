import { z } from 'zod';
import { SLOT_STATUSES } from '../constants/slotStatus';

export const slotSchema = z.object({
  offerId: z.string().min(1, 'Offer selection is required'),
  slotDate: z.string().min(1, 'Slot date is required'),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid start time'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid end time'),
  capacity: z.coerce.number().positive('Capacity must be greater than 0'),
  status: z.enum(SLOT_STATUSES).optional(),
  
  // Bulk creation fields
  isRecurring: z.boolean().optional(),
  repeatUntil: z.string().optional(),
  repeatDays: z.array(z.number()).optional(),
}).refine(
  (data) => {
    if (data.startTime && data.endTime) {
      // Basic time comparison assuming same day
      return data.startTime < data.endTime;
    }
    return true;
  },
  {
    message: 'End time must be after start time',
    path: ['endTime'],
  }
).refine(
  (data) => {
    if (data.isRecurring) {
      return !!data.repeatUntil;
    }
    return true;
  },
  {
    message: 'Repeat until date is required for recurring slots',
    path: ['repeatUntil'],
  }
).refine(
  (data) => {
    if (data.isRecurring) {
      return data.repeatDays && data.repeatDays.length > 0;
    }
    return true;
  },
  {
    message: 'Select at least one day to repeat',
    path: ['repeatDays'],
  }
).refine(
  (data) => {
    if (data.isRecurring && data.repeatUntil && data.slotDate) {
      return new Date(data.repeatUntil) >= new Date(data.slotDate);
    }
    return true;
  },
  {
    message: 'Repeat until date must be after or equal to slot date',
    path: ['repeatUntil'],
  }
);

export type SlotFormData = z.infer<typeof slotSchema>;
