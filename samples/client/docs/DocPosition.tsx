import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocPosition extends React.PureComponent<{}, {}> {
    render() {
        return <div id="position" className="container">
            <h3 className="s-title"><a href="#position" className="anchor" aria-hidden="true">#</a>Position
                utilities</h3>
            <div className="docs-note">
                <p>Position utilities are used for useful layout and position things, including clearfix, float,
                    position and margin/padding utilities.</p>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- clear float --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"clearfix"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- float: left and right --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"float-left"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"float-right"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- position: relative, absolute and fixed --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"relative"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"absolute"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"fixed"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- centered block --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"centered"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}{"\n"}<span
                className="com">&lt;!-- m-1 {"{"}margin: 4px;{"}"} m-2 {"{"}margin: 8px;{"}"} --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"m-1"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"m-2"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                    className="com">&lt;!-- margin in 4 directions. mt-1 {"{"}margin-top: 4px;{"}"} mt-2 {"{"}margin-top: 8px;{"}"} --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"mt-1"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"mt-2"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                    className="com">&lt;!-- mx-1 {"{"}margin-left: 4px; margin-right: 4px;{"}"} --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"mx-1"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"mx-2"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"my-1"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"my-2"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                    className="com">&lt;!-- p-1 {"{"}padding: 4px;{"}"} p-2 {"{"}padding: 8px;{"}"} --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"p-1"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"p-2"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                    className="com">&lt;!-- padding in 4 directions. pt-1 {"{"}padding-top: 4px;{"}"} pt-2 {"{"}padding-top: 8px;{"}"} --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"pt-1"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"pt-2"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                    className="com">&lt;!-- px-1 {"{"}padding-left: 4px; padding-right: 4px;{"}"} --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"px-1"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"px-2"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"py-1"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"py-2"</span>&gt;&lt;<span
                    className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}