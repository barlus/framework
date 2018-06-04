import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote,DocText, DocExample,DocPage, DocSample, DocSection} from "../comps/DocPage";
import { Accordion, AccordionBody, AccordionHeader } from "@barlus/spectre";


export class DocAccordions extends DocPage {
    static title = 'Accordions';
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text={`
                Accordions are used to toggle sections of content.
            `}/>
            <DocSample columns={2}>
                <DocSample>
                    <Accordion>
                        <AccordionHeader type="radio" id="accordion-1" name="radio-accordion" className="c-hand">
                            <i className="icon icon-arrow-right mr-1"/>Elements
                        </AccordionHeader>
                        <AccordionBody>
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Element 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Element 2</a>
                                </li>
                            </ul>
                        </AccordionBody>
                    </Accordion>
                    <Accordion>
                        <AccordionHeader type="radio" id="accordion-2" name="radio-accordion" className="c-hand">
                            <i className="icon icon-arrow-right mr-1"/>Layout
                        </AccordionHeader>
                        <AccordionBody>
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Layout 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Layout 2</a>
                                </li>
                            </ul>
                        </AccordionBody>
                    </Accordion>

                    <Accordion>
                        <AccordionHeader type="radio" id="accordion-3" name="radio-accordion" defaultChecked={true} className="c-hand">
                            <i className="icon icon-arrow-right mr-1"/>Components
                        </AccordionHeader>
                        <AccordionBody>
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Component 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Component 1</a>
                                </li>
                            </ul>
                        </AccordionBody>
                    </Accordion>
                </DocSample>
                <DocSample>
                    <Accordion>
                        <AccordionHeader id="accordion-4"className="c-hand" defaultChecked={true}>
                            <i className="icon icon-arrow-right mr-1"/>Elements
                        </AccordionHeader>
                        <AccordionBody>
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Element 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Element 2</a>
                                </li>
                            </ul>
                        </AccordionBody>
                    </Accordion>
                    <Accordion>
                        <AccordionHeader id="accordion-5"  >
                            <i className="icon icon-arrow-right mr-1"/>Layout
                        </AccordionHeader>
                        <AccordionBody>
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Layout 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Layout 2</a>
                                </li>
                            </ul>
                        </AccordionBody>
                    </Accordion>
                    <Accordion>
                        <AccordionHeader id="accordion-6"className="c-hand" >
                            <i className="icon icon-arrow-right mr-1"/>Components
                        </AccordionHeader>
                        <AccordionBody>
                            <ul className="menu menu-nav">
                                <li className="menu-item">
                                    <a href="#accordions">Components 1</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#accordions">Components 2</a>
                                </li>
                            </ul>
                        </AccordionBody>
                    </Accordion>
                </DocSample>
            </DocSample>
            <DocExample content={`
                <!-- standard Accordions example -->
                <Accordion>
                    <AccordionHeader id="accordion-4"className="c-hand" defaultChecked={true}>
                        <i className="icon icon-arrow-right mr-1"/>Elements
                    </AccordionHeader>
                    <AccordionBody>
                        <ul className="menu menu-nav">
                            <li className="menu-item">
                                <a href="#accordions">Element 1</a>
                            </li>
                            <li className="menu-item">
                                <a href="#accordions">Element 2</a>
                            </li>
                        </ul>
                    </AccordionBody>
                </Accordion>
                <!-- mutually exclusive Accordions example (with same input names) -->
                <Accordion>
                    <AccordionHeader type="radio" id="accordion-1" name="radio-accordion" className="c-hand">
                        <i className="icon icon-arrow-right mr-1"/>Elements
                    </AccordionHeader>
                    <AccordionBody>
                        <ul className="menu menu-nav">
                            <li className="menu-item">
                                <a href="#accordions">Element 1</a>
                            </li>
                            <li className="menu-item">
                                <a href="#accordions">Element 2</a>
                            </li>
                        </ul>
                    </AccordionBody>
                </Accordion>

            `}/>
            {/*TODO do we need this ?*/}
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