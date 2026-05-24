import type { SlotStatus } from '../constants/slotStatus';

export interface Slot {
  id: string;
  offerId: string;
  slotDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  capacity: number;
  bookedCount: number;
  availableCount: number;
  status: SlotStatus;
}

export type CreateSlotDTO = Omit<Slot, 'id' | 'bookedCount' | 'availableCount' | 'status'> & {
  status?: SlotStatus;
  // Options for bulk creation
  isRecurring?: boolean;
  repeatUntil?: string; // YYYY-MM-DD
  repeatDays?: number[]; // 0 for Sunday, 1 for Monday, etc.
};

export type UpdateSlotDTO = Partial<Omit<Slot, 'id'>>;
