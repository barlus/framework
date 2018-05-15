import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocEmpty extends React.PureComponent<{}, {}> {
    render() {
        return <div id="empty" className="container">
            <h3 className="s-title"><a href="#empty" className="anchor" aria-hidden="true">#</a>Empty states
            </h3>
            <div className="docs-note">
                <p>Empty states/blank slates are commonly used as placeholders for first time use, empty data
                    and error
                    screens.</p>
            </div>
            <div className="columns">
                <div className="column col-12">
                    <div className="empty">
                        <div className="empty-icon">
                            <i className="icon icon-3x icon-mail"/>
                        </div>
                        <p className="empty-title h5">You have no new messages</p>
                        <p className="empty-subtitle">Click the button to start a conversation</p>
                        <div className="empty-action">
                            <button className="btn btn-primary">Send a message</button>
                        </div>
                    </div>
                </div>
                <div className="column col-12">
                    <div className="empty">
                        <div className="empty-icon">
                            <i className="icon icon-3x icon-mail"/>
                        </div>
                        <p className="empty-title h5">You've successfully signed up</p>
                        <p className="empty-subtitle">Click the button to invite your friends</p>
                        <div className="empty-action">
                            <button className="btn btn-primary">Invite your friends</button>
                        </div>
                        <div className="empty-action">
                            <button className="btn btn-link">Skip</button>
                        </div>
                    </div>
                </div>
                <div className="column col-12">
                    <div className="empty">
                        <div className="empty-icon">
                            <i className="icon icon-3x icon-people"/>
                        </div>
                        <p className="empty-title h5">You are not following anyone</p>
                        <p className="empty-subtitle">Start to meet new friends</p>
                        <div className="empty-action input-group input-inline">
                            <input type="text" className="form-input" placeholder/>
                            <button className="btn btn-primary input-group-btn">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>An empty state component can include icons, messages (title and subtitle messages) and action
                    buttons
                    or any combination of those elements.
                    Add <code>empty-icon</code>, <code>empty-title</code>, <code>empty-subtitle</code>
                    or <code>empty-action</code> to the elements. HTML structure is exampled below. </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"empty"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"empty-icon"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">i</span> <span
                className="atn">class</span>=<span className="atv">"icon icon-people"</span>&gt;&lt;<span
                className="tag">/i</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">p</span> <span
                className="atn">class</span>=<span className="atv">"empty-title h5"</span>&gt;You have no new messages&lt;
                <span className="tag">/p</span>&gt;{"\n"}{"  "}&lt;<span className="tag">p</span> <span
                    className="atn">class</span>=<span className="atv">"empty-subtitle"</span>&gt;Click the button to start a conversation.&lt;
                <span className="tag">/p</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"empty-action"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">button</span> <span className="atn">class</span>=<span className="atv">"btn btn-primary"</span>&gt;Send a message&lt;
                <span className="tag">/button</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}