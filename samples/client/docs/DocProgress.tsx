import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocProgress extends DocPage {
    static title = 'Progress';
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>
                The Progress indicates the progress completion of a task.
            </DocNote>
            <DocSample columns={4}>
                <progress className="progress" value={75} max={100}/>
                <progress className="progress" value={50} max={100}/>
                <progress className="progress" value={25} max={100}/>
                <progress className="progress" max={100}/>

            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<progress class="progress" value="25" max="100"></progress>
<progress class="progress" max="100"></progress>`;