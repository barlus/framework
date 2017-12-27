import {Transform} from '@barlus/node/stream';

export class Counter extends Transform {
  length:number;
  _transform(chunk, encoding, callback){
    this.length += chunk.length;
    this.push(chunk);
    callback();
  }
}
