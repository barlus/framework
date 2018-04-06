
const target: unique symbol = Symbol('target');
const source: unique symbol = Symbol('internal');


const internalObject = {
    of<C extends {'#'}>(target:C):C['#']{
        return target[source];
    }
};

function internalDecor<C extends {'#'}>(proto:C,key:'#'='#'){
    const Type = Reflect.getOwnMetadata('design:type',proto,key);
    Object.defineProperty(proto,source,{
        configurable:true,
        get(){
            const value  = new Type();
            value[target] = this;
            return Object.defineProperty(this,source,{
                enumerable:true,
                configurable:true,
                value
            })[source]
        }
    })
}

export const internal = Object.assign(internalDecor,internalObject);

export class Internal<T extends {'#'}> {
    protected get target(){
        return this[target];
    };
}