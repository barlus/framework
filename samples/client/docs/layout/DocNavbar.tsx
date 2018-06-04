import * as React from "@barlus/nerv"
import { DocExample, DocNote, DocPage, DocSample, DocSection, DocText } from "../../comps/DocPage";
import {
    Button,
    Image,
    Input,
    InputGroup,
    InputGroupButton,
    Navbar,
    NavbarBrand,
    NavbarSection,
} from "@barlus/spectre";

export class DocNavbar extends DocPage {
    static title = "Navbar";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>Navbar is a layout container that appears in the header of apps and websites. </DocNote>
            <DocSample>
                <Navbar>
                    <NavbarSection>
                        <NavbarBrand className='mr-2'>Spectre.css</NavbarBrand>
                        <Button link>GitHub</Button>
                    </NavbarSection>
                    <NavbarSection>
                        <InputGroup>
                            <Input placeholder='Search'/>
                            <InputGroupButton>Search</InputGroupButton>
                        </InputGroup>
                    </NavbarSection>
                </Navbar>
            </DocSample>
            <DocText text={`
                The ~Navbar~ component can include logo brand, nav links and buttons, search box or any
                combination of those elements. Each section with the ~NavbarSection~ component will
                be evenly distributed in the container.
            `}/>
            <DocExample content={`
                <Navbar>
                    <NavbarSection>
                        <NavbarBrand className='mr-2'>Spectre.css</NavbarBrand>
                        <Button link>GitHub</Button>
                    </NavbarSection>
                    <NavbarSection>
                        <InputGroup>
                            <Input placeholder='Search'/>
                            <InputGroupButton  >Search</InputGroupButton>
                        </InputGroup>
                    </NavbarSection>
                </Navbar>
            `}/>
            <DocText text={`You can use ~center~ attribute to have a centered section.`}/>
            <DocSample>
                <Navbar>
                    <NavbarSection>
                        <Button link>Docs</Button>
                        <Button link>Examples</Button>
                    </NavbarSection>
                    <NavbarSection center>
                        <Image src='https://picturepan2.github.io/spectre/img/spectre-logo.svg'/>
                    </NavbarSection>
                    <NavbarSection>
                        <Button link>Twitter</Button>
                        <Button link>GitHub</Button>
                    </NavbarSection>
                </Navbar>
            </DocSample>
            <DocExample content={`
                <Navbar>
                    <NavbarSection>
                         <Button link>Docs</Button>
                         <Button link>Examples</Button>
                    </NavbarSection>
                    <NavbarSection center>
                        <Image src='https://picturepan2.github.io/spectre/img/spectre-logo.svg'/>
                    </NavbarSection>
                    <NavbarSection>
                        <Button link>Twitter</Button>
                        <Button link>GitHub</Button>
                    </NavbarSection>
                </Navbar>
            `}/>
        </DocSection>
    }
}