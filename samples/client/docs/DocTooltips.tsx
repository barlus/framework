import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocTooltips extends React.PureComponent<{}, {}> {
    render() {
        return <div id="tooltips" className="container">
            <h3 className="s-title"><a href="#tooltips" className="anchor" aria-hidden="true">#</a>Tooltips</h3>
            <div className="docs-note">
                <p>Tooltips provide context information labels that appear on hover and focus.</p>
            </div>
            <div className="columns text-center">
                <div className="column col-xs-12">
                    <button className="btn btn-primary tooltip" data-tooltip="Top Tooltip Text">top tooltip
                    </button>
                </div>
                <div className="column col-xs-12">
                    <button className="btn btn-primary tooltip tooltip-right"
                            data-tooltip="Right Tooltip Text">right
                        tooltip
                    </button>
                </div>
                <div className="column col-xs-12">
                    <button className="btn btn-primary tooltip tooltip-bottom"
                            data-tooltip="Bottom Tooltip Text">bottom
                        tooltip
                    </button>
                </div>
                <div className="column col-xs-12">
                    <button className="btn btn-primary tooltip tooltip-left"
                            data-tooltip="Left Tooltip Text">left tooltip
                    </button>
                </div>
            </div>
            <div className="docs-note">
                <p>Tooltips component is built entirely in CSS.</p>
                <p>Add the <code>tooltip</code> class and the <code>data-tooltip</code> attribute, which
                    contains the
                    tooltip content, to non self closing elements. And add
                    the <code>tooltip-right</code>, <code>tooltip-bottom</code>
                    or <code>tooltip-left</code> class to define the position of a tooltip. By default, the
                    tooltip
                    appears above the element.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">button</span> <span
                className="atn">class</span>=<span className="atv">"btn tooltip"</span> <span
                className="atn">data-tooltip</span>=<span
                className="atv">"Lorem ipsum dolor sit amet"</span>&gt;top tooltip&lt;<span
                className="tag">/button</span>&gt;{"\n"}&lt;<span className="tag">button</span> <span
                className="atn">class</span>=<span className="atv">"btn tooltip tooltip-right"</span> <span
                className="atn">data-tooltip</span>=<span
                className="atv">"Lorem ipsum dolor sit amet"</span>&gt;right tooltip&lt;<span
                className="tag">/button</span>&gt;{"\n"}</code></pre>
        </div>
    }
}