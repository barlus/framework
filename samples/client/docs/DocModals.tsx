import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocModals extends React.PureComponent<{}, {}> {
    render() {
        return <div id="modals" className="container">
            <h3 className="s-title"><a href="#modals" className="anchor" aria-hidden="true">#</a>Modals</h3>
            <div className="docs-note">
                <p>Modals are flexible dialog prompts.</p>
            </div>
            <div className="columns">
                <div className="column">
                    <a href="#example-modal-1" className="btn btn-primary">Open Modal</a>
                    <div className="modal" id="example-modal-1">
                        <a href="#modals" className="modal-overlay" aria-label="Close"/>
                        <div className="modal-container" role="document">
                            <div className="modal-header">
                                <a href="#modals" className="btn btn-clear float-right" aria-label="Close"/>
                                <div className="modal-title h5">Modal title</div>
                            </div>
                            <div className="modal-body">
                                <div className="content">
                                    <p>This is the content inside the modal.</p>
                                    <h4>Lorem ipsum</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus
                                        leo,
                                        dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales
                                        risus.
                                        Etiam euismod ornare consequat.</p>
                                    <p>Climb leg rub face on everything give attitude nap all day for under the
                                        bed.
                                        Chase mice attack feet but rub face on everything hopped up on
                                        goofballs.</p>
                                    <h4>Cupcake ipsum</h4>
                                    <p>Jelly-o sesame snaps halvah croissant oat cake cookie. Cheesecake bear
                                        claw
                                        topping. Chupa chups apple pie carrot cake chocolate cake caramels.</p>
                                    <p>De braaaiiiins apocalypsi gorger omero prefrontal cortex undead survivor
                                        fornix
                                        dictum mauris. Hi brains mindless mortuis limbic cortex soulless
                                        creaturas optic
                                        nerve.</p>
                                    <h4>Candy ipsum</h4>
                                    <p>Efficiently unleash cross-media information without cross-media value.
                                        Quickly
                                        maximize timely deliverables for real-time schemas. Dramatically
                                        maintain
                                        clicks-and-mortar.</p>
                                    <p>Caerphilly swiss fromage frais. Brie cheese and wine fromage frais chalk
                                        and
                                        cheese danish fontina smelly cheese who moved my cheese cow.</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary">Share</button>
                                <a href="#modals" className="btn btn-link">Close</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>modal</code> class. And add a real
                    container <code>modal-container</code>
                    and overlay <code>modal-overlay</code> inside it. You can add child elements with
                    the <code>modal-header</code>,
                    <code>modal-body</code> and <code>modal-footer</code> - any or all of them. </p>
                <p>Spectre.css does not include JavaScript code, you will need to implement your JS to interact
                    with
                    modals. To make a modal appear, add the <code>active</code> class to the <code>modal</code>
                    container.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"modal active"</span> <span
                className="atn">id</span>=<span className="atv">"modal-id"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">a</span> <span className="atn">href</span>=<span className="atv">"#close"</span> <span
                className="atn">class</span>=<span className="atv">"modal-overlay"</span> <span
                className="atn">aria-label</span>=<span className="atv">"Close"</span>&gt;&lt;<span
                className="tag">/a</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span
                className="atv">"modal-container"</span>&gt;{"\n"}{"    "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"modal-header"</span>&gt;{"\n"}{"      "}&lt;<span
                className="tag">a</span> <span className="atn">href</span>=<span className="atv">"#close"</span> <span
                className="atn">class</span>=<span className="atv">"btn btn-clear float-right"</span> <span
                className="atn">aria-label</span>=<span className="atv">"Close"</span>&gt;&lt;<span
                className="tag">/a</span>&gt;{"\n"}{"      "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"modal-title h5"</span>&gt;Modal title&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"modal-body"</span>&gt;{"\n"}{"      "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"content"</span>&gt;{"\n"}{"        "}<span className="com">&lt;!-- content here --&gt;</span>{"\n"}{"      "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"modal-footer"</span>&gt;{"\n"}{"      "}...{"\n"}{"    "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
            <h4 id="modals-sizes" className="s-subtitle">Modal sizes</h4>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <a href="#example-modal-2" className="btn btn-primary">Open small size Modal</a>
                    <div className="modal modal-sm" id="example-modal-2">
                        <a href="#modals-sizes" className="modal-overlay" aria-label="Close"/>
                        <div className="modal-container" role="document">
                            <div className="modal-header">
                                <a href="#modals-sizes" className="btn btn-clear float-right"
                                   aria-label="Close"/>
                                <div className="modal-title h5">Modal title</div>
                            </div>
                            <div className="modal-body">
                                <div className="content">
                                    <form>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="input-example-7">Name</label>
                                            <input className="form-input" type="text" id="input-example-7"
                                                   placeholder="Name"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Gender</label>
                                            <label className="form-radio">
                                                <input type="radio" name="gender"/>
                                                <i className="form-icon"/> Male
                                            </label>
                                            <label className="form-radio">
                                                <input type="radio" name="gender" defaultChecked/>
                                                <i className="form-icon"/> Female
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary">Submit</button>
                                <a href="#modals-sizes" className="btn btn-link" aria-label="Close">Close</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Use the <code>modal-sm</code> class for a smaller modal dialog. The container max width
                    is <code>320px</code>.
                </p>
            </div>
            <div className="columns">
                <div className="column">
                    <a href="#example-modal-3" className="btn btn-primary">Open large size Modal</a>
                    <div className="modal modal-lg" id="example-modal-3">
                        <a href="#modals-sizes" className="modal-overlay" aria-label="Close"/>
                        <div className="modal-container" role="document">
                            <div className="modal-header">
                                <a href="#modals-sizes" className="btn btn-clear float-right"
                                   aria-label="Close"/>
                                <div className="modal-title h5">Modal title</div>
                            </div>
                            <div className="modal-body">
                                <div className="content">
                                    <p>This is the content inside the modal.</p>
                                    <h4>Lorem ipsum</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus
                                        leo,
                                        dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales
                                        risus.
                                        Etiam euismod ornare consequat.</p>
                                    <p>Climb leg rub face on everything give attitude nap all day for under the
                                        bed.
                                        Chase mice attack feet but rub face on everything hopped up on
                                        goofballs.</p>
                                    <h4>Cupcake ipsum</h4>
                                    <p>Jelly-o sesame snaps halvah croissant oat cake cookie. Cheesecake bear
                                        claw
                                        topping. Chupa chups apple pie carrot cake chocolate cake caramels.</p>
                                    <p>De braaaiiiins apocalypsi gorger omero prefrontal cortex undead survivor
                                        fornix
                                        dictum mauris. Hi brains mindless mortuis limbic cortex soulless
                                        creaturas optic
                                        nerve.</p>
                                    <h4>Candy ipsum</h4>
                                    <p>Efficiently unleash cross-media information without cross-media value.
                                        Quickly
                                        maximize timely deliverables for real-time schemas. Dramatically
                                        maintain
                                        clicks-and-mortar.</p>
                                    <p>Caerphilly swiss fromage frais. Brie cheese and wine fromage frais chalk
                                        and
                                        cheese danish fontina smelly cheese who moved my cheese cow.</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary">Share</button>
                                <a href="#modals-sizes" className="btn btn-link">Close</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Use the <code>modal-lg</code> class for a full size modal. The container max width is
                    <code>960px</code>.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"modal modal-sm"</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">a</span> <span className="atn">href</span>=<span
                    className="atv">"#close"</span> <span className="atn">class</span>=<span
                    className="atv">"modal-overlay"</span> <span className="atn">aria-label</span>=<span
                    className="atv">"Close"</span>&gt;&lt;<span className="tag">/a</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"modal-container"</span>&gt;{"\n"}{"    "}<span className="com">&lt;!-- modal structure here --&gt;</span>{"\n"}{"  "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}