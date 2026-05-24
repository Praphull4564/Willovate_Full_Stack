export const calculateTrend = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
};

export const generateTrendInsights = (trends: { revenue: number; bookings: number; conversion: number; activeOffers: number }) => {
  const insights = [];
  
  if (trends.revenue > 15) {
    insights.push({
      id: 'insight_1',
      type: 'positive' as const,
      title: 'Strong Revenue Growth',
      description: `Revenue is up ${trends.revenue}% compared to the previous period. Your recent offers are performing exceptionally well.`,
      actionable: 'Consider scaling your ad spend on top-performing offers.'
    });
  }

  if (trends.conversion < -5) {
    insights.push({
      id: 'insight_2',
      type: 'warning' as const,
      title: 'Conversion Drop',
      description: `Conversion rates have decreased by ${Math.abs(trends.conversion)}%.`,
      actionable: 'Review your offer descriptions and ensure pricing is competitive.'
    });
  }

  if (trends.bookings > 20) {
    insights.push({
      id: 'insight_3',
      type: 'positive' as const,
      title: 'Booking Surge',
      description: `Bookings have surged by ${trends.bookings}%. Capacity utilization is running high.`,
      actionable: 'You may need to open more slots to accommodate the demand.'
    });
  }

  // Fallback insight
  if (insights.length === 0) {
    insights.push({
      id: 'insight_default',
      type: 'info' as const,
      title: 'Steady Performance',
      description: 'Your business metrics are stable compared to the last period.',
      actionable: 'Keep maintaining your active offers.'
    });
  }

  return insights;
};

export const calculateCapacityUtilization = (booked: number, total: number): number => {
  if (total === 0) return 0;
  return Number(((booked / total) * 100).toFixed(1));
};
