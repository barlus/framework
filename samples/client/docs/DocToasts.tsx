import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocToasts extends React.PureComponent<{}, {}> {
    render() {
        return <div id="toasts" className="container">
            <h3 className="s-title"><a href="#toasts" className="anchor" aria-hidden="true">#</a>Toasts</h3>
            <div className="docs-note">
                <p>Toasts are used to show alert or information to users.</p>
            </div>
            <div className="columns">
                <div className="column col-9 col-sm-12">
                    <div className="toast">
                        <button className="btn btn-clear float-right"/>
                        <h6>Toast Title</h6>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                </div>
                <div className="column col-9 col-sm-12">
                    <div className="toast toast-primary">
                        <button className="btn btn-clear float-right"/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>toast</code> class. You can add any text within the
                    container,
                    and even icons. You may also add a close button with the <code>btn-clear</code> class if you
                    need.
                </p>
            </div>
            <div className="columns">
                <div className="column col-sm-12">
                    <div className="toast toast-success">
                        <button className="btn btn-clear float-right"/>
                        Toast success
                    </div>
                </div>
                <div className="column col-sm-12">
                    <div className="toast toast-warning">
                        <button className="btn btn-clear float-right"/>
                        Toast warning
                    </div>
                </div>
                <div className="column col-sm-12">
                    <div className="toast toast-error">
                        <button className="btn btn-clear float-right"/>
                        Toast error
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>And you can add the <code>toast-primary</code>, <code>toast-success</code>,
                    <code>toast-warning</code> or <code>toast-error</code> class for additional toast colors.
                </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"toast"</span>&gt;{"\n"}{"  "}Lorem ipsum dolor sit amet, consectetur adipiscing elit.{"\n"}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"\n"}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"toast toast-primary"</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">button</span> <span className="atn">class</span>=<span className="atv">"btn btn-clear float-right"</span>&gt;&lt;
                <span className="tag">/button</span>&gt;{"\n"}{"  "}Lorem ipsum dolor sit amet, consectetur adipiscing elit.{"\n"}&lt;
                <span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}