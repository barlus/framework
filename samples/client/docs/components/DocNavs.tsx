import * as React from "@barlus/nerv"

import { DocExample,  DocPage, DocSample, DocSection, DocText } from "../../comps/DocPage";
import { Nav, NavItem } from "@barlus/spectre";

export class DocNavs extends DocPage {
    static title = "Navs";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocSample columns={2}>
                <Nav>
                    <NavItem>
                        <a href="#nav">Elements</a>
                    </NavItem>
                    <NavItem active>
                        <a href="#nav">Layout</a>
                        <Nav>
                            <NavItem>
                                <a href="#nav">Flexbox grid</a>
                            </NavItem>
                            <NavItem>
                                <a href="#nav">Responsive</a>
                            </NavItem>
                            <NavItem>
                                <a href="#nav">Navbar</a>
                            </NavItem>
                        </Nav>
                    </NavItem>
                    <NavItem>
                        <a href="#nav">Components</a>
                    </NavItem>
                    <NavItem>
                        <a href="#nav">Utilities</a>
                    </NavItem>
                </Nav>
            </DocSample>
            <DocText text={`
                Add a container component ~Nav~. And add child elements with
                the ~NavItem~. The ~NavItem~ with the ~active~ attribute will be highlighted.
            `}/>
            <DocExample content={`
                <Nav>
                    <NavItem>
                        <a href="#nav">Elements</a>
                    </NavItem>
                    <NavItem active>
                        <a href="#nav">Layout</a>
                        <Nav>
                            <NavItem>
                                <a href="#nav">Flexbox grid</a>
                            </NavItem>
                            <NavItem>
                                <a href="#nav">Responsive</a>
                            </NavItem>
                            <NavItem>
                                <a href="#nav">Navbar</a>
                            </NavItem>
                        </Nav>
                    </NavItem>
                    <NavItem >
                        <a href="#nav">Components</a>
                    </NavItem>
                    <NavItem >
                        <a href="#nav">Utilities</a>
                    </NavItem>
                </Nav>
            `}/>
        </DocSection>
    }
}

const E1 = `<ul className="nav">
  <li className="nav-item">
    <a href="#">Elements</a>
  </li>
  <li className="nav-item active">
    <a href="#">Layout</a>
    <ul className="nav">
      <li className="nav-item">
        <a href="#">Flexbox grid</a>
      </li>
      <li className="nav-item">
        <a href="#">Responsive</a>
      </li>
      <li className="nav-item">
        <a href="#">Navbar</a>
      </li>
      <li className="nav-item">
        <a href="#">Empty states</a>
      </li>
    </ul>
  </li>
  <li className="nav-item">
    <a href="#">Components</a>
  </li>
  <li className="nav-item">
    <a href="#">Utilities</a>
  </li>
</ul>`;
