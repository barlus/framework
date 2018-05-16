import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocMenus extends React.PureComponent<{}, {}> {
    render() {
        return <div id="menus" className="container">
            <h3 className="s-title"><a href="#menus" className="anchor" aria-hidden="true">#</a>Menus</h3>
            <div className="docs-note">
                <p>Menus are vertical list of links or buttons for actions and navigation.</p>
            </div>
            <div className="columns">
                <div className="column col-4 col-xs-12">
                    <ul className="menu">
                        <li className="menu-item">
                            <div className="tile tile-centered">
                                <div className="tile-icon">
                                    <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                                         className="avatar" alt="Avatar"/>
                                </div>
                                <div className="tile-content">
                                    Steve Rogers
                                </div>
                            </div>
                        </li>
                        <li className="divider"/>
                        <li className="menu-item">
                            <div className="menu-badge">
                                <label className="label label-primary">2</label>
                            </div>
                            <a href="#menus" className="active">
                                My profile
                            </a>
                        </li>
                        <li className="menu-item">
                            <a href="#menus">
                                Settings
                            </a>
                        </li>
                        <li className="menu-item">
                            <a href="#menus">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="column col-4 col-xs-12">
                    <ul className="menu">
                        <li className="divider" data-content="LINKS"/>
                        <li className="menu-item">
                            <a href="#menus">Slack</a>
                        </li>
                        <li className="menu-item">
                            <a href="#menus">Hipchat</a>
                        </li>
                        <li className="menu-item">
                            <a href="#menus">Skype</a>
                        </li>
                    </ul>
                </div>
                <div className="column col-4 col-xs-12">
                    <ul className="menu">
                        <li className="menu-item">
                            <label className="form-checkbox">
                                <input type="checkbox" defaultChecked/>
                                <i className="form-icon"/> form-checkbox
                            </label>
                        </li>
                        <li className="menu-item">
                            <label className="form-radio">
                                <input type="radio" defaultChecked/>
                                <i className="form-icon"/> form-radio
                            </label>
                        </li>
                        <li className="menu-item">
                            <label className="form-switch">
                                <input type="checkbox" defaultChecked/>
                                <i className="form-icon"/> form-switch
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>menu</code> class. And add child elements with
                    the <code>menu-item</code>
                    class. You can separate menu items with a <code>divider</code>. Spectre.css does not include
                    JavaScript code, you will need to implement your JS to interact with the menus.</p>
                <p>Menus also have <a href="#forms" target="_blank">Form controls</a> (checkbox, radio and
                    checkbox) support.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">ul</span> <span
                className="atn">class</span>=<span className="atv">"menu"</span>&gt;{"\n"}{"  "}<span
                className="com">&lt;!-- menu header text --&gt;</span>{"\n"}{"  "}&lt;<span
                className="tag">li</span> <span className="atn">class</span>=<span
                className="atv">"divider"</span> <span className="atn">data-content</span>=<span
                className="atv">"LINKS"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">/li</span>&gt;{"\n"}{"  "}<span
                className="com">&lt;!-- menu item standard --&gt;</span>{"\n"}{"  "}&lt;<span
                className="tag">li</span> <span className="atn">class</span>=<span
                className="atv">"menu-item"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                className="atn">href</span>=<span className="atv">"#"</span>&gt;{"\n"}{"      "}&lt;<span
                className="tag">i</span> <span className="atn">class</span>=<span className="atv">"icon icon-link"</span>&gt;&lt;
                <span className="tag">/i</span>&gt; Slack{"\n"}{"    "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}<span className="com">&lt;!-- menu item with form control --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">li</span> <span className="atn">class</span>=<span
                    className="atv">"menu-item"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">label</span> <span className="atn">class</span>=<span
                    className="atv">"form-checkbox"</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">input</span> <span className="atn">type</span>=<span
                    className="atv">"checkbox"</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">i</span> <span className="atn">class</span>=<span
                    className="atv">"form-icon"</span>&gt;&lt;<span
                    className="tag">/i</span>&gt; form-checkbox{"\n"}{"    "}&lt;<span
                    className="tag">/label</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}<span
                    className="com">&lt;!-- menu divider --&gt;</span>{"\n"}{"  "}&lt;<span
                    className="tag">li</span> <span className="atn">class</span>=<span
                    className="atv">"divider"</span>&gt;&lt;<span
                    className="tag">/li</span>&gt;{"\n"}{"  "}<span className="com">&lt;!-- menu item with badge --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">li</span> <span className="atn">class</span>=<span
                    className="atv">"menu-item"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"menu-badge"</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">label</span> <span className="atn">class</span>=<span className="atv">"label label-primary"</span>&gt;2&lt;
                <span className="tag">/label</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                    className="atn">href</span>=<span className="atv">"#"</span>&gt;{"\n"}{"      "}&lt;<span
                    className="tag">i</span> <span className="atn">class</span>=<span className="atv">"icon icon-link"</span>&gt;&lt;
                <span className="tag">/i</span>&gt; Settings{"\n"}{"    "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span className="tag">/li</span>&gt;{"\n"}&lt;
                <span className="tag">/ul</span>&gt;{"\n"}</code></pre>
            <h4 id="dropdowns" className="s-subtitle"><a href="#dropdowns" className="anchor"
                                                         aria-hidden="true">#</a>Dropdown
                menus</h4>
            <div className="docs-note">
                <p>The dropdown is a combination of buttons and menus.</p>
            </div>
            <div className="columns">
                <div className="column col-xs-12">
                    <div className="dropdown">
                        <div className="btn-group">
                            <a className="btn btn-primary">dropdown button</a>
                            <a className="btn btn-primary dropdown-toggle" tabIndex={0}><i
                                className="icon icon-caret"/></a>
                            <ul className="menu">
                                <li className="menu-item">
                                    <a href="#dropdowns">
                                        Slack
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="#dropdowns">
                                        Hipchat
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="#dropdowns">
                                        Skype
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="column col-xs-12">
                    <div className="dropdown">
                        <a className="btn btn-link dropdown-toggle" tabIndex={0}>dropdown button <i
                            className="icon icon-caret"/></a>
                        <ul className="menu">
                            <li className="menu-item">
                                <a href="#dropdowns">
                                    Slack
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="#dropdowns">
                                    Hipchat
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="#dropdowns">
                                    Skype
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Dropdown menus component is built entirely in CSS. It is triggered
                    by <code>:focus</code> event.</p>
                <p>Add a container element with the <code>dropdown</code> class. And add a focusable element
                    with the
                    <code>dropdown-toggle</code> class for the button and a <code>menu</code> component right
                    next to
                    it. You also need to add <code>tabindex</code> to make the buttons focusable.</p>
                <p>If the dropdown is close to the right edge of the browser, you can add the
                    <code>dropdown-right</code> class to the container to prevent it appearing off screen.</p>
            </div>
            <div className="columns">
                <div className="column col-xs-12 text-right">
                    <div className="dropdown dropdown-right">
                        <a className="btn btn-primary dropdown-toggle" tabIndex={0}>dropdown button <i
                            className="icon icon-caret"/></a>
                        <ul className="menu text-left">
                            <li className="menu-item">
                                <a href="#dropdowns">Slack</a>
                            </li>
                            <li className="menu-item">
                                <a href="#dropdowns">Hipchat</a>
                            </li>
                            <li className="menu-item">
                                <a href="#dropdowns">Skype</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Also, you can implement your JS to interact with the dropdown menus by adding
                    the <code>active</code>
                    class to the <code>dropdown</code> container.</p>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- basic dropdown button --&gt;</span>{"\n"}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"dropdown"</span>&gt;{"\n"}{"  "}&lt;<span className="tag">a</span> <span
                className="atn">href</span>=<span className="atv">"#"</span> <span className="atn">class</span>=<span
                className="atv">"btn btn-link dropdown-toggle"</span> <span
                className="atn">tabindex</span>=<span
                className="atv">"0"</span>&gt;{"\n"}{"    "}dropdown menu &lt;<span
                className="tag">i</span> <span className="atn">class</span>=<span className="atv">"icon icon-caret"</span>&gt;&lt;
                <span className="tag">/i</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"  "}<span
                    className="com">&lt;!-- menu component --&gt;</span>{"\n"}{"  "}&lt;<span
                    className="tag">ul</span> <span className="atn">class</span>=<span
                    className="atv">"menu"</span>&gt;{"\n"}{"    "}...{"\n"}{"  "}&lt;<span
                    className="tag">/ul</span>&gt;{"\n"}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"\n"}<span className="com">&lt;!-- dropdown button group --&gt;</span>{"\n"}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"dropdown"</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"btn-group"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#"</span> <span className="atn">class</span>=<span
                    className="atv">"btn"</span>&gt;{"\n"}{"      "}dropdown button{"\n"}{"    "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"    "}&lt;<span className="tag">a</span> <span
                    className="atn">href</span>=<span className="atv">"#"</span> <span
                    className="atn">class</span>=<span className="atv">"btn dropdown-toggle"</span> <span
                    className="atn">tabindex</span>=<span className="atv">"0"</span>&gt;{"\n"}{"      "}&lt;
                <span className="tag">i</span> <span className="atn">class</span>=<span className="atv">"icon icon-caret"</span>&gt;&lt;
                <span className="tag">/i</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/a</span>&gt;{"\n"}{"\n"}{"    "}<span className="com">&lt;!-- menu component --&gt;</span>{"\n"}{"    "}&lt;
                <span className="tag">ul</span> <span className="atn">class</span>=<span
                    className="atv">"menu"</span>&gt;{"\n"}{"      "}...{"\n"}{"    "}&lt;<span
                    className="tag">/ul</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}