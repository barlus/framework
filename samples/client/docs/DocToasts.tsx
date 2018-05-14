import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocToasts extends DocPage {
    static title = "Toasts";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Toasts are used to show alert or information to users.
            </DocNote>
            <DocSample columns={12/9}>
                <div className="toast">
                    <button className="btn btn-clear float-right"/>
                    <h6>Toast Titl!e</h6>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div className="toast toast-primary">
                    <button className="btn btn-clear float-right"/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
            </DocSample>
            <DocNote>
                Add a container element with the <code>toast</code> class. You can add any text within the
                container,
                and even icons. You may also add a close button with the <code>btn-clear</code> class if you
                need.
            </DocNote>
            <DocSample columns={3}>
                <div className="toast toast-success">
                    <button className="btn btn-clear float-right"/>
                    Toast success
                </div>
                <div className="toast toast-warning">
                    <button className="btn btn-clear float-right"/>
                    Toast warning
                </div>
                <div className="toast toast-error">
                    <button className="btn btn-clear float-right"/>
                    Toast error
                </div>
            </DocSample>
            <DocNote>
                And you can add the <code>toast-primary</code>, <code>toast-success</code>,
                <code>toast-warning</code> or <code>toast-error</code> class for additional toast colors.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}


const E1 = `<div class="toast">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</div>

<div class="toast toast-primary">
  <button class="btn btn-clear float-right"></button>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</div>`;