import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarToolbar } from '../calendar/CalendarToolbar';
import type { Slot } from '../../types/slot.types';
import type { Offer } from '../../types/offer.types';
import { SlotStatusBadge } from './SlotStatusBadge';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface SlotEvent extends Event {
  resource: Slot;
}

interface SlotCalendarProps {
  slots: Slot[];
  offersById: Record<string, Offer>;
  onSlotClick: (slot: Slot) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
}

export const SlotCalendar: React.FC<SlotCalendarProps> = ({ slots, offersById, onSlotClick, onSelectSlot }) => {
  const events: SlotEvent[] = useMemo(() => {
    return slots.map(slot => {
      const offer = offersById[slot.offerId];
      
      // Combine date and time to create proper Date objects
      const startDateTime = new Date(`${slot.slotDate}T${slot.startTime}`);
      const endDateTime = new Date(`${slot.slotDate}T${slot.endTime}`);

      return {
        title: offer?.title || 'Unknown Offer',
        start: startDateTime,
        end: endDateTime,
        resource: slot,
      };
    });
  }, [slots, offersById]);

  const eventStyleGetter = (event: SlotEvent) => {
    const slot = event.resource;
    let backgroundColor = '#6366f1'; // primary
    let borderColor = '#4f46e5';

    if (slot.status === 'Full') {
      backgroundColor = '#f59e0b'; // warning
      borderColor = '#d97706';
    } else if (slot.status === 'Cancelled' || slot.status === 'Expired' || slot.status === 'Closed') {
      backgroundColor = '#64748b'; // default
      borderColor = '#475569';
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: '1px solid ' + borderColor,
        display: 'block',
      }
    };
  };

  const EventComponent = ({ event }: { event: SlotEvent }) => {
    const slot = event.resource;
    return (
      <div className="p-1 h-full flex flex-col relative group">
        <div className="font-semibold text-xs truncate leading-tight mb-0.5">{event.title}</div>
        <div className="text-[10px] opacity-90">{slot.bookedCount}/{slot.capacity} booked</div>
        
        {/* Tooltip on hover */}
        <div className="hidden group-hover:block absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-xl">
          <div className="font-bold mb-1">{event.title}</div>
          <div className="text-slate-300 mb-2">{slot.startTime} - {slot.endTime}</div>
          <div className="flex justify-between items-center">
            <span>Capacity: {slot.capacity}</span>
            <SlotStatusBadge status={slot.status} />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[700px] bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm custom-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        components={{
          toolbar: CalendarToolbar,
          event: EventComponent,
        }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(e) => onSlotClick((e as SlotEvent).resource)}
        onSelectSlot={(slotInfo) => {
          if (onSelectSlot) onSelectSlot(slotInfo);
        }}
        selectable={true}
        views={['month', 'week', 'day']}
        defaultView="week"
        step={30}
        timeslots={2}
        className="font-sans dark:text-white"
      />
      <style>{`
        .custom-calendar .rbc-header {
          padding: 12px 8px;
          font-weight: 600;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
        }
        .dark .custom-calendar .rbc-header {
          color: #94a3b8;
          border-color: #1e293b;
        }
        .custom-calendar .rbc-month-view,
        .custom-calendar .rbc-time-view,
        .custom-calendar .rbc-agenda-view {
          border-color: #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }
        .dark .custom-calendar .rbc-month-view,
        .dark .custom-calendar .rbc-time-view,
        .dark .custom-calendar .rbc-agenda-view {
          border-color: #1e293b;
        }
        .custom-calendar .rbc-day-bg + .rbc-day-bg {
          border-left: 1px solid #e2e8f0;
        }
        .dark .custom-calendar .rbc-day-bg + .rbc-day-bg {
          border-color: #1e293b;
        }
        .custom-calendar .rbc-month-row + .rbc-month-row {
          border-top: 1px solid #e2e8f0;
        }
        .dark .custom-calendar .rbc-month-row + .rbc-month-row {
          border-color: #1e293b;
        }
        .custom-calendar .rbc-time-content {
          border-top: 1px solid #e2e8f0;
        }
        .dark .custom-calendar .rbc-time-content {
          border-color: #1e293b;
        }
        .custom-calendar .rbc-time-slot {
          border-top: 1px solid #f1f5f9;
        }
        .dark .custom-calendar .rbc-time-slot {
          border-color: #0f172a;
        }
        .custom-calendar .rbc-timeslot-group {
          border-bottom: 1px solid #e2e8f0;
        }
        .dark .custom-calendar .rbc-timeslot-group {
          border-color: #1e293b;
        }
        .custom-calendar .rbc-today {
          background-color: #f8fafc;
        }
        .dark .custom-calendar .rbc-today {
          background-color: #0f172a;
        }
        .custom-calendar .rbc-event {
          padding: 0;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .custom-calendar .rbc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
      `}</style>
    </div>
  );
};
