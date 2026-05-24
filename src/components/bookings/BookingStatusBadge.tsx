import React from 'react';
import type { AdminBookingStatus } from '../../types/bookingAdmin.types';
import { ADMIN_BOOKING_STATUSES } from '../../constants/bookingStatuses';
import * as Icons from 'lucide-react';

interface BookingStatusBadgeProps {
  status: AdminBookingStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status, size = 'md', className = '' }) => {
  const config = ADMIN_BOOKING_STATUSES[status];
  
  // Dynamically get the lucide icon
  const IconComponent = (Icons as any)[config.icon] || Icons.HelpCircle;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] space-x-1',
    md: 'px-2.5 py-1 text-xs space-x-1.5',
    lg: 'px-3 py-1.5 text-sm space-x-2'
  };

  const iconSizes = {
    sm: 10,
    md: 12,
    lg: 14
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${config.bgColor} ${config.color} ${config.borderColor} ${sizeClasses[size]} ${className}`}>
      <IconComponent size={iconSizes[size]} />
      <span>{config.label}</span>
    </span>
  );
};
