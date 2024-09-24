import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

const convertUtcToLocal = (utc) => {
  return new Date(utc);
};

export const formatDateTime = (date, formatStr) => {
  console.log(date);
  if (formatStr) {
    return format(date, formatStr);
  }
  return format(date, 'MMM d, yyyy');
};

export const chatDate = (date, numericDates = true) => {
  const now = new Date();
  const daysDiff = differenceInDays(now, date);
  const hoursDiff = differenceInHours(now, date);
  const minutesDiff = differenceInMinutes(now, date);
  const secondsDiff = differenceInSeconds(now, date);

  if (Math.floor(daysDiff / 365) >= 2) {
    return `${Math.floor(daysDiff / 365)} years ago`;
  } else if (Math.floor(daysDiff / 365) >= 1) {
    return numericDates ? '1 year ago' : 'Last year';
  } else if (Math.floor(daysDiff / 30) >= 2) {
    return `${Math.floor(daysDiff / 30)} months ago`;
  } else if (Math.floor(daysDiff / 30) >= 1) {
    return numericDates ? '1 month ago' : 'Last month';
  } else if (Math.floor(daysDiff / 7) >= 2) {
    return `${Math.floor(daysDiff / 7)} weeks ago`;
  } else if (Math.floor(daysDiff / 7) >= 1) {
    return numericDates ? '1 week ago' : 'Last week';
  } else if (daysDiff >= 2) {
    return `${daysDiff} days ago`;
  } else if (daysDiff >= 1) {
    return `Yesterday, ${formatDateTime(date, 'HH:mm')}`;
  } else if (hoursDiff >= 2) {
    return formatDateTime(date, 'HH:mm');
  } else if (hoursDiff >= 1) {
    return numericDates ? formatDateTime(date, 'HH:mm') : 'An hour ago';
  } else if (minutesDiff >= 2) {
    return numericDates ? formatDateTime(date, 'HH:mm') : `${minutesDiff} minutes ago`;
  } else if (minutesDiff >= 1) {
    return numericDates ? formatDateTime(date, 'HH:mm') : 'A minute ago';
  } else if (secondsDiff >= 3) {
    return numericDates ? formatDateTime(date, 'HH:mm') : `${secondsDiff} seconds ago`;
  } else {
    return 'Just now';
  }
};
