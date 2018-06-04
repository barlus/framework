import * as React from "@barlus/nerv"
import { Code } from "../../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../../comps/DocPage";


export class DocCursors extends DocPage {
    static  title = "Cursors";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Cursor utilities specify which mouse cursor to display when mouseover.
            </DocNote>
            <DocSample columns={6}>
                <div className="bg-gray docs-block c-hand">c-hand</div>
                <div className="bg-gray docs-block c-move">c-move</div>
                <div className="bg-gray docs-block c-zoom-in">c-zoom-in</div>
                <div className="bg-gray docs-block c-zoom-out">c-zoom-out</div>
                <div className="bg-gray docs-block c-not-allowed">c-not-allowed</div>
                <div className="bg-gray docs-block c-auto">c-auto</div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<!-- cursor: hand; -->
<div class="c-hand"></div>
<!-- cursor: move; -->
<div class="c-move"></div>
<!-- cursor: zoom-in; -->
<div class="c-zoom-in"></div>
<!-- cursor: zoom-out; -->
<div class="c-zoom-out"></div>
<!-- cursor: not-allowed; -->
<div class="c-not-allowed"></div>
<!-- cursor: auto; -->
<div class="c-auto"></div>`;