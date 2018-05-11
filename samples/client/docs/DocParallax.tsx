import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocParallax extends React.PureComponent<{}, {}> {
    render() {
        return <div id="parallax" className="container">
            <h3 className="s-title"><a href="#parallax" className="anchor" aria-hidden="true">#</a>Parallax</h3>
            <div className="docs-note">
                <p>The Parallax acts like Apple TV/tvOS hover parallax effect. It is built in pure CSS.</p>
            </div>
            <div className="columns">
                <div className="column col-sm-12 col-8 col-mx-auto">
                    <div className="parallax">
                        <div className="parallax-top-left" tabIndex={1}/>
                        <div className="parallax-top-right" tabIndex={2}/>
                        <div className="parallax-bottom-left" tabIndex={3}/>
                        <div className="parallax-bottom-right" tabIndex={4}/>
                        <div className="parallax-content">
                            <div className="parallax-front">
                                <h2>tvOS parallax demo</h2>
                            </div>
                            <div className="parallax-back">
                                <img src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"
                                     className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"parallax"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"parallax-top-left"</span> <span className="atn">tabindex</span>=<span
                className="atv">"1"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"parallax-top-right"</span> <span className="atn">tabindex</span>=<span
                className="atv">"2"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"parallax-bottom-left"</span> <span className="atn">tabindex</span>=<span
                className="atv">"3"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"parallax-bottom-right"</span> <span className="atn">tabindex</span>=<span
                className="atv">"4"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"parallax-content"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span
                className="atv">"parallax-front"</span>&gt;{"\n"}{"      "}&lt;<span
                className="tag">h2</span>&gt;tvOS parallax demo&lt;<span
                className="tag">/h2</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span
                className="atv">"parallax-back"</span>&gt;{"\n"}{"      "}&lt;<span
                className="tag">img</span> <span className="atn">src</span>=<span
                className="atv">"img/osx-el-capitan.jpg"</span> <span className="atn">class</span>=<span
                className="atv">"img-responsive rounded"</span> ...&gt;{"\n"}{"    "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;
                <span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}