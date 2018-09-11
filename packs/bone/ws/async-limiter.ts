import {process} from "@barlus/bone/node/process";


interface QueueOptions {
  concurrency?: number;
}

export class Limiter {
  concurrency: number;
  pending: number;
  jobs: any[];
  cbs: any[];
  private _done = () => {
    this.pending--;
    this._run();
  };
  constructor(options: QueueOptions = {}) {
    this.concurrency = options.concurrency || Infinity;
    this.pending = 0;
    this.jobs = [];
    this.cbs = [];
  }
  push(...args) {
    const res = this.jobs.push(...args);
    this._run();
    return res;
  }
  unshift(...args) {
    const res = this.jobs.push(...args);
    this._run();
    return res;
  }
  splice(...args) {
    const res = this.jobs.push(...args);
    this._run();
    return res;
  }
  get length() {
    return this.pending + this.jobs.length;
  }
  private _run() {
    if (this.pending === this.concurrency) {
      return;
    }
    if (this.jobs.length) {
      var job = this.jobs.shift();
      this.pending++;
      job(this._done);
      this._run();
    }
    if (this.pending === 0) {
      while (this.cbs.length !== 0) {
        var cb = this.cbs.pop();
        process.nextTick(cb);
      }
    }
  }
  onDone(cb) {
    if (typeof cb === 'function') {
      this.cbs.push(cb);
      this._run();
    }
  }
}

