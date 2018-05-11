import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocFilters extends React.PureComponent<{}, {}> {
    render() {
        return <div id="filters" className="container">
            <h3 className="s-title"><a href="#filters" className="anchor" aria-hidden="true">#</a>Filters</h3>
            <div className="docs-note">
                <p>Filters are CSS only content filters.</p>
            </div>
            <div className="columns">
                <div className="column col-12">
                    <div className="filter">
                        <input type="radio" id="tag-0" className="filter-tag" name="filter-radio" hidden
                               defaultChecked/>
                        <input type="radio" id="tag-1" className="filter-tag" name="filter-radio" hidden/>
                        <input type="radio" id="tag-2" className="filter-tag" name="filter-radio" hidden/>
                        <input type="radio" id="tag-3" className="filter-tag" name="filter-radio" hidden/>
                        <input type="radio" id="tag-4" className="filter-tag" name="filter-radio" hidden/>
                        <div className="filter-nav">
                            <label className="chip" htmlFor="tag-0">All</label>
                            <label className="chip" htmlFor="tag-1">Action</label>
                            <label className="chip" htmlFor="tag-2">Roleplaying</label>
                            <label className="chip" htmlFor="tag-3">Shooter</label>
                            <label className="chip" htmlFor="tag-4">Sports</label>
                        </div>
                        <div className="filter-body columns">
                            <div className="column col-4 filter-item" data-tag="tag-2">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Fallout 4</div>
                                        <div className="card-subtitle">Roleplaying</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-3">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Halo 5</div>
                                        <div className="card-subtitle">Shooter</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-1">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Quantum Break</div>
                                        <div className="card-subtitle">Action</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-4">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Forza Horizon 3</div>
                                        <div className="card-subtitle">Sports</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-2">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Final Fantasy XV</div>
                                        <div className="card-subtitle">Roleplaying</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-4">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">NBA 2K17</div>
                                        <div className="card-subtitle">Sports</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-3">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Battlefield 1</div>
                                        <div className="card-subtitle">Shooter</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-1">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">GTA V</div>
                                        <div className="card-subtitle">Action</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-4">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">FIFA 17</div>
                                        <div className="card-subtitle">Sports</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-3">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Overwatch</div>
                                        <div className="card-subtitle">Shooter</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-3">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Titanfall 2</div>
                                        <div className="card-subtitle">Shooter</div>
                                    </div>
                                </div>
                            </div>
                            <div className="column col-4 filter-item" data-tag="tag-3">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Gears of Wars 4</div>
                                        <div className="card-subtitle">Shooter</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Filters use <code>tag-1</code> to <code>tag-8</code> to flag different
                    tags. <code>tag-0</code> is reserved for clearing filter (or showing all). You can
                    overwrite <code>$filter-number</code> in <code>_filters.scss</code> to have more filters.
                </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"filter"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">input</span> <span className="atn">type</span>=<span
                className="atv">"radio"</span> <span className="atn">id</span>=<span
                className="atv">"tag-0"</span> <span className="atn">class</span>=<span
                className="atv">"filter-tag"</span> <span className="atn">name</span>=<span
                className="atv">"filter-radio"</span> <span className="atn">hidden</span> <span
                className="atn">checked</span>&gt;{"\n"}{"  "}&lt;<span className="tag">input</span> <span
                className="atn">type</span>=<span className="atv">"radio"</span> <span className="atn">id</span>=<span
                className="atv">"tag-1"</span> <span className="atn">class</span>=<span
                className="atv">"filter-tag"</span> <span className="atn">name</span>=<span
                className="atv">"filter-radio"</span> <span className="atn">hidden</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">input</span> <span className="atn">type</span>=<span
                    className="atv">"radio"</span> <span className="atn">id</span>=<span
                    className="atv">"tag-2"</span> <span className="atn">class</span>=<span
                    className="atv">"filter-tag"</span> <span className="atn">name</span>=<span
                    className="atv">"filter-radio"</span> <span
                    className="atn">hidden</span>&gt;{"\n"}{"\n"}{"  "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"filter-nav"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">label</span> <span
                    className="atn">class</span>=<span className="atv">"chip"</span> <span
                    className="atn">for</span>=<span className="atv">"tag-0"</span>&gt;All&lt;<span
                    className="tag">/label</span>&gt;{"\n"}{"    "}&lt;<span className="tag">label</span> <span
                    className="atn">class</span>=<span className="atv">"chip"</span> <span
                    className="atn">for</span>=<span className="atv">"tag-1"</span>&gt;Action&lt;<span
                    className="tag">/label</span>&gt;{"\n"}{"    "}&lt;<span className="tag">label</span> <span
                    className="atn">class</span>=<span className="atv">"chip"</span> <span
                    className="atn">for</span>=<span className="atv">"tag-2"</span>&gt;Roleplaying&lt;<span
                    className="tag">/label</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"filter-body"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span className="atv">"filter-item card"</span> <span
                    className="atn">data-tag</span>=<span
                    className="atv">"tag-1"</span>&gt;{"\n"}{"      "}<span className="com">&lt;!-- Filter item content --&gt;</span>{"\n"}{"    "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"filter-item card"</span> <span
                    className="atn">data-tag</span>=<span
                    className="atv">"tag-2"</span>&gt;{"\n"}{"      "}<span className="com">&lt;!-- Filter item content --&gt;</span>{"\n"}{"    "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"    "}<span
                    className="com">&lt;!-- Filter items --&gt;</span>{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}