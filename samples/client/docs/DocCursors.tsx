import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocCursors extends React.PureComponent<{}, {}> {
    render() {
        return <div id="cursors" className="container">
            <h3 className="s-title"><a href="#cursors" className="anchor" aria-hidden="true">#</a>Cursor
                utilities</h3>
            <div className="docs-note">
                <p>Cursor utilities specify which mouse cursor to display when mouseover.</p>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="bg-gray docs-block c-hand">c-hand</div>
                </div>
                <div className="column">
                    <div className="bg-gray docs-block c-move">c-move</div>
                </div>
                <div className="column">
                    <div className="bg-gray docs-block c-zoom-in">c-zoom-in</div>
                </div>
                <div className="column">
                    <div className="bg-gray docs-block c-zoom-out">c-zoom-out</div>
                </div>
                <div className="column">
                    <div className="bg-gray docs-block c-not-allowed">c-not-allowed</div>
                </div>
                <div className="column">
                    <div className="bg-gray docs-block c-auto">c-auto</div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- cursor: hand; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"c-hand"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- cursor: move; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"c-move"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- cursor: zoom-in; --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"c-zoom-in"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- cursor: zoom-out; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"c-zoom-out"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- cursor: not-allowed; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"c-not-allowed"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- cursor: auto; --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"c-auto"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}