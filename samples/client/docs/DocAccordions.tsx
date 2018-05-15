import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocAccordions extends React.PureComponent<{}, {}> {
    render() {
        return <div id="accordions" className="container">
            <h3 className="s-title"><a href="#accordions" className="anchor" aria-hidden="true">#</a>Accordions
            </h3>
            <div className="docs-note">
                <p>Accordions are used to toggle sections of content.</p>
            </div>
            <div className="columns">
                <div className="column col-6 col-md-12">
                    <div className="accordion">
                        <input type="radio" id="accordion-1" name="accordion-radio" hidden defaultChecked/>
                        <label className="accordion-header c-hand" htmlFor="accordion-1">
                            <i className="icon icon-arrow-right mr-1"/>
                            Elements
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Element 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Element 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="accordion">
                        <input type="radio" id="accordion-2" name="accordion-radio" hidden/>
                        <label className="accordion-header c-hand" htmlFor="accordion-2">
                            <i className="icon icon-arrow-right mr-1"/>
                            Layout
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Layout 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Layout 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="accordion">
                        <input type="radio" id="accordion-3" name="accordion-radio" hidden/>
                        <label className="accordion-header c-hand" htmlFor="accordion-3">
                            <i className="icon icon-arrow-right mr-1"/>
                            Components
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Component 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Component 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="column col-6 col-md-12">
                    <div className="accordion">
                        <input type="checkbox" id="accordion-4" name="accordion-checkbox" hidden
                               defaultChecked/>
                        <label className="accordion-header c-hand" htmlFor="accordion-4">
                            Elements
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Element 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Element 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="accordion">
                        <input type="checkbox" id="accordion-5" name="accordion-checkbox" hidden/>
                        <label className="accordion-header c-hand" htmlFor="accordion-5">
                            Layout
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Layout 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Layout 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="accordion">
                        <input type="checkbox" id="accordion-6" name="accordion-checkbox" hidden/>
                        <label className="accordion-header c-hand" htmlFor="accordion-6">
                            Components
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Component 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Component 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code><span className="com">&lt;!-- standard Accordions example --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"accordion"</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">input</span> <span className="atn">type</span>=<span
                    className="atv">"checkbox"</span> <span className="atn">id</span>=<span
                    className="atv">"accordion-1"</span> <span className="atn">name</span>=<span
                    className="atv">"accordion-checkbox"</span> <span
                    className="atn">hidden</span>&gt;{"\n"}{"  "}&lt;<span className="tag">label</span> <span
                    className="atn">class</span>=<span
                    className="atv">"accordion-header"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">i</span> <span className="atn">class</span>=<span className="atv">"icon icon-arrow-right mr-1"</span>&gt;&lt;
                <span className="tag">/i</span>&gt;{"\n"}{"    "}Title{"\n"}{"  "}&lt;<span
                    className="tag">/label</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"accordion-body"</span>&gt;{"\n"}{"    "}<span
                    className="com">&lt;!-- Accordions content --&gt;</span>{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"\n"}<span className="com">&lt;!-- mutually exclusive Accordions example (with same input names) --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"accordion"</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">input</span> <span className="atn">type</span>=<span
                    className="atv">"radio"</span> <span className="atn">id</span>=<span
                    className="atv">"accordion-1"</span> <span className="atn">name</span>=<span
                    className="atv">"accordion-radio"</span> <span
                    className="atn">hidden</span>&gt;{"\n"}{"  "}&lt;<span className="tag">label</span> <span
                    className="atn">class</span>=<span
                    className="atv">"accordion-header"</span>&gt;{"\n"}{"    "}Title{"\n"}{"  "}&lt;<span
                    className="tag">/label</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"accordion-body"</span>&gt;{"\n"}{"    "}<span
                    className="com">&lt;!-- Accordions content --&gt;</span>{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
            <div className="docs-note">
                <p>Alternatively, you can use <code>details</code> and <code>summary</code> instead of
                    <code>input</code> radio or checkbox trick. Add the <code>open</code> attribute to
                    <code>details</code> to expand it. Microsoft Edge support is <a
                        href="https://developer.microsoft.com/en-us/microsoft-edge/platform/status/detailssummary/"
                        target="_blank">in development</a>.</p>
            </div>
            <pre className="code" data-lang="HTML"><code><span className="com">&lt;!-- details and summary Accordions example --&gt;</span>{"\n"}&lt;
                <span className="tag">details</span> <span className="atn">class</span>=<span
                    className="atv">"accordion"</span> <span className="atn">open</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">summary</span> <span className="atn">class</span>=<span
                    className="atv">"accordion-header"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">i</span> <span className="atn">class</span>=<span className="atv">"icon icon-arrow-right mr-1"</span>&gt;&lt;
                <span className="tag">/i</span>&gt;{"\n"}{"    "}Title{"\n"}{"  "}&lt;<span
                    className="tag">/summary</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"accordion-body"</span>&gt;{"\n"}{"    "}<span
                    className="com">&lt;!-- Accordions content --&gt;</span>{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">/details</span>&gt;{"\n"}</code></pre>
        </div>
    }
}