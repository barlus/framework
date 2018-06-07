import * as React from "@barlus/nerv"
import { Column, Columns, Container } from '@barlus/spectre';

import { DocExample, DocNote } from '../../comps/DocPage';

const E1 = ``;
const E2 = ``;

export class DocGrid extends React.PureComponent<{}, {}> {
    render() {
        return <Container>
            <h3 className="s-title"><a href="#grid" className="anchor" aria-hidden="true">#</a>Flexbox grid</h3>
            <div className="docs-note">
                <p>Layout includes flexbox based responsive grid system with 12 columns. </p>
            </div>
            <Columns>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
                <Column>
                    <div className="bg-primary text-secondary docs-block"/>
                </Column>
            </Columns>
            <Columns>
                <Column all={12}>
                    <div className="bg-gray docs-block">col-12 (100%) A</div>
                </Column>
            </Columns>
            <Columns>
                <Column>
                    <div className="bg-gray docs-block">col-9 (75%)</div>
                </Column>
            </Columns>
            <Columns>
                <div className="column col-6">
                    <div className="bg-gray docs-block">col-6 (50%)</div>
                </div>
            </Columns>
            <Columns>
                <div className="column col-3">
                    <div className="bg-gray docs-block">col-3 (25%)</div>
                </div>
            </Columns>
            <DocNote>
                    Add the <code>columns</code> class to a container with the <code>container</code> class. And
                    add any element you want with the <code>column</code> class inside the container. These
                    columns will take up the space equally. You can specific the width of each column by adding
                    class <code>col-[1-12]</code>.<br/>
                    And you can add the <code>col-gapless</code> class to the <code>columns</code> to have
                    gapless columns.
            </DocNote>
            <Columns gapless>
                <Column>
                    <div className="bg-gray docs-block">col-6 (gapless)</div>
                </Column>
                <div className="column col-6">
                    <div className="bg-gray docs-block">col-6 (gapless)</div>
                </div>
            </Columns>
            <div className="docs-note">
                <p>By default, Spectre grid has multi-line flexbox enabled. You can add
                    the <code>col-oneline</code> class to <code>columns</code> to make all its child columns
                    positioned in the same single row.</p>
            </div>
            <Columns oneline>
                <div className="column col-8">
                    <div className="bg-gray docs-block">col-8</div>
                </div>
                <div className="column col-8">
                    <div className="bg-gray docs-block">col-8</div>
                </div>
            </Columns>
            <DocExample content={EX1}/>
            <h4 id="grid-offset" className="s-subtitle">Grid offset</h4>
            <div className="docs-note">
                <p>The Flexbox grid provides margin auto utilities to set offset. There
                    are <code>col-mx-auto</code>, <code>col-ml-auto</code> and <code>col-mr-auto</code> to set
                    margins between columns without using empty columns.</p>
            </div>
            <Columns>
                <div className="column col-2">
                    <div className="bg-gray docs-block">col-2</div>
                </div>
                <div className="column col-4 col-mx-auto">
                    <div className="bg-gray docs-block">col-4 col-mx-auto</div>
                </div>
            </Columns>
            <Columns>
                <div className="column col-2">
                    <div className="bg-gray docs-block">col-2</div>
                </div>
                <div className="column col-4 col-ml-auto">
                    <div className="bg-gray docs-block">col-4 col-ml-auto</div>
                </div>
            </Columns>
            <Columns>
                <div className="column col-4 col-ml-auto">
                    <div className="bg-gray docs-block">col-4 col-ml-auto</div>
                </div>
                <div className="column col-2">
                    <div className="bg-gray docs-block">col-2</div>
                </div>
            </Columns>
            <Columns>
                <div className="column col-4 col-mx-auto">
                    <div className="bg-gray docs-block">col-4 col-mx-auto</div>
                </div>
                <div className="column col-2">
                    <div className="bg-gray docs-block">col-2</div>
                </div>
            </Columns>
            <Columns>
                <div className="column col-4 col-mr-auto">
                    <div className="bg-gray docs-block">col-4 col-mr-auto</div>
                </div>
                <div className="column col-2">
                    <div className="bg-gray docs-block">col-2</div>
                </div>
            </Columns>
            <Columns>
                <div className="column col-4 col-mx-auto">
                    <div className="bg-gray docs-block">col-4 col-mx-auto</div>
                </div>
            </Columns>
            <DocExample content={EX1}/>
            <Columns>
                <Column>
                    <div className="bg-gray docs-block">col-6</div>
                    <Columns>
                        <Column>
                            <div className="bg-primary docs-block">col-6</div>
                        </Column>
                        <Column>
                            <div className="bg-primary docs-block">col-6</div>
                        </Column>
                    </Columns>
                </Column>
                <Column>
                    <div className="bg-gray docs-block">col-6</div>
                </Column>
            </Columns>
            <DocExample content={EX1}/>
        </Container>
    }
}

const EX1 = [ `
<Container>
  <Columns>
    <Column>col-3</div>
    <Column>col-3</div>
    <Column>col-3</div>
    <Column>col-3</div>
  </Columns>

  <Columns gapless>
    <Column>col-6</div>
    <Column>col-6</div>
  </div>

  <Columns oneline>
    <Column>col-6</div>
    <Column>col-6</div>
  </div>
</Container>
` ];
const EX2 = [ `
<!-- TODO -->
` ];