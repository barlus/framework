import {AsyncGuard} from '@barlus/runtime/async/guard';
import {AsyncDefer} from '@barlus/runtime/async/defer';


export class AsyncPendingMap<K, V, E = Error> {
  clear(reject?: E): void {
    this.data.clear();
    if (reject !== undefined) {
      for (let defer of this.pending.values()) {
        defer.reject(reject);
      }
      this.pending.clear();
      this.stabilize();
    }
  }
  delete(key: K, reject?: E): boolean {
    this.data.delete(key);
    if (reject !== undefined && this.pending.has(key)) {
      this.pending.get(key).reject(reject);
      this.pending.delete(key);
      this.stabilize();
    }
    return
  }
  get(key: K): Promise<V> {
    if (this.data.has(key)) {
      return Promise.resolve(this.data.get(key))
    }
    if (!this.pending.has(key)) {
      this.pending.set(key, new AsyncDefer<V, E>());
      this.stable.lock();
    }
    return this.pending.get(key).promise;
  }
  hasPending(key: K): boolean {
    return this.pending.has(key);
  }
  has(key: K): boolean {
    return this.data.has(key);
  }
  set(key: K, value: V): this {
    if (this.pending.has(key)) {
      this.pending.get(key).accept(value);
      this.pending.delete(key);
    }
    this.data.set(key, value);
    this.stabilize();
    return this;
  }
  get size(): number {
    return this.data.size
  }
  get pendingSize(): number {
    return this.pending.size
  }
  async all(): Promise<this> {
    return this.stable.wait();
  }

  private stabilize() {
    if (this.pending.size == 0) {
      this.stable.unlock(this);
    }
  }
  constructor() {
    this.stable.unlock(this);
  }

  entries(): IterableIterator<[ K, V ]> {
    return this.data.entries();
  }
  keys(): IterableIterator<K> {
    return this.data.keys();
  }
  values(): IterableIterator<V> {
    return this.data.values();
  }
  pendingKeys(): IterableIterator<K> {
    return this.pending.keys();
  }
  private data = new Map<K, V>();
  private pending = new Map<K, AsyncDefer<V, E>>();
  private stable = new AsyncGuard<this>();
}

export class AsyncPendingSet<K, E = Error> {
  clear(reject?: E): void {
    this.data.clear();
    if (reject !== undefined) {
      for (let defer of this.pending.values()) {
        defer.reject(reject);
      }
      this.pending.clear();
      this.stabilize();
    }
  }
  delete(value: K, reject?: E): boolean {
    this.data.delete(value);
    if (reject !== undefined && this.pending.has(value)) {
      this.pending.get(value).reject(reject);
      this.pending.delete(value);
      this.stabilize();
    }
    return
  }
  wait(value: K): Promise<void> {
    if (this.data.has(value)) {
      return Promise.resolve()
    }
    if (!this.pending.has(value)) {
      this.pending.set(value, new AsyncDefer<void, E>());
      this.stable.lock();
    }
    return this.pending.get(value).promise;
  }
  hasPending(value: K): boolean {
    return this.pending.has(value);
  }
  has(value: K): boolean {
    return this.data.has(value);
  }
  add(value: K): this {
    if (this.pending.has(value)) {
      this.pending.get(value).accept(undefined);
      this.pending.delete(value);
    }
    this.data.add(value);
    this.stabilize();
    return this;
  }
  get size(): number {
    return this.data.size
  }
  get pendingSize(): number {
    return this.pending.size
  }
  async all(): Promise<this> {
    return this.stable.wait();
  }

  private stabilize() {
    if (this.pending.size == 0) {
      this.stable.unlock(this);
    }
  }
  constructor() {
    this.stable.unlock(this);
  }

  entries(): IterableIterator<[ K, K ]> {
    return this.data.entries();
  }
  values(): IterableIterator<K> {
    return this.data.values();
  }
  private data = new Set<K>();
  private pending = new Map<K, AsyncDefer<void, E>>();
  private stable = new AsyncGuard<this>();
}