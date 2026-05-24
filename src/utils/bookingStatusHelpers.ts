import type { AdminBookingStatus } from '../types/bookingAdmin.types';
import { VALID_STATUS_TRANSITIONS } from '../schemas/bookingStatus.schema';

export const canTransitionTo = (currentStatus: AdminBookingStatus, targetStatus: AdminBookingStatus): boolean => {
  return VALID_STATUS_TRANSITIONS[currentStatus].includes(targetStatus);
};

export const getAvailableTransitions = (currentStatus: AdminBookingStatus): AdminBookingStatus[] => {
  return VALID_STATUS_TRANSITIONS[currentStatus];
};

export const isTerminalStatus = (status: AdminBookingStatus): boolean => {
  return VALID_STATUS_TRANSITIONS[status].length === 0;
};
