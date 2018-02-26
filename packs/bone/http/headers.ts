import {type} from '../../node/os';

export class HttpHeaders  {
    static from(raw:HttpHeaders['headers']){
        return new HttpHeaders().patch(raw)
    }
    private headers:{[name:string]:string[]|string} = {};
    append(name: string, value: string): void{
        let values = this.headers[name];
        if(Array.isArray(values)){
            values.push(value);
        }else if(values){
            this.headers[name]=[values,value]
        }else{
            this.headers[name]=[value]
        }
    }
    delete(name: string): void{
        delete this.headers[name]
    }
    get(name: string): string | string[]{
        return this.headers[name];
    }
    has(name: string): boolean {
        return !!this.headers[name];
    }
    set(headers:HttpHeaders['headers']): void
    set(name: HttpHeaders['headers']|string, value: string|string[]): void
    set(name: HttpHeaders['headers']|string, value?: string|string[]): void {
        if(typeof name == 'string'){
            name = {[name]:value};
        }
        this.patch(name)
    }
    patch(headers:any){
        Object.assign(this.headers,headers);
        return this;
    }
    toJSON(){
        return this.headers;
    }

}