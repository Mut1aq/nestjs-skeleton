export const localeStringOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: '2-digit',
  month: '2-digit',
};

export const thirteenYearsAgo = new Date(
  new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString(),
);
