import * as React from "@barlus/react"

import { DocExample, DocPage, DocSample, DocSection, DocText } from "../../comps/DocPage";
import {
    Button, Card, CardBody, CardFooter, CardHeader, CardSubTitle, CardTitle, Popover,
    PopoverContainer
} from "@barlus/spectre";

export class DocPopovers extends DocPage {
    static title = "Popovers";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText
                text='Popovers are small overlay content containers. Popovers component is built entirely in CSS.'/>
            <DocSample columns={4}>
                <Popover>
                    <Button primary>top popover</Button>
                    <PopoverContainer>
                        <Card>
                            <CardHeader>
                                <CardTitle h5>Apple</CardTitle>
                                <CardSubTitle className='text-gray'>Software and hardware</CardSubTitle>
                            </CardHeader>
                            <CardBody>
                                To make a contribution to the world by making tools for the mind that
                                advance
                                humankind.
                            </CardBody>
                            <CardFooter>
                                <Button primary>Buy</Button>
                            </CardFooter>
                        </Card>
                    </PopoverContainer>
                </Popover>
                <Popover right>
                    <Button primary>right popover</Button>
                    <PopoverContainer>
                        <Card>
                            <CardHeader>
                                <CardTitle h5>Apple</CardTitle>
                                <CardSubTitle className='text-gray'>Software and hardware</CardSubTitle>
                            </CardHeader>
                            <CardBody>
                                To make a contribution to the world by making tools for the mind that
                                advance
                                humankind.
                            </CardBody>
                            <CardFooter>
                                <Button primary>Buy</Button>
                            </CardFooter>
                        </Card>
                    </PopoverContainer>
                </Popover>
                <Popover bottom>
                    <Button primary>bottom popover</Button>
                    <PopoverContainer>
                        <Card>
                            <CardHeader>
                                <CardTitle h5>Apple</CardTitle>
                                <CardSubTitle className='text-gray'>Software and hardware</CardSubTitle>
                            </CardHeader>
                            <CardBody>
                                To make a contribution to the world by making tools for the mind that
                                advance
                                humankind.
                            </CardBody>
                            <CardFooter>
                                <Button primary>Buy</Button>
                            </CardFooter>
                        </Card>
                    </PopoverContainer>
                </Popover>
                <Popover left>
                    <Button primary>left popover</Button>
                    <PopoverContainer>
                        <Card>
                            <CardHeader>
                                <CardTitle h5>Apple</CardTitle>
                                <CardSubTitle className='text-gray'>Software and hardware</CardSubTitle>
                            </CardHeader>
                            <CardBody>
                                To make a contribution to the world by making tools for the mind that
                                advance
                                humankind.
                            </CardBody>
                            <CardFooter>
                                <Button primary>Buy</Button>
                            </CardFooter>
                        </Card>
                    </PopoverContainer>
                </Popover>
            </DocSample>
            <DocText text={`
                Wrap an element by a container with the ~Popover~ component. And add a container with
                the ~PopoverContainer~ next to the element. You can use ~Card~ component
                inside the ~PpoverContainer~


                Also, you can add the ~right~, ~bottom~ or ~left~ attributes to define the position.
                By default, the popovers appear above the element.
            `}/>
            <DocExample content={`
                <Popover>
                    <Button primary>top popover</Button>
                    <PopoverContainer>
                        <Card>
                            <CardHeader>
                                <CardTitle h5>Apple</CardTitle>
                                <CardSubTitle className='text-gray'>Software and hardware</CardSubTitle>
                            </CardHeader>
                            <CardBody>
                                To make a contribution to the world by making tools for the mind that
                                advance
                                humankind.
                            </CardBody>
                            <CardFooter>
                                <Button primary>Buy</Button>
                            </CardFooter>
                        </Card>
                    </PopoverContainer>
                </Popover>
            `}/>
        </DocSection>
    }
}

const E1 = `<div className="popover popover-right">
  <button className="btn btn-primary">right popover</button>
  <div className="popover-container">
    <div className="card">
      <div className="card-header">
        ...
      </div>
      <div className="card-body">
        ...
      </div>
      <div className="card-footer">
        ...
      </div>
    </div>
  </div>
</div>`;