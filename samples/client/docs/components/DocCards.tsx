import * as React from "@barlus/react"
import { DocExample, DocPage, DocSample, DocSection, DocText } from "../../comps/DocPage";
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardImage,
    CardSubTitle,
    CardTitle
} from "@barlus/spectre";

export class DocCards extends DocPage {
    static title = 'Cards';
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text='Cards are flexible content containers.'/>
            <DocSample columns={2}>
                <Card>
                    <CardImage src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"/>
                    <CardHeader>
                        <CardTitle h5>Microsoft</CardTitle>
                        <CardSubTitle>Software and hardware</CardSubTitle>
                    </CardHeader>
                    <CardBody>
                        Empower every person and every organization on the planet to achieve more.
                    </CardBody>
                    <CardFooter>
                        <Button primary>Do</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle h5>Apple</CardTitle>
                        <CardSubTitle>Hardware and software</CardSubTitle>
                    </CardHeader>
                    <CardImage src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg"/>
                    <CardBody>
                        To make a contribution to the world by making tools for the mind that advance
                        humankind.
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup>
                            <Button primary>Buy</Button>
                            <Button>Buy</Button>
                            <Button>Buy</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </DocSample>
            <DocText text={`
                Add a container component ~Card~. And add child elements with
                the ~CardImage~,
                ~CardHeader~, ~CardBody~, and/or ~CardFooter~ classes.
                The ~CardImage~ can be placed in any position.
            `}/>
            <DocExample content={`
                <Card>
                    <CardImage  src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"/>
                    <CardHeader>
                        <CardTitle h5>Microsoft</CardTitle>
                        <CardSubTitle>Software and hardware</CardSubTitle>
                    </CardHeader>
                    <CardBody>
                        Empower every person and every organization on the planet to achieve more.
                    </CardBody>
                    <CardFooter>
                        <Button primary>Do</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle h5>Apple</CardTitle>
                        <CardSubTitle>Hardware and software</CardSubTitle>
                    </CardHeader>
                    <CardImage   src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg"/>
                    <CardBody>
                        To make a contribution to the world by making tools for the mind that advance
                        humankind.
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup>
                            <Button primary>Buy</Button>
                            <Button>Buy</Button>
                            <Button>Buy</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            `}/>
        </DocSection>
    }
}