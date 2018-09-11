import {Buffer} from "@barlus/bone/node/buffer";


/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
function concat(list, totalLength) {
  return Buffer.concat(list, totalLength);
}

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
function mask(source: Buffer, mask: Buffer, output: Buffer, offset: number, length: number) {
  for (var i = 0; i < length; i++) {
    output[ offset + i ] = source[ i ] ^ mask[ i & 3 ];
  }
}

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
function unmask(buffer: Buffer, mask: Buffer) {
  // Required until https://github.com/nodejs/node/issues/9006 is resolved.
  const length = buffer.length;
  for (var i = 0; i < length; i++) {
    buffer[ i ] ^= mask[ i & 3 ];
  }
}

export const bufferUtil = {
  concat,
  mask,
  unmask
};