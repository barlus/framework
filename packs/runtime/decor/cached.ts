export function cached(target: Object, propertyKey: string, desc:PropertyDescriptor) {
    let {get,set} = desc;
    Reflect.defineProperty(target,propertyKey,{
        configurable:true,
        get(){
            return Reflect.defineProperty(this,propertyKey,{
                value:Reflect.apply(get,this,[])
            })[propertyKey];
        },
        set(value){
            Reflect.defineProperty(this,propertyKey,{
                value:Reflect.apply(set,this,[value])
            });
        }
    })
}