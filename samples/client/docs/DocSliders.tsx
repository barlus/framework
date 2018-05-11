import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocSliders extends React.PureComponent<{}, {}> {
    render() {
        return <div id="sliders" className="container">
            <h3 className="s-title"><a href="#sliders" className="anchor" aria-hidden="true">#</a>Sliders</h3>
            <div className="docs-note">
                <p>Sliders are for selecting values from ranges.</p>
                <p>You can add the class <code>tooltip</code> to have tooltip labels. If
                    no <code>data-tooltip</code> is set, the <code>value</code> will be used instead.</p>
            </div>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <input className="slider tooltip" type="range" min={0} max={100} defaultValue={50}
                           onInput="this.setAttribute('value', this.value);"/>
                </div>
                <div className="column col-6 col-xs-12">
                    <input className="slider" type="range" min={0} max={100} defaultValue={50} disabled/>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- Sliders --&gt;</span>{"\n"}&lt;<span className="tag">input</span> <span
                className="atn">class</span>=<span className="atv">"slider"</span> <span
                className="atn">type</span>=<span className="atv">"range"</span> <span
                className="atn">min</span>=<span className="atv">"0"</span> <span
                className="atn">max</span>=<span className="atv">"100"</span> <span className="atn">value</span>=<span
                className="atv">"50"</span>&gt;{"\n"}<span
                className="com">&lt;!-- Sliders with tooltips --&gt;</span>{"\n"}&lt;<span
                className="tag">input</span> <span className="atn">class</span>=<span
                className="atv">"slider tooltip"</span> <span
                className="atn">type</span>=<span className="atv">"range"</span> <span
                className="atn">min</span>=<span className="atv">"0"</span> <span
                className="atn">max</span>=<span className="atv">"100"</span> <span className="atn">value</span>=<span
                className="atv">"50"</span> <span className="atn">oninput</span>=<span className="atv">"this.setAttribute('value', this.value);"</span>&gt;{"\n"}</code></pre>
        </div>
    }
}