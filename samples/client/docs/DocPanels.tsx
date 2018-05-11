import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocPanels extends React.PureComponent<{}, {}> {
    render() {
        return <div id="panels" className="container">
            <h3 className="s-title"><a href="#panels" className="anchor" aria-hidden="true">#</a>Panels</h3>
            <div className="docs-note">
                <p>Panels are flexible view container with auto-expand content section.</p>
            </div>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <div className="panel">
                        <div className="panel-header text-center">
                            <figure className="avatar avatar-lg">
                                <img src="https://picturepan2.github.io/spectre/img/avatar-2.png" alt="Avatar"/>
                            </figure>
                            <div className="panel-title h5 mt-10">Bruce Banner</div>
                            <div className="panel-subtitle">THE HULK</div>
                        </div>
                        <nav className="panel-nav">
                            <ul className="tab tab-block">
                                <li className="tab-item active">
                                    <a href="#panels">
                                        Profile
                                    </a>
                                </li>
                                <li className="tab-item">
                                    <a href="#panels">
                                        Files
                                    </a>
                                </li>
                                <li className="tab-item">
                                    <a href="#panels">
                                        Tasks
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="panel-body">
                            <div className="tile tile-centered">
                                <div className="tile-content">
                                    <div className="tile-title">E-mail</div>
                                    <div className="tile-subtitle">bruce.banner@hulk.com</div>
                                </div>
                                <div className="tile-action">
                                    <button className="btn btn-link btn-action btn-lg"><i
                                        className="icon icon-edit"/>
                                    </button>
                                </div>
                            </div>
                            <div className="tile tile-centered">
                                <div className="tile-content">
                                    <div className="tile-title">Skype</div>
                                    <div className="tile-subtitle">bruce.banner</div>
                                </div>
                                <div className="tile-action">
                                    <button className="btn btn-link btn-action btn-lg"><i
                                        className="icon icon-edit"/>
                                    </button>
                                </div>
                            </div>
                            <div className="tile tile-centered">
                                <div className="tile-content">
                                    <div className="tile-title">Location</div>
                                    <div className="tile-subtitle">Dayton, Ohio</div>
                                </div>
                                <div className="tile-action">
                                    <button className="btn btn-link btn-action btn-lg"><i
                                        className="icon icon-edit"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer">
                            <button className="btn btn-primary btn-block">Save</button>
                        </div>
                    </div>
                </div>
                <div className="column col-6 col-xs-12">
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title h6">Comments</div>
                        </div>
                        <div className="panel-body">
                            <div className="tile">
                                <div className="tile-icon">
                                    <figure className="avatar">
                                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                                             alt="Avatar"/>
                                    </figure>
                                </div>
                                <div className="tile-content">
                                    <p className="tile-title">Thor Odinson</p>
                                    <p className="tile-subtitle">Earth's Mightiest Heroes joined forces to take
                                        on threats
                                        that were too big for any one hero to tackle...</p>
                                </div>
                            </div>
                            <div className="tile">
                                <div className="tile-icon">
                                    <figure className="avatar">
                                        <img src="https://picturepan2.github.io/spectre/img/avatar-2.png"
                                             alt="Avatar"/>
                                    </figure>
                                </div>
                                <div className="tile-content">
                                    <p className="tile-title">Bruce Banner</p>
                                    <p className="tile-subtitle">The Strategic Homeland Intervention,
                                        Enforcement, and
                                        Logistics Division...</p>
                                </div>
                            </div>
                            <div className="tile">
                                <div className="tile-icon">
                                    <figure className="avatar" data-initial="TS"/>
                                </div>
                                <div className="tile-content">
                                    <p className="tile-title">Tony Stark</p>
                                    <p className="tile-subtitle">Earth's Mightiest Heroes joined forces to take
                                        on threats
                                        that were too big for any one hero to tackle...</p>
                                </div>
                            </div>
                            <div className="tile">
                                <div className="tile-icon">
                                    <figure className="avatar">
                                        <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                                             alt="Avatar"/>
                                    </figure>
                                </div>
                                <div className="tile-content">
                                    <p className="tile-title">Steve Rogers</p>
                                    <p className="tile-subtitle">The Strategic Homeland Intervention,
                                        Enforcement, and
                                        Logistics Division...</p>
                                </div>
                            </div>
                            <div className="tile">
                                <div className="tile-icon">
                                    <figure className="avatar">
                                        <img src="https://picturepan2.github.io/spectre/img/avatar-3.png"
                                             alt="Avatar"/>
                                    </figure>
                                </div>
                                <div className="tile-content">
                                    <p className="tile-title">Natasha Romanoff</p>
                                    <p className="tile-subtitle">Earth's Mightiest Heroes joined forces to take
                                        on threats
                                        that were too big for any one hero to tackle...</p>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer">
                            <div className="input-group">
                                <input type="text" className="form-input" placeholder="Hello"/>
                                <button className="btn btn-primary input-group-btn">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>panel</code> class. And add child elements with
                    the <code>panel-header</code>,
                    <code>panel-nav</code>, <code>panel-body</code> and/or <code>panel-footer</code> class.
                    The <code>panel-body</code>
                    can be auto expanded and vertically scrollable. </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"panel"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"panel-header"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"panel-title"</span>&gt;Comments&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"panel-nav"</span>&gt;{"\n"}{"    "}<span
                className="com">&lt;!-- navigation components: tabs, breadcrumbs or pagination --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"panel-body"</span>&gt;{"\n"}{"    "}<span className="com">&lt;!-- contents --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"panel-footer"</span>&gt;{"\n"}{"    "}<span className="com">&lt;!-- buttons or inputs --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}