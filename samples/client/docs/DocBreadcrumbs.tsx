import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocBreadcrumbs extends React.PureComponent<{}, {}> {
    render() {
        return <div id="breadcrumbs" className="container">
            <h3 className="s-title"><a href="#breadcrumbs" className="anchor" aria-hidden="true">#</a>Breadcrumbs
            </h3>
            <div className="docs-note">
                <p>Breadcrumbs are used as navigational hierarchies to indicate current location.</p>
            </div>
            <div className="columns">
                <div className="column col-12">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#breadcrumbs" className="tooltip" data-tooltip="Home">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#breadcrumbs" className="tooltip" data-tooltip="Settings">Settings</a>
                        </li>
                    </ul>
                </div>
                <div className="column col-12">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#breadcrumbs" className="tooltip" data-tooltip="Home">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#breadcrumbs" className="tooltip" data-tooltip="Settings">Settings</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#breadcrumbs" className="tooltip" data-tooltip="Change avatar">Change
                                avatar</a>
                        </li>
                    </ul>
                </div>
                <div className="column col-12">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#breadcrumbs" className="tooltip" data-tooltip="Home">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="#breadcrumbs" className="tooltip" data-tooltip="Settings">Settings</a>
                        </li>
                        <li className="breadcrumb-item">Search result:
                            <a href="#breadcrumbs" className="tooltip"
                               data-tooltip="Search result: Spectre">Spectre</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>breadcrumb</code> class. And add child elements with
                    the
                    <code>breadcrumb-item</code> class.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">ul</span> <span
                className="atn">class</span>=<span className="atv">"breadcrumb"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">li</span> <span className="atn">class</span>=<span
                className="atv">"breadcrumb-item"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">a</span> <span className="atn">href</span>=<span
                className="atv">"#"</span>&gt;Home&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                className="atn">class</span>=<span
                className="atv">"breadcrumb-item"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">a</span> <span className="atn">href</span>=<span
                className="atv">"#"</span>&gt;Settings&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">li</span> <span
                    className="atn">class</span>=<span
                    className="atv">"breadcrumb-item"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                    className="atn">href</span>=<span className="atv">"#"</span>&gt;Change avatar&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span className="tag">/li</span>&gt;{"\n"}&lt;
                <span className="tag">/ul</span>&gt;{"\n"}</code></pre>
        </div>
    }
}