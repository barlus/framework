import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocSteps extends React.PureComponent<{}, {}> {
    render() {
        return <div id="steps" className="container">
            <h3 className="s-title"><a href="#steps" className="anchor" aria-hidden="true">#</a>Steps</h3>
            <div className="docs-note">
                <p>Steps are progress indicators of a sequence of task steps.</p>
            </div>
            <div className="columns">
                <div className="column col-12">
                    <ul className="step">
                        <li className="step-item">
                            <a href="#steps" className="tooltip" data-tooltip="Step 1 Tooltip"/>
                        </li>
                        <li className="step-item active">
                            <a href="#steps" className="tooltip" data-tooltip="Step 2 Tooltip"/>
                        </li>
                        <li className="step-item">
                            <a href="#steps" className="tooltip" data-tooltip="Step 3 Tooltip"/>
                        </li>
                        <li className="step-item">
                            <a href="#steps" className="tooltip" data-tooltip="Step 4 Tooltip"/>
                        </li>
                    </ul>
                </div>
                <div className="column col-12">
                    <ul className="step">
                        <li className="step-item">
                            <a href="#steps" className="tooltip" data-tooltip="Step 1 Tooltip">Step 1</a>
                        </li>
                        <li className="step-item">
                            <a href="#steps" className="tooltip" data-tooltip="Step 2 Tooltip">Step 2</a>
                        </li>
                        <li className="step-item active">
                            <a href="#steps" className="tooltip" data-tooltip="Step 3 Tooltip">Step 3</a>
                        </li>
                        <li className="step-item">
                            <a href="#steps" className="tooltip" data-tooltip="Step 4 Tooltip">Step 4</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>step</code> class. And add child elements with
                    the <code>step-item</code>
                    class. The <code>step-item</code> with the <code>active</code> class will be highlighted and
                    indicate the current state of progress.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">ul</span> <span
                className="atn">class</span>=<span className="atv">"step"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">li</span> <span className="atn">class</span>=<span
                className="atv">"step-item"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                className="atn">href</span>=<span className="atv">"#"</span> <span className="atn">class</span>=<span
                className="atv">"tooltip"</span> <span className="atn">data-tooltip</span>=<span
                className="atv">"Step 1"</span>&gt;Step 1&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span
                    className="atv">"step-item active"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">a</span> <span className="atn">href</span>=<span className="atv">"#"</span> <span
                    className="atn">class</span>=<span className="atv">"tooltip"</span> <span
                    className="atn">data-tooltip</span>=<span className="atv">"Step 2"</span>&gt;Step 2&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"step-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span> <span className="atn">class</span>=<span
                    className="atv">"tooltip"</span> <span className="atn">data-tooltip</span>=<span
                    className="atv">"Step 3"</span>&gt;Step 3&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"step-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span> <span className="atn">class</span>=<span
                    className="atv">"tooltip"</span> <span className="atn">data-tooltip</span>=<span
                    className="atv">"Step 4"</span>&gt;Step 4&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span className="tag">/li</span>&gt;{"\n"}&lt;
                <span className="tag">/ul</span>&gt;{"\n"}</code></pre>
        </div>
    }
}