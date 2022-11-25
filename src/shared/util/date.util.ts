export const localeStringOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: '2-digit',
  month: '2-digit',
};

export const currentDate = new Date(Date.now()).toLocaleString(
  undefined,
  localeStringOptions,
);
