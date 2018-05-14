import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocPanels extends DocPage{
    static title ="Panels";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Panels are flexible view container with auto-expand content section.
            </DocNote>
            <DocSample columns={2}>
                <div className="panel">
                    <div className="panel-header text-center">
                        <figure className="avatar avatar-lg">
                            <img src="https://picturepan2.github.io/spectre/img/avatar-2.png" alt="Avatar"/>
                        </figure>
                        <div className="panel-title h5 mt-10">Bruce Banner</div>
                        <div className="panel-subtitle">THE HULK</div>
                    </div>
                    <nav className="panel-nav">
                        <ul className="tab tab-block">
                            <li className="tab-item active">
                                <a href="#panels">
                                    Profile
                                </a>
                            </li>
                            <li className="tab-item">
                                <a href="#panels">
                                    Files
                                </a>
                            </li>
                            <li className="tab-item">
                                <a href="#panels">
                                    Tasks
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="panel-body">
                        <div className="tile tile-centered">
                            <div className="tile-content">
                                <div className="tile-title">E-mail</div>
                                <div className="tile-subtitle">bruce.banner@hulk.com</div>
                            </div>
                            <div className="tile-action">
                                <button className="btn btn-link btn-action btn-lg"><i
                                    className="icon icon-edit"/>
                                </button>
                            </div>
                        </div>
                        <div className="tile tile-centered">
                            <div className="tile-content">
                                <div className="tile-title">Skype</div>
                                <div className="tile-subtitle">bruce.banner</div>
                            </div>
                            <div className="tile-action">
                                <button className="btn btn-link btn-action btn-lg"><i
                                    className="icon icon-edit"/>
                                </button>
                            </div>
                        </div>
                        <div className="tile tile-centered">
                            <div className="tile-content">
                                <div className="tile-title">Location</div>
                                <div className="tile-subtitle">Dayton, Ohio</div>
                            </div>
                            <div className="tile-action">
                                <button className="btn btn-link btn-action btn-lg"><i
                                    className="icon icon-edit"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <button className="btn btn-primary btn-block">Save</button>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-title h6">Comments</div>
                    </div>
                    <div className="panel-body">
                        <div className="tile">
                            <div className="tile-icon">
                                <figure className="avatar">
                                    <img src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                                         alt="Avatar"/>
                                </figure>
                            </div>
                            <div className="tile-content">
                                <p className="tile-title">Thor Odinson</p>
                                <p className="tile-subtitle">Earth's Mightiest Heroes joined forces to take
                                    on threats
                                    that were too big for any one hero to tackle...</p>
                            </div>
                        </div>
                        <div className="tile">
                            <div className="tile-icon">
                                <figure className="avatar">
                                    <img src="https://picturepan2.github.io/spectre/img/avatar-2.png"
                                         alt="Avatar"/>
                                </figure>
                            </div>
                            <div className="tile-content">
                                <p className="tile-title">Bruce Banner</p>
                                <p className="tile-subtitle">The Strategic Homeland Intervention,
                                    Enforcement, and
                                    Logistics Division...</p>
                            </div>
                        </div>
                        <div className="tile">
                            <div className="tile-icon">
                                <figure className="avatar" data-initial="TS"/>
                            </div>
                            <div className="tile-content">
                                <p className="tile-title">Tony Stark</p>
                                <p className="tile-subtitle">Earth's Mightiest Heroes joined forces to take
                                    on threats
                                    that were too big for any one hero to tackle...</p>
                            </div>
                        </div>
                        <div className="tile">
                            <div className="tile-icon">
                                <figure className="avatar">
                                    <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                                         alt="Avatar"/>
                                </figure>
                            </div>
                            <div className="tile-content">
                                <p className="tile-title">Steve Rogers</p>
                                <p className="tile-subtitle">The Strategic Homeland Intervention,
                                    Enforcement, and
                                    Logistics Division...</p>
                            </div>
                        </div>
                        <div className="tile">
                            <div className="tile-icon">
                                <figure className="avatar">
                                    <img src="https://picturepan2.github.io/spectre/img/avatar-3.png"
                                         alt="Avatar"/>
                                </figure>
                            </div>
                            <div className="tile-content">
                                <p className="tile-title">Natasha Romanoff</p>
                                <p className="tile-subtitle">Earth's Mightiest Heroes joined forces to take
                                    on threats
                                    that were too big for any one hero to tackle...</p>
                            </div>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <div className="input-group">
                            <input type="text" className="form-input" placeholder="Hello"/>
                            <button className="btn btn-primary input-group-btn">Send</button>
                        </div>
                    </div>
                </div>
            </DocSample>
            <DocNote>
                Add a container element with the <code>panel</code> class. And add child elements with
                the <code>panel-header</code>,
                <code>panel-nav</code>, <code>panel-body</code> and/or <code>panel-footer</code> class.
                The <code>panel-body</code>
                can be auto expanded and vertically scrollable.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<div class="panel">
  <div class="panel-header">
    <div class="panel-title">Comments</div>
  </div>
  <div class="panel-nav">
    <!-- navigation components: tabs, breadcrumbs or pagination -->
  </div>
  <div class="panel-body">
    <!-- contents -->
  </div>
  <div class="panel-footer">
    <!-- buttons or inputs -->
  </div>
</div>`;