// ? more info on these colors
// ? https://tforgione.fr/posts/ansi-escape-codes/

const LOG = {
  // message: cyan bright, context: magnet bright (my favorite)
  messageColor: '\x1B[96m',
  contextColor: `\x1B[95m`,
};

const ERROR = {
  // message: red, context: idk what the second color is called
  messageColor: '\x1B[31m',
  contextColor: `\x1b[1;30m`,
};

const VERBOSE = {
  messageColor: '\x1B[95m',
  contextColor: `\x1b[1;30;40m`,
};

const WARN = {
  // message: RED, context: white
  messageColor: '\x1b[1;31m',
  contextColor: `\x1b[1;37m`,
};

const DEBUG = {
  // reverse LOG
  messageColor: '\x1B[95m',
  contextColor: `\x1B[96m`,
};

const API = {
  // message: green, context: yellow aka basic nest
  messageColor: '\x1B[32m',
  contextColor: `\x1B[33m`,
};

export {
  LOG as LogColorScheme,
  ERROR as ErrorColorScheme,
  VERBOSE as VerboseColorScheme,
  WARN as WarnColorScheme,
  DEBUG as DebugColorScheme,
  API as APIColorScheme,
};
