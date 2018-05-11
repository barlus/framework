import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocLoading extends React.PureComponent<{}, {}> {
    render() {
        return  <div id="loading" className="container">
            <h3 className="s-title"><a href="#loading" className="anchor" aria-hidden="true">#</a>Loading</h3>
            <div className="docs-note">
                <p>Loading indicator is used for loading or updating. Also, you can add
                    the <code>loading</code> class to buttons for loading status.</p>
            </div>
            <div className="columns">
                <div className="column col-12 text-center">
                    <div className="loading"/>
                </div>
            </div>
            <div className="docs-note">
                <p>Add the <code>loading-lg</code> class for large size. </p>
            </div>
            <div className="columns">
                <div className="column col-12 text-center">
                    <div className="loading loading-lg"/>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- loading element --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"loading"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"loading loading-lg"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}