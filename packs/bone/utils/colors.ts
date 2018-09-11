declare const process;
export class Colors {
  //control
  readonly reset = style(0, 0);
  readonly bold = style(1, 22);
  readonly dim = style(2, 22);
  readonly italic = style(3, 23);
  readonly underline = style(4, 24);
  readonly inverse = style(7, 27);
  readonly hidden = style(8, 28);
  readonly strikethrough = style(9, 29);
  //foreground
  readonly black = style(30, 39);
  readonly red = style(31, 39);
  readonly green = style(32, 39);
  readonly yellow = style(33, 39);
  readonly blue = style(34, 39);
  readonly magenta = style(35, 39);
  readonly cyan = style(36, 39);
  readonly white = style(37, 39);
  readonly gray = style(90, 39);
  //background
  readonly bgBlack = style(40, 49);
  readonly bgRed = style(41, 49);
  readonly bgGreen = style(42, 49);
  readonly bgYellow = style(43, 49);
  readonly bgBlue = style(44, 49);
  readonly bgMagenta = style(45, 49);
  readonly bgCyan = style(46, 49);
  readonly bgWhite = style(47, 49);
}
export const supported = isSupported();
export const colors = new Colors();

function style(open: number, close: number) {
  return supported ? (str) => `\u001b[${open}m${str}\u001b[${close}m` : idenity;
}
function idenity(value: string): string {
  return value;
}
function isSupported() {
  const argv = process.argv;
  const terminator = argv.indexOf('--');
  const hasFlag = function (flag) {
    flag = '--' + flag;
    const pos = argv.indexOf(flag);
    return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
  };
  if ('FORCE_COLOR' in process.env) {
    return true;
  }
  if (hasFlag("no-color") ||
    hasFlag('no-colors') ||
    hasFlag('color=false')) {
    return false;
  }
  if (hasFlag('color') ||
    hasFlag('colors') ||
    hasFlag('color=true') ||
    hasFlag('color=always')) {
    return true;
  }
  if (process.stdout && !process.stdout.isTTY) {
    return false;
  }
  if (process.platform === 'win32') {
    return true;
  }
  if ('COLORTERM' in process.env) {
    return true;
  }
  if (process.env.TERM === 'dumb') {
    return false;
  }
  if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
    return true;
  }
  return false;
}