import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";



export class DocAccordions extends DocPage {
    static title = 'Accordions';
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>Accordions are used to toggle sections of content.</DocNote>
            <DocSample columns={2}>
                <DocSample>
                    <div className="accordion">
                        <input type="radio" id="accordion-1" name="accordion-radio" hidden defaultChecked/>
                        <label className="accordion-header c-hand" htmlFor="accordion-1">
                            <i className="icon icon-arrow-right mr-1"/>
                            Elements
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Element 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Element 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="accordion">
                        <input type="radio" id="accordion-2" name="accordion-radio" hidden/>
                        <label className="accordion-header c-hand" htmlFor="accordion-2">
                            <i className="icon icon-arrow-right mr-1"/>
                            Layout
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Layout 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Layout 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="accordion">
                        <input type="radio" id="accordion-3" name="accordion-radio" hidden/>
                        <label className="accordion-header c-hand" htmlFor="accordion-3">
                            <i className="icon icon-arrow-right mr-1"/>
                            Components
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Component 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Component 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </DocSample>
                <DocSample>
                    <div className="accordion">
                        <input type="checkbox" id="accordion-4" name="accordion-checkbox" hidden
                               defaultChecked/>
                        <label className="accordion-header c-hand" htmlFor="accordion-4">
                            Elements
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Element 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Element 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="accordion">
                        <input type="checkbox" id="accordion-5" name="accordion-checkbox" hidden/>
                        <label className="accordion-header c-hand" htmlFor="accordion-5">
                            Layout
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Layout 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Layout 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="accordion">
                        <input type="checkbox" id="accordion-6" name="accordion-checkbox" hidden/>
                        <label className="accordion-header c-hand" htmlFor="accordion-6">
                            Components
                        </label>
                        <div className="accordion-body">
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Component 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Component 2</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </DocSample>
            </DocSample>
            <Code className="HTML">{E1}</Code>
            <DocNote>
                Alternatively, you can use <code>details</code> and <code>summary</code> instead of
                <code>input</code> radio or checkbox trick. Add the <code>open</code> attribute to
                <code>details</code> to expand it. Microsoft Edge support is <a
                href="https://developer.microsoft.com/en-us/microsoft-edge/platform/status/detailssummary/"
                target="_blank">in development</a>.
            </DocNote>
            <Code className="HTML">{E2}</Code>
        </DocSection>
    }
}
const E1 = `<!-- standard Accordions example -->
<div class="accordion">
  <input type="checkbox" id="accordion-1" name="accordion-checkbox" hidden>
  <label class="accordion-header">
    <i class="icon icon-arrow-right mr-1"></i>
    Title
  </label>
  <div class="accordion-body">
    <!-- Accordions content -->
  </div>
</div>

<!-- mutually exclusive Accordions example (with same input names) -->
<div class="accordion">
  <input type="radio" id="accordion-1" name="accordion-radio" hidden>
  <label class="accordion-header">
    Title
  </label>
  <div class="accordion-body">
    <!-- Accordions content -->
  </div>
</div>`;
const E2 = `<!-- details and summary Accordions example -->
<details class="accordion" open>
  <summary class="accordion-header">
    <i class="icon icon-arrow-right mr-1"></i>
    Title
  </summary>
  <div class="accordion-body">
    <!-- Accordions content -->
  </div>
</details>`;