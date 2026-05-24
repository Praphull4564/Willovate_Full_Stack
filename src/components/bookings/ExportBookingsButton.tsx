import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import type { AdminBooking } from '../../types/bookingAdmin.types';
import { downloadCSV } from '../../utils/csvExport';
import { format } from 'date-fns';
import { formatDateSafe } from '../../utils/dateFormat';

interface ExportBookingsButtonProps {
  data: AdminBooking[];
  filename?: string;
}

export const ExportBookingsButton: React.FC<ExportBookingsButtonProps> = ({ 
  data, 
  filename = `bookings-export-${format(new Date(), 'yyyy-MM-dd')}.csv` 
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    try {
      const exportData = data.map(b => ({
        'Reference ID': b.referenceId,
        'Customer Name': b.customerName,
        'Phone Number': b.customerPhone,
        'Email': b.customerEmail || 'N/A',
        'Offer Title': b.offerTitle,
        'Date': formatDateSafe(b.slotDate, 'yyyy-MM-dd'),
        'Time': `${b.slotStartTime} - ${b.slotEndTime}`,
        'People Count': b.peopleCount,
        'Total Price': b.totalPrice,
        'Status': b.status,
        'Payment Status': b.paymentStatus,
        'Created At': formatDateSafe(b.createdAt, 'yyyy-MM-dd HH:mm:ss')
      }));

      downloadCSV(exportData, filename);
    } catch (err) {
      console.error('Failed to export CSV', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleExport} 
      disabled={isExporting || data.length === 0}
      className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
    >
      {isExporting ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Download size={18} className="mr-2" />}
      Export CSV
    </Button>
  );
};
