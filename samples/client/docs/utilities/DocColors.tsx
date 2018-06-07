import * as React from "@barlus/nerv"
import { Code } from "../../comps/Code";
import { DocNote, DocPage, DocSample, DocSection, DocTitle } from "../../comps/DocPage";

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
            <DocSample columns={2}>
                <span className="text-primary">primary color</span>
                <span className="text-secondary">secondary color</span>
                <span className="text-gray">gray color</span>
                <span className="text-light bg-dark p-1 rounded">light color</span>
                <span className="text-success">success color</span>
                <span className="text-warning">warning color</span>
                <span className="text-error">error color</span>
            </DocSample>
            <Code className="HTML">{E1}</Code>
            <DocSample columns={2}>
                <a className="text-primary p-1" href="#colors">primary link</a>
                <a className="text-secondary p-1" href="#colors">secondary link</a>
                <a className="text-gray p-1" href="#colors">gray link</a>
                <a className="text-light bg-dark p-1 rounded" href="#colors">light link</a>
                <a className="text-success p-1" href="#colors">success link</a>
                <a className="text-warning p-1" href="#colors">warning link</a>
                <a className="text-error p-1" href="#colors">error link</a>
            </DocSample>
            <Code className="HTML">{E2}</Code>
            <DocTitle>
                Background colors
            </DocTitle>
            <DocSample columns={2}>
                <span className="bg-primary p-1 rounded">primary bg</span>
                <span className="bg-secondary text-primary p-1 rounded">secondary bg</span>
                <span className="bg-dark p-1 rounded">dark bg</span>
                <span className="bg-gray p-1 rounded">gray bg</span>
                <span className="bg-success p-1 rounded">success bg</span>
                <span className="bg-warning p-1 rounded">warning bg</span>
                <span className="bg-error p-1 rounded">error bg</span>
            </DocSample>
            <Code className="HTML">{E3}</Code>
        </DocSection>
    }
}

const E1 = `<span className="text-primary">primary color</span>
<span className="text-secondary">secondary color</span>
<span className="text-gray">gray color</span>
<span className="text-light">light color</span>
<span className="text-success">success color</span>
<span className="text-warning">warning color</span>
<span className="text-error">error color</span>`;
const E2 = `<a className="text-primary" href="#">primary color</a>
<a className="text-secondary" href="#">secondary color</a>
<a className="text-gray" href="#">gray color</a>
<a className="text-light" href="#">light color</a>
<a className="text-success" href="#">success color</a>
<a className="text-warning" href="#">warning color</a>
<a className="text-error" href="#">error color</a>`;
const E3 = `<div className="bg-primary">primary bg</div>
<div className="bg-secondary">secondary bg</div>
<div className="bg-dark">dark bg</div>
<div className="bg-gray">gray bg</div>
<div className="bg-success">success bg</div>
<div className="bg-warning">warning bg</div>
<div className="bg-error">error bg</div>`;
