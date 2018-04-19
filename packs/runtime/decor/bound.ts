export function bound(target: object, key: string, desc: PropertyDescriptor) {
    const { value, configurable } = desc||Object.getOwnPropertyDescriptor(target,key);
    return {
        configurable,
        get() {
            const binded = Object.assign(value.bind(this),{
                original:value
            });
            Object.defineProperty(this, key, {
                configurable,
                value:binded
            });
            return binded;
        }
    }
}