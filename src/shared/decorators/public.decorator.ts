import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * makes this route not require authentication
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
