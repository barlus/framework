import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocBadges extends React.PureComponent<{}, {}> {
    render() {
        return <div id="badges" className="container">
            <h3 className="s-title"><a href="#badges" className="anchor" aria-hidden="true">#</a>Badges</h3>
            <div className="docs-note">
                <p>Badges are often used as unread number indicators.</p>
            </div>
            <div className="columns">
                <div className="column col-3 col-xs-6">
                <span className="badge" data-badge>
                  Notifications
                </span>
                </div>
                <div className="column col-3 col-xs-6">
                <span className="badge" data-badge={8}>
                  Notifications
                </span>
                </div>
                <div className="column col-3 col-xs-6">
                <span className="badge" data-badge={88}>
                  Notifications
                </span>
                </div>
                <div className="column col-3 col-xs-6">
                <span className="badge" data-badge={888}>
                  Notifications
                </span>
                </div>
            </div>
            <div className="docs-note">
                <p>Add the <code>badge</code> class to non self closing elements. And add
                    the <code>data-badge</code>
                    attribute to define the content of a badge. The badge will appear in the top-right direction
                    of the
                    element. </p>
                <p>If there is no <code>data-badge</code> or the attribute is not specified, the badge will
                    appear as a
                    dot.</p>
            </div>
            <div className="columns">
                <div className="column col-sm-12">
                    <button className="btn badge" data-badge>Button</button>
                    <button className="btn badge" data-badge={8}>Button</button>
                </div>
                <div className="column col-sm-12">
                    <button className="btn btn-primary badge" data-badge>Button</button>
                    <button className="btn btn-primary badge" data-badge={8}>Button</button>
                </div>
                <div className="column col-sm-12">
                    <figure className="avatar avatar-xl badge" data-badge={8} data-initial="YZ">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" alt="YZ"/>
                    </figure>
                    <figure className="avatar avatar-lg badge" data-badge={8} data-initial="YZ">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-2.png" alt="YZ"/>
                    </figure>
                    <figure className="avatar badge" data-badge={8} data-initial="YZ">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-3.png" alt="YZ"/>
                    </figure>
                </div>
            </div>
            <div className="docs-note">
                <p>Badges support <code>button</code> and <code>avatars</code> elements as well. </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span
                className="atv">"badge"</span>&gt;{"\n"}{"  "}Notifications{"\n"}&lt;<span
                className="tag">/span</span>&gt;{"\n"}{"\n"}&lt;<span className="tag">span</span> <span
                className="atn">class</span>=<span className="atv">"badge"</span> <span
                className="atn">data-badge</span>=<span
                className="atv">"8"</span>&gt;{"\n"}{"  "}Notifications{"\n"}&lt;<span
                className="tag">/span</span>&gt;{"\n"}{"\n"}&lt;<span className="tag">button</span> <span
                className="atn">class</span>=<span className="atv">"btn badge"</span> <span
                className="atn">data-badge</span>=<span
                className="atv">"8"</span>&gt;{"\n"}{"  "}Button{"\n"}&lt;<span
                className="tag">/button</span>&gt;{"\n"}{"\n"}&lt;<span className="tag">figure</span> <span
                className="atn">class</span>=<span className="atv">"avatar badge"</span> <span
                className="atn">data-badge</span>=<span className="atv">"8"</span> <span
                className="atn">data-initial</span>=<span className="atv">"YZ"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">img</span> <span className="atn">src</span>=<span
                className="atv">"img/avatar-3.png"</span> <span className="atn">alt</span>=<span
                className="atv">"YZ"</span>&gt;{"\n"}&lt;<span
                className="tag">/figure</span>&gt;{"\n"}</code></pre>
        </div>
    }
}