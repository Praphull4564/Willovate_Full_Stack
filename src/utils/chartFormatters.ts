import { format, parseISO } from 'date-fns';

export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `\u20B9${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `\u20B9${(value / 1000).toFixed(1)}K`;
  }
  return `\u20B9${value}`;
};

export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

export const formatPercent = (value: number): string => {
  return `${value}%`;
};

export const formatDateAxis = (dateString: unknown): string => {
  try {
    return format(parseISO(String(dateString)), 'MMM d');
  } catch {
    return String(dateString);
  }
};

export const CustomTooltipFormatter = (value: unknown, name: unknown): [string, string] => {
  const numValue = Number(value);
  const strName = String(name);
  if (strName.toLowerCase().includes('revenue') || strName.toLowerCase().includes('price') || strName.toLowerCase().includes('amount')) {
    return [`\u20B9${numValue.toLocaleString()}`, strName];
  }
  if (strName.toLowerCase().includes('rate') || strName.toLowerCase().includes('percentage') || strName.toLowerCase().includes('conversion')) {
    return [`${numValue}%`, strName];
  }
  return [numValue.toLocaleString(), strName];
};
