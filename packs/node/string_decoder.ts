import {Buffer} from './buffer';
import {proxy} from "./proxy";

export interface NodeStringDecoder {
    write(buffer: Buffer): string;
    end(buffer?: Buffer): string;
}
export var StringDecoder: {
    new(encoding?: string): NodeStringDecoder;
};

proxy('string_decoder', module);