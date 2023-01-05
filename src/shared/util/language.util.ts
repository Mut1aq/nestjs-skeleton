import { Request } from 'express';

export const language = (req: Request): string => {
  return !req.headers['accept-language']
    ? 'en'
    : (req.headers['accept-language'] as string)?.toLowerCase();
};
