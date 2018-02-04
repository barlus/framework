import {URL} from "@barlus/node/url";

export class HttpUrl extends URL {
    static from(string:string){
        return new HttpUrl(string);
    }
    get query(){
        const q = {};
        this.searchParams.forEach((value,name)=>{
            q[name] = value;
        });
        return q;
    }
}