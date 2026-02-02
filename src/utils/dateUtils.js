import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = parseISO(dateString);
  if (!isValid(date)) return '-';
  return format(date, 'MMM dd, yyyy');
};

export const formatDateShort = (dateString) => {
  if (!dateString) return '-';
  const date = parseISO(dateString);
  if (!isValid(date)) return '-';
  return format(date, 'MM/dd/yyyy');
};

export const formatRelativeDate = (dateString) => {
  if (!dateString) return '-';
  const date = parseISO(dateString);
  if (!isValid(date)) return '-';
  return formatDistanceToNow(date, { addSuffix: true });
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  const date = parseISO(dateString);
  if (!isValid(date)) return false;
  return date < new Date();
};

export const getTodayString = () => {
  return format(new Date(), 'yyyy-MM-dd');
};
