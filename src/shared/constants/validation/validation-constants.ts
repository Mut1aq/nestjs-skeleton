import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const stringNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const specialCharacters = [
  '.',
  '*',
  '/',
  '-',
  '_',
  '=',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '',
  '|',
  ',',
];
export const lowercaseLetters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  ' ',
];
export const uppercaseLetters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  ' ',
];

export const validImageFormats = ['jpeg', 'png', 'bmp'];

export const validVideoFormats = ['mp4', 'mov'];

export const fileValidators: MulterOptions = {
  limits: {
    files: 2,
    fields: 2,
    fileSize: 2786000000,
  },
};

export const fileFields = [
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
];
