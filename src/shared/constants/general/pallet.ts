// ? more info on these colors
// ? https://tforgione.fr/posts/ansi-escape-codes/

export const logColor = {
  // message: cyan bright, context: magnet bright (my favorite)
  messageColor: '\x1B[96m',
  contextColor: `\x1B[95m`,
};

export const errorColor = {
  // message: red, context: idk what the second color is called
  messageColor: '\x1B[31m',
  contextColor: `\x1b[1;30m`,
};

export const verboseColor = {
  messageColor: '\x1B[95m',
  contextColor: `\x1b[1;30;40m`,
};

export const warnColor = {
  // message: RED, context: white
  messageColor: '\x1b[1;31m',
  contextColor: `\x1b[1;37m`,
};

export const debugColor = {
  // reverse LOG
  messageColor: '\x1B[95m',
  contextColor: `\x1B[96m`,
};

export const APIColor = {
  // message: green, context: yellow aka basic nest
  messageColor: '\x1B[32m',
  contextColor: `\x1B[33m`,
};
