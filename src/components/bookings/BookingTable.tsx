import React from 'react';
import type { AdminBooking } from '../../types/bookingAdmin.types';
import { DataTable } from '../ui/DataTable';
import type { Column } from '../ui/DataTable';
import { BookingStatusBadge } from './BookingStatusBadge';
import { BookingActions } from './BookingActions';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDateSafe } from '../../utils/dateFormat';

interface BookingTableProps {
  data: AdminBooking[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSort: (key: string, dir: 'asc' | 'desc') => void;
}

export const BookingTable: React.FC<BookingTableProps> = ({
  data,
  isLoading,
  page,
  totalPages,
  onPageChange,
  sortKey,
  sortDirection,
  onSort
}) => {
  const navigate = useNavigate();

  const columns: Column<AdminBooking>[] = [
    {
      header: 'Reference ID',
      accessorKey: 'referenceId',
      cell: (row) => <span className="font-mono font-medium text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{row.referenceId}</span>
    },
    {
      header: 'Customer',
      accessorKey: 'customerName',
      cell: (row) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white">{row.customerName}</div>
          <div className="text-xs text-slate-500">{row.customerPhone}</div>
        </div>
      )
    },
    {
      header: 'Offer & Slot',
      accessorKey: 'offerTitle',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium text-slate-900 dark:text-white truncate max-w-[200px]">{row.offerTitle || 'Offer'}</div>
          <div className="text-xs text-slate-500">
            {formatDateSafe(row.slotDate, 'MMM d, yyyy')} - {row.slotStartTime || 'TBA'}
          </div>
        </div>
      )
    },
    {
      header: 'Guests',
      accessorKey: 'peopleCount',
      cell: (row) => (
        <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-300">
          <Users size={14} />
          <span>{row.peopleCount}</span>
        </div>
      )
    },
    {
      header: 'Amount',
      accessorKey: 'totalPrice',
      sortable: true,
      cell: (row) => <span className="font-bold">Rs {row.totalPrice.toLocaleString()}</span>
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => <BookingStatusBadge status={row.status} />
    },
    {
      header: '',
      accessorKey: 'actions',
      cell: (row) => (
        <div className="flex justify-end">
          <BookingActions booking={row} />
        </div>
      )
    }
  ];

  return (
    <div className="hidden md:block">
      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={onSort}
        onRowClick={(row) => navigate(`/bookings/${row.id}`)}
      />
    </div>
  );
};
