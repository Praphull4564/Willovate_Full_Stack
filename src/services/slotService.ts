import { api } from './api';
import type { Slot, CreateSlotDTO, UpdateSlotDTO } from '../types/slot.types';
import { demoSlots } from '../data/demoData';

const getItems = (payload: any): any[] => {
  const data = payload?.data ?? payload;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const fromResponse = (d: any): Slot => ({
  id: d.id,
  offerId: d.offerId,
  slotDate: d.slotDate ? d.slotDate.split('T')[0] : '',
  startTime: d.startTime,
  endTime: d.endTime,
  capacity: d.capacity,
  bookedCount: d.bookedCount,
  availableCount: d.availableCount,
  status: d.status,
});

export const slotService = {
  getAllSlots: async (): Promise<Slot[]> => {
    try {
      const response = await api.get('/slots', { params: { pageSize: 100 } });
      const slots = getItems(response.data).map(fromResponse);
      return slots.length > 0 ? slots : demoSlots;
    } catch {
      return demoSlots;
    }
  },

  getOfferSlots: async (offerId: string): Promise<Slot[]> => {
    try {
      const response = await api.get(`/offers/${offerId}/slots`, { params: { pageSize: 100 } });
      const slots = getItems(response.data).map(fromResponse);
      return slots.length > 0 ? slots : demoSlots.filter((slot) => slot.offerId === offerId);
    } catch {
      return demoSlots.filter((slot) => slot.offerId === offerId);
    }
  },

  createSlot: async (dto: CreateSlotDTO): Promise<Slot[]> => {
    const payload = {
      offerId: dto.offerId,
      slotDate: dto.slotDate,
      startTime: dto.startTime,
      endTime: dto.endTime,
      capacity: dto.capacity,
      status: dto.status ?? 'Available',
    };
    const response = await api.post('/slots', payload);
    const data = response.data.data ?? response.data;
    // Backend returns single slot; wrap in array for compat
    const single = Array.isArray(data) ? data : [data];
    return single.map(fromResponse);
  },

  updateSlot: async (id: string, dto: UpdateSlotDTO): Promise<Slot> => {
    const response = await api.put(`/slots/${id}`, dto);
    const data = response.data.data ?? response.data;
    return fromResponse(data);
  },

  deleteSlot: async (id: string): Promise<void> => {
    await api.delete(`/slots/${id}`);
  },
};
