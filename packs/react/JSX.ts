declare namespace JSX {
    interface ElementClass {
        render: any;
    }
    interface ElementAttributesProperty {
        props:{}; // specify the property name to use
    }
    interface ElementChildrenAttribute {
        children: {};  // specify children name to use
    }
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}