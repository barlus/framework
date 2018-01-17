
interface Event {
    type:string;
}
interface EventListener {
    (evt: Event): void;
}
interface EventListenerObject {
    handleEvent(evt: Event): void;
}

interface Node {
    attributes:ArrayLike<any>;
    nodeName:string;
    nodeType:number;
    nodeValue:string;
    parentNode:Node | null;
    firstChild:Node;
    lastChild:Node;
    previousSibling:Node;
    nextSibling:Node;
    childNodes:Node[];

    appendChild(child:Node);
    removeChild(child:Node);
    replaceChild(newChild:Node,oldChild:Node);
    insertBefore(newChild:Node,oldChild:Node);
    addEventListener(type: string, listener?: EventListener | EventListenerObject, options?: boolean | object): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListener | EventListenerObject, options?: boolean | object): void;
}
interface Text extends Node {
    readonly wholeText: string;
    readonly assignedSlot: HTMLElement | null;
    splitText(offset: number): Text;
}
interface Element extends Node {
    removeAttribute(name:string);
    removeAttributeNS(ns:string,name:string);
    setAttribute(name:string,value:any);
    setAttributeNS(ns:string,name:string,value:any);
}
interface HTMLElement extends Element {
    className:string;
    style:Dictionary;
    innerHTML:string;
}
interface SVGElement extends Element {
    ownerSVGElement:SVGElement
}
interface Document extends Node {
    createTextNode(element:string);
    createElement(name:string);
    createElementNS(ns:string, name:string);
    body:HTMLElement;
    head:HTMLElement;
}
interface Window {}

declare const Text:{new():Text};
declare const HTMLElement:{new():HTMLElement};
declare const SVGElement:{new():SVGElement};
declare const window:Window;
declare const document:Document;
declare function requestAnimationFrame(cb:()=>void):void;