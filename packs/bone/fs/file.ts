import {URL} from '@barlus/runtime/url';
import {read, readdir, readdirSync, stat, Stats, statSync} from '@barlus/node/fs';
import {inspect} from '@barlus/node/util';
import {resolve, relative, parse, dirname, basename} from '@barlus/node/path';
import {process} from '@barlus/node/process';
import {tmpdir} from '@barlus/node/os';
import {colors} from '../utils/colors';

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
export class Entry {
    readonly url: URL;
    readonly system: System;
    readonly stat: Stat;
    public get type(): EntryType {
        return this.stat.type;
    }
    public get path(): string {
        return this.url.pathname;
    }
    public get exists(){
        return !!this.stat;
    }
    constructor(path: string | URL, stat?:Stat) {
        if (path instanceof URL) {
            this.url = path;
        } else {
            this.url = new URL(path, 'file:///');
        }
        this.system = System.get(this.url);
        this.stat = stat;
    }
    async refresh():Promise<this>{
        const stat = await this.system.readStat(this.url);
        Object.assign(this,{stat});
        return this;
    }
    async delete(recoursive: boolean = false): Promise<Entry> {
        return;
    }
    async rename(name: string): Promise<Entry> {
        return this;
    }
    public compare(target:Entry){
        if((this.type-target.type)===0){
            if(this.path===target.path){
                return 0;
            }else
            if(this.path>target.path){
                return 1;
            }else{
                return -1;
            }
        }else{
            return this.type-target.type;
        }
    }
    protected [inspect.custom]() {
        return `${colors.cyan(this.constructor.name[0])} ${basename(this.path)} ${colors.gray(dirname(this.path))}`
    }
}
export class Directory extends Entry {
    static get root(): Directory {
        return new Directory('/');
    }
    static get current(): Directory {
        return new Directory(process.cwd());
    }
    static get temp(): Directory {
        return new Directory(tmpdir());
    }
    async create(recursive: boolean = false): Promise<Directory> {
        return;
    }
    async list(recursive: boolean = false, follow: boolean = false): Entry[] {
        let children = this.system.readDirSync(this.url);
        if(recursive){
            let dirs = children.filter(c=>c.type==EntryType.DIRECTORY);
            dirs.map((c:Directory)=>{
                c.list(recursive).forEach(e=>children.push(e));
            })
        }
        //children.sort((a,b)=>a.compare(b));
        return children;
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
export class System {
    static get default(){
        const value = new System('file:');
        Object.defineProperty(this,'default',{
            value
        });
        return value;
    }
    static get map(){
        const value = new Map<string, System>([
            ['file:', this.default]
        ]);
        Object.defineProperty(this,'map',{
            value
        });
        return value;
    }
    static get(url: URL) {
        return this.map.get(url.protocol);
    }
    readonly base: URL;
    constructor(protocol: string) {
        this.base = new URL('/', protocol + '//');
    }
    async readStat(url: URL): Promise<Stat> {
        return new Stat(statSync(url.pathname));
    }
    async readDir(url: URL): Promise<Entry[]> {
        return this.readDirSync(url);
    }
    async getDirectory(dir):Promise<string[]>{
        return new Promise<string[]>((a,r)=>readdir(dir,(e,v)=>e?r(e):a(v)))
    }
    async getMetadata(dir):Promise<Stat>{
        return new Promise<Stat>((a,r)=>stat(dir,(e,v)=>
            e?r(e):a(new Stat(v))
        ));
    }
    public readDirSync(url: URL): Entry[] {
        return readdirSync(url.pathname).map(c => {
            let path = resolve(url.pathname, c);
            let curl = new URL(path, this.base);
            let stat = new Stat(statSync(path));
            if (stat.type==EntryType.DIRECTORY) {
                return new Directory(curl,stat)
            }
            if (stat.type==EntryType.FILE) {
                return new File(curl,stat);
            }
            if (stat.type==EntryType.LINK) {
                return new Link(curl,stat);
            }
        });
    }
}