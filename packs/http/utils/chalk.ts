import {process} from "@barlus/node/process";

const ansiStyles = {
    //control
    reset: styleTag(0, 0),
    bold: styleTag(1, 22),
    dim: styleTag(2, 22),
    italic: styleTag(3, 23),
    underline: styleTag(4, 24),
    inverse: styleTag(7, 27),
    hidden: styleTag(8, 28),
    strikethrough: styleTag(9, 29),
    //foreground
    black: styleTag(30, 39),
    red: styleTag(31, 39),
    green: styleTag(32, 39),
    yellow: styleTag(33, 39),
    blue: styleTag(34, 39),
    magenta: styleTag(35, 39),
    cyan: styleTag(36, 39),
    white: styleTag(37, 39),
    gray: styleTag(90, 39),
    //background
    bgBlack: styleTag(40, 49),
    bgRed: styleTag(41, 49),
    bgGreen: styleTag(42, 49),
    bgYellow: styleTag(43, 49),
    bgBlue: styleTag(44, 49),
    bgMagenta: styleTag(45, 49),
    bgCyan: styleTag(46, 49),
    bgWhite: styleTag(47, 49),
};
function styleTag(open: number, close: number) {
    return {
        open: '\u001b[' + open + 'm',
        close: '\u001b[' + close + 'm'
    }
}
const supportsColor = (function () {
    var argv = process.argv;
    var terminator = argv.indexOf('--');
    var hasFlag = function (flag) {
        flag = '--' + flag;
        var pos = argv.indexOf(flag);
        return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
    };
    if ('FORCE_COLOR' in process.env) {
        return true;
    }
    if (hasFlag('no-color') ||
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
})();
const defineProps = Object.defineProperties;
const ansiRegexGlobal = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
const ansiRegex = new RegExp(ansiRegexGlobal.source);
const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
function escapeStringRegexp(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a string');
    }
    return str.replace(matchOperatorsRe, '\\$&');
}
export function isColored(str) {
    return ansiRegex.test(str)
}
export function stripColors(str) {
    return typeof str === 'string' ? str.replace(ansiRegexGlobal, '') : str;
}
class Chalk {
    enabled: boolean;
    constructor(options?) {
        // detect mode if not set manually
        this.enabled = !options || options.enabled === undefined ? supportsColor : options.enabled;
    }
}
var styles = (function () {
    var ret = {};
    Object.keys(ansiStyles).forEach(function (key) {
        ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
        ret[key] = {
            get: function () {
                return build.call(this, this._styles.concat(key));
            }
        };
    });
    return ret;
})();
var proto = defineProps(function chalk() {
}, styles);
function build(_styles) {
    var builder: any = function () {
        return applyStyle.apply(builder, arguments);
    };
    builder._styles = _styles;
    builder.enabled = this.enabled;
    // __proto__ is used because we must return a function, but there is
    // no way to create a function with a different prototype.
    /* eslint-disable no-proto */
    builder.__proto__ = proto;
    return builder;
}
function applyStyle() {
    // support varags, but simply cast to string in case there's only one arg
    var args = arguments;
    var argsLen = args.length;
    var str = argsLen !== 0 && `${arguments[0]}`;
    if (argsLen > 1) {
        // don't slice `arguments`, it prevents v8 optimizations
        for (var a = 1; a < argsLen; a++) {
            str += ' ' + args[a];
        }
    }
    if (!this.enabled || !str) {
        return str;
    }
    var nestedStyles = this._styles;
    var i = nestedStyles.length;
    while (i--) {
        var code = ansiStyles[nestedStyles[i]];
        // Replace any instances already present with a re-opening code
        // otherwise only the part of the string until said closing code
        // will be colored, and the rest will simply be 'plain'.
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
    }
    return str;
}
function init() {
    var ret = {};
    Object.keys(styles).forEach(function (name) {
        ret[name] = {
            get: function () {
                return build.call(this, [name]);
            }
        };
    });
    return ret;
}
defineProps(Chalk.prototype, init());
export const chalk: any = new Chalk();
export {
    supportsColor
};


