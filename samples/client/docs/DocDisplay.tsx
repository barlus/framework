import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSection} from "../comps/DocPage";


export class DocDisplay extends DocPage {
    static title = "Display";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Display utilities are used for display and hidden things.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<!-- display: block; -->
<div class="d-block"></div>
<!-- display: inline; -->
<div class="d-inline"></div>
<!-- display: inline-block; -->
<div class="d-inline-block"></div>
<!-- display: flex; -->
<div class="d-flex"></div>
<!-- display: inline-flex; -->
<div class="d-inline-flex"></div>
<!-- display: none; -->
<div class="d-none"></div>
<div class="d-hide"></div>
<!-- visibility: visible; -->
<div class="d-visible"></div>
<!-- visibility: hidden; -->
<div class="d-invisible"></div>
<!-- hide text contents -->
<div class="text-hide"></div>
<!-- assistive text for screen reader -->
<div class="text-assistive"></div>`;