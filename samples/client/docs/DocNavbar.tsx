import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";



export class DocNavbar extends DocPage {
    static title = "Navbar";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>Navbar is a layout container that appears in the header of apps and websites. </DocNote>
            <DocSample>
                <div className="navbar">
                    <div className="navbar-section">
                        <a href="#navbar" className="navbar-brand mr-2">Spectre.css</a>
                        <a href="#navbar" className="btn btn-link">Docs</a>
                        <a href="https://github.com/picturepan2/spectre" className="btn btn-link">GitHub</a>
                    </div>
                    <div className="navbar-section">
                        <div className="input-group input-inline">
                            <input className="form-input" type="text" placeholder="search"/>
                            <button className="btn btn-primary input-group-btn">Search</button>
                        </div>
                    </div>
                </div>
            </DocSample>
            <DocNote>The navbar component can include logo brand, nav links and buttons, search box or any
                combination of those elements. Each section with the <code>navbar-section</code> class will
                be evenly distributed in the container.
            </DocNote>
            <Code className='html'>{E1}</Code>
            <DocNote>
                You can use <code>navbar-center</code> class to have a centered section.
            </DocNote>
            <DocSample>
                <div className="navbar">
                    <div className="navbar-section">
                        <a href="#navbar" className="btn btn-link">Docs</a>
                        <a href="#navbar" className="btn btn-link">Examples</a>
                    </div>
                    <div className="navbar-center">
                        <img src="https://picturepan2.github.io/spectre/img/spectre-logo.svg"
                             alt="Spectre.css"/>
                    </div>
                    <div className="navbar-section">
                        <a href="https://twitter.com/spectrecss" className="btn btn-link">Twitter</a>
                        <a href="https://github.com/picturepan2/spectre" className="btn btn-link">GitHub</a>
                    </div>
                </div>
            </DocSample>
            <Code className='html'>{E2}</Code>
        </DocSection>
    }
}

const E1 = `<header class="navbar">
  <section class="navbar-section">
    <a href="#" class="navbar-brand mr-2">Spectre.css</a>
    <a href="#" class="btn btn-link">Docs</a>
    <a href="https://github.com/picturepan2/spectre" class="btn btn-link">GitHub</a>
  </section>
  <section class="navbar-section">
    <div class="input-group input-inline">
      <input class="form-input" type="text" placeholder="search">
      <button class="btn btn-primary input-group-btn">Search</button>
    </div>
  </section>
</header>`;
const E2 = `<header class="navbar">
  <section class="navbar-section">
    <a href="#" class="btn btn-link">Docs</a>
    <a href="#" class="btn btn-link">Examples</a>
  </section>
  <section class="navbar-center">
    <!-- centered logo or brand -->
  </section>
  <section class="navbar-section">
    <a href="#" class="btn btn-link">Twitter</a>
    <a href="#" class="btn btn-link">GitHub</a>
  </section>
</header>`;