import * as React from "@barlus/react"
import { DocExample, DocPage, DocSample, DocSection, DocText } from "../../comps/DocPage";
import { Tooltip, Button } from "@barlus/spectre";

export class DocTooltips extends DocPage {
    static title = "Tooltips";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text={'Tooltips provide context information labels that appear on hover and focus.'}/>
            <DocSample columns={4} className='text-center'>
                <Tooltip label="Top tooltip text">
                    <Button>Top tooltip</Button>
                </Tooltip>
                <Tooltip left label="Left tooltip text">
                    <Button>Left tooltip</Button>
                </Tooltip>
                <Tooltip right label="Right tooltip text">
                    <Button>Right tooltip</Button>
                </Tooltip>
                <Tooltip bottom label="Bottom tooltip text">
                    <Button>Bottom tooltip</Button>
                </Tooltip>
            </DocSample>
            <DocText text={`
                Tooltips component is built entirely in CSS.
                Wrap non self closing elements with the ~Tooltip~ .And add
                the ~right~, ~bottom~
                or ~tooltip-left~ attributes to define the position of a tooltip. By default, the
                tooltip
                appears above the element.
            `}/>
            <DocExample content={`
                <Tooltip label="Top tooltip text">
                    <Button>Top tooltip</Button>
                </Tooltip>
                <Tooltip left label="Left tooltip text">
                    <Button>Left tooltip</Button>
                </Tooltip>
                <Tooltip right label="Right tooltip text">
                    <Button>Right tooltip</Button>
                </Tooltip>
                <Tooltip bottom label="Bottom tooltip text">
                    <Button>Bottom tooltip</Button>
                </Tooltip>
            `}/>
        </DocSection>
    }
}
const E1 = `<button className="btn tooltip" data-tooltip="Lorem ipsum dolor sit amet">top tooltip</button>
<button className="btn tooltip tooltip-right" data-tooltip="Lorem ipsum dolor sit amet">right tooltip</button>`;