import {proxy} from "./proxy";

export declare class Emitter {
    static listenerCount(emitter: Emitter, event: string | symbol): number; // deprecated
    static defaultMaxListeners: number;

    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    emit(event: string | symbol, ...args: any[]): boolean;
    eventNames(): Array<string | symbol>;
    listenerCount(type: string | symbol): number;
}


proxy('events', module);

module.exports.override({
    get Emitter(){
        Object.defineProperty(module.exports,'name',{
            value:'Emitter'
        });
        return module.exports.EventEmitter
    }
});
