import {statuses} from './statuses'
export class HttpError extends Error {
    static assert(value:boolean, status = 0, msg:string, opts?) {
        if (!value) {
            throw new HttpError(status, msg, opts);
        }
    }
    status: number;
    cause?: Error;
    data?: object;
    expose: boolean;
    constructor(status = 500, message?: string, cause?: object | Error) {
        if (typeof status !== 'number' || !statuses[status]) {
            status = 500;
        }
        if (!message) {
            message = statuses[status];
        }
        super(message);
        this.status = status;
        if (cause) {
            if (cause instanceof Error) {
                this.cause = cause;
                this.stack = `${this.stack}\nCause:${cause.stack}`;
            } else {
                this.data = cause;
            }
        }
    }
}
export class ArgumentError extends Error {
    static assert(condition: boolean, message: string) {
        if (!condition) {
            throw new ArgumentError(message);
        }
    }
    constructor(message: string) {
        super(message);
    }
}
