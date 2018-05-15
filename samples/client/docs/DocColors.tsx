import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocColors extends React.PureComponent<{}, {}> {
    render() {
        return <div id="colors" className="container">
            <h3 className="s-title"><a href="#colors" className="anchor" aria-hidden="true">#</a>Color utilities</h3>
            <div className="docs-note">
                <p>Color utilities are used for changing colors for text, link and background.</p>
            </div>
            <h4 id="colors-text" className="s-subtitle">Text colors</h4>
            <div className="docs-note">
                <p><span className="text-primary">primary color</span></p>
                <p><span className="text-secondary">secondary color</span></p>
                <p><span className="text-gray">gray color</span></p>
                <p><span className="text-light bg-dark p-1 rounded">light color</span></p>
                <p><span className="text-success">success color</span></p>
                <p><span className="text-warning">warning color</span></p>
                <p><span className="text-error">error color</span></p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span className="atv">"text-primary"</span>&gt;primary color&lt;
                <span className="tag">/span</span>&gt;{"\n"}&lt;<span className="tag">span</span> <span
                    className="atn">class</span>=<span className="atv">"text-secondary"</span>&gt;secondary color&lt;
                <span className="tag">/span</span>&gt;{"\n"}&lt;<span className="tag">span</span> <span
                    className="atn">class</span>=<span className="atv">"text-gray"</span>&gt;gray color&lt;<span
                    className="tag">/span</span>&gt;{"\n"}&lt;<span className="tag">span</span> <span
                    className="atn">class</span>=<span className="atv">"text-light"</span>&gt;light color&lt;
                <span className="tag">/span</span>&gt;{"\n"}&lt;<span className="tag">span</span> <span
                    className="atn">class</span>=<span
                    className="atv">"text-success"</span>&gt;success color&lt;<span
                    className="tag">/span</span>&gt;{"\n"}&lt;<span className="tag">span</span> <span
                    className="atn">class</span>=<span
                    className="atv">"text-warning"</span>&gt;warning color&lt;<span
                    className="tag">/span</span>&gt;{"\n"}&lt;<span className="tag">span</span> <span
                    className="atn">class</span>=<span className="atv">"text-error"</span>&gt;error color&lt;
                <span className="tag">/span</span>&gt;{"\n"}</code></pre>
            <div className="docs-note">
                <p><a className="text-primary p-1" href="#colors">primary link</a></p>
                <p><a className="text-secondary p-1" href="#colors">secondary link</a></p>
                <p><a className="text-gray p-1" href="#colors">gray link</a></p>
                <p><a className="text-light bg-dark p-1 rounded" href="#colors">light link</a></p>
                <p><a className="text-success p-1" href="#colors">success link</a></p>
                <p><a className="text-warning p-1" href="#colors">warning link</a></p>
                <p><a className="text-error p-1" href="#colors">error link</a></p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">a</span> <span
                className="atn">class</span>=<span className="atv">"text-primary"</span> <span
                className="atn">href</span>=<span className="atv">"#"</span>&gt;primary color&lt;<span
                className="tag">/a</span>&gt;{"\n"}&lt;<span className="tag">a</span> <span
                className="atn">class</span>=<span className="atv">"text-secondary"</span> <span
                className="atn">href</span>=<span className="atv">"#"</span>&gt;secondary color&lt;<span
                className="tag">/a</span>&gt;{"\n"}&lt;<span className="tag">a</span> <span
                className="atn">class</span>=<span className="atv">"text-gray"</span> <span
                className="atn">href</span>=<span className="atv">"#"</span>&gt;gray color&lt;<span
                className="tag">/a</span>&gt;{"\n"}&lt;<span className="tag">a</span> <span
                className="atn">class</span>=<span className="atv">"text-light"</span> <span
                className="atn">href</span>=<span className="atv">"#"</span>&gt;light color&lt;<span
                className="tag">/a</span>&gt;{"\n"}&lt;<span className="tag">a</span> <span
                className="atn">class</span>=<span className="atv">"text-success"</span> <span
                className="atn">href</span>=<span className="atv">"#"</span>&gt;success color&lt;<span
                className="tag">/a</span>&gt;{"\n"}&lt;<span className="tag">a</span> <span
                className="atn">class</span>=<span className="atv">"text-warning"</span> <span
                className="atn">href</span>=<span className="atv">"#"</span>&gt;warning color&lt;<span
                className="tag">/a</span>&gt;{"\n"}&lt;<span className="tag">a</span> <span
                className="atn">class</span>=<span className="atv">"text-error"</span> <span
                className="atn">href</span>=<span className="atv">"#"</span>&gt;error color&lt;<span
                className="tag">/a</span>&gt;{"\n"}</code></pre>
            <h4 id="colors-background" className="s-subtitle">Background colors</h4>
            <div className="docs-note">
                <p><span className="bg-primary p-1 rounded">primary bg</span></p>
                <p><span className="bg-secondary text-primary p-1 rounded">secondary bg</span></p>
                <p><span className="bg-dark p-1 rounded">dark bg</span></p>
                <p><span className="bg-gray p-1 rounded">gray bg</span></p>
                <p><span className="bg-success p-1 rounded">success bg</span></p>
                <p><span className="bg-warning p-1 rounded">warning bg</span></p>
                <p><span className="bg-error p-1 rounded">error bg</span></p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"bg-primary"</span>&gt;primary bg&lt;<span
                className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"bg-secondary"</span>&gt;secondary bg&lt;
                <span className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"bg-dark"</span>&gt;dark bg&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"bg-gray"</span>&gt;gray bg&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"bg-success"</span>&gt;success bg&lt;
                <span className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"bg-warning"</span>&gt;warning bg&lt;
                <span className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"bg-error"</span>&gt;error bg&lt;<span
                    className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}