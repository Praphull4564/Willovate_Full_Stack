import React from 'react';
import type { BookingResponse } from '../../types/booking.types';
import { format, parseISO } from 'date-fns';
import { CheckCircle2, Calendar, Clock, MapPin, Users, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { QRGenerator } from '../qr/QRGenerator';

interface BookingSuccessCardProps {
  booking: BookingResponse;
}

export const BookingSuccessCard: React.FC<BookingSuccessCardProps> = ({ booking }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-w-2xl mx-auto">
      {/* Header Banner */}
      <div className="bg-emerald-500 p-8 text-center text-white">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
          <CheckCircle2 size={40} className="text-white" />
        </div>
        <h2 className="text-3xl font-black tracking-tight mb-2">Booking Confirmed!</h2>
        <p className="text-emerald-50 font-medium">Your slot has been successfully reserved.</p>
      </div>

      <div className="p-8">
        <div className="text-center mb-8">
          <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-1">Booking Reference</p>
          <div className="inline-block bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-xl text-2xl font-mono font-bold tracking-wider text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
            {booking.referenceId}
          </div>
        </div>

        <hr className="border-slate-100 dark:border-slate-800 mb-8" />

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Offer</h3>
              <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{booking.offerTitle}</p>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{booking.businessName}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">Schedule</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                  <Calendar size={16} className="text-indigo-500" />
                  <span className="font-medium">{booking.slotDate ? format(parseISO(booking.slotDate), 'EEEE, MMMM do, yyyy') : 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                  <Clock size={16} className="text-indigo-500" />
                  <span className="font-medium">{booking.slotStartTime} - {booking.slotEndTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">Customer Details</h3>
              <div className="space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">{booking.customerName}</p>
                <p className="text-slate-600 dark:text-slate-300">{booking.customerPhone}</p>
                {booking.customerEmail && <p className="text-slate-600 dark:text-slate-300">{booking.customerEmail}</p>}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">Guests & Total</h3>
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 mb-2">
                <Users size={16} className="text-indigo-500" />
                <span className="font-medium">{booking.peopleCount} {booking.peopleCount === 1 ? 'Person' : 'People'}</span>
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                ₹{booking.totalPrice.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-start space-x-3 mb-8">
          <MapPin className="text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">Location details</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Please arrive 10 minutes prior to your scheduled time at the main reception. Show this booking reference upon arrival.</p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mb-8 border-t border-slate-100 dark:border-slate-800 pt-8">
          <QRGenerator 
            value={`https://willovate.com/verify/${booking.referenceId}`} 
            title="Scan to Verify"
            subtitle="Show this QR code at the reception"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1">
            <Download size={18} className="mr-2" />
            Download Receipt
          </Button>
          <Button className="flex-1">
            <Calendar size={18} className="mr-2" />
            Add to Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};
