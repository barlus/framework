import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocDivider extends React.PureComponent<{}, {}> {
    render() {
        return <div id="divider" className="container">
            <h3 className="s-title"><a href="#divider" className="anchor" aria-hidden="true">#</a>Divider</h3>
            <div className="docs-note">
                <p>A Divider is used for separating elements.</p>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="divider"/>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in
                    vehicula sit amet, feugiat tempus tellus.
                    <div className="divider text-center" data-content="OR"/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in
                    vehicula sit amet, feugiat tempus tellus.
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <form>
                        <div className="form-group">
                            <label className="form-label" htmlFor="input-example-44">Email</label>
                            <input className="form-input" type="text" id="input-example-44"
                                   placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="input-example-22">Password</label>
                            <input className="form-input" type="password" id="input-example-22"
                                   placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label className="form-checkbox">
                                <input type="checkbox"/>
                                <i className="form-icon"/> Remember me
                            </label>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Sign in</button>
                        </div>
                    </form>
                </div>
                <div className="divider-vert" data-content="OR"/>
                <div className="column">
                    <form>
                        <div className="form-group">
                            <label className="form-label" htmlFor="input-example-33">Email</label>
                            <input className="form-input" type="text" id="input-example-33"
                                   placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Sign up</button>
                            <button className="btn btn-link btn-block">Learn more</button>
                        </div>
                    </form>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- divider element --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"divider"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}<span
                className="com">&lt;!-- divider element with text --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span className="atv">"divider text-center"</span> <span
                className="atn">data-content</span>=<span className="atv">"OR"</span>&gt;&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"\n"}<span className="com">&lt;!-- vertical divider element with text --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"columns"</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"column"</span>&gt;{"\n"}{"    "}<span
                    className="com">&lt;!-- column content --&gt;</span>{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"divider-vert"</span> <span
                    className="atn">data-content</span>=<span className="atv">"OR"</span>&gt;&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"column"</span>&gt;{"\n"}{"    "}<span
                    className="com">&lt;!-- column content --&gt;</span>{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}