import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocGrid extends React.PureComponent<{}, {}> {
    render() {
        return <div id="grid" className="container">
            <h3 className="s-title"><a href="#grid" className="anchor" aria-hidden="true">#</a>Flexbox grid</h3>
            <div className="docs-note">
                <p>Layout includes flexbox based responsive grid system with 12 columns. </p>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
                <div className="column">
                    <div className="bg-primary text-secondary docs-block"/>
                </div>
            </div>
            <div className="columns">
                <div className="column col-12">
                    <div className="bg-gray docs-block">col-12 (100%)</div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-9">
                    <div className="bg-gray docs-block">col-9 (75%)</div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-6">
                    <div className="bg-gray docs-block">col-6 (50%)</div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-3">
                    <div className="bg-gray docs-block">col-3 (25%)</div>
                </div>
            </div>
            <div className="docs-note">
                <p>Add the <code>columns</code> class to a container with the <code>container</code> class. And
                    add any element you want with the <code>column</code> class inside the container. These
                    columns will take up the space equally. You can specific the width of each column by adding
                    class <code>col-[1-12]</code>.</p>
                <p>And you can add the <code>col-gapless</code> class to the <code>columns</code> to have
                    gapless columns.</p>
            </div>
            <div className="columns col-gapless">
                <div className="column col-6">
                    <div className="bg-gray docs-block">col-6 (gapless)</div>
                </div>
                <div className="column col-6">
                    <div className="bg-gray docs-block">col-6 (gapless)</div>
                </div>
            </div>
            <div className="docs-note">
                <p>By default, Spectre grid has multi-line flexbox enabled. You can add
                    the <code>col-oneline</code> class to <code>columns</code> to make all its child columns
                    positioned in the same single row.</p>
            </div>
            <div className="columns col-oneline">
                <div className="column col-8">
                    <div className="bg-gray docs-block">col-8</div>
                </div>
                <div className="column col-8">
                    <div className="bg-gray docs-block">col-8</div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"container"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"columns"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-6"</span>&gt;col-6&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-3"</span>&gt;col-3&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-2"</span>&gt;col-2&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-1"</span>&gt;col-1&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span
                className="atv">"columns col-gapless"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span className="atv">"column col-6"</span>&gt;col-6&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"column col-6"</span>&gt;col-6&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"columns col-oneline"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span className="atv">"column col-8"</span>&gt;col-8&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"column col-8"</span>&gt;col-8&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
            <h4 id="grid-offset" className="s-subtitle">Grid offset</h4>
            <div className="docs-note">
                <p>The Flexbox grid provides margin auto utilities to set offset. There
                    are <code>col-mx-auto</code>, <code>col-ml-auto</code> and <code>col-mr-auto</code> to set
                    margins between columns without using empty columns.</p>
            </div>
            <div className="columns">
                <div className="column col-2">
                    <div className="bg-gray docs-block">col-2</div>
                </div>
                <div className="column col-4 col-mx-auto">
                    <div className="bg-gray docs-block">col-4 col-mx-auto</div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-2">
                    <div className="bg-gray docs-block">col-2</div>
                </div>
                <div className="column col-4 col-ml-auto">
                    <div className="bg-gray docs-block">col-4 col-ml-auto</div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-4 col-ml-auto">
                    <div className="bg-gray docs-block">col-4 col-ml-auto</div>
                </div>
                <div className="column col-2">
                    <div className="bg-gray docs-block">col-2</div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-4 col-mx-auto">
                    <div className="bg-gray docs-block">col-4 col-mx-auto</div>
                </div>
                <div className="column col-2">
                    <div className="bg-gray docs-block">col-2</div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-4 col-mr-auto">
                    <div className="bg-gray docs-block">col-4 col-mr-auto</div>
                </div>
                <div className="column col-2">
                    <div className="bg-gray docs-block">col-2</div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-4 col-mx-auto">
                    <div className="bg-gray docs-block">col-4 col-mx-auto</div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"container"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"columns"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-4 col-mr-auto"</span>&gt;col-4 col-mr-auto&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"column col-2"</span>&gt;col-2&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
            <h4 id="grid-nesting" className="s-subtitle">Grid nesting</h4>
            <div className="docs-note">
                <p>To nest grids, add the new <code>columns</code> and <code>column</code> structure within an
                    existing column.</p>
            </div>
            <div className="columns">
                <div className="column col-6">
                    <div className="bg-gray docs-block">col-6</div>
                    <div className="columns">
                        <div className="column col-6">
                            <div className="bg-primary docs-block">col-6</div>
                        </div>
                        <div className="column col-6">
                            <div className="bg-primary docs-block">col-6</div>
                        </div>
                    </div>
                </div>
                <div className="column col-6">
                    <div className="bg-gray docs-block">col-6</div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"container"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"columns"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span
                className="atv">"column col-6"</span>&gt;col-6{"\n"}{"      "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"columns"</span>&gt;{"\n"}{"        "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-6"</span>&gt;col-6&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"        "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-6"</span>&gt;col-6&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"      "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-6"</span>&gt;col-6&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;
                <span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}