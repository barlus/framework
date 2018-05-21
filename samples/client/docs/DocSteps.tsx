import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocExample, DocNote, DocPage, DocSample, DocSection, DocText} from "../comps/DocPage";
import {Step, StepItem, Tooltip} from "@barlus/spectre";


export class DocSteps extends DocPage {
    static title = "Steps";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocText text='Steps are progress indicators of a sequence of task steps.'/>
            <DocSample>
                <Step>
                    <StepItem>
                        <Tooltip label="Step-1 Tooltip"><a href="#steps"/></Tooltip>
                    </StepItem>
                    <StepItem active>
                        <Tooltip label="Step-2 Tooltip"><a href="#steps"/></Tooltip>
                    </StepItem>
                    <StepItem>
                        <Tooltip label="Step-3 Tooltip"><a href="#steps"/></Tooltip>
                    </StepItem>
                    <StepItem>
                        <Tooltip label="Step-4 Tooltip"><a href="#steps"/></Tooltip>
                    </StepItem>
                </Step>
                <Step>
                    <StepItem>
                        <Tooltip label="Step-1 Tooltip"><a href="#steps">Step 1</a></Tooltip>
                    </StepItem>
                    <StepItem >
                        <Tooltip label="Step-2 Tooltip"><a href="#steps">Step 2</a></Tooltip>
                    </StepItem>
                    <StepItem active>
                        <Tooltip label="Step-3 Tooltip"><a href="#steps">Step 3</a></Tooltip>
                    </StepItem>
                    <StepItem>
                        <Tooltip label="Step-4 Tooltip"><a href="#steps">Step 4</a></Tooltip>
                    </StepItem>
                </Step>
            </DocSample>
            <DocText text={`
                Add a container element with the ~Step~ component. And add child elements with
                the ~StepItem~ component. The ~StepItem~ with the ~active~ attribute will be highlighted and
                indicate the current state of progress.
            `}/>
            <DocExample content={`
                <Step>
                    <StepItem>
                        <Tooltip label="Step-1 Tooltip"><a href="#steps">Step 1</a></Tooltip>
                    </StepItem>
                    <StepItem >
                        <Tooltip label="Step-2 Tooltip"><a href="#steps">Step 2</a></Tooltip>
                    </StepItem>
                    <StepItem active>
                        <Tooltip label="Step-3 Tooltip"><a href="#steps">Step 3</a></Tooltip>
                    </StepItem>
                    <StepItem>
                        <Tooltip label="Step-4 Tooltip"><a href="#steps">Step 4</a></Tooltip>
                    </StepItem>
                </Step>
            `}/>
        </DocSection>
    }
}