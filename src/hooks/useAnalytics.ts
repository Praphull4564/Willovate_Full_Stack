import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../services/analyticsService';

export const ANALYTICS_KEYS = {
  summary: ['analytics', 'summary'],
  revenue: ['analytics', 'revenue'],
  offers: ['analytics', 'offers'],
  status: ['analytics', 'status'],
  peakHours: ['analytics', 'peakHours'],
  funnel: ['analytics', 'funnel'],
  activity: ['analytics', 'activity'],
};

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ANALYTICS_KEYS.summary,
    queryFn: analyticsService.getSummary,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRevenueTrends = () => {
  return useQuery({
    queryKey: ANALYTICS_KEYS.revenue,
    queryFn: analyticsService.getRevenueTrends,
    staleTime: 5 * 60 * 1000,
  });
};

export const useOfferPerformance = () => {
  return useQuery({
    queryKey: ANALYTICS_KEYS.offers,
    queryFn: analyticsService.getOfferPerformance,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBookingStatusBreakdown = () => {
  return useQuery({
    queryKey: ANALYTICS_KEYS.status,
    queryFn: analyticsService.getBookingStatusBreakdown,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePeakHours = () => {
  return useQuery({
    queryKey: ANALYTICS_KEYS.peakHours,
    queryFn: analyticsService.getPeakHours,
    staleTime: 10 * 60 * 1000,
  });
};

export const useConversionFunnel = () => {
  return useQuery({
    queryKey: ANALYTICS_KEYS.funnel,
    queryFn: analyticsService.getConversionFunnel,
    staleTime: 10 * 60 * 1000,
  });
};

export const useActivityFeed = () => {
  return useQuery({
    queryKey: ANALYTICS_KEYS.activity,
    queryFn: analyticsService.getActivityFeed,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for live feel
  });
};
