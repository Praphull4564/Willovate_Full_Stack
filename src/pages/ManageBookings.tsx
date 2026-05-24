import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdminBookings } from '../hooks/useBookings';
import { BookingFilters } from '../components/bookings/BookingFilters';
import { BookingAnalytics } from '../components/bookings/BookingAnalytics';
import { BookingTable } from '../components/bookings/BookingTable';
import { BookingCard } from '../components/bookings/BookingCard';
import { ExportBookingsButton } from '../components/bookings/ExportBookingsButton';
import type { BookingFilters as FilterType } from '../types/bookingAdmin.types';

export const ManageBookings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterType>({
    status: 'All',
    searchTerm: searchParams.get('search') || '',
    sortBy: 'date_desc'
  });
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const search = searchParams.get('search') || '';
    setFilters(prev => prev.searchTerm === search ? prev : { ...prev, searchTerm: search });
    setPage(1);
  }, [searchParams]);

  const { data: paginatedData, isLoading, isError } = useAdminBookings(filters, page, limit);
  // We'll also fetch a larger unpaginated set for analytics and export, or use the paginated data.
  // For a real app, analytics typically has its own endpoint. Here we'll use a hack to fetch all for analytics.
  const { data: allData } = useAdminBookings(filters, 1, 1000);

  const handleSort = (key: string, dir: 'asc' | 'desc') => {
    // Map table columns to sort keys
    if (key === 'offerTitle') {
      // not supported in mock yet, but we'd handle it here
    }
    if (key === 'totalPrice') {
      setFilters({ ...filters, sortBy: dir === 'asc' ? 'amount_asc' : 'amount_desc' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Bookings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track and manage all customer reservations.</p>
        </div>
        <ExportBookingsButton data={allData?.data || []} />
      </div>

      <BookingAnalytics 
        bookings={allData?.data || []} 
        isLoading={!allData} 
      />

      <BookingFilters 
        filters={filters} 
        onFilterChange={(newFilters) => {
          setFilters(newFilters);
          setPage(1); // Reset to page 1 on filter change
        }} 
      />

      {isError ? (
        <div className="bg-rose-50 dark:bg-rose-500/10 p-6 rounded-2xl text-center text-rose-600 dark:text-rose-400 font-medium">
          Failed to load bookings. Please try again.
        </div>
      ) : (
        <>
          <BookingTable
            data={paginatedData?.data || []}
            isLoading={isLoading}
            page={page}
            totalPages={paginatedData?.totalPages || 1}
            onPageChange={setPage}
            onSort={handleSort}
            sortKey={filters.sortBy?.includes('amount') ? 'totalPrice' : undefined}
            sortDirection={filters.sortBy?.includes('asc') ? 'asc' : 'desc'}
          />

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-40 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse" />
              ))
            ) : paginatedData?.data.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-slate-500">
                No bookings found.
              </div>
            ) : (
              paginatedData?.data.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
            
            {/* Mobile Pagination */}
            {(paginatedData?.totalPages || 0) > 1 && (
              <div className="flex justify-between items-center pt-4 px-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-500">Page {page} of {paginatedData?.totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(paginatedData?.totalPages || 1, p + 1))}
                  disabled={page === paginatedData?.totalPages}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
