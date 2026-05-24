import React from 'react';
import { Badge } from '../ui/Badge';
import type { OfferStatus } from '../../constants/offerStatus';

interface OfferStatusBadgeProps {
  status: OfferStatus;
}

export const OfferStatusBadge: React.FC<OfferStatusBadgeProps> = ({ status }) => {
  const variant = status === 'Active' ? 'success' : 'warning';
  
  return (
    <Badge variant={variant}>
      {status}
    </Badge>
  );
};
