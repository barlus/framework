import * as React from "@barlus/react"
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
                <div className="d-block"> display: block</div>
                <div className="d-inline"> display: inline</div>
                <div className="d-inline-block">display: inline-block</div>
                <div className="d-flex">display: flex; </div>
                <div className="d-inline-flex"> display: inline-flex; </div>
                <div className="d-none"> display: none; </div>
                <div className="d-hide">display: hide; </div>
                <div className="d-visible"> visibility: visible;</div>
                <div className="d-invisible"> visibility: hidden;</div>
                <div className="text-hide"> hide text contents </div>
                <div className="text-assistive"> assistive text for screen reader</div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<!-- display: block; -->
<div className="d-block"></div>
<!-- display: inline; -->
<div className="d-inline"></div>
<!-- display: inline-block; -->
<div className="d-inline-block"></div>
<!-- display: flex; -->
<div className="d-flex"></div>
<!-- display: inline-flex; -->
<div className="d-inline-flex"></div>
<!-- display: none; -->
<div className="d-none"></div>
<div className="d-hide"></div>
<!-- visibility: visible; -->
<div className="d-visible"></div>
<!-- visibility: hidden; -->
<div className="d-invisible"></div>
<!-- hide text contents -->
<div className="text-hide"></div>
<!-- assistive text for screen reader -->
<div className="text-assistive"></div>`;