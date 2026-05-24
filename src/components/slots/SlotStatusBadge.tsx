import React from 'react';
import { Badge } from '../ui/Badge';
import type { SlotStatus } from '../../constants/slotStatus';

interface SlotStatusBadgeProps {
  status: SlotStatus;
}

export const SlotStatusBadge: React.FC<SlotStatusBadgeProps> = ({ status }) => {
  const getVariant = (s: SlotStatus) => {
    switch (s) {
      case 'Available':
        return 'success';
      case 'Full':
        return 'warning';
      case 'Closed':
        return 'default';
      case 'Expired':
        return 'default';
      case 'Cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <Badge variant={getVariant(status)}>
      {status}
    </Badge>
  );
};
