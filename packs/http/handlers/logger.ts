
import {chalk} from '../utils/chalk'
import {bytes} from '../utils/bytes'
import {Counter} from '../utils/passthrough-counter'

function humanize(n, options = {delimiter:',',separator:'.'}){
  var d = options.delimiter || ',';
  var s = options.separator || '.';
  n = n.toString().split('.');
  n[0] = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + d);
  return n.join(s);
}

/**
 * Expose logger.
 */


/**
 * Color map.
 */

const colorCodes = {
  7: 'magenta',
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green',
  0: 'yellow'
};

/**
 * Development logger.
 */

export function logger(opts={}) {
  return async function logger(ctx, next) {
    // request
    const start = Date.now();
    console.log('  ' + chalk.gray('<--') +
      ' ' + chalk.bold('%s') +
      ' ' + chalk.gray('%s'),
      ctx.method,
      ctx.originalUrl);

    try {
      await next()
    } catch (err) {
      // log uncaught downstream errors
      log(ctx, start, null, err);
      throw err
    }

    // calculate the length of a streaming response
    // by intercepting the stream with a counter.
    // only necessary if a content-length header is currently not set.
    const length = ctx.response.length;
    const body = ctx.body;
    let counter;
    if (length == null && body && body.readable) {
      ctx.body = body
        .pipe(counter = new Counter())
        .on('error', ctx.onerror)
    }

    // log when the response is finished or closed,
    // whichever happens first.
    const res = ctx.res;

    const onFinish = done.bind(null, 'finish');
    const onClose = done.bind(null, 'close');

    res.once('finish', onFinish);
    res.once('close', onClose);

    function done(event) {
      res.removeListener('finish', onFinish);
      res.removeListener('close', onClose);
      log(ctx, start, counter ? counter.length : length, null, event)
    }
  }
}

/**
 * Log helper.
 */

function log(ctx, start, len:number, err, event?) {
  // get the status code of the response
  const status = err
    ? (err.isBoom ? err.output.statusCode : err.status || 500)
    : (ctx.status || 404);

  // set the color of the status code;
  const s = status / 100 | 0;
  const color = colorCodes.hasOwnProperty(s) ? colorCodes[s] : 0;

  // get the human readable response length
  let length;
  if (~[204, 205, 304].indexOf(status)) {
    length = ''
  } else if (len == null) {
    length = '-'
  } else {
    length = bytes(len).toLowerCase()
  }

  const upstream = err ? chalk.red('xxx')
    : event === 'close' ? chalk.yellow('-x-')
      : chalk.gray('-->');

  console.log('  ' + upstream +
    ' ' + chalk.bold('%s') +
    ' ' + chalk.gray('%s') +
    ' ' + chalk[color]('%s') +
    ' ' + chalk.gray('%s') +
    ' ' + chalk.gray('%s'),
    ctx.method,
    ctx.originalUrl,
    status,
    time(start),
    length)
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */

function time(start) {
  const delta = Date.now() - start;
  return humanize(delta < 10000
    ? delta + 'ms'
    : Math.round(delta / 1000) + 's')
}
