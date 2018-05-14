import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection, DocTitle} from "../comps/DocPage";


export class DocGrid extends DocPage{
    static title = 'Grid';

    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>Layout includes flexbox based responsive grid system with 12 columns.</DocNote>
            <DocSample columns={12}>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
                <div className="bg-primary text-secondary docs-block"/>
            </DocSample>
            <DocSample >
                <div className="bg-gray docs-block">col-12 (100%)</div>
            </DocSample>
            <DocSample columns={12/9}>
                <div className="bg-gray docs-block">col-9 (75%)</div>
            </DocSample>
            <DocSample columns={2}>
                <div className="bg-gray docs-block">col-6 (50%)</div>
            </DocSample>
            <DocSample columns={4}>
                <div className="bg-gray docs-block">col-3 (25%)</div>
            </DocSample>
            <DocNote>
                Add the <code>columns</code> class to a container with the <code>container</code> class. And
                add any element you want with the <code>column</code> class inside the container. These
                columns will take up the space equally. You can specific the width of each column by adding
                class <code>col-[1-12]</code>.<br/><br/>
                And you can add the <code>col-gapless</code> class to the <code>columns</code> to have
                gapless columns.
            </DocNote>
            <DocSample columns={2} className='col-gapless'>
                <div className="bg-gray docs-block">col-6 (gapless)</div>
                <div className="bg-gray docs-block">col-6 (gapless)</div>
            </DocSample>
            <DocNote>
                By default, Spectre grid has multi-line flexbox enabled. You can add
                the <code>col-oneline</code> class to <code>columns</code> to make all its child columns
                positioned in the same single row.
            </DocNote>
            <DocSample  columns={12/8} className={"col-oneline"}>
                <div className="bg-gray docs-block">col-8</div>
                <div className="bg-gray docs-block">col-8</div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
            <DocTitle>Grid offset</DocTitle>
            <DocNote>
                The Flexbox grid provides margin auto utilities to set offset. There
                are <code>col-mx-auto</code>, <code>col-ml-auto</code> and <code>col-mr-auto</code> to set
                margins between columns without using empty columns.
            </DocNote>
            <DocSample>
                <div class="columns">
                    <div className="column col-2">
                        <div className="bg-gray docs-block">col-2</div>
                    </div>
                    <div className="column col-4 col-mx-auto">
                        <div className="bg-gray docs-block">col-4 col-mx-auto</div>
                    </div>
                </div>
            </DocSample>
            <DocSample>
                <div class="columns">
                    <div className="column col-2">
                        <div className="bg-gray docs-block">col-2</div>
                    </div>
                    <div className="column col-4 col-ml-auto">
                        <div className="bg-gray docs-block">col-4 col-ml-auto</div>
                    </div>
                </div>
            </DocSample>
            <DocSample>
                <div class="columns">
                    <div className="column col-4 col-ml-auto">
                        <div className="bg-gray docs-block">col-4 col-ml-auto</div>
                    </div>
                    <div className="column col-2">
                        <div className="bg-gray docs-block">col-2</div>
                    </div>
                </div>
            </DocSample>
            <DocSample>
                <div class="columns">
                    <div className="column col-4 col-mx-auto">
                        <div className="bg-gray docs-block">col-4 col-mx-auto</div>
                    </div>
                    <div className="column col-2">
                        <div className="bg-gray docs-block">col-2</div>
                    </div>
                </div>
            </DocSample>
            <DocSample>
                <div class="columns">
                    <div className="column col-4 col-mr-auto">
                        <div className="bg-gray docs-block">col-4 col-mr-auto</div>
                    </div>
                    <div className="column col-2">
                        <div className="bg-gray docs-block">col-2</div>
                    </div>
                </div>
            </DocSample>
            <DocSample>
                <div class="columns">
                    <div className="column col-4 col-mx-auto">
                        <div className="bg-gray docs-block">col-4 col-mx-auto</div>
                    </div>
                </div>
            </DocSample>
            <Code className="HTML">{E2}</Code>
            <DocTitle>Grid nesting</DocTitle>
            <DocNote>
                To nest grids, add the new <code>columns</code> and <code>column</code> structure within an
                existing column.
            </DocNote>
            <DocSample columns={2}>
                <div>
                    <div className="bg-gray docs-block">col-6</div>
                    <div class="columns">
                        <div className="column col-6">
                            <div className="bg-primary docs-block">col-6</div>
                        </div>
                        <div className="column col-6">
                            <div className="bg-primary docs-block">col-6</div>
                        </div>
                    </div>
                </div>
                <div><div className="bg-gray docs-block">col-6</div></div>
            </DocSample>
            <Code className='HTML'>{E3}</Code>
        </DocSection>
    }
}

const E1 = `<div class="container">
  <div class="columns">
    <div class="column col-6">col-6</div>
    <div class="column col-3">col-3</div>
    <div class="column col-2">col-2</div>
    <div class="column col-1">col-1</div>
  </div>

  <div class="columns col-gapless">
    <div class="column col-6">col-6</div>
    <div class="column col-6">col-6</div>
  </div>

  <div class="columns col-oneline">
    <div class="column col-8">col-8</div>
    <div class="column col-8">col-8</div>
  </div>
</div>`;
const E2 = `<div class="container">
  <div class="columns">
    <div class="column col-4 col-mr-auto">col-4 col-mr-auto</div>
    <div class="column col-2">col-2</div>
  </div>
</div>`;
const E3 = `<div class="container">
  <div class="columns">
    <div class="column col-6">col-6
      <div class="columns">
        <div class="column col-6">col-6</div>
        <div class="column col-6">col-6</div>
      </div>
    </div>
    <div class="column col-6">col-6</div>
  </div>
</div>`;