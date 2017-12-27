export type Signal<T extends Function> = T & {
    attach(callback:T):T;
    detach(callback:T):T;
}

export function signal(target:any,key:string){
    
    let handlers = new Set<Function>();
    
    function signal(...args){
        for(let handler of handlers){
            handler(...args);
        }
    }

    Object.defineProperties(signal,{
        attach:{
            value(handler:Function){
                handlers.add(handler);
                return handler;
            }
        },
        detach:{
            value(handler:Function){
                handlers.delete(handler);
                return handler;
            }
        }
    });

    Object.defineProperty(target,key,{
        value:signal
    })

}