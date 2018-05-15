import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocResponsive extends React.PureComponent<{}, {}> {
    render() {
        return <div id="responsive" className="container">
            <h3 className="s-title"><a href="#responsive" className="anchor" aria-hidden="true">#</a>Responsive
            </h3>
            <div className="docs-note">
                <p>Spectre provides a neat responsive layout grid system and responsive visibility
                    utilities. </p>
            </div>
            <div className="columns">
                <div className="column col-10 col-lg-8 col-md-6 col-sm-4">
                    <div className="bg-gray docs-block">col-10 <br/> col-lg-8 <br/> col-md-6 <br/> col-sm-4
                    </div>
                </div>
                <div className="column col-2 col-lg-4 col-md-6 col-sm-8">
                    <div className="bg-gray docs-block">col-2 <br/> col-lg-4 <br/> col-md-6 <br/> col-sm-8</div>
                </div>
            </div>
            <div className="docs-note">
                <p>There
                    are <code>col-xs-[1-12]</code>, <code>col-sm-[1-12]</code>, <code>col-md-[1-12]</code>, <code>col-lg-[1-12]</code> and <code>col-xl-[1-12]</code> available
                    for flexible grid across mobile, tablet and desktop viewport usage.</p>
                <ul>
                    <li><code>col-xs-[1-12]</code> apply to window width smaller than or equal
                        to <strong>480px</strong>.
                    </li>
                    <li><code>col-sm-[1-12]</code> apply to window width smaller than or equal
                        to <strong>600px</strong>.
                    </li>
                    <li><code>col-md-[1-12]</code> apply to window width smaller than or equal
                        to <strong>840px</strong>.
                    </li>
                    <li><code>col-lg-[1-12]</code> apply to window width smaller than or equal
                        to <strong>960px</strong>.
                    </li>
                    <li><code>col-xl-[1-12]</code> apply to window width smaller than or equal
                        to <strong>1280px</strong>.
                    </li>
                    <li><code>col-[1-12]</code> apply to all window width, including the width wider
                        than <strong>1280px</strong>.
                    </li>
                </ul>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"container"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"columns"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-xs-6"</span>&gt;col-xs-6&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-xs-3"</span>&gt;col-xs-3&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"column col-xs-3"</span>&gt;col-xs-3&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;
                <span className="tag">/div</span>&gt;{"\n"}</code></pre>
            <h4 id="responsive-container" className="s-subtitle">Responsive container</h4>
            <div className="docs-note">
                <p>The responsive layout also provides fixed-width containers.
                    Use <code>grid-xs</code>(480px), <code>grid-sm</code> (600px), <code>grid-md</code> (840px), <code>grid-lg</code> (960px)
                    or <code>grid-xl</code> (1280px) to <code>container</code> for a fixed-width container with
                    the specific max-width.</p>
            </div>
            <pre className="code" data-lang="HTML"><code><span className="com">&lt;!-- 100% width container with max-width set to grid-lg (960px) --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span className="atv">"container grid-lg"</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"columns"</span>&gt;{"\n"}{"    "}...{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
            <h4 id="responsive-visibility" className="s-subtitle">Responsive visibility</h4>
            <div className="docs-note">
                <p>The responsive visibility utilities help show and hide elements on specific viewport
                    sizes. </p>
            </div>
            <table className="docs-table table table-striped text-center">
                <thead>
                <tr>
                    <th/>
                    <th>size-xs</th>
                    <th>size-sm</th>
                    <th>size-md</th>
                    <th>size-lg</th>
                    <th>size-xl</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-left">hide-xs</td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                </tr>
                <tr>
                    <td className="text-left">hide-sm</td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                </tr>
                <tr>
                    <td className="text-left">hide-md</td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                </tr>
                <tr>
                    <td className="text-left">hide-lg</td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                </tr>
                <tr>
                    <td className="text-left">hide-xl</td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="docs-note">
                <p>For hiding elements on specific viewport sizes, there are
                    classes <code>hide-xs</code>, <code>hide-sm</code>, <code>hide-md</code>, <code>hide-lg</code> and <code>hide-xl</code> available.
                </p>
                <ul>
                    <li><code>hide-xs</code> hides elements when the window width is smaller than or equal
                        to <strong>480px</strong>.
                    </li>
                    <li><code>hide-sm</code> hides elements when the window width is smaller than or equal
                        to <strong>600px</strong>.
                    </li>
                    <li><code>hide-md</code> hides elements when the window width is smaller than or equal
                        to <strong>840px</strong>.
                    </li>
                    <li><code>hide-lg</code> hides elements when the window width is smaller than or equal
                        to <strong>960px</strong>.
                    </li>
                    <li><code>hide-xl</code> hides elements when the window width is smaller than or equal
                        to <strong>1280px</strong>.
                    </li>
                </ul>
            </div>
            <table className="docs-table table table-striped text-center">
                <thead>
                <tr>
                    <th/>
                    <th>size-xs</th>
                    <th>size-sm</th>
                    <th>size-md</th>
                    <th>size-lg</th>
                    <th>size-xl</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-left">show-xs</td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                </tr>
                <tr>
                    <td className="text-left">show-sm</td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                </tr>
                <tr>
                    <td className="text-left">show-md</td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                </tr>
                <tr>
                    <td className="text-left">show-lg</td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-secondary docs-dot"/>
                    </td>
                </tr>
                <tr>
                    <td className="text-left">show-xl</td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                    <td>
                        <div className="bg-primary docs-dot"/>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="docs-note">
                <p>For showing elements on specific viewport sizes, there are
                    classes <code>show-xs</code>, <code>show-sm</code>, <code>show-md</code>, <code>show-lg</code> and <code>show-xl</code> available.
                </p>
                <ul>
                    <li><code>show-xs</code> shows elements when the window width is smaller than or equal
                        to <strong>480px</strong>.
                    </li>
                    <li><code>show-sm</code> shows elements when the window width is smaller than or equal
                        to <strong>600px</strong>.
                    </li>
                    <li><code>show-md</code> shows elements when the window width is smaller than or equal
                        to <strong>840px</strong>.
                    </li>
                    <li><code>show-lg</code> shows elements when the window width is smaller than or equal
                        to <strong>960px</strong>.
                    </li>
                    <li><code>show-xl</code> shows elements when the window width is smaller than or equal
                        to <strong>1280px</strong>.
                    </li>
                </ul>
                <p>Spectre also has a responsive web test tool Responsive Resizer. You can clone the <a
                    href="https://github.com/picturepan2/responsive-resizer" target="_blank">GitHub Repo</a> to
                    use it locally or use it online.</p>
                <p><a href="https://picturepan2.github.io/responsive-resizer/" className="btn btn-primary"
                      target="_blank">Responsive Resizer</a></p>
            </div>
        </div>
    }
}