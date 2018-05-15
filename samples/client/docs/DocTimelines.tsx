import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocTimelines extends React.PureComponent<{}, {}> {
    render() {
        return <div id="timelines" className="container">
            <h3 className="s-title"><a href="#timelines" className="anchor" aria-hidden="true">#</a>Timelines
            </h3>
            <div className="docs-note">
                <p>Timelines are ordered sequences of activities.</p>
            </div>
            <div className="columns">
                <div className="column col-9 col-sm-12">
                    <div className="timeline">
                        <div className="timeline-item" id="timeline-example-1">
                            <div className="timeline-left">
                                <a href="#timeline-example-1" className="timeline-icon tooltip"
                                   data-tooltip="March 2016"/>
                            </div>
                            <div className="timeline-content">
                                <div className="tile">
                                    <div className="tile-content">
                                        <p className="tile-subtitle">March 2016</p>
                                        <p className="tile-title">Initial commit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item" id="timeline-example-2">
                            <div className="timeline-left">
                                <a href="#timeline-example-2" className="timeline-icon icon-lg tooltip"
                                   data-tooltip="February 2017">
                                    <i className="icon icon-check"/>
                                </a>
                            </div>
                            <div className="timeline-content">
                                <div className="tile">
                                    <div className="tile-content">
                                        <p className="tile-subtitle">February 2017</p>
                                        <p className="tile-title">New Documents experience</p>
                                        <p className="tile-title"><a href="#bars">Bars</a>: represent the
                                            progress of a task</p>
                                        <p className="tile-title"><a href="#steps">Steps</a>: progress
                                            indicators of a sequence of task steps</p>
                                        <p className="tile-title"><a href="#tiles">Tiles</a>: repeatable or
                                            embeddable information blocks</p>
                                    </div>
                                    <div className="tile-action">
                                        <button className="btn">View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item" id="timeline-example-3">
                            <div className="timeline-left">
                                <a href="#timeline-example-3" className="timeline-icon icon-lg tooltip"
                                   data-tooltip="March 2017">
                                    <i className="icon icon-check"/>
                                </a>
                            </div>
                            <div className="timeline-content">
                                <div className="tile">
                                    <div className="tile-content">
                                        <p className="tile-subtitle">March 2017</p>
                                        <p className="tile-title"><a href="#icons">Icons</a>: single-element,
                                            responsive and pure CSS icons</p>
                                        <p className="tile-title"><a href="#popovers">Popovers</a>: small
                                            overlay content containers</p>
                                        <p className="tile-title"><a href="#calendars">Calendars</a>: date or
                                            date range picker and events display</p>
                                        <p className="tile-title"><a href="#carousels">Carousels</a>: slideshows
                                            for cycling images</p>
                                    </div>
                                    <div className="tile-action">
                                        <button className="btn">View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"timeline"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"timeline-item"</span> <span className="atn">id</span>=<span
                className="atv">"timeline-example-1"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"timeline-left"</span>&gt;{"\n"}{"      "}&lt;<span
                className="tag">a</span> <span className="atn">class</span>=<span
                className="atv">"timeline-icon"</span> <span className="atn">href</span>=<span
                className="atv">"#timeline-example-1"</span>&gt;&lt;<span
                className="tag">/a</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"timeline-content"</span>&gt;{"\n"}{"      "}<span
                className="com">&lt;!-- tiles structure --&gt;</span>{"\n"}{"    "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"timeline-item"</span> <span
                className="atn">id</span>=<span
                className="atv">"timeline-example-2"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"timeline-left"</span>&gt;{"\n"}{"      "}&lt;<span
                className="tag">a</span> <span className="atn">class</span>=<span className="atv">"timeline-icon icon-lg"</span> <span
                className="atn">href</span>=<span
                className="atv">"#timeline-example-2"</span>&gt;{"\n"}{"        "}&lt;<span
                className="tag">i</span> <span className="atn">class</span>=<span className="atv">"icon icon-check"</span>&gt;&lt;
                <span className="tag">/i</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"timeline-content"</span>&gt;{"\n"}{"      "}<span className="com">&lt;!-- tiles structure --&gt;</span>{"\n"}{"    "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}...{"\n"}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}