import {URL, URLSearchParams} from "../node/url";


export class HttpQuery extends URLSearchParams {
  get query() {
    const q = {};
    this.forEach((value, name) => {
      q[ name ] = value;
    });
    return q;
  }
  patch(object: {}) {
    Object.keys(object).forEach(key=>{
      const value = object[key];
      if(Array.isArray(value)){
        value.forEach(item=>{
          this.append(key,item);
        })
      }else{
        this.set(key,value);
      }
    })
  }
}

export class HttpUrl extends URL {
  static query(text: string) {
    return new HttpQuery(text).query;
  }
  static from(string: string) {
    return new HttpUrl(string);
  }
  public searchParams: HttpQuery;
  constructor(input: string, base?: string | HttpUrl) {
    super(input, base);
    Object.setPrototypeOf(this.searchParams, HttpQuery.prototype);
  }
  get query() {
    return this.searchParams.query;
  }
}