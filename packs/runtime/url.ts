import './index';
import {RuntimeError} from './errors';
import {polyfill} from './globals';

@polyfill((target,globals,require)=>{
    if(!globals.URLSearchParams && require){
        globals.URLSearchParams = require('url').URLSearchParams;
    }
    return globals.URLSearchParams;
})
export class URLSearchParams implements Iterable<[string, string]> {
    public constructor(init?: URLSearchParams | string | { [key: string]: string | string[] | undefined } | Iterable<[string, string]> | Array<[string, string]>){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public append(name: string, value: string): void{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public delete(name: string): void{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public entries(): IterableIterator<[string, string]>{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public forEach(callback: (value: string, name: string) => void): void{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get(name: string): string | null{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public getAll(name: string): string[]{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public has(name: string): boolean{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public keys(): IterableIterator<string>{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set(name: string, value: string): void{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public sort(): void{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public toString(): string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public values(): IterableIterator<string>{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public [Symbol.iterator](): IterableIterator<[string, string]>{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
}

@polyfill((target,globals,require)=>{
    if(!globals.URL && require){
        globals.URL = require('url').URL;
    }
    return globals.URL;
})
export class URL {
    public constructor(input: string, base?: string | URL){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get hash():string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set hash(value:string){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get host():string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set host(value:string){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get hostname():string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set hostname(value:string){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get href():string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set href(value:string){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get password():string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set password(value:string){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get username():string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set username(value:string){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get pathname():string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set pathname(value:string){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get port():string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set port(value:string){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get protocol():string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set protocol(value:string){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get search():string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public set search(value:string){
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get origin(): string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public get searchParams(): URLSearchParams{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public toString(): string{
        throw RuntimeError.NOT_IMPLEMENTED;
    }
    public toJSON(): string {
        throw RuntimeError.NOT_IMPLEMENTED;
    }
}
