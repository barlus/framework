import * as React from "@barlus/nerv"
import { Button, ButtonGroup } from "@barlus/spectre"
import { Code } from "../../comps/Code";
import { DocPage, DocSection, DocNote, DocSample, DocTitle, DocExample } from '../../comps/DocPage';

export class DocButtons extends DocPage {
    static title = 'Buttons';
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                <p>Buttons include simple button styles for actions in different types and sizes. </p>
            </DocNote>
            <DocSample columns={3}>
                <Button>default button</Button>
                <Button primary>primary button</Button>
                <Button link>link button</Button>
            </DocSample>
            <DocNote>
                <p>
                    Add the <code>btn</code> class to <code>a</code>, <code>input</code> or <code>button</code> elements
                    for a default button.
                    There are classes <code>btn-primary</code> and <code>btn-link</code> for predefined
                    primary and link buttons.
                </p>
            </DocNote>
            <DocExample content={E1}/>
            <DocTitle>Button colors</DocTitle>
            <DocSample columns={3}>
                <Button success>success button</Button>
                <Button warning>warning button</Button>
                <Button error>error button</Button>
            </DocSample>
            <DocNote>
                <p>Add the <code>btn-success</code> or <code>btn-error</code> class for success (green)
                    or error (red) button color. If you need more button colors, please
                    use <a href="#variables-buttons">button mixins</a> to create your own button
                    color variants. </p>
            </DocNote>
            <DocExample content={E2}/>
            <DocTitle>Button sizes</DocTitle>
            <DocSample columns={2}>
                <Button success large>large <i className="icon icon-arrow-down"/></Button>
                <Button error large>large button</Button>
                <Button primary>normal <i className="icon icon-arrow-down"/></Button>
                <Button primary>normal button</Button>
                <Button small>small <i className="icon icon-arrow-down"/></Button>
                <Button small>small button</Button>
            </DocSample>
            <DocNote>
                <p>Add the <code>btn-sm</code> or <code>btn-lg</code> class for small or large button size.
                    Also, you
                    can add the <code>btn-block</code> class for a full-width button. </p>
            </DocNote>
            <Code className="HTML">{E3}</Code>
            <DocNote>
                <p>Please note that you could use the <code>btn-action</code> class for a square button, or add
                    another
                    <code>circle</code> class for a round button, which is often used as a Float Action Button
                    (FAB).
                </p>
            </DocNote>
            <DocSample columns={2}>
                <div>
                    <Button action large><i className="icon icon-menu"/></Button>
                    {' '}
                    <Button action primary><i className="icon icon-menu"/></Button>
                    {' '}
                    <Button action small warning><i className="icon icon-menu"/></Button>
                </div>
                <div>
                    <Button action large circle><i className="icon icon-arrow-up"/></Button>
                    {' '}
                    <Button action primary circle><i className="icon icon-arrow-up"/></Button>
                    {' '}
                    <Button action small circle success><i className="icon icon-arrow-up"/></Button>
                </div>
            </DocSample>
            <Code className="HTML">{E4}</Code>
            <DocTitle>Button states</DocTitle>
            <DocNote>
                <p>Add the <code>active</code> class for active button state style.</p>
            </DocNote>
            <DocSample>
                <div>
                    <Button active>default active</Button>
                    {' '}
                    <Button active primary>primary active</Button>
                    {' '}
                    <Button active link>link active</Button>
                </div>
            </DocSample>
            <Code className="HTML">{E5}</Code>
            <DocSample>
                <div>
                    <Button disabled tabIndex={-1}>default disabled</Button>
                    {' '}
                    <Button primary tabIndex={-1}>primary disabled</Button>
                    {' '}
                    <Button link disabled tabIndex={-1}>link disabled</Button>
                </div>
            </DocSample>
            <Code className="HTML">{E6}</Code>
            <DocNote>
                <p>A button with the <code>loading</code> class can show loading indicator.</p>
            </DocNote>
            <DocSample>
                <div>
                    <Button loading>default button</Button>
                    {' '}
                    <Button primary loading>primary button</Button>
                    {' '}
                    <Button link loading>link button</Button>
                </div>
            </DocSample>
            <Code className="HTML">{E7}</Code>
            <DocTitle>Button groups</DocTitle>
            <DocSample columns={2}>
                <ButtonGroup>
                    <Button active>first button</Button>
                    <Button>second button</Button>
                    <Button>third button</Button>
                </ButtonGroup>
                <ButtonGroup block>
                    <Button primary>first button</Button>
                    <Button primary>second button</Button>
                    <Button primary>third button</Button>
                </ButtonGroup>
            </DocSample>
            <DocSample columns={2}>
                <ButtonGroup>
                    <Button active small>first button</Button>
                    <Button small>second button</Button>
                    <Button small>third button</Button>
                </ButtonGroup>
                <ButtonGroup block>
                    <Button primary small>first button</Button>
                    <Button primary small>second button</Button>
                    <Button primary small>third button</Button>
                </ButtonGroup>
            </DocSample>
            <DocNote>
                <p>
                    If you want to use buttons as a group, add the <code>btn-group</code> class to the container.
                    You can add the <code>btn-group-block</code> class for a full-width button group.
                </p>
            </DocNote>
            <Code className="HTML">{E8}</Code>
        </DocSection>
    }
}

const E1 = [ `
<Button>default button</Button>
<Button primary>primary button</Button>
<Button link>link button</Button>
` ];
const E2 = [ `
<Button success>default button</Button>
<Button warning>primary button</Button>
<Button error>link button</Button>
` ];
const E3 = `<!-- TODO -->`;
const E4 = `<!-- TODO -->`;
const E5 = `<!-- TODO -->`;
const E6 = `<!-- TODO -->`;
const E7 = `<!-- TODO -->`;
const E8 = `<!-- TODO -->`;