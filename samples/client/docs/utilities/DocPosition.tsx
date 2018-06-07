import * as React from "@barlus/react"
import { Code } from "../../comps/Code";
import { DocNote, DocPage, DocSection } from "../../comps/DocPage";

export class DocPosition extends DocPage {
    static title = 'Position';
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Position utilities are used for useful layout and position things, including clearfix, float,
                position and margin/padding utilities.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<!-- clear float -->
<div className="clearfix"></div>
<!-- float: left and right -->
<div className="float-left"></div>
<div className="float-right"></div>
<!-- position: relative, absolute and fixed -->
<div className="relative"></div>
<div className="absolute"></div>
<div className="fixed"></div>
<!-- centered block -->
<div className="centered"></div>

<!-- m-1 {margin: 4px;} m-2 {margin: 8px;} -->
<div className="m-1"></div>
<div className="m-2"></div>
<!-- margin in 4 directions. mt-1 {margin-top: 4px;} mt-2 {margin-top: 8px;} -->
<div className="mt-1"></div>
<div className="mt-2"></div>
<!-- mx-1 {margin-left: 4px; margin-right: 4px;} -->
<div className="mx-1"></div>
<div className="mx-2"></div>
<div className="my-1"></div>
<div className="my-2"></div>
<!-- p-1 {padding: 4px;} p-2 {padding: 8px;} -->
<div className="p-1"></div>
<div className="p-2"></div>
<!-- padding in 4 directions. pt-1 {padding-top: 4px;} pt-2 {padding-top: 8px;} -->
<div className="pt-1"></div>
<div className="pt-2"></div>
<!-- px-1 {padding-left: 4px; padding-right: 4px;} -->
<div className="px-1"></div>
<div className="px-2"></div>
<div className="py-1"></div>
<div className="py-2"></div>`;