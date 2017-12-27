import {Buffer} from "@barlus/node/buffer";

export function isJSON(body) {
  if (!body) return false;
  if ('string' == typeof body) return false;
  if ('function' == typeof body.pipe) return false;
  return !Buffer.isBuffer(body);
}

export function only(obj, keys) {
  obj = obj || {};
  if ('string' == typeof keys) {
    keys = keys.split(/ +/)
  }
  return keys.reduce(function (ret, key) {
    if (null == obj[key]) return ret;
    ret[key] = obj[key];
    return ret;
  }, {});
}
