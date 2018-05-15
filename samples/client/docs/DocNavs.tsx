import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocNavs extends React.PureComponent<{}, {}> {
    render() {
        return <div id="navs" className="container">
            <h3 className="s-title"><a href="#navs" className="anchor" aria-hidden="true">#</a>Navs</h3>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <ul className="nav">
                        <li className="nav-item">
                            <a href="#nav">Elements</a>
                        </li>
                        <li className="nav-item active">
                            <a href="#nav">Layout</a>
                            <ul className="nav">
                                <li className="nav-item">
                                    <a href="#nav">Flexbox grid</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#nav">Responsive</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#nav">Navbar</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#nav">Empty states</a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#nav">Components</a>
                        </li>
                        <li className="nav-item">
                            <a href="#nav">Utilities</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>nav</code> class. And add child elements with
                    the <code>nav-item</code>
                    class. The <code>nav-item</code> with the <code>active</code> class will be highlighted.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">ul</span> <span
                className="atn">class</span>=<span className="atv">"nav"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">li</span> <span className="atn">class</span>=<span
                className="atv">"nav-item"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                className="atn">href</span>=<span className="atv">"#"</span>&gt;Elements&lt;<span
                className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                className="atn">class</span>=<span
                className="atv">"nav-item active"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">a</span> <span className="atn">href</span>=<span
                className="atv">"#"</span>&gt;Layout&lt;<span className="tag">/a</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">ul</span> <span className="atn">class</span>=<span
                    className="atv">"nav"</span>&gt;{"\n"}{"      "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span
                    className="atv">"nav-item"</span>&gt;{"\n"}{"        "}&lt;<span
                    className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;Flexbox grid&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"      "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span
                    className="atv">"nav-item"</span>&gt;{"\n"}{"        "}&lt;<span
                    className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;Responsive&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"      "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span
                    className="atv">"nav-item"</span>&gt;{"\n"}{"        "}&lt;<span
                    className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;Navbar&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"      "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span
                    className="atv">"nav-item"</span>&gt;{"\n"}{"        "}&lt;<span
                    className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;Empty states&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/ul</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"nav-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;Components&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"nav-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;Utilities&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span className="tag">/li</span>&gt;{"\n"}&lt;
                <span className="tag">/ul</span>&gt;{"\n"}</code></pre>
        </div>
    }
}