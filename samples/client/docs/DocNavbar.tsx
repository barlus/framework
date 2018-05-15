import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocNavbar extends React.PureComponent<{}, {}> {
    render() {
        return <div id="navbar" className="container">
            <h3 className="s-title"><a href="#navbar" className="anchor" aria-hidden="true">#</a>Navbar</h3>
            <div className="docs-note">
                <p>Navbar is a layout container that appears in the header of apps and websites. </p>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="navbar">
                        <div className="navbar-section">
                            <a href="#navbar" className="navbar-brand mr-2">Spectre.css</a>
                            <a href="#navbar" className="btn btn-link">Docs</a>
                            <a href="https://github.com/picturepan2/spectre" className="btn btn-link">GitHub</a>
                        </div>
                        <div className="navbar-section">
                            <div className="input-group input-inline">
                                <input className="form-input" type="text" placeholder="search"/>
                                <button className="btn btn-primary input-group-btn">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>The navbar component can include logo brand, nav links and buttons, search box or any
                    combination of those elements. Each section with the <code>navbar-section</code> class will
                    be evenly distributed in the container.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">header</span> <span
                className="atn">class</span>=<span className="atv">"navbar"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">section</span> <span className="atn">class</span>=<span
                className="atv">"navbar-section"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">a</span> <span className="atn">href</span>=<span
                className="atv">"#"</span> <span className="atn">class</span>=<span className="atv">"navbar-brand mr-2"</span>&gt;Spectre.css&lt;
                <span className="tag">/a</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                    className="atn">href</span>=<span className="atv">"#"</span> <span
                    className="atn">class</span>=<span className="atv">"btn btn-link"</span>&gt;Docs&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                    className="atn">href</span>=<span
                    className="atv">"https://github.com/picturepan2/spectre"</span> <span
                    className="atn">class</span>=<span className="atv">"btn btn-link"</span>&gt;GitHub&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/section</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">section</span> <span className="atn">class</span>=<span
                    className="atv">"navbar-section"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span className="atv">"input-group input-inline"</span>&gt;{"\n"}{"      "}&lt;
                <span className="tag">input</span> <span className="atn">class</span>=<span
                    className="atv">"form-input"</span> <span className="atn">type</span>=<span
                    className="atv">"text"</span> <span className="atn">placeholder</span>=<span
                    className="atv">"search"</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">button</span> <span className="atn">class</span>=<span className="atv">"btn btn-primary input-group-btn"</span>&gt;Search&lt;
                <span className="tag">/button</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/section</span>&gt;{"\n"}&lt;<span className="tag">/header</span>&gt;{"\n"}</code></pre>
            <div className="docs-note">
                <p>You can use <code>navbar-center</code> class to have a centered section.</p>
            </div>
            <div className="columns">
                <div className="column col-12">
                    <div className="navbar">
                        <div className="navbar-section">
                            <a href="#navbar" className="btn btn-link">Docs</a>
                            <a href="#navbar" className="btn btn-link">Examples</a>
                        </div>
                        <div className="navbar-center">
                            <img src="https://picturepan2.github.io/spectre/img/spectre-logo.svg"
                                 alt="Spectre.css"/>
                        </div>
                        <div className="navbar-section">
                            <a href="https://twitter.com/spectrecss" className="btn btn-link">Twitter</a>
                            <a href="https://github.com/picturepan2/spectre" className="btn btn-link">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">header</span> <span
                className="atn">class</span>=<span className="atv">"navbar"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">section</span> <span className="atn">class</span>=<span
                className="atv">"navbar-section"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">a</span> <span className="atn">href</span>=<span
                className="atv">"#"</span> <span className="atn">class</span>=<span className="atv">"btn btn-link"</span>&gt;Docs&lt;
                <span className="tag">/a</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                    className="atn">href</span>=<span className="atv">"#"</span> <span
                    className="atn">class</span>=<span className="atv">"btn btn-link"</span>&gt;Examples&lt;
                <span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/section</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">section</span> <span className="atn">class</span>=<span
                    className="atv">"navbar-center"</span>&gt;{"\n"}{"    "}<span className="com">&lt;!-- centered logo or brand --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">/section</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">section</span> <span className="atn">class</span>=<span
                    className="atv">"navbar-section"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                    className="atn">href</span>=<span className="atv">"#"</span> <span
                    className="atn">class</span>=<span className="atv">"btn btn-link"</span>&gt;Twitter&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                    className="atn">href</span>=<span className="atv">"#"</span> <span
                    className="atn">class</span>=<span className="atv">"btn btn-link"</span>&gt;GitHub&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/section</span>&gt;{"\n"}&lt;<span className="tag">/header</span>&gt;{"\n"}</code></pre>
        </div>
    }
}