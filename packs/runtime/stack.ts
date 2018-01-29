declare const ts;
export class Call {
    url: string;
    line: number;
    column: number;
    className: string;
    methodName: string;
    functionName: string;
    constructor(url: string, line: number, column: number,className:string,methodName:string,functionName:string) {
        this.url = url;
        this.line = line;
        this.column = column;
        this.className = className;
        this.methodName = methodName;
        this.functionName = functionName;
        if(typeof ts!='undefined' && typeof ts.maps!='undefined' && ts.maps[this.url]){
            let original = ts.maps[this.url].originalPositionFor({
                line:this.line,
                column:this.column-1,
            });
            this.line = original.line;
            this.column = original.column+1;
        }
    }
    toString(){
        const source = this.url ? `(${this.url}:${this.line}:${this.column})`:'';
        return ` at ${this.className?this.className+'.':''}${this.methodName||this.functionName||'<anonymus>'} ${source}`
    }
}
export class Stack {
    static get(name:string): Stack {
        const prepareStackTrace = Error['prepareStackTrace'];
        Error['prepareStackTrace'] = prepareStack;
        const stack = {stack:null};
        Error['captureStackTrace'](stack);
        stack.stack;
        Error['prepareStackTrace'] = prepareStackTrace;
        return new Stack(name,stack.stack);
    }
    name:string;
    calls:Call[];
    constructor(name:string,calls:Call[]){
        this.name=name;
        this.calls=calls;
    }
    toString(){
        return `${this.name}\n`+this.calls.map(s=>`${s.toString()}`).join('\n');
    }
}
Error['prepareStackTrace'] = prepareStack;
function prepareStack(target, stack) {
    const calls = stack.map(c => {
        //console.info(c.getFunction());
        return new Call(
            c.getFileName() || c.getScriptNameOrSourceURL(),
            c.getLineNumber(),
            c.getColumnNumber(),
            c.getTypeName(),
            c.getMethodName(),
            c.getFunctionName(),
        );
    });

    if(target instanceof Error){
        target.stack = target.message+'\n'+calls.map(s=>s.toString()).join('\n');
    }else{
        target.stack = calls
    }
}
