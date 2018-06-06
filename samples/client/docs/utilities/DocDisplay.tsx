import * as React from "@barlus/nerv"
import { Code } from "../../comps/Code";
import { DocNote, DocPage, DocSample, DocSection } from "../../comps/DocPage";

export class DocDisplay extends DocPage {
    static title = "Display";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Display utilities are used for display and hidden things.
            </DocNote>
            <DocSample>
                <div class="d-block"> display: block</div>
                <div class="d-inline"> display: inline</div>
                <div class="d-inline-block">display: inline-block</div>
                <div class="d-flex">display: flex; </div>
                <div class="d-inline-flex"> display: inline-flex; </div>
                <div class="d-none"> display: none; </div>
                <div class="d-hide">display: hide; </div>
                <div class="d-visible"> visibility: visible;</div>
                <div class="d-invisible"> visibility: hidden;</div>
                <div class="text-hide"> hide text contents </div>
                <div class="text-assistive"> assistive text for screen reader</div>
            </DocSample>
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