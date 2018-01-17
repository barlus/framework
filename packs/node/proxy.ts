export function proxy(name, module) {
    return module.exports = new Proxy(module.exports, {
        set(target, key, value) {
            target[key] = value;
            return true;
        },
        get(target, key) {
            if (!target.hasOwnProperty(key)) {
                target[key] = module.require(name)[key];
            }
            if(key=='override'){
                target[key] = (patch)=>{
                    Object.getOwnPropertyNames(patch).forEach(n=>{
                        Object.defineProperty(target,n,Object.getOwnPropertyDescriptor(patch,n))
                    });
                }
            }
            return target[key];
        }
    });
}