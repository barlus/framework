import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection, DocTitle} from '../comps/DocPage';

export class DocButtons extends DocPage {
    static title = 'Buttons';
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>Buttons include simple button styles for actions in different types and sizes. </DocNote>
            <DocSample columns={6}>
                <button className="btn">default button</button>
                <button className="btn btn-primary">primary button</button>
                <button className="btn btn-link">link button</button>
            </DocSample>
            <DocNote>
                Add the <code>btn</code> class to <code>a</code>, <code>input</code> or <code>button</code> elements
                for a default button.
                There are classes <code>btn-primary</code> and <code>btn-link</code> for predefined
                primary
                and link buttons.
            </DocNote>
            <Code className="HTML">{E1}</Code>
            <DocTitle>Button colors</DocTitle>
            <DocSample columns={6}>
                <button className="btn btn-success">success button</button>
                <button className="btn btn-error">error button</button>
            </DocSample>
            <DocNote>
                Add the <code>btn-success</code> or <code>btn-error</code> class for success (green)
                or error (red) button color. If you need more button colors, please
                use <a href="#variables-buttons">button mixins</a> to create your own button
                color variants.
            </DocNote>
            <Code className="HTML">{E2}</Code>
            <DocTitle>Button sizes</DocTitle>
            <DocSample columns={6}>
                <button className="btn btn-primary btn-lg">large <i className="icon icon-arrow-down"/></button>
                <button className="btn btn-primary btn-lg">large button</button>
            </DocSample>
            <DocSample columns={6}>
                <button className="btn btn-primary">normal <i className="icon icon-arrow-down"/></button>
                <button className="btn btn-primary">normal button</button>
            </DocSample>
            <DocSample columns={6}>
                <button className="btn btn-primary btn-sm">small <i className="icon icon-arrow-down"/></button>
                <button className="btn btn-primary btn-sm">small button</button>
            </DocSample>
            <DocNote>
                Add the <code>btn-sm</code> or <code>btn-lg</code> class for small or large button size.
                Also, you
                can add the <code>btn-block</code> class for a full-width button.
            </DocNote>
            <Code className="HTML">{E3}</Code>
            <DocNote>
                Please note that you could use the <code>btn-action</code> class for a square button, or add
                another
                <code>circle</code> class for a round button, which is often used as a Float Action Button
                (FAB).
            </DocNote>
            <DocSample columns={2}>
                <div>
                    <button className="btn btn-action btn-primary btn-lg">
                        <i className="icon icon-menu"/>
                    </button>
                    {' '}
                    <button className="btn btn-action btn-primary">
                        <i className="icon icon-menu"/>
                    </button>
                    {' '}
                    <button className="btn btn-action btn-primary btn-sm">
                        <i className="icon icon-menu"/>
                    </button>
                </div>
                <div >
                    <button className="btn btn-action btn-primary btn-lg circle">
                        <i className="icon icon-arrow-up"/>
                    </button>
                    {' '}
                    <button className="btn btn-action btn-primary circle">
                        <i className="icon icon-arrow-up"/>
                    </button>
                    {' '}
                    <button className="btn btn-action btn-primary btn-sm circle">
                        <i className="icon icon-arrow-up"/>
                    </button>
                </div>
            </DocSample>
            <Code className="HTML">{E4}</Code>
            <DocTitle>Button states</DocTitle>
            <DocNote>Add the <code>active</code> class for active button state style.</DocNote>
            <DocSample columns={4}>
                <button className="btn active">default active</button>
                <button className="btn btn-primary active">primary active</button>
                <button className="btn btn-link active">link active</button>
            </DocSample>
            <Code className="HTML">{E5}</Code>
            <DocSample columns={4}>
                <button className="btn disabled" tabIndex={-1}>default disabled</button>
                <button className="btn btn-primary" disabled tabIndex={-1}>primary disabled</button>
                <button className="btn btn-link" disabled tabIndex={-1}>link disabled</button>
            </DocSample>
            <Code className="HTML">{E6}</Code>
            <DocNote>A button with the <code>loading</code> class can show loading indicator.</DocNote>
            <DocSample columns={6}>
                <button className="btn loading">default button</button>
                <button className="btn btn-primary loading">primary button</button>
                <button className="btn btn-link loading">link button</button>
            </DocSample>
            <Code className="HTML">{E7}</Code>
            <DocTitle>Button groups</DocTitle>
            <DocSample columns={2}>
                <div className="btn-group">
                    <button className="btn">first button</button>
                    <button className="btn">second button</button>
                    <button className="btn">third button</button>
                </div>
                <div className="btn-group btn-group-block">
                    <button className="btn btn-primary">first button</button>
                    <button className="btn btn-primary">second button</button>
                    <button className="btn btn-primary">third button</button>
                </div>
            </DocSample>
            <DocSample columns={2}>
                <div className="btn-group">
                    <button className="btn btn-sm active">first button</button>
                    <button className="btn btn-sm">second button</button>
                    <button className="btn btn-sm">third button</button>
                </div>
                <div className="btn-group btn-group-block">
                    <button className="btn btn-primary btn-sm active">first button</button>
                    <button className="btn btn-primary btn-sm">second button</button>
                    <button className="btn btn-primary btn-sm">third button</button>
                </div>
            </DocSample>
            <DocNote>
                If you want to use buttons as a group, add the <code>btn-group</code> class to the container.
                You can
                add the <code>btn-group-block</code> class for a full-width button group.
            </DocNote>
            <Code className="HTML">{E8}</Code>
        </DocSection>
    }
}

const E1 = `<example>
    <button class="btn">default button</button>
    <button class="btn btn-primary">primary button</button>
    <button class="btn btn-link">link button</button>
</example>`;
const E2 = `<example>
    <button class="btn btn-success">success button</button>
    <button class="btn btn-error">error button</button>
</example>`;
const E3 = `<example>
    <button class="btn btn-lg">large button</button>
    <button class="btn btn-sm">small button</button>
    <button class="btn btn-block">block button</button>
    <button class="btn btn-primary btn-lg">
        <i class="icon icon-arrow-left"/>large
    </button>
    <button class="btn btn-primary">
        <i class="icon icon-arrow-left"/> normal
    </button>
    <button class="btn btn-primary btn-sm">
        <i class="icon icon-arrow-left"/> small
    </button>
</example>`;
const E4 = `<example>
    <button class="btn btn-action"><i class="icon icon-arrow-left"></i></button>
    <button class="btn btn-action circle"><i class="icon icon-arrow-left"></i></button>
</example>`;
const E5 = `<example>
    <!-- buttons with active state -->
    <button class="btn active">active button</button>
</example>`;
const E6 = `<example>
    <!-- buttons with disabled state -->
    <button class="btn disabled" tabindex="-1">disabled button</button>
    <button class="btn" disabled tabindex="-1">disabled button</button>
</example>`;
const E7 = `<example>
    <!-- a button with loading state -->
    <button class="btn loading">button</button>
</example>`;
const E8 = `<div class="btn-group btn-group-block">
  <button class="btn">first button</button>
  <button class="btn">second button</button>
  <button class="btn">third button</button>
</div>`;