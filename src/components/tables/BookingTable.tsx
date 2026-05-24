import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table';
import { Badge } from '../ui/Badge';
import type { Booking } from '../../types/dashboard.types';
import { MoreHorizontal } from 'lucide-react';

interface BookingTableProps {
  bookings: Booking[];
}

export const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  const getStatusVariant = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed': return 'success';
      case 'Pending': return 'warning';
      case 'Completed': return 'info';
      case 'Cancelled': return 'danger';
      default: return 'default';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Offer</TableHead>
          <TableHead>Slot Time</TableHead>
          <TableHead>People</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{booking.customerName}</TableCell>
            <TableCell>{booking.offerName}</TableCell>
            <TableCell>{booking.slotTime}</TableCell>
            <TableCell>{booking.peopleCount}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(booking.status)}>
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                <MoreHorizontal size={18} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
