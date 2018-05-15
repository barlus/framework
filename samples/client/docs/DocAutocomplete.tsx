import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocAutocomplete extends React.PureComponent<{}, {}> {
    render() {
        return <div id="autocomplete" className="container">
            <h3 className="s-title"><a href="#autocomplete" className="anchor" aria-hidden="true">#</a>Autocomplete
            </h3>
            <div className="docs-note">
                <p>Autocomplete form component provides suggestions while you type. It is often used for tags
                    and contacts input. </p>
            </div>
            <div className="columns">
                <div className="column col-9 col-xs-12">
                    <div className="form-group">
                        <div className="form-autocomplete">
                            <div className="form-autocomplete-input form-input">
                      <span className="chip">
                        Bruce Banner
                      </span>
                                <div className="chip">
                                    <img src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                                         className="avatar avatar-sm" alt="Avatar"/>
                                    Thor Odinson
                                </div>
                                <div className="chip">
                                    <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                                         className="avatar avatar-sm" alt="Avatar"/>
                                    Steve Rogers
                                </div>
                                <div className="chip">
                                    <figure className="avatar avatar-sm" data-initial="TS"
                                            style={{ backgroundColor: '#5755d9' }}/>
                                    Tony Stark
                                </div>
                                <span className="chip active">
                        Natasha Romanoff
                      </span>
                                <input className="form-input" type="text" placeholder/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column col-9 col-xs-12">
                    <div className="form-group">
                        <div className="form-autocomplete">
                            <div className="form-autocomplete-input form-input is-focused">
                      <span className="chip">
                        Bruce Banner
                        <a href="#" className="btn btn-clear" aria-label="Close" role="button"/>
                      </span>
                                <span className="chip">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" className="avatar avatar-sm"
                             alt="Thor Odinson"/>
                        Thor Odinson
                        <a href="#" className="btn btn-clear" aria-label="Close" role="button"/>
                      </span>
                                <div className="has-icon-left">
                                    <input className="form-input" type="text" placeholder defaultValue="S"/>
                                    <i className="form-icon loading"/>
                                </div>
                            </div>
                            <ul className="menu">
                                <li className="menu-item">
                                    <a href="#autocomplete">
                                        <div className="tile tile-centered">
                                            <div className="tile-icon">
                                                <img
                                                    src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                                                    className="avatar avatar-sm" alt="Steve Rogers"/>
                                            </div>
                                            <div className="tile-content">
                                                <mark>S</mark>
                                                teve Roger
                                                <mark>s</mark>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="#autocomplete">
                                        <div className="tile tile-centered">
                                            <div className="tile-icon">
                                                <figure className="avatar avatar-sm" data-initial="TS"
                                                        style={{ backgroundColor: '#5755d9' }}/>
                                            </div>
                                            <div className="tile-content">
                                                Tony <mark>S</mark>tark
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>form-autocomplete</code> class. There are 2 parts of
                    it, one is <code>form-autocomplete-input</code>, another is <code>menu</code> component. You
                    may add the <code>is-focused</code> class to <code>form-autocomplete-input</code> to make it
                    appear as focus state.</p>
                <p>Spectre.css does NOT include JavaScript code, you will need to implement your JS to interact
                    with the autocomplete. The autocomplete HTML structure is exampled below.</p>
            </div>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <div className="form-group">
                        <div className="form-autocomplete autocomplete-oneline">
                            <div className="form-autocomplete-input form-input">
                      <span className="chip">
                        Bruce Banner
                      </span>
                                <div className="chip">
                                    <img src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                                         className="avatar avatar-sm" alt="Avatar"/>
                                    Thor Odinson
                                </div>
                                <div className="chip">
                                    <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                                         className="avatar avatar-sm" alt="Avatar"/>
                                    Steve Rogers
                                </div>
                                <div className="chip">
                                    <figure className="avatar avatar-sm" data-initial="TS"
                                            style={{ backgroundColor: '#5755d9' }}/>
                                    Tony Stark
                                </div>
                                <span className="chip active">
                        Natasha Romanoff
                      </span>
                                <input className="form-input" type="text" placeholder/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span
                className="atv">"form-autocomplete"</span>&gt;{"\n"}{"  "}<span className="com">&lt;!-- autocomplete input container --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span className="atv">"form-autocomplete-input form-input"</span>&gt;{"\n"}{"\n"}{"    "}<span
                    className="com">&lt;!-- autocomplete chips --&gt;</span>{"\n"}{"    "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"chip"</span>&gt;{"\n"}{"      "}&lt;<span className="tag">img</span> <span
                    className="atn">src</span>=<span className="atv">"img/avatar-1.png"</span> <span
                    className="atn">class</span>=<span className="atv">"avatar avatar-sm"</span> <span
                    className="atn">alt</span>=<span className="atv">"Thor Odinson"</span>&gt;{"\n"}{"      "}Thor Odinson{"\n"}{"      "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span> <span className="atn">class</span>=<span className="atv">"btn btn-clear"</span> <span
                    className="atn">aria-label</span>=<span className="atv">"Close"</span> <span
                    className="atn">role</span>=<span className="atv">"button"</span>&gt;&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"\n"}{"    "}<span className="com">&lt;!-- autocomplete real input box --&gt;</span>{"\n"}{"    "}&lt;
                <span className="tag">input</span> <span className="atn">class</span>=<span
                    className="atv">"form-input"</span> <span className="atn">type</span>=<span
                    className="atv">"text"</span> <span className="atn">placeholder</span>=<span
                    className="atv">"typing here"</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"\n"}{"  "}<span className="com">&lt;!-- autocomplete suggestion list --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">ul</span> <span className="atn">class</span>=<span
                    className="atv">"menu"</span>&gt;{"\n"}{"    "}<span className="com">&lt;!-- menu list chips --&gt;</span>{"\n"}{"    "}&lt;
                <span className="tag">li</span> <span className="atn">class</span>=<span
                    className="atv">"menu-item"</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span>&gt;{"\n"}{"        "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"tile tile-centered"</span>&gt;{"\n"}{"          "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"tile-icon"</span>&gt;{"\n"}{"            "}&lt;<span
                    className="tag">img</span> <span className="atn">src</span>=<span
                    className="atv">"img/avatar-4.png"</span> <span className="atn">class</span>=<span
                    className="atv">"avatar avatar-sm"</span> <span className="atn">alt</span>=<span
                    className="atv">"Steve Rogers"</span>&gt;{"\n"}{"          "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"          "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"tile-content"</span>&gt;{"\n"}{"            "}Steve Rogers{"\n"}{"          "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"        "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}&lt;<span className="tag">/ul</span>&gt;{"\n"}&lt;
                <span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}