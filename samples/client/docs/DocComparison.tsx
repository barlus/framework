import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocComparison extends React.PureComponent<{}, {}> {
    render() {
        return <div id="comparison" className="container">
            <h3 className="s-title"><a href="#comparison" className="anchor" aria-hidden="true">#</a>Comparison
                Sliders</h3>
            <div className="docs-note">
                <p>Comparison Sliders are sliders for comparing two images. It is built in pure CSS.</p>
            </div>
            <div className="columns">
                <div className="column col-12">
                    <div className="comparison-slider">
                        <figure className="comparison-before">
                            <img src="https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg"
                                 className="rounded" alt="macOS Sierra Wallpaper"/>
                            <div className="comparison-label">Before</div>
                        </figure>
                        <figure className="comparison-after">
                            <img src="https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg"
                                 className="filter-grayscale rounded" alt="macOS Sierra Wallpaper"/>
                            <div className="comparison-label">After</div>
                            <textarea className="comparison-resizer" readOnly defaultValue={""}/>
                        </figure>
                    </div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span
                className="atv">"comparison-slider"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">figure</span> <span className="atn">class</span>=<span
                className="atv">"comparison-before"</span>&gt;{"\n"}{"    "}<span className="com">&lt;!-- image (before) --&gt;</span>{"\n"}{"    "}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"comparison-label"</span>&gt;Before&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/figure</span>&gt;{"\n"}{"\n"}{"  "}&lt;<span className="tag">figure</span> <span
                    className="atn">class</span>=<span
                    className="atv">"comparison-after"</span>&gt;{"\n"}{"    "}<span className="com">&lt;!-- image (after) --&gt;</span>{"\n"}{"    "}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"comparison-label"</span>&gt;After&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">textarea</span> <span
                    className="atn">class</span>=<span className="atv">"comparison-resizer"</span> <span
                    className="atn">readonly</span>&gt;&lt;<span
                    className="tag">/textarea</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/figure</span>&gt;{"\n"}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}