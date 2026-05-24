import React, { useState, useMemo } from 'react';
import { Plus, LayoutGrid, List as ListIcon, Calendar as CalendarIcon, Clock3, Users, CheckCircle2, Gauge } from 'lucide-react';
import { useSlots } from '../hooks/useSlots';
import { useOffers } from '../hooks/useOffers';
import { SlotTable } from '../components/slots/SlotTable';
import { SlotCalendar } from '../components/slots/SlotCalendar';
import { SlotCard } from '../components/slots/SlotCard';
import { SlotFilters } from '../components/slots/SlotFilters';
import { CreateSlotModal } from '../components/slots/CreateSlotModal';
import { EditSlotModal } from '../components/slots/EditSlotModal';

import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { Modal } from '../components/ui/Modal';
import type { Slot, CreateSlotDTO, UpdateSlotDTO } from '../types/slot.types';
import type { Offer } from '../types/offer.types';
import { format } from 'date-fns';

type ViewMode = 'calendar' | 'table' | 'grid';

export const SlotManagement: React.FC = () => {
  const { slots, isLoading, isError, createSlot, updateSlot, deleteSlot, isCreating, isUpdating, isDeleting } = useSlots();
  const { offers } = useOffers();

  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  
  // For calendar pre-filling
  const [initialDate, setInitialDate] = useState<string>('');
  const [initialTime, setInitialTime] = useState<string>('');

  const offersById = useMemo<Record<string, Offer>>(
    () => offers.reduce<Record<string, Offer>>((acc, offer) => {
      acc[offer.id] = offer;
      return acc;
    }, {}),
    [offers]
  );

  const filteredSlots = useMemo(() => {
    return slots.filter(slot => {
      const offer = offers.find(o => o.id === slot.offerId);
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const matchesSearch = normalizedSearch.length === 0
        ? true
        : offer?.title.toLowerCase().includes(normalizedSearch) ?? false;
      const matchesStatus = statusFilter === 'All' || slot.status === statusFilter;
      const matchesDate = !dateFilter || slot.slotDate === dateFilter;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [slots, offers, searchTerm, statusFilter, dateFilter]);

  const slotOverview = useMemo(() => {
    const totalCapacity = filteredSlots.reduce((sum, slot) => sum + slot.capacity, 0);
    const bookedSeats = filteredSlots.reduce((sum, slot) => sum + slot.bookedCount, 0);
    const availableSeats = filteredSlots.reduce((sum, slot) => sum + slot.availableCount, 0);
    const upcomingCount = filteredSlots.filter((slot) => slot.status === 'Available').length;
    return {
      totalSlots: filteredSlots.length,
      totalCapacity,
      bookedSeats,
      availableSeats,
      upcomingCount,
      utilization: totalCapacity > 0 ? Math.round((bookedSeats / totalCapacity) * 100) : 0,
    };
  }, [filteredSlots]);

  const handleCreateSubmit = async (data: any) => {
    await createSlot(data as CreateSlotDTO);
  };

  const handleEditSubmit = async (id: string, data: any) => {
    await updateSlot({ id, data: data as UpdateSlotDTO });
  };

  const handleEditClick = (slot: Slot) => {
    setSelectedSlot(slot);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const slot = slots.find(s => s.id === id);
    if (slot) {
      setSelectedSlot(slot);
      setDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (selectedSlot) {
      await deleteSlot(selectedSlot.id);
      setDeleteModalOpen(false);
      setSelectedSlot(null);
    }
  };

  const handleCalendarSelectSlot = ({ start }: { start: Date; end: Date }) => {
    setInitialDate(format(start, 'yyyy-MM-dd'));
    setInitialTime(format(start, 'HH:mm'));
    setCreateModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-red-500">
        Failed to load slots.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Slots</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage capacities and schedules for your offers.
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'calendar' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Calendar View"
            >
              <CalendarIcon size={18} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Table View"
            >
              <ListIcon size={18} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
          <Button
            leftIcon={<Plus size={18} />}
            onClick={() => {
              setInitialDate('');
              setInitialTime('');
              setCreateModalOpen(true);
            }}
            className="w-full sm:w-auto shadow-lg shadow-primary/25"
          >
            Create Slot
          </Button>
        </div>
      </div>

      <SlotFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Visible Slots', value: slotOverview.totalSlots, progress: Math.min(100, slotOverview.totalSlots * 8), icon: <CalendarIcon size={18} />, tone: 'from-sky-500/15 to-sky-500/5 text-sky-600 dark:text-sky-300' },
          { label: 'Upcoming', value: slotOverview.upcomingCount, progress: slotOverview.totalSlots > 0 ? Math.round((slotOverview.upcomingCount / slotOverview.totalSlots) * 100) : 0, icon: <Clock3 size={18} />, tone: 'from-violet-500/15 to-violet-500/5 text-violet-600 dark:text-violet-300' },
          { label: 'Capacity', value: slotOverview.totalCapacity, progress: Math.min(100, slotOverview.totalCapacity > 0 ? 100 : 0), icon: <Users size={18} />, tone: 'from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-300' },
          { label: 'Booked Seats', value: slotOverview.bookedSeats, progress: slotOverview.totalCapacity > 0 ? Math.round((slotOverview.bookedSeats / slotOverview.totalCapacity) * 100) : 0, icon: <CheckCircle2 size={18} />, tone: 'from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-300' },
          { label: 'Utilization', value: `${slotOverview.utilization}%`, progress: slotOverview.utilization, icon: <Gauge size={18} />, tone: 'from-rose-500/15 to-rose-500/5 text-rose-600 dark:text-rose-300' },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br ${item.tone} p-4 shadow-sm`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{item.label}</span>
              {item.icon}
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</div>
            <div className="mt-3 h-1.5 rounded-full bg-white/50 dark:bg-slate-900/40 overflow-hidden">
              <div
                className="h-full rounded-full bg-current"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {viewMode === 'calendar' ? (
        <SlotCalendar
          slots={filteredSlots}
          offersById={offersById}
          onSlotClick={handleEditClick}
          onSelectSlot={handleCalendarSelectSlot}
        />
      ) : filteredSlots.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-4">
            <CalendarIcon size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No slots found</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
            You don't have any slots matching your current filters. Try adjusting your search or create a new slot.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
              setDateFilter('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSlots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              offer={offersById[slot.offerId]}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <SlotTable
          slots={filteredSlots}
          offersById={offersById}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      )}

      <CreateSlotModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        isSubmitting={isCreating}
        initialDate={initialDate}
        initialTime={initialTime}
      />

      <EditSlotModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedSlot(null);
        }}
        onSubmit={handleEditSubmit}
        isSubmitting={isUpdating}
        slot={selectedSlot}
      />

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Slot">
        <div className="p-6">
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Are you sure you want to delete this slot? This action cannot be undone. Any active bookings may be affected.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button 
              variant="primary"
              className="bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
              onClick={confirmDelete} 
              isLoading={isDeleting}
            >
              Delete Slot
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
