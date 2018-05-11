import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocShape extends React.PureComponent<{}, {}> {
    render() {
        return <div id="shapes" className="container">
            <h3 className="s-title"><a href="#shapes" className="anchor" aria-hidden="true">#</a>Shape utilities
            </h3>
            <div className="docs-note">
                <p>Shape utilities are used for change element shapes.</p>
            </div>
            <div className="columns">
                <div className="column col-6 text-center">
                    <div className="bg-primary text-light docs-shape rounded centered">
                        rounded
                    </div>
                </div>
                <div className="column col-6 text-center">
                    <div className="bg-primary text-light docs-shape circle centered">
                        circle
                    </div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- rounded element --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"rounded"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- circle element --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"circle"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}