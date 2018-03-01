export class AsyncDefer<T> {
    readonly promise: Promise<T>;
    readonly status: 'accepted' | 'rejected' | 'pending';
    accept?(data: T);
    reject?(data: T);
    get pending(): boolean {
        return this.status == 'pending';
    }
    get accepted(): boolean {
        return this.status == 'accepted';
    }
    get rejected(): boolean {
        return this.status == 'rejected';
    }
    constructor() {
        this.status = 'pending';
        this.promise = new Promise<T>((accept, reject) => {
            this.accept = (value) => {
                this.accept = null;
                this.reject = null;
                (this as any).status = 'accepted';
                accept(value)
            };
            this.reject = (value) => {
                this.accept = null;
                this.reject = null;
                (this as any).status = 'accepted';
                reject(value)
            };
        });
    }
}