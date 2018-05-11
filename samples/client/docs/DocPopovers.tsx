import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocPopovers extends React.PureComponent<{}, {}> {
    render() {
        return <div id="popovers" className="container">
            <h3 className="s-title"><a href="#popovers" className="anchor" aria-hidden="true">#</a>Popovers</h3>
            <div className="docs-note">
                <p>Popovers are small overlay content containers. Popovers component is built entirely in
                    CSS.</p>
            </div>
            <div className="columns">
                <div className="column col-3 col-sm-6">
                    <div className="popover">
                        <a href="#popovers" className="btn btn-primary">
                            top popover
                        </a>
                        <div className="popover-container">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title h5">Apple</div>
                                    <div className="card-subtitle text-gray">Software and hardware</div>
                                </div>
                                <div className="card-body">
                                    To make a contribution to the world by making tools for the mind that
                                    advance
                                    humankind.
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary">Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column col-3 col-sm-6">
                    <div className="popover popover-right">
                        <a href="#popovers" className="btn btn-primary">
                            right popover
                        </a>
                        <div className="popover-container">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title h5">Apple</div>
                                    <div className="card-subtitle text-gray">Software and hardware</div>
                                </div>
                                <div className="card-body">
                                    To make a contribution to the world by making tools for the mind that
                                    advance
                                    humankind.
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary">Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column col-3 col-sm-6">
                    <div className="popover popover-bottom">
                        <a href="#popovers" className="btn btn-primary">
                            bottom popover
                        </a>
                        <div className="popover-container">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title h5">Apple</div>
                                    <div className="card-subtitle text-gray">Software and hardware</div>
                                </div>
                                <div className="card-body">
                                    To make a contribution to the world by making tools for the mind that
                                    advance
                                    humankind.
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary">Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column col-3 col-sm-6">
                    <div className="popover popover-left">
                        <a href="#popovers" className="btn btn-primary">
                            left popover
                        </a>
                        <div className="popover-container">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title h5">Apple</div>
                                    <div className="card-subtitle text-gray">Software and hardware</div>
                                </div>
                                <div className="card-body">
                                    To make a contribution to the world by making tools for the mind that
                                    advance
                                    humankind.
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary">Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Wrap an element by a container with the <code>popover</code> class. And add a container with
                    the
                    <code>popover-container</code> next to the element. You can use <a
                        href="#cards">Cards</a> component
                    inside the <code>popover-container</code>. </p>
                <p>Also, you can add the <code>popover-right</code>, <code>popover-bottom</code> or
                    <code>popover-left</code> class to define the position. By default, the popovers appear
                    above the
                    element.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span
                className="atv">"popover popover-right"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">button</span> <span className="atn">class</span>=<span className="atv">"btn btn-primary"</span>&gt;right popover&lt;
                <span className="tag">/button</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"popover-container"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"card"</span>&gt;{"\n"}{"      "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"card-header"</span>&gt;{"\n"}{"        "}...{"\n"}{"      "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"      "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"card-body"</span>&gt;{"\n"}{"        "}...{"\n"}{"      "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"      "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"card-footer"</span>&gt;{"\n"}{"        "}...{"\n"}{"      "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}