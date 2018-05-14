import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocSteps extends DocPage {
    static title = "Steps";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>
                Steps are progress indicators of a sequence of task steps.
            </DocNote>
            <DocSample>
                <ul className="step">
                    <li className="step-item">
                        <a href="#steps" className="tooltip" data-tooltip="Step 1 Tooltip"/>
                    </li>
                    <li className="step-item active">
                        <a href="#steps" className="tooltip" data-tooltip="Step 2 Tooltip"/>
                    </li>
                    <li className="step-item">
                        <a href="#steps" className="tooltip" data-tooltip="Step 3 Tooltip"/>
                    </li>
                    <li className="step-item">
                        <a href="#steps" className="tooltip" data-tooltip="Step 4 Tooltip"/>
                    </li>
                </ul>
                <ul className="step">
                    <li className="step-item">
                        <a href="#steps" className="tooltip" data-tooltip="Step 1 Tooltip">Step 1</a>
                    </li>
                    <li className="step-item">
                        <a href="#steps" className="tooltip" data-tooltip="Step 2 Tooltip">Step 2</a>
                    </li>
                    <li className="step-item active">
                        <a href="#steps" className="tooltip" data-tooltip="Step 3 Tooltip">Step 3</a>
                    </li>
                    <li className="step-item">
                        <a href="#steps" className="tooltip" data-tooltip="Step 4 Tooltip">Step 4</a>
                    </li>
                </ul>
            </DocSample>
            <DocNote>
                Add a container element with the <code>step</code> class. And add child elements with
                the <code>step-item</code>
                class. The <code>step-item</code> with the <code>active</code> class will be highlighted and
                indicate the current state of progress.
            </DocNote>
            <Code className='html'>{E1}</Code>
        </DocSection>
    }
}

const E1 = `<ul class="step">
  <li class="step-item">
    <a href="#" class="tooltip" data-tooltip="Step 1">Step 1</a>
  </li>
  <li class="step-item active">
    <a href="#" class="tooltip" data-tooltip="Step 2">Step 2</a>
  </li>
  <li class="step-item">
    <a href="#" class="tooltip" data-tooltip="Step 3">Step 3</a>
  </li>
  <li class="step-item">
    <a href="#" class="tooltip" data-tooltip="Step 4">Step 4</a>
  </li>
</ul>`;