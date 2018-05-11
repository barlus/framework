import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocText extends React.PureComponent<{}, {}> {
    render() {
        return <div id="text" className="container">
            <h3 className="s-title"><a href="#text" className="anchor" aria-hidden="true">#</a>Text utilities
            </h3>
            <div className="docs-note">
                <p>Text utilities are used for text alignment, styles and overflow things.</p>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- left-aligned text --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"text-left"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- center-aligned text --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"text-center"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- right-aligned text --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"text-right"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- justified text --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"text-justify"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"\n"}<span
                className="com">&lt;!-- Lowercased text --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"text-lowercase"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- Uppercased text --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"text-uppercase"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- Capitalized text --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"text-capitalize"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"\n"}<span
                className="com">&lt;!-- Normal weight text --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"text-normal"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- Bold text --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"text-bold"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- Italicized text --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"text-italic"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- Larger text (120%) --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"text-large"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"\n"}<span className="com">&lt;!-- Overflow behavior: display an ellipsis to represent clipped text --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"text-ellipsis"</span>&gt;&lt;<span
                    className="tag">/div</span>&gt;{"\n"}<span className="com">&lt;!-- Overflow behavior: truncate the text --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"text-clip"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                    className="com">&lt;!-- Text may be broken at arbitrary points --&gt;</span>{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"text-break"</span>&gt;&lt;<span
                    className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}