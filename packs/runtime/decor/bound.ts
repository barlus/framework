export function bound(target, key?, descriptor?) {
    const method = descriptor.value;
    const configurable = true;
    if (typeof method !== 'function') {
        throw new Error(`@bound decorator can only be applied to methods not: ${typeof method}`);
    }
    return {
        configurable,
        get(){
            const value = method.bind(this);
            Object.defineProperty(this,key,{
                configurable,
                value
            });
            return value;
        }
    };
}