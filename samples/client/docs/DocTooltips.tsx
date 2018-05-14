import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocTooltips extends DocPage {
    static title = "Tooltips";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Tooltips provide context information labels that appear on hover and focus.
            </DocNote>
            <DocSample columns={4} className='text-center'>
                <button className="btn btn-primary tooltip" data-tooltip="Top Tooltip Text">top tooltip
                </button>
                <button className="btn btn-primary tooltip tooltip-right"
                        data-tooltip="Right Tooltip Text">right
                    tooltip
                </button>
                <button className="btn btn-primary tooltip tooltip-bottom"
                        data-tooltip="Bottom Tooltip Text">bottom
                    tooltip
                </button>
                <button className="btn btn-primary tooltip tooltip-left"
                        data-tooltip="Left Tooltip Text">left tooltip
                </button>
            </DocSample>
            <DocNote>
                Tooltips component is built entirely in CSS.<br/><br/>
                Add the <code>tooltip</code> class and the <code>data-tooltip</code> attribute, which
                contains the tooltip content, to non self closing elements. And add
                the <code>tooltip-right</code>, <code>tooltip-bottom</code>
                or <code>tooltip-left</code> class to define the position of a tooltip. By default, the
                tooltip
                appears above the element.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}
const E1 = `<button class="btn tooltip" data-tooltip="Lorem ipsum dolor sit amet">top tooltip</button>
<button class="btn tooltip tooltip-right" data-tooltip="Lorem ipsum dolor sit amet">right tooltip</button>`;