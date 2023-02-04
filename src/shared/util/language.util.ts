export const language = (req: { headers: { [x: string]: string } }): string => {
  return !req.headers['accept-language']
    ? 'en'
    : (req.headers['accept-language'] as string)?.toLowerCase();
};
