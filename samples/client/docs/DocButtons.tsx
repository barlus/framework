import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import { DocPage, DocSection } from '../comps/DocPage';

export class DocButtons extends DocPage {
    static title = 'Buttons';
    render() {
        return <DocSection id={this.id} title={this.title}>
            <div className="docs-note">
                <p>Buttons include simple button styles for actions in different types and sizes. </p>
            </div>
            <div className="columns">
                <div className="column col-xs-12">
                    <button className="btn">default button</button>
                    {' '}
                    <button className="btn btn-primary">primary button</button>
                    {' '}
                    <button className="btn btn-link">link button</button>
                </div>
            </div>
            <div className="docs-note">
                <p>
                    Add the <code>btn</code> class to <code>a</code>, <code>input</code> or <code>button</code> elements
                    for a default button.
                    There are classes <code>btn-primary</code> and <code>btn-link</code> for predefined
                    primary
                    and link buttons.
                </p>
            </div>
            <Code className="HTML">{E1}</Code>
            <h4 id="buttons-colors" className="s-subtitle">Button colors</h4>
            <div className="columns">
                <div className="column col-12">
                    <button className="btn btn-success">success button</button>
                    {' '}
                    <button className="btn btn-error">error button</button>
                </div>
            </div>
            <div className="docs-note">
                <p>Add the <code>btn-success</code> or <code>btn-error</code> class for success (green)
                    or error (red) button color. If you need more button colors, please
                    use <a href="#variables-buttons">button mixins</a> to create your own button
                    color variants. </p>
            </div>
            <Code className="HTML">{E2}</Code>
            <h4 id="buttons-sizes" className="s-subtitle">Button sizes</h4>
            <div className="columns">
                <div className="column col-12">
                    <button className="btn btn-primary btn-lg">large <i className="icon icon-arrow-down"/></button>
                    {' '}
                    <button className="btn btn-primary btn-lg">large button</button>
                </div>
                <div className="column col-12">
                    <button className="btn btn-primary">normal <i className="icon icon-arrow-down"/></button>
                    {' '}
                    <button className="btn btn-primary">normal button</button>
                </div>
                <div className="column col-12">
                    <button className="btn btn-primary btn-sm">small <i className="icon icon-arrow-down"/></button>
                    {' '}
                    <button className="btn btn-primary btn-sm">small button</button>
                </div>
            </div>
            <div className="docs-note">
                <p>Add the <code>btn-sm</code> or <code>btn-lg</code> class for small or large button size.
                    Also, you
                    can add the <code>btn-block</code> class for a full-width button. </p>
            </div>
            <Code className="HTML">{E3}</Code>
            <div className="docs-note">
                <p>Please note that you could use the <code>btn-action</code> class for a square button, or add
                    another
                    <code>circle</code> class for a round button, which is often used as a Float Action Button
                    (FAB).
                </p>
            </div>
            <div className="columns">
                <div className="column col-xs-12">
                    <button className="btn btn-action btn-primary btn-lg">
                        <i className="icon icon-menu"/>
                    </button>
                    {' '}
                    <button className="btn btn-action btn-primary">
                        <i className="icon icon-menu"/>
                    </button>
                    {' '}
                    <button className="btn btn-action btn-primary btn-sm"><i className="icon icon-menu"/></button>
                </div>
                <div className="column col-xs-12">
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
            </div>
            <Code className="HTML">{E4}</Code>
            <h4 id="buttons-states" className="s-subtitle">Button states</h4>
            <div className="docs-note">
                <p>Add the <code>active</code> class for active button state style.</p>
            </div>
            <div className="columns">
                <div className="column col-xs-12">
                    <button className="btn active">default active</button>
                    {' '}
                    <button className="btn btn-primary active">primary active</button>
                    {' '}
                    <button className="btn btn-link active">link active</button>
                </div>
            </div>
            <Code className="HTML">{E5}</Code>
            <div className="columns">
                <div className="column col-xs-12">
                    <button className="btn disabled" tabIndex={-1}>default disabled</button>
                    {' '}
                    <button className="btn btn-primary" disabled tabIndex={-1}>primary disabled</button>
                    {' '}
                    <button className="btn btn-link" disabled tabIndex={-1}>link disabled</button>
                </div>
            </div>
            <Code className="HTML">{E6}</Code>
            <div className="docs-note">
                <p>A button with the <code>loading</code> class can show loading indicator.</p>
            </div>
            <div className="columns">
                <div className="column col-xs-12">
                    <button className="btn loading">default button</button>
                    {' '}
                    <button className="btn btn-primary loading">primary button</button>
                    {' '}
                    <button className="btn btn-link loading">link button</button>
                </div>
            </div>
            <Code className="HTML">{E7}</Code>
            <h4 id="buttons-groups" className="s-subtitle">Button groups</h4>
            <div className="columns">
                <div className="column col-md-12">
                    <div className="btn-group">
                        <button className="btn">first button</button>
                        <button className="btn">second button</button>
                        <button className="btn">third button</button>
                    </div>
                </div>
                <div className="column col-md-12">
                    <div className="btn-group btn-group-block">
                        <button className="btn btn-primary">first button</button>
                        <button className="btn btn-primary">second button</button>
                        <button className="btn btn-primary">third button</button>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-md-12">
                    <div className="btn-group">
                        <button className="btn btn-sm active">first button</button>
                        <button className="btn btn-sm">second button</button>
                        <button className="btn btn-sm">third button</button>
                    </div>
                </div>
                <div className="column col-md-12">
                    <div className="btn-group btn-group-block">
                        <button className="btn btn-primary btn-sm active">first button</button>
                        <button className="btn btn-primary btn-sm">second button</button>
                        <button className="btn btn-primary btn-sm">third button</button>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>If you want to use buttons as a group, add the <code>btn-group</code> class to the container.
                    You can
                    add the <code>btn-group-block</code> class for a full-width button group.</p>
            </div>
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