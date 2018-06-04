import * as React from "@barlus/nerv"
import { Code } from "../../comps/Code";
import {DocNote, DocPage, DocSection} from "../../comps/DocPage";



export class DocCodes extends DocPage {
    static title = "Codes";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>
                Codes are inline and multiline code snippets.<br/><br/>
                For inline code, you can use the element <code>{'<code>'}</code>. For multiline code
                snippet
                blocks, you can use {'<pre>'} with the <code>code</code> class as a container, and
                add {'<code>'} inside it. The <code>data-lang</code> attribute is rendered as the language name in the top
                right.
            </DocNote>
            <Code className="HTML">{E1}</Code>
            <Code className="HTML">{E2}</Code>
        </DocSection>
    }
}

const E1 = `<!-- code snippets -->
<button class="btn">
  Submit
</button>`;
const E2 = `<pre class="code" data-lang="HTML"><code><span class="com">&lt;!-- code snippets --&gt;</span>
&lt;<span class="tag">button</span> <span class="atn">class</span>=<span class="atv">&quot;btn&quot;</span>&gt;
  Submit
&lt;<span class="tag">/button</span>&gt;
</code></pre>`;