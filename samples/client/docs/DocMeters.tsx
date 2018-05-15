import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocMeters extends React.PureComponent<{}, {}> {
    render() {
        return <div id="meters" className="container">
            <h3 className="s-title"><a href="#meters" className="anchor" aria-hidden="true">#</a>Meters</h3>
            <div className="docs-note">
                <p>Meters represent the value within the known range.</p>
            </div>
            <div className="columns">
                <div className="column col-3 col-xs-12">
                    <meter className="meter" value={20} min={0} max={100}/>
                </div>
                <div className="column col-3 col-xs-12">
                    <meter className="meter" value={60} min={0} low={30} optimum={60} high={80} max={100}/>
                </div>
                <div className="column col-3 col-xs-12">
                    <meter className="meter" value={85} min={0} low={30} high={80} max={100}/>
                </div>
                <div className="column col-3 col-xs-12">
                    <meter className="meter" value={20} min={0} low={30} optimum={90} high={80} max={100}/>
                </div>
            </div>
            <div className="docs-note">
                <p/>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- Meter is green when low &lt; value &lt; high --&gt;</span>{"\n"}&lt;
                <span className="tag">meter</span> <span className="atn">class</span>=<span
                    className="atv">"meter"</span> <span className="atn">value</span>=<span
                    className="atv">"20"</span> <span className="atn">min</span>=<span
                    className="atv">"0"</span> <span className="atn">max</span>=<span
                    className="atv">"100"</span>&gt;&lt;<span className="tag">/meter</span>&gt;{"\n"}&lt;<span
                    className="tag">meter</span> <span className="atn">class</span>=<span
                    className="atv">"meter"</span> <span className="atn">value</span>=<span
                    className="atv">"60"</span> <span className="atn">min</span>=<span
                    className="atv">"0"</span> <span className="atn">max</span>=<span
                    className="atv">"100"</span> <span className="atn">low</span>=<span
                    className="atv">"30"</span> <span className="atn">high</span>=<span
                    className="atv">"80"</span>&gt;&lt;<span className="tag">/meter</span>&gt;{"\n"}<span
                    className="com">&lt;!-- Meter is yellow when value &lt; low{"  "}or high &lt; value --&gt;</span>{"\n"}&lt;
                <span className="tag">meter</span> <span className="atn">class</span>=<span
                    className="atv">"meter"</span> <span className="atn">value</span>=<span
                    className="atv">"85"</span> <span className="atn">min</span>=<span
                    className="atv">"0"</span> <span className="atn">max</span>=<span
                    className="atv">"100"</span> <span className="atn">low</span>=<span
                    className="atv">"30"</span> <span className="atn">high</span>=<span
                    className="atv">"80"</span>&gt;&lt;<span className="tag">/meter</span>&gt;{"\n"}<span
                    className="com">&lt;!-- Meter is red when value &lt; low &lt; high &lt; optimum or optimum &lt; low &lt; high &lt; value --&gt;</span>{"\n"}&lt;
                <span className="tag">meter</span> <span className="atn">class</span>=<span
                    className="atv">"meter"</span> <span className="atn">value</span>=<span
                    className="atv">"20"</span> <span className="atn">optimum</span>=<span
                    className="atv">"90"</span> <span className="atn">min</span>=<span
                    className="atv">"0"</span> <span className="atn">max</span>=<span
                    className="atv">"100"</span> <span className="atn">low</span>=<span
                    className="atv">"30"</span> <span className="atn">high</span>=<span
                    className="atv">"80"</span>&gt;&lt;<span
                    className="tag">/meter</span>&gt;{"\n"}</code></pre>
        </div>
    }
}