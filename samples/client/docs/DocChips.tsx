import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocChips extends React.PureComponent<{}, {}> {
    render() {
        return <div id="chips" className="container">
            <h3 className="s-title"><a href="#chips" className="anchor" aria-hidden="true">#</a>Chips</h3>
            <div className="docs-note">
                <p>Chips are complex entities in small blocks. </p>
            </div>
            <div className="columns">
                <div className="column col-12">
                <span className="chip">
                  Crime
                </span>
                    <span className="chip">
                  Drama
                </span>
                    <span className="chip">
                  Biography
                  <a href="#" className="btn btn-clear" aria-label="Close" role="button"/>
                </span>
                    <span className="chip">
                  Mystery
                  <a href="#" className="btn btn-clear" aria-label="Close" role="button"/>
                </span>
                </div>
                <div className="column col-12">
                    <div className="chip">
                        <figure className="avatar avatar-sm" data-initial="TS"
                                style={{ backgroundColor: '#5755d9' }}/>
                        Tony Stark
                    </div>
                    <div className="chip">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                             className="avatar avatar-sm" alt="Thor Odinson"/>
                        Thor Odinson
                    </div>
                    <div className="chip">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                             className="avatar avatar-sm" alt="Steve Rogers"/>
                        Steve Rogers
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>chip</code> class. And add child text element, buttons
                    or
                    avatars with the <code>avatar</code> class.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span className="atv">"chip"</span>&gt;Crime&lt;<span
                className="tag">/span</span>&gt;{"\n"}{"\n"}&lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span
                className="atv">"chip"</span>&gt;{"\n"}{"  "}Biography{"\n"}{"  "}&lt;<span
                className="tag">a</span> <span className="atn">href</span>=<span
                className="atv">"#"</span> <span className="atn">class</span>=<span className="atv">"btn btn-clear"</span> <span
                className="atn">aria-label</span>=<span className="atv">"Close"</span> <span
                className="atn">role</span>=<span className="atv">"button"</span>&gt;&lt;<span
                className="tag">/a</span>&gt;{"\n"}&lt;<span className="tag">/span</span>&gt;{"\n"}{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"chip"</span>&gt;{"\n"}{"  "}&lt;<span className="tag">img</span> <span
                    className="atn">src</span>=<span className="atv">"img/avatar-1.png"</span> <span
                    className="atn">class</span>=<span className="atv">"avatar avatar-sm"</span>&gt;{"\n"}{"  "}Yan Zhu{"\n"}{"  "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span> <span className="atn">class</span>=<span className="atv">"btn btn-clear"</span> <span
                    className="atn">aria-label</span>=<span className="atv">"Close"</span> <span
                    className="atn">role</span>=<span className="atv">"button"</span>&gt;&lt;<span
                    className="tag">/a</span>&gt;{"\n"}&lt;<span
                    className="tag">/div</span>&gt;</code>{"\n"}</pre>
        </div>
    }
}