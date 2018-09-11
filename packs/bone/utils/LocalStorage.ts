import {globals} from "@barlus/runtime";
import {Fs}      from "@barlus/bone/node/fs";
import {Path}    from "@barlus/bone/node/path";


export class LocalStorage implements Storage {
  static initGlobal(file?) {
    Object.assign(globals, {
      localStorage: new LocalStorage(file)
    })
  }
  private store: { [ key: string ]: string };
  private file: string;
  private timer: any;
  constructor(file: string = './storage.json') {
    if (file !== 'memory') {
      this.file = Path.resolve(file);
      if (!Fs.existsSync(this.file)) {
        this.clear();
      } else {
        this.fetch();
      }
    } else {
      this.file = file;
    }
  }
  fetch() {
    if (this.file !== 'memory') {
      this.store = JSON.parse(Fs.readFileSync(this.file, 'utf8'));
    }
    return this;
  }
  persist() {
    if (this.file !== 'memory') {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          Fs.writeFileSync(this.file, JSON.stringify(this.store), 'utf8');
          this.timer = null;
        }, 1);
      }
    }
    return this;
  }
  get length() {
    return Object.keys(this.store).length;
  }
  getItem(key: string): string | null {
    if (this.store.hasOwnProperty(key)) {
      return String(this.store[ key ]);
    }
    return null;
  }
  key(index: number = 0): string | null {
    return Object.keys(this.store)[ index ];
  }
  removeItem(key: string): void {
    delete this.store[ key ];
    this.persist();
  }
  setItem(key: string, value: string): void {
    this.store[ key ] = String(value);
    this.persist();
  }
  clear(): void {
    this.store = {};
    this.persist();
  }
}

//twi1-2160a687111f453bbb57044d95ab4f01
//twi1-2160a687111f453bbb57044d95ab4f01