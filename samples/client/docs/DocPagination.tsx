import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocPagination extends React.PureComponent<{}, {}> {
    render() {
        return <div id="pagination" className="container">
            <h3 className="s-title"><a href="#pagination" className="anchor" aria-hidden="true">#</a>Pagination
            </h3>
            <div className="columns">
                <div className="column col-xs-12">
                    <ul className="pagination">
                        <li className="page-item">
                            <a href="#pagination">Prev</a>
                        </li>
                        <li className="page-item">
                            <a href="#pagination">1</a>
                        </li>
                        <li className="page-item">
                            <span>...</span>
                        </li>
                        <li className="page-item">
                            <a href="#pagination">4</a>
                        </li>
                        <li className="page-item active">
                            <a href="#pagination">5</a>
                        </li>
                        <li className="page-item">
                            <a href="#pagination">6</a>
                        </li>
                        <li className="page-item">
                            <span>...</span>
                        </li>
                        <li className="page-item">
                            <a href="#pagination">9</a>
                        </li>
                        <li className="page-item">
                            <a href="#pagination">Next</a>
                        </li>
                    </ul>
                </div>
                <div className="column col-xs-12">
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <a href="#pagination" tabIndex={-1}>Prev</a>
                        </li>
                        <li className="page-item active">
                            <a href="#pagination">1</a>
                        </li>
                        <li className="page-item">
                            <a href="#pagination">2</a>
                        </li>
                        <li className="page-item">
                            <a href="#pagination">3</a>
                        </li>
                        <li className="page-item">
                            <span>...</span>
                        </li>
                        <li className="page-item">
                            <a href="#pagination">9</a>
                        </li>
                        <li className="page-item">
                            <a href="#pagination">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>pagination</code> class. And add child elements with
                    the
                    <code>page-item</code> class. The <code>page-item</code> with the <code>active</code> class
                    will be
                    highlighted. You can add the <code>disabled</code> to the <code>page-item</code> to have
                    unclickable
                    page links. </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">ul</span> <span
                className="atn">class</span>=<span className="atv">"pagination"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">li</span> <span className="atn">class</span>=<span className="atv">"page-item disabled"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span> <span className="atn">tabindex</span>=<span
                    className="atv">"-1"</span>&gt;Previous&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span
                    className="atv">"page-item active"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;1&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"page-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;2&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"page-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;3&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"page-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">span</span>&gt;...&lt;<span
                    className="tag">/span</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"page-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;12&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"page-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;Next&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">/li</span>&gt;{"\n"}&lt;<span className="tag">/ul</span>&gt;{"\n"}</code></pre>
            <div className="columns">
                <div className="column col-12">
                    <ul className="pagination">
                        <li className="page-item page-prev">
                            <a href="#pagination">
                                <div className="page-item-subtitle">Previous</div>
                                <div className="page-item-title h5">Getting started</div>
                            </a>
                        </li>
                        <li className="page-item page-next">
                            <a href="#pagination">
                                <div className="page-item-subtitle">Next</div>
                                <div className="page-item-title h5">Layout</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="docs-note">
                <p>You could use previous and next pagination to navigate. </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">ul</span> <span
                className="atn">class</span>=<span className="atv">"pagination"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">li</span> <span className="atn">class</span>=<span className="atv">"page-item page-prev"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;{"\n"}{"      "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"page-item-subtitle"</span>&gt;Previous&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"      "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"page-item-title h5"</span>&gt;Getting started&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span
                    className="atv">"page-item page-next"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;{"\n"}{"      "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"page-item-subtitle"</span>&gt;Next&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"      "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"page-item-title h5"</span>&gt;Layout&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span className="tag">/li</span>&gt;{"\n"}&lt;
                <span className="tag">/ul</span>&gt;{"\n"}</code></pre>
        </div>
    }
}