import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocLabels extends React.PureComponent<{}, {}> {
    render() {
        return <div id="labels" className="container">
            <h3 className="s-title"><a href="#labels" className="anchor" aria-hidden="true">#</a>Labels</h3>
            <div className="docs-note">
                <p>Labels are formatted text tags for highlighted, informative information.</p>
            </div>
            <div className="columns">
                <div className="column">
                    <span className="label">default label</span>
                    <span className="label label-primary">primary label</span>
                    <span className="label label-secondary">secondary label</span>
                    <span className="label label-success">success label</span>
                    <span className="label label-warning">warning label</span>
                    <span className="label label-error">error label</span>
                </div>
            </div>
            <div className="docs-note">
                <p>Add the <code>label</code> class to &lt;span&gt; or &lt;small&gt; elements. You can add
                    another class
                    <code>label-primary</code>, <code>label-secondary</code>, <code>label-success</code>, <code>label-warning</code>
                    and <code>label-error</code> for colored labels.</p>
            </div>
            <div className="columns">
                <div className="column">
                    <span className="label label-rounded">default label</span>
                    <span className="label label-rounded label-primary">primary label</span>
                    <span className="label label-rounded label-secondary">secondary label</span>
                    <span className="label label-rounded label-success">success label</span>
                    <span className="label label-rounded label-warning">warning label</span>
                    <span className="label label-rounded label-error">error label</span>
                </div>
            </div>
            <div className="docs-note">
                <p>Add the <code>label-rounded</code> class to have rounded labels.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span className="atv">"label"</span>&gt;default label&lt;<span
                className="tag">/span</span>&gt;{"\n"}&lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span
                className="atv">"label label-primary"</span>&gt;primary label&lt;<span
                className="tag">/span</span>&gt;{"\n"}</code></pre>
        </div>
    }
}