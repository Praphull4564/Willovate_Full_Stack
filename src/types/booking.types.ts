export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Failed';

export interface CreateBookingRequest {
  offerId: string;
  slotId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  peopleCount: number;
  specialNote?: string;
}

export interface BookingResponse {
  id: string;
  referenceId: string;
  offerId: string;
  slotId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  peopleCount: number;
  specialNote?: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  
  // Joined fields for convenience on confirmation page
  offerTitle?: string;
  businessName?: string;
  slotDate?: string;
  slotStartTime?: string;
  slotEndTime?: string;
}
