import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";

export class DocNavs extends DocPage {
    static title = "Navs";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocSample columns={2}>
                <ul className="nav">
                    <li className="nav-item">
                        <a href="#nav">Elements</a>
                    </li>
                    <li className="nav-item active">
                        <a href="#nav">Layout</a>
                        <ul className="nav">
                            <li className="nav-item">
                                <a href="#nav">Flexbox grid</a>
                            </li>
                            <li className="nav-item">
                                <a href="#nav">Responsive</a>
                            </li>
                            <li className="nav-item">
                                <a href="#nav">Navbar</a>
                            </li>
                            <li className="nav-item">
                                <a href="#nav">Empty states</a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="#nav">Components</a>
                    </li>
                    <li className="nav-item">
                        <a href="#nav">Utilities</a>
                    </li>
                </ul>
            </DocSample>
            <DocNote>
                Add a container element with the <code>nav</code> class. And add child elements with
                the <code>nav-item</code>
                class. The <code>nav-item</code> with the <code>active</code> class will be highlighted.
            </DocNote>
            <Code className="HTML">{E1}</Code>

        </DocSection>
    }
}

const E1 = `<ul class="nav">
  <li class="nav-item">
    <a href="#">Elements</a>
  </li>
  <li class="nav-item active">
    <a href="#">Layout</a>
    <ul class="nav">
      <li class="nav-item">
        <a href="#">Flexbox grid</a>
      </li>
      <li class="nav-item">
        <a href="#">Responsive</a>
      </li>
      <li class="nav-item">
        <a href="#">Navbar</a>
      </li>
      <li class="nav-item">
        <a href="#">Empty states</a>
      </li>
    </ul>
  </li>
  <li class="nav-item">
    <a href="#">Components</a>
  </li>
  <li class="nav-item">
    <a href="#">Utilities</a>
  </li>
</ul>`;
