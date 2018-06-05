import * as React from "@barlus/nerv"
import { Code } from "../../comps/Code";
import { DocNote, DocPage, DocSample, DocSection } from "../../comps/DocPage";

export class DocLabels extends DocPage {
    static title = 'Labels';

    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>Labels are formatted text tags for highlighted, informative information.</DocNote>
            <DocSample>
                <div>

                    <span className="label">default label</span>
                    {' '}
                    <span className="label label-primary">primary label</span>
                    {' '}
                    <span className="label label-secondary">secondary label</span>
                    {' '}
                    <span className="label label-success">success label</span>
                    {' '}
                    <span className="label label-warning">warning label</span>
                    {' '}
                    <span className="label label-error">error label</span>
                </div>
            </DocSample>
            <DocNote>
                Add the <code>label</code> class to {"<span>"} or {"<small>"} elements. You can add another class
                <code>label-primary</code>, <code>label-secondary</code>, <code>label-success</code>, <code>label-warning</code>
                and <code>label-error</code> for colored labels.
            </DocNote>
            <DocSample>
                <div>
                    <span className="label label-rounded">default label</span>
                    {' '}
                    <span className="label label-rounded label-primary">primary label</span>
                    {' '}
                    <span className="label label-rounded label-secondary">secondary label</span>
                    {' '}
                    <span className="label label-rounded label-success">success label</span>
                    {' '}
                    <span className="label label-rounded label-warning">warning label</span>
                    {' '}
                    <span className="label label-rounded label-error">error label</span>
                </div>
            </DocSample>
            <DocNote>Add the <code>label-rounded</code> class to have rounded labels.</DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<span class="label">default label</span>
<span class="label label-primary">primary label</span>`;