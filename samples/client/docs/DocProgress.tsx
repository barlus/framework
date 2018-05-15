import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocProgress extends React.PureComponent<{}, {}> {
    render() {
        return <div id="progress" className="container">
            <h3 className="s-title"><a href="#progress" className="anchor" aria-hidden="true">#</a>Progress</h3>
            <div className="docs-note">
                <p>The Progress indicates the progress completion of a task.</p>
            </div>
            <div className="columns">
                <div className="column col-3 col-xs-12">
                    <progress className="progress" value={75} max={100}/>
                </div>
                <div className="column col-3 col-xs-12">
                    <progress className="progress" value={50} max={100}/>
                </div>
                <div className="column col-3 col-xs-12">
                    <progress className="progress" value={25} max={100}/>
                </div>
                <div className="column col-3 col-xs-12">
                    <progress className="progress" max={100}/>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">progress</span> <span
                className="atn">class</span>=<span className="atv">"progress"</span> <span
                className="atn">value</span>=<span className="atv">"25"</span> <span className="atn">max</span>=<span
                className="atv">"100"</span>&gt;&lt;<span className="tag">/progress</span>&gt;{"\n"}&lt;<span
                className="tag">progress</span> <span className="atn">class</span>=<span
                className="atv">"progress"</span> <span className="atn">max</span>=<span
                className="atv">"100"</span>&gt;&lt;<span
                className="tag">/progress</span>&gt;{"\n"}</code></pre>
        </div>
    }
}