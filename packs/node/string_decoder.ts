import {Buffer} from './buffer';
export interface NodeStringDecoder {
    write(buffer: Buffer): string;
    end(buffer?: Buffer): string;
}
export var StringDecoder: {
    new(encoding?: string): NodeStringDecoder;
};