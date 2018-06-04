import * as React from "@barlus/nerv"
import { Code } from "../../comps/Code";
import { DocNote, DocPage, DocSection, DocTitle } from "../../comps/DocPage";

export class DocColors extends DocPage {
    static title = "Colors";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Color utilities are used for changing colors for text, link and background.
            </DocNote>
            <DocTitle>
                Text colors
            </DocTitle>
            <DocNote>
                <span className="text-primary">primary color</span><br/><br/>
                <span className="text-secondary">secondary color</span><br/><br/>
                <span className="text-gray">gray color</span><br/><br/>
                <span className="text-light bg-dark p-1 rounded">light color</span><br/><br/>
                <span className="text-success">success color</span><br/><br/>
                <span className="text-warning">warning color</span><br/><br/>
                <span className="text-error">error color</span><br/><br/>
            </DocNote>
            <Code className="HTML">{E1}</Code>
            <DocNote>
                <a className="text-primary p-1" href="#colors">primary link</a><br/><br/>
                <a className="text-secondary p-1" href="#colors">secondary link</a><br/><br/>
                <a className="text-gray p-1" href="#colors">gray link</a><br/><br/>
                <a className="text-light bg-dark p-1 rounded" href="#colors">light link</a><br/><br/>
                <a className="text-success p-1" href="#colors">success link</a><br/><br/>
                <a className="text-warning p-1" href="#colors">warning link</a><br/><br/>
                <a className="text-error p-1" href="#colors">error link</a><br/><br/>
            </DocNote>
            <Code className="HTML">{E2}</Code>
            <DocTitle>
                Background colors
            </DocTitle>
            <DocNote>
                <span className="bg-primary p-1 rounded">primary bg</span><br/><br/>
                <span className="bg-secondary text-primary p-1 rounded">secondary bg</span><br/><br/>
                <span className="bg-dark p-1 rounded">dark bg</span><br/><br/>
                <span className="bg-gray p-1 rounded">gray bg</span><br/><br/>
                <span className="bg-success p-1 rounded">success bg</span><br/><br/>
                <span className="bg-warning p-1 rounded">warning bg</span><br/><br/>
                <span className="bg-error p-1 rounded">error bg</span><br/><br/>
            </DocNote>
            <Code className="HTML">{E3}</Code>
        </DocSection>
    }
}

const E1 = `<span class="text-primary">primary color</span>
<span class="text-secondary">secondary color</span>
<span class="text-gray">gray color</span>
<span class="text-light">light color</span>
<span class="text-success">success color</span>
<span class="text-warning">warning color</span>
<span class="text-error">error color</span>`;
const E2 = `<a class="text-primary" href="#">primary color</a>
<a class="text-secondary" href="#">secondary color</a>
<a class="text-gray" href="#">gray color</a>
<a class="text-light" href="#">light color</a>
<a class="text-success" href="#">success color</a>
<a class="text-warning" href="#">warning color</a>
<a class="text-error" href="#">error color</a>`;
const E3 = `<div class="bg-primary">primary bg</div>
<div class="bg-secondary">secondary bg</div>
<div class="bg-dark">dark bg</div>
<div class="bg-gray">gray bg</div>
<div class="bg-success">success bg</div>
<div class="bg-warning">warning bg</div>
<div class="bg-error">error bg</div>`;
