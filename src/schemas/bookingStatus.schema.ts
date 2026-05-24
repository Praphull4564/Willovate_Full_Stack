import { z } from 'zod';
import type { AdminBookingStatus } from '../types/bookingAdmin.types';

export const bookingStatusUpdateSchema = z.object({
  status: z.enum(['Pending', 'Confirmed', 'Cancelled', 'Completed', 'No Show'] as const),
  reason: z.string().optional(),
});

export type BookingStatusUpdateData = z.infer<typeof bookingStatusUpdateSchema>;

// Defines valid transitions. E.g., can't go from Cancelled to Completed.
export const VALID_STATUS_TRANSITIONS: Record<AdminBookingStatus, AdminBookingStatus[]> = {
  Pending: ['Confirmed', 'Cancelled'],
  Confirmed: ['Completed', 'No Show', 'Cancelled'],
  Cancelled: [], // Terminal state
  Completed: [], // Terminal state
  'No Show': ['Cancelled'], // Maybe allow cancelling a no-show
};
