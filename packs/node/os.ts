import {Platform} from './process';
import {proxy} from "./proxy";
export type NetworkInterfaceInfo = NetworkInterfaceInfoIPv4 | NetworkInterfaceInfoIPv6;
export interface CpuInfo {
    model: string;
    speed: number;
    times: {
        user: number;
        nice: number;
        sys: number;
        idle: number;
        irq: number;
    };
}
export interface NetworkInterfaceBase {
    address: string;
    netmask: string;
    mac: string;
    internal: boolean;
}
export interface NetworkInterfaceInfoIPv4 extends NetworkInterfaceBase {
    family: "IPv4";
}
export interface NetworkInterfaceInfoIPv6 extends NetworkInterfaceBase {
    family: "IPv6";
    scopeid: number;
}
export declare const EOL: string;
export declare const constants: {
    UV_UDP_REUSEADDR: number,
    signals: {
        SIGHUP: number;
        SIGINT: number;
        SIGQUIT: number;
        SIGILL: number;
        SIGTRAP: number;
        SIGABRT: number;
        SIGIOT: number;
        SIGBUS: number;
        SIGFPE: number;
        SIGKILL: number;
        SIGUSR1: number;
        SIGSEGV: number;
        SIGUSR2: number;
        SIGPIPE: number;
        SIGALRM: number;
        SIGTERM: number;
        SIGCHLD: number;
        SIGSTKFLT: number;
        SIGCONT: number;
        SIGSTOP: number;
        SIGTSTP: number;
        SIGTTIN: number;
        SIGTTOU: number;
        SIGURG: number;
        SIGXCPU: number;
        SIGXFSZ: number;
        SIGVTALRM: number;
        SIGPROF: number;
        SIGWINCH: number;
        SIGIO: number;
        SIGPOLL: number;
        SIGPWR: number;
        SIGSYS: number;
        SIGUNUSED: number;
    },
    errno: {
        E2BIG: number;
        EACCES: number;
        EADDRINUSE: number;
        EADDRNOTAVAIL: number;
        EAFNOSUPPORT: number;
        EAGAIN: number;
        EALREADY: number;
        EBADF: number;
        EBADMSG: number;
        EBUSY: number;
        ECANCELED: number;
        ECHILD: number;
        ECONNABORTED: number;
        ECONNREFUSED: number;
        ECONNRESET: number;
        EDEADLK: number;
        EDESTADDRREQ: number;
        EDOM: number;
        EDQUOT: number;
        EEXIST: number;
        EFAULT: number;
        EFBIG: number;
        EHOSTUNREACH: number;
        EIDRM: number;
        EILSEQ: number;
        EINPROGRESS: number;
        EINTR: number;
        EINVAL: number;
        EIO: number;
        EISCONN: number;
        EISDIR: number;
        ELOOP: number;
        EMFILE: number;
        EMLINK: number;
        EMSGSIZE: number;
        EMULTIHOP: number;
        ENAMETOOLONG: number;
        ENETDOWN: number;
        ENETRESET: number;
        ENETUNREACH: number;
        ENFILE: number;
        ENOBUFS: number;
        ENODATA: number;
        ENODEV: number;
        ENOENT: number;
        ENOEXEC: number;
        ENOLCK: number;
        ENOLINK: number;
        ENOMEM: number;
        ENOMSG: number;
        ENOPROTOOPT: number;
        ENOSPC: number;
        ENOSR: number;
        ENOSTR: number;
        ENOSYS: number;
        ENOTCONN: number;
        ENOTDIR: number;
        ENOTEMPTY: number;
        ENOTSOCK: number;
        ENOTSUP: number;
        ENOTTY: number;
        ENXIO: number;
        EOPNOTSUPP: number;
        EOVERFLOW: number;
        EPERM: number;
        EPIPE: number;
        EPROTO: number;
        EPROTONOSUPPORT: number;
        EPROTOTYPE: number;
        ERANGE: number;
        EROFS: number;
        ESPIPE: number;
        ESRCH: number;
        ESTALE: number;
        ETIME: number;
        ETIMEDOUT: number;
        ETXTBSY: number;
        EWOULDBLOCK: number;
        EXDEV: number;
    },
};
export declare function hostname(): string;
export declare function loadavg(): number[];
export declare function uptime(): number;
export declare function freemem(): number;
export declare function totalmem(): number;
export declare function cpus(): CpuInfo[];
export declare function type(): string;
export declare function release(): string;
export declare function networkInterfaces(): { [index: string]: NetworkInterfaceInfo[] };
export declare function homedir(): string;
export declare function userInfo(options?: { encoding: string }): { username: string, uid: number, gid: number, shell: any, homedir: string };
export declare function arch(): string;
export declare function platform(): Platform;
export declare function tmpdir(): string;
export declare function endianness(): "BE" | "LE";

const M = require('os');
Object.assign(module.exports,M);