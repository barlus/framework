import {createHmac} from "@barlus/node/crypto";

export class Keygrip {

  readonly keys: string[];
  readonly algorithm: string;
  readonly encoding: string;

  constructor(keys: string[], algorithm = "sha1", encoding = "base64") {
    if (!keys || keys.length == 0) {
      throw new Error("Keys must be provided.")
    }
    this.keys = keys;
    this.algorithm = algorithm;
    this.encoding = encoding;
  }

  sign(data) {
    return sign(data, this.keys[0], this.algorithm, this.encoding)
  }

  verify(data, digest) {
    return this.index(data, digest) > -1
  }

  index(data, digest) {
    let i = 0;
    const l = this.keys.length;
    for (; i < l; i++) {
      if (constantTimeCompare(digest, sign(data, this.keys[i], this.algorithm, this.encoding))) {
        return i
      }
    }
    return -1;
  }
}

function sign(data, key, algorithm, encoding) {
  return createHmac(algorithm, key)
    .update(data).digest(encoding)
    .replace(/\/|\+|=/g, function (x) {
      return ({"/": "_", "+": "-", "=": ""})[x]
    })
}

//http://codahale.com/a-lesson-in-timing-attacks/
function constantTimeCompare(val1, val2) {
  if (val1 == null && val2 != null) {
    return false;
  } else if (val2 == null && val1 != null) {
    return false;
  } else if (val1 == null && val2 == null) {
    return true;
  }

  if (val1.length !== val2.length) {
    return false;
  }

  let result = 0;

  for (let i = 0; i < val1.length; i++) {
    result |= val1.charCodeAt(i) ^ val2.charCodeAt(i); //Don't short circuit
  }

  return result === 0;
}

