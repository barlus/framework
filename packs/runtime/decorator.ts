import {Call, Stack} from './stack';
export class Decorator {

    static info(args:IArguments){
        let stack = Stack.get('');
        let decDef:Call,decUse:Call;
        stack.calls.find((c:Call,i:number,a:Call[])=>{
            if(c.functionName=='decorate' && c.url.indexOf('runtime/Reflect')>=0){
                decDef = a[i-1];
                decUse = a[i+1];
                return true;
            }
        });
        return new Decorator(decDef.functionName,decUse.url,decUse.line,decUse.column,args);
    }

    public readonly name;
    public readonly url;
    public readonly line;
    public readonly column;
    public readonly args:IArguments;

    public get isStatic(){
        return typeof this.args[0] == 'function';
    }
    public get isClass(){
        return this.isStatic && this.args.length==1;
    }

    get id(){
        let memberScope = this.args.length>1?(this.isStatic?'.':'#'):'';
        let memberName = this.args.length>1?(this.args[1]):'';
        return `${this.class.name}${memberScope}${memberName}`
    }
    get class(){
        if(this.isStatic){
            return this.args[0]
        }else{
            return this.args[0].constructor;
        }
    }
    constructor(name:string,url:string,line:number,column:number,args:IArguments){
        this.name = name;
        this.url = url;
        this.line = line;
        this.column = column;
        this.args = args;
    }
    toString(){
        return [
            `Decorator(${this.name},${this.id})`,
            `  at (${this.url}:${this.line})`
        ].join('\n')
    }
}

