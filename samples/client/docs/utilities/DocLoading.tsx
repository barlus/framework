import * as React from "@barlus/react"
import { Code } from "../../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../../comps/DocPage";


export class DocLoading extends DocPage {
    static title = "Loading";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Loading indicator is used for loading or updating. Also, you can add
                the <code>loading</code> class to buttons for loading status.
            </DocNote>
            <DocSample  className="text-center">
                <div className="loading"/>
            </DocSample>
            <DocNote>
                Add the <code>loading-lg</code> class for large size.
            </DocNote>
            <DocSample className="text-center">
                <div className="loading loading-lg"/>
            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<!-- loading element -->
<div className="loading"></div>
<div className="loading loading-lg"></div>`;