import { format, isValid, parseISO } from 'date-fns';

export const formatDateSafe = (value: string | undefined | null, pattern: string, fallback = 'N/A') => {
  if (!value) return fallback;
  const parsed = parseISO(value);
  return isValid(parsed) ? format(parsed, pattern) : fallback;
};
