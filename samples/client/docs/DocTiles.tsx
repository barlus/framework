import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocTiles extends React.PureComponent<{}, {}> {
    render() {
        return <div id="tiles" className="container">
            <h3 className="s-title"><a href="#tiles" className="anchor" aria-hidden="true">#</a>Tiles</h3>
            <div className="docs-note">
                <p>Tiles are repeatable or embeddable information blocks.</p>
            </div>
            <div className="columns">
                <div className="column col-9 col-sm-12">
                    <div className="tile">
                        <div className="tile-icon">
                            <figure className="avatar avatar-lg">
                                <img src="https://picturepan2.github.io/spectre/img/avatar-3.png" alt="Avatar"/>
                            </figure>
                        </div>
                        <div className="tile-content">
                            <p className="tile-title">The Avengers</p>
                            <p className="tile-subtitle text-gray">Earth's Mightiest Heroes joined forces to
                                take on threats
                                that were too big for any one hero to tackle...</p>
                        </div>
                        <div className="tile-action">
                            <button className="btn btn-primary">Join</button>
                            <button className="btn">Contact</button>
                        </div>
                    </div>
                </div>
                <div className="column col-9 col-sm-12">
                    <div className="tile">
                        <div className="tile-icon">
                            <figure className="avatar avatar-lg">
                                <img src="https://picturepan2.github.io/spectre/img/avatar-2.png" alt="Avatar"/>
                            </figure>
                        </div>
                        <div className="tile-content">
                            <p className="tile-title">The S.H.I.E.L.D.</p>
                            <p className="tile-subtitle text-gray">The Strategic Homeland Intervention,
                                Enforcement, and
                                Logistics Division...</p>
                            <p>
                                <button className="btn btn-primary btn-sm">Join</button>
                                <button className="btn btn-sm">Contact</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container with the <code>tile</code> class. And add child elements with the
                    <code>tile-icon</code>, <code>tile-content</code> or/and <code>tile-action</code> classes.
                    The
                    <code>tile-icon</code> and <code>tile-action</code> are optional.</p>
                <p>There are <code>tile-title</code> and <code>tile-subtitle</code> classes for title and
                    subtitle text
                    styles.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"tile"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"tile-icon"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span
                className="atv">"example-tile-icon"</span>&gt;{"\n"}{"      "}&lt;<span className="tag">i</span> <span
                className="atn">class</span>=<span className="atv">"icon icon-file centered"</span>&gt;&lt;<span
                className="tag">/i</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"tile-content"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">p</span> <span className="atn">class</span>=<span
                    className="atv">"tile-title"</span>&gt;The Avengers&lt;<span
                    className="tag">/p</span>&gt;{"\n"}{"    "}&lt;<span className="tag">p</span> <span
                    className="atn">class</span>=<span
                    className="atv">"tile-subtitle text-gray"</span>&gt;Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...&lt;
                <span className="tag">/p</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"tile-action"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">button</span> <span className="atn">class</span>=<span className="atv">"btn btn-primary"</span>&gt;Join&lt;
                <span className="tag">/button</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
            <h4 id="tiles-compact" className="s-subtitle">Compact tiles</h4>
            <div className="docs-note">
                <p>There is compact version of Tiles component, which is often used as contact and file info
                    blocks.</p>
                <p>Add the <code>tile-centered</code> class to the container <code>tile</code>. The
                    <code>tile-icon</code>, <code>tile-content</code> and <code>tile-action</code> will be
                    vertically
                    centered.</p>
            </div>
            <div className="columns">
                <div className="column col-6 col-md-9 col-xs-12">
                    <div className="tile tile-centered">
                        <div className="tile-icon">
                            <div className="example-tile-icon">
                                <i className="icon icon-mail centered"/>
                            </div>
                        </div>
                        <div className="tile-content">
                            <div className="tile-title">spectre-docs.pdf</div>
                            <div className="tile-subtitle text-gray">14MB · Public · 1 Jan, 2017</div>
                        </div>
                        <div className="tile-action">
                            <button className="btn btn-link btn-action"><i className="icon icon-more-vert"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span
                className="atv">"tile tile-centered"</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"tile-icon"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"example-tile-icon"</span>&gt;{"\n"}{"      "}&lt;<span className="tag">i</span> <span
                className="atn">class</span>=<span className="atv">"icon icon-file centered"</span>&gt;&lt;<span
                className="tag">/i</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"tile-content"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"tile-title"</span>&gt;spectre-docs.pdf&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"tile-subtitle text-gray"</span>&gt;14MB · Public · 1 Jan, 2017&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"tile-action"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">button</span> <span className="atn">class</span>=<span className="atv">"btn btn-link"</span>&gt;{"\n"}{"      "}&lt;
                <span className="tag">i</span> <span className="atn">class</span>=<span className="atv">"icon icon-more-vert"</span>&gt;&lt;
                <span className="tag">/i</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/button</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}