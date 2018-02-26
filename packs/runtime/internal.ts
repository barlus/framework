export const internal = Object.assign(<C extends {'#'}>(target:C,key:'#'='#')=>{
    const Type = Reflect.getOwnMetadata('design:type',target,key);
    Object.defineProperty(target,key,{
        configurable:true,
        get(){
            return Object.defineProperty(this,key,{
                enumerable:false,
                configurable:true,
                value:new Type(this)
            })[key]
        }
    })
},{
    of<C extends {'#'}>(target:C):C['#']{
        return target['#'] || (target['#'] = {});
    }
});
export class Internal<T extends {'#'}> {
    protected target:Permit<T>;
    constructor(target:Permit<T>){
        this.target = target;
    }
}