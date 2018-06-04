import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocExample, DocNote, DocPage, DocSample, DocSection, DocText} from "../comps/DocPage";
import {Image, Input, InputGroup, InputGroupButton, Navbar, NavbarBrand, NavbarSection,} from "@barlus/spectre";


export class DocNavbar extends DocPage {
    static title = "Navbar";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>Navbar is a layout container that appears in the header of apps and websites. </DocNote>
            <DocSample>
                <Navbar>
                    <NavbarSection>
                        <NavbarBrand className='mr-2'>Spectre.css</NavbarBrand>
                        <a href="https://github.com/picturepan2/spectre" className="btn btn-link">GitHub</a>
                    </NavbarSection>
                    <NavbarSection>
                        <InputGroup>
                            <Input placeholder='Search'/>
                            <InputGroupButton  >Search</InputGroupButton>
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
                        <a href="https://github.com/picturepan2/spectre" className="btn btn-link">GitHub</a>
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
                <Navbar >
                    <NavbarSection>
                        <a href="#navbar" className="btn btn-link">Docs</a>
                        <a href="#navbar" className="btn btn-link">Examples</a>
                    </NavbarSection>
                    <NavbarSection center>
                        <Image src='https://picturepan2.github.io/spectre/img/spectre-logo.svg'/>
                    </NavbarSection>
                    <NavbarSection>
                        <a href="https://twitter.com/spectrecss" className="btn btn-link">Twitter</a>
                        <a href="https://github.com/picturepan2/spectre" className="btn btn-link">GitHub</a>
                    </NavbarSection>
                </Navbar>
            </DocSample>
            <DocExample content={`
                <Navbar>
                    <NavbarSection>
                        <a href="#navbar" className="btn btn-link">Docs</a>
                        <a href="#navbar" className="btn btn-link">Examples</a>
                    </NavbarSection>
                    <NavbarSection center>
                        <Image src='https://picturepan2.github.io/spectre/img/spectre-logo.svg'/>
                    </NavbarSection>
                    <NavbarSection>
                        <a href="https://twitter.com/spectrecss" className="btn btn-link">Twitter</a>
                        <a href="https://github.com/picturepan2/spectre" className="btn btn-link">GitHub</a>
                    </NavbarSection>
                </Navbar>
            `}/>
        </DocSection>
    }
}