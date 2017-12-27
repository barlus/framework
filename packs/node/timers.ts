export interface Timer {
    ref(): void;
    unref(): void;
}
export declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): Timer;
export declare function clearTimeout(timeoutId: Timer): void;
export declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): Timer;
export declare function clearInterval(intervalId: Timer): void;
export declare function setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
export declare function clearImmediate(immediateId: any): void;