import '@barlus/runtime';
import {container} from "@barlus/runtime/inject/injection";
import {injectable} from '@barlus/runtime/inject/decorators';

import {TypeStyle, ReactComponent} from '@barlus/bui';
import {NestedCSSProperties} from './typing/css';
import {CSSProperties} from "@barlus/bui/index";

export interface Properties<T={}> extends JSX.ComponentProps<Component<T>> {
    style?:CSSProperties
}

let decorator:Decorator;
export function style(css: NestedCSSProperties|NestedCSSProperties[]) {
    if(!decorator){
        decorator = container.resolve(Decorator);
    }
    return (target: Function) => {
        decorator.style(target,css);
    }
}

export namespace style {
    export function global(selector:string,css:NestedCSSProperties){
        return decorator.global(selector,css);
    }
    export function local(css:CSSProperties){
        return decorator.local(css);
    }
    export function extend(source:NestedCSSProperties,target:NestedCSSProperties){
        for ( let key in target ) {
            if ( key in source ) {
                if ( (typeof target[key] == 'object') || (typeof source[key] == 'object') ) {
                    source[key] = this.extend(source[key],target[key]);
                } else {
                    source[key] = target[key];
                }
            } else {
                source[key] = target[key];
            }
        }
        return source;
    }
    export function merge(...args:NestedCSSProperties[]):NestedCSSProperties{
        let properties:NestedCSSProperties = args.shift();

        for ( let p of args ) {
            properties = this.extend(properties,(p as NestedCSSProperties));
        }

        return properties;
    }
}

export class Component<T,S = {}> extends ReactComponent<T&Properties,S> {
    private _classNames:Set<string> = new Set();
    private _cssProperties:CSSProperties = {};

    addCssProperty(css:CSSProperties){
        style.merge(this._cssProperties,css);
    }

    get cssProperties(){
        return this._cssProperties;
    }

    get classNames():string[]{
        let classes:string[] = [];
        let parent = Object.getPrototypeOf(this);
        while (parent instanceof Component) {
            if ( Reflect.hasOwnMetadata('component:style',parent.constructor) ) {
                let cname = parent.constructor.name;
                classes.push(cname);
            }
            parent = Object.getPrototypeOf(parent);

        }

        if( this.props.className ) {
            this.props.className.trim().split(/\s+/).forEach(c => {
                if (!classes.includes(c)) {
                    classes.push(c);
                }
            });
        }

        if( this._classNames ) {
            this._classNames.forEach(c => {
                if (!classes.includes(c)) {
                    classes.push(c);
                }
            });
        }

        return classes;
    }

    addClassName(className:string){
        if ( className && !this._classNames.has(className) ) {
            this._classNames.add(className);
        }
    }

    removeClassName(className:string){
        if ( this._classNames.has(className) ) {
            this._classNames.delete(className);
        }
    }

    collectClassNames(p){
        const {...props} = p;
        props.className = this.classNames.join(' ');
        return props;
    }

    collectCssProperties(p){
        const {...props} = p;

        if ( this.cssProperties )
            props.style = props.style ? style.merge(props.style,this.cssProperties) : this.cssProperties;

        return props;
    }

}

@injectable
export class Decorator {
    private ts:TypeStyle;
    constructor( ts:TypeStyle){
        this.ts = ts;
    }
    global(selector:string,css:CSSProperties){
        return this.ts.cssRule(selector,css);
    }
    local(css:CSSProperties){
        return this.ts.style(css);
    }
    style(target:Function,css:NestedCSSProperties|NestedCSSProperties[]){
        Reflect.defineMetadata('component:style',css,target);
        if (!(target.prototype instanceof Component)) {
            throw new Error('Elements must extends base class Element')
        }
        const className: string = target.name;
        const render = target.prototype.render;
        if (Array.isArray(css)){
            css = style.merge(...css);
        }
        this.ts.cssRule(`.${className}`, css as NestedCSSProperties);
    }
}


