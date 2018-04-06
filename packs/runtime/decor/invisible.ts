export function invisible(target: Object, propertyKey: string) {
    Reflect.defineProperty(target,propertyKey,{
        configurable:true,
        enumerable:false,
        get(){
            return Reflect.defineProperty(this,propertyKey,{
                enumerable:false,
                writable:true,
                value:undefined
            })[propertyKey];
        },
        set(value){
            Reflect.defineProperty(this,propertyKey,{
                enumerable:false,
                writable:true,
                value:value
            });
        }
    })
}