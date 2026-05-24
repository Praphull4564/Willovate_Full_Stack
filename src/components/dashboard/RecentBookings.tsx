import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { BookingTable } from '../tables/BookingTable';
import { Button } from '../ui/Button';
import { useAdminBookings } from '../../hooks/useBookings';
import { useNavigate } from 'react-router-dom';
import { formatDateSafe } from '../../utils/dateFormat';
import type { Booking } from '../../types/dashboard.types';

export const RecentBookings: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useAdminBookings({ status: 'All', sortBy: 'date_desc' }, 1, 5);

  const bookings: Booking[] = (data?.data || []).map(booking => ({
    id: booking.id,
    customerName: booking.customerName,
    offerName: booking.offerTitle || 'Offer',
    slotTime: `${formatDateSafe(booking.slotDate, 'MMM d')} ${booking.slotStartTime || ''}`.trim(),
    peopleCount: booking.peopleCount,
    status: booking.status === 'No Show' ? 'Cancelled' : booking.status,
    amount: booking.totalPrice,
    createdAt: booking.createdAt,
  }));

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bookings</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate('/bookings')}>View All</Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-32 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        ) : (
          <BookingTable bookings={bookings} />
        )}
      </CardContent>
    </Card>
  );
};
