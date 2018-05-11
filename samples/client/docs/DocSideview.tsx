import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocSideview extends React.PureComponent<{}, {}> {
    render() {
        return <div id="off-canvas" className="container">
            <h3 className="s-title"><a href="#off-canvas" className="anchor" aria-hidden="true">#</a>Off-canvas
            </h3>
            <div className="docs-note">
                <p>The Off-canvas is a navigation layout that the sidebar can slide in and out of the viewport.
                    It is built in pure CSS. </p>
                <p>By default, the off-canvas menu is collapsed whenever the window width is. But you can add
                    the <code>off-canvas-sidebar-show</code> class to the <code>off-canvas</code> to make the
                    sidebar expanded when the window width is larger than or equal to <strong>960px</strong>.
                </p>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="off-canvas off-canvas-sidebar-show">
                        <a className="off-canvas-toggle btn btn-primary btn-action" href="#sidebar-demo">
                            <i className="icon icon-menu"/>
                        </a>
                        <div id="sidebar-demo" className="off-canvas-sidebar flex-centered">
                            <span>Sidebar</span>
                        </div>
                        <a className="off-canvas-overlay" href="#close"/>
                        <div className="off-canvas-content">
                            <div className="content">
                                <h4>Lorem ipsum</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo,
                                    dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales risus.
                                    Etiam euismod ornare consequat.</p>
                                <p>Climb leg rub face on everything give attitude nap all day for under the bed.
                                    Chase mice attack feet but rub face on everything hopped up on
                                    goofballs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>You can open the sidebar by adding the
                    class <code>active</code> to <code>off-canvas-sidebar</code>. And remove
                    the <code>active</code> to close it.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"off-canvas"</span>&gt;{"\n"}{"  "}<span
                className="com">&lt;!-- off-screen toggle button --&gt;</span>{"\n"}{"  "}&lt;<span
                className="tag">a</span> <span className="atn">class</span>=<span className="atv">"off-canvas-toggle btn btn-primary btn-action"</span> <span
                className="atn">href</span>=<span className="atv">"#sidebar-id"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">i</span> <span className="atn">class</span>=<span className="atv">"icon icon-menu"</span>&gt;&lt;
                <span className="tag">/i</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">id</span>=<span className="atv">"sidebar-id"</span> <span
                    className="atn">class</span>=<span
                    className="atv">"off-canvas-sidebar"</span>&gt;{"\n"}{"    "}<span className="com">&lt;!-- off-screen sidebar --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"\n"}{"  "}&lt;<span className="tag">a</span> <span
                    className="atn">class</span>=<span className="atv">"off-canvas-overlay"</span> <span
                    className="atn">href</span>=<span className="atv">"#close"</span>&gt;&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"off-canvas-content"</span>&gt;{"\n"}{"    "}<span className="com">&lt;!-- off-screen content --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}