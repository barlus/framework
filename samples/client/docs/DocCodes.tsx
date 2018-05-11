import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocCodes extends React.PureComponent<{}, {}> {
    render() {
        return <div id="codes" className="container">
            <h3 className="s-title"><a href="#codes" className="anchor" aria-hidden="true">#</a>Codes</h3>
            <div className="docs-note">
                <p>Codes are inline and multiline code snippets.</p>
                <p>For inline code, you can use the element <code>&lt;code&gt;</code>. For multiline code
                    snippet
                    blocks, you can use &lt;pre&gt; with the <code>code</code> class as a container, and
                    add &lt;code&gt;
                    inside it. The <code>data-lang</code> attribute is rendered as the language name in the top
                    right.
                </p>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- code snippets --&gt;</span>{"\n"}&lt;<span className="tag">button</span> <span
                className="atn">class</span>=<span className="atv">"btn"</span>&gt;{"\n"}{"  "}Submit{"\n"}&lt;
                <span className="tag">/button</span>&gt;{"\n"}</code></pre>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">pre</span> <span
                className="atn">class</span>=<span className="atv">"code"</span> <span
                className="atn">data-lang</span>=<span className="atv">"HTML"</span>&gt;&lt;<span
                className="tag">code</span>&gt;&lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span
                className="atv">"com"</span>&gt;&amp;lt;!-- code snippets --&amp;gt;&lt;<span
                className="tag">/span</span>&gt;{"\n"}&amp;lt;&lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span className="atv">"tag"</span>&gt;button&lt;<span
                className="tag">/span</span>&gt; &lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span className="atv">"atn"</span>&gt;class&lt;<span
                className="tag">/span</span>&gt;=&lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span className="atv">"atv"</span>&gt;&amp;quot;btn&amp;quot;&lt;
                <span className="tag">/span</span>&gt;&amp;gt;{"\n"}{"  "}Submit{"\n"}&amp;lt;&lt;<span
                    className="tag">span</span> <span className="atn">class</span>=<span
                    className="atv">"tag"</span>&gt;/button&lt;<span
                    className="tag">/span</span>&gt;&amp;gt;{"\n"}&lt;<span className="tag">/code</span>&gt;&lt;
                <span className="tag">/pre</span>&gt;{"\n"}</code></pre>
        </div>
    }
}