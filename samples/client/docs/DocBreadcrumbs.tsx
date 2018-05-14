import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocBreadcrumbs extends DocPage {
    static title = "Breadcrumbs";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>Breadcrumbs are used as navigational hierarchies to indicate current location.</DocNote>
            <DocSample>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#breadcrumbs" className="tooltip" data-tooltip="Home">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#breadcrumbs" className="tooltip" data-tooltip="Settings">Settings</a>
                    </li>
                </ul>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#breadcrumbs" className="tooltip" data-tooltip="Home">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#breadcrumbs" className="tooltip" data-tooltip="Settings">Settings</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#breadcrumbs" className="tooltip" data-tooltip="Change avatar">Change
                            avatar</a>
                    </li>
                </ul>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="#breadcrumbs" className="tooltip" data-tooltip="Home">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#breadcrumbs" className="tooltip" data-tooltip="Settings">Settings</a>
                    </li>
                    <li className="breadcrumb-item">Search result:
                        <a href="#breadcrumbs" className="tooltip"
                           data-tooltip="Search result: Spectre">Spectre</a>
                    </li>
                </ul>
            </DocSample>
            <DocNote>
                Add a container element with the <code>breadcrumb</code> class.
                And add child elements with the <code>breadcrumb-item</code> class.</DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = ``;
const E2 = ``;