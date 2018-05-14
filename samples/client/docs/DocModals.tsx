import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSection, DocTitle} from "../comps/DocPage";

export class DocModals extends DocPage {
    static title = "Modals";


    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>Modals are flexible dialog prompts.</DocNote>
            <div className="columns">
                <div className="column">
                    <a className="btn btn-primary">Open Modal</a>
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
            <DocNote>
                Add a container element with the <code>modal</code> class. And add a real
                container <code>modal-container</code>
                and overlay <code>modal-overlay</code> inside it. You can add child elements with
                the <code>modal-header</code>,
                <code>modal-body</code> and <code>modal-footer</code> - any or all of them.<br/><br/>
                Spectre.css does not include JavaScript code, you will need to implement your JS to interact
                with modals. To make a modal appear, add the <code>active</code> class to the <code>modal</code>
                container.
            </DocNote>
            <Code className="HTML">{E1}</Code>
            <DocTitle>Modal sizes</DocTitle>
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
            <DocNote>
                Use the <code>modal-sm</code> class for a smaller modal dialog. The container max width
                is <code>320px</code>.
            </DocNote>
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

            <DocNote>
                Use the <code>modal-lg</code> class for a full size modal. The container max width is
                <code>960px</code>.
            </DocNote>
            <Code className="HTML">{E2}</Code>
        </DocSection>
    }
}

const E1 = `<div class="modal active" id="modal-id">
  <a href="#close" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-container">
    <div class="modal-header">
      <a href="#close" class="btn btn-clear float-right" aria-label="Close"></a>
      <div class="modal-title h5">Modal title</div>
    </div>
    <div class="modal-body">
      <div class="content">
        <!-- content here -->
      </div>
    </div>
    <div class="modal-footer">
      ...
    </div>
  </div>
</div>`;
const E2 = `<div class="modal modal-sm">
  <a href="#close" class="modal-overlay" aria-label="Close"></a>
  <div class="modal-container">
    <!-- modal structure here -->
  </div>
</div>`;
