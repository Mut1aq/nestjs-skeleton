export const language = (req): string => {
  return !req.headers['accept-language']
    ? 'en'
    : (req.headers['accept-language'] as string)?.toLowerCase();
};
