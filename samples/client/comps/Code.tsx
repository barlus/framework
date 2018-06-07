import * as React from '@barlus/react';

declare const hljs;

export class Code extends React.Component<React.PropsOf<typeof Code>> {
    static defaultProps = {
        trim:true as boolean,
        innerHTML: false,
        className: '' as string,
        element: null as any,
    };
    private el:HTMLElement;
    constructor(props,context) {
        super(props,context);
        this.setEl = this.setEl.bind(this)
    }
    componentDidMount() {
        this.highlightCode();
    }
    componentDidUpdate() {
        this.highlightCode();
    }
    highlightCode() {
        if(typeof window['hljs']!='undefined'){
            const nodes = this.el.querySelectorAll('pre code');
            for (let i = 0; i < nodes.length; i++) {
                hljs.highlightBlock(nodes[i])
            }
        }
    }

    setEl(el) {
        this.el = el;
    };

    render() {
        let {children, className, element: Element, innerHTML, trim} = this.props;
        const props = { ref: this.setEl, className };
        if(trim && typeof children=='string'){
            children = children.trim();
        }
        if (innerHTML) {
            props['dangerouslySetInnerHTML'] = {
                __html: children
            };
            if (Element) {
                return <Element {...props} />;
            }
            return <div {...props} />;
        }

        if (Element) {
            return <Element {...props}>{String(children)}</Element>;
        }
        return <pre ref={this.setEl}><code className={className}>{children}</code></pre>;
    }
}

