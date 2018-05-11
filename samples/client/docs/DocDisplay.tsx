import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocDisplay extends React.PureComponent<{}, {}> {
    render() {
        return <div id="display" className="container">
            <h3 className="s-title"><a href="#display" className="anchor" aria-hidden="true">#</a>Display
                utilities</h3>
            <div className="docs-note">
                <p>Display utilities are used for display and hidden things.</p>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- display: block; --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"d-block"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- display: inline; --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"d-inline"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- display: inline-block; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"d-inline-block"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- display: flex; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"d-flex"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- display: inline-flex; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"d-inline-flex"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- display: none; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"d-none"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"d-hide"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- visibility: visible; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"d-visible"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- visibility: hidden; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"d-invisible"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- hide text contents --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"text-hide"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- assistive text for screen reader --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"text-assistive"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}