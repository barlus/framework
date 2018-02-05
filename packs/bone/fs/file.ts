import {URL} from '@barlus/node/url';
import {read, readdir, stat, Stats} from '@barlus/node/fs';
import {process} from '@barlus/node/process';
import {tmpdir} from '@barlus/node/os';

export enum EntryType {
    FILE,
    LINK,
    DIRECTORY,
    DEVICE,
    FIFO,
    SOCKET,
}

export class Stat {
    readonly type: EntryType;
    readonly mode: number;
    readonly size: number;
    readonly nodeId: number;
    readonly deviceId: number;
    readonly userId: number;
    readonly groupId: number;
    readonly linkCount: number;
    readonly blockSize: number;
    readonly blockCount: number;
    readonly accessDate: Date;
    readonly modifyDate: Date;
    readonly changeDate: Date;
    readonly birthDate: Date;
    constructor(stat: Stats) {
        if (stat.isFile()) {
            this.type = EntryType.FILE;
        } else
        //
        if (stat.isDirectory()) {
            this.type = EntryType.DIRECTORY;
        } else
        //
        if (stat.isSymbolicLink()) {
            this.type = EntryType.LINK;
        } else
        //
        if (stat.isFIFO()) {
            this.type = EntryType.FIFO;
        } else
        //
        if (stat.isSocket()) {
            this.type = EntryType.SOCKET;
        } else
        //
        if (stat.isBlockDevice() || stat.isCharacterDevice()) {
            this.type = EntryType.DEVICE;
        }
        this.mode = stat.mode;
        this.size = stat.size;
        this.nodeId = stat.ino;
        this.deviceId = stat.dev;
        this.userId = stat.uid;
        this.groupId = stat.gid;
        this.linkCount = stat.nlink;
        this.blockSize = stat.blksize;
        this.blockCount = stat.blocks;
        this.accessDate = stat.atime;
        this.modifyDate = stat.mtime;
        this.changeDate = stat.ctime;
        this.birthDate = stat.birthtime;
    }
}
async function readStat(path: string): Promise<Stat> {
    return new Promise<Stat>((a, r) => stat(
        path, (e, s) => e ? r(e) : a(new Stat(s))
    ));
}
async function readDir(path: string) {
    return new Promise<string[]>((a, r) => readdir(
        path, (e, s) => e ? r(e) : a(s))
    );
}
export class Entry {
    static async isEqual(fisrt: string, second: string) {
    }
    static async isDirectory(path: string) {
    }
    static async isFile(path: string) {
    }
    static async isLink(path: string) {
    }
    static async getParent(path: string) {
    }
    static async getType(path: string) {
    }
    readonly url: URL;
    readonly parent: Directory;
    public get path(): string {
        return this.url.pathname;
    }
    public get isAbsolute(): boolean {
        return
    }
    constructor(path: string | URL) {
        if (path instanceof URL) {
            this.url = path;
        } else {
            this.url = new URL(path, 'file:///');
        }
    }
    async delete(recoursive: boolean = false): Promise<Entry> {
        return;
    }
    async exists(): Promise<boolean> {
        return true
    }
    async rename(name: string): Promise<Entry> {
        return this;
    }
    async stats() {
        return readStat(this.url.pathname)
    }
}
export class Directory extends Entry {
    static get current(): Directory {
        return new Directory(process.cwd());
    }
    static get temp(): Directory {
        return new Directory(tmpdir());
    }
    async create(recursive: boolean = false): Promise<Directory> {
        return;
    }
    async list(recursive: boolean = false, follow: boolean = false): Promise<any> {
        return readDir(this.url.pathname)
    }
}
export class Link extends Entry {
    async create(recursive: boolean = false): Promise<Link> {
        return;
    }
    async target(): Promise<string> {
        return;
    }
    async update(target: string): Promise<string> {
        return;
    }
}
export class File extends Entry {
    async create(recursive: boolean = false): Promise<File> {
        return;
    }
    async copy(target: string): Promise<File> {
        return;
    }
}