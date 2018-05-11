import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = `<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>name</th>
      <th>genre</th>
      <th>release date</th>
    </tr>
  </thead>
  <tbody>
    <tr class="active">
      <td>The Shawshank Redemption</td>
      <td>Crime, Drama</td>
      <td>14 October 1994</td>
    </tr>
  </tbody>
</table>`;
const E2 = `<table class="table table-scroll">
  <!-- table content -->
</table>`;

export class DocTabs extends React.PureComponent<{}, {}> {
    render() {
        return <div id="tabs" className="container">
            <h3 className="s-title"><a href="#tabs" className="anchor" aria-hidden="true">#</a>Tabs</h3>
            <div className="docs-note">
                <p>Tabs enable quick switch between different views.</p>
            </div>
            <div className="columns">
                <div className="column col-6 col-sm-12">
                    <ul className="tab">
                        <li className="tab-item active">
                            <a href="#tabs">
                                Music
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Playlists
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Radio
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Store
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="column col-6 col-sm-12">
                    <ul className="tab tab-block">
                        <li className="tab-item active">
                            <a href="#tabs">
                                Music
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Playlists
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Radio
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>tab</code> class. And add child elements with
                    the <code>tab-item</code>
                    class. You can add the <code>tab-block</code> class for a full-width tab.
                    The <code>tab-item</code>
                    or its child &lt;a&gt; with the <code>active</code> class will be highlighted.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">ul</span> <span
                className="atn">class</span>=<span className="atv">"tab tab-block"</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">li</span> <span className="atn">class</span>=<span className="atv">"tab-item active"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;Music&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"tab-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span> <span className="atn">class</span>=<span
                    className="atv">"active"</span>&gt;Playlists&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"tab-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;Radio&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span className="atv">"tab-item"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;Connect&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">/li</span>&gt;{"\n"}&lt;<span className="tag">/ul</span>&gt;{"\n"}</code></pre>
            <div className="columns">
                <div className="column col-sm-12">
                    <ul className="tab">
                        <li className="tab-item active">
                            <a href="#tabs" className="badge" data-badge={999}>
                                Music
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Playlists
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Radio
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="column col-sm-12">
                    <ul className="tab tab-block">
                        <li className="tab-item active">
                            <a href="#tabs" className="badge" data-badge={9}>
                                Music
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs" className="badge" data-badge={99}>
                                Playlists
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Radio
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="docs-note">
                <p>If you need <code>badges</code> on tabs, you can add badge class to the element within
                    <code>tab-item</code>. </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">ul</span> <span
                className="atn">class</span>=<span className="atv">"tab tab-block"</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">li</span> <span className="atn">class</span>=<span className="atv">"tab-item active"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span> <span className="atn">class</span>=<span
                    className="atv">"badge"</span> <span className="atn">data-badge</span>=<span
                    className="atv">"9"</span>&gt;{"\n"}{"      "}Music{"\n"}{"    "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span className="tag">/li</span>&gt;{"\n"}&lt;
                <span className="tag">/ul</span>&gt;{"\n"}</code></pre>
            <div className="columns">
                <div className="column col-12">
                    <ul className="tab">
                        <li className="tab-item active">
                            <a href="#tabs">
                                Music
                                <span className="btn btn-clear"/>
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Playlists
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Radio
                            </a>
                        </li>
                        <li className="tab-item">
                            <a href="#tabs">
                                Store
                            </a>
                        </li>
                        <li className="tab-item tab-action">
                            <div className="input-group input-inline">
                                <input className="form-input input-sm" type="text" placeholder="search"/>
                                <button className="btn btn-primary btn-sm input-group-btn">Search</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="docs-note">
                <p>You could add a search box or buttons inside a tab. Add the <code>tab-action</code> class to
                    the
                    <code>tab-item</code>. </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">ul</span> <span
                className="atn">class</span>=<span className="atv">"tab"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">li</span> <span className="atn">class</span>=<span className="atv">"tab-item active"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;{"\n"}{"      "}Music{"\n"}{"    "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span
                    className="atv">"tab-item tab-action"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span className="atv">"input-group input-inline"</span>&gt;{"\n"}{"      "}&lt;
                <span className="tag">input</span> <span className="atn">class</span>=<span className="atv">"form-input input-sm"</span> <span
                    className="atn">type</span>=<span className="atv">"text"</span> <span
                    className="atn">placeholder</span>=<span
                    className="atv">"search"</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">button</span> <span className="atn">class</span>=<span className="atv">"btn btn-primary btn-sm input-group-btn"</span>&gt;Search&lt;
                <span className="tag">/button</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}&lt;<span
                    className="tag">/ul</span>&gt;{"\n"}</code></pre>
        </div>
    }
}