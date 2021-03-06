import {Buffer} from "@barlus/bone/node/buffer";


export const BINARY_TYPES = [ 'nodebuffer', 'arraybuffer', 'fragments' ];
export const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
export const kStatusCode = Symbol('status-code');
export const kWebSocket = Symbol('websocket');
export const EMPTY_BUFFER = Buffer.alloc(0);
export const NOOP = () => {
};