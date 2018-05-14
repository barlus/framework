import {css} from '@barlus/styles';


declare module '@barlus/styles' {
    export namespace css {
        export const coolMixin:typeof myCoolMixin;
    }
}


function myCoolMixin(a:string,b:string){
    return {a,b}
}

Object.assign(css,{coolMixin:myCoolMixin});