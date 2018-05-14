import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection, DocTitle} from "../comps/DocPage";


export class DocBars extends DocPage{
    static title = "Bars";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>
                Bars represent the progress of a task or the value within the known range. Bars are custom
                components
                for displaying HTML5 <code>progress</code>, <code>meter</code> and <code>input range</code>
                elements.
            </DocNote>
            <DocSample columns={12/8}>
                <div className="bar bar-sm">
                    <div className="bar-item tooltip" data-tooltip="25%" role="progressbar"
                         style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                </div>
            </DocSample>
            <DocSample columns={12/8}>
                <div className="bar">
                    <div className="bar-item tooltip" data-tooltip="50%" role="progressbar"
                         style={{ width: '50%' }}/>
                </div>
            </DocSample>
            <DocSample columns={12/8}>
                <div className="bar">
                    <div className="bar-item tooltip" data-tooltip="25%" role="progressbar"
                         style={{ width: '25%' }}>25%
                    </div>
                    <div className="bar-item tooltip" data-tooltip="15%" role="progressbar"
                         style={{ width: '15%', background: '#817fe3' }}>15%
                    </div>
                    <div className="bar-item tooltip" data-tooltip="10%" role="progressbar"
                         style={{ width: '10%', background: '#aaa9eb' }}>10%
                    </div>
                    <div className="bar-item tooltip" data-tooltip="15%" role="progressbar"
                         style={{ width: '15%' }}>15%
                    </div>
                </div>
            </DocSample>
            <DocNote>
                Add a container element with the <code>bar</code> class. And add child elements with
                the <code>bar-item</code>
                class. The width percentage value is needed for every <code>bar-item</code>.<br/><br/>
                There is the <code>bar-sm</code> class for thinner Bars. Also, you could use
                <a href="#tooltips">Tooltips</a> for any <code>bar-item</code>.
            </DocNote>
            <Code className="HTML">{E1}</Code>
            <DocTitle>Slider bars</DocTitle>
            <DocSample columns={12/8}>
                <div className="bar bar-slider">
                    <div className="bar-item" role="progressbar" style={{ width: '50%' }}>
                        <button className="bar-slider-btn btn tooltip" data-tooltip="50%" role="slider"/>
                    </div>
                </div>
            </DocSample>
            <DocSample columns={12/8}>
                <div className="bar bar-slider">
                    <div className="bar-item" role="progressbar" style={{ width: '15%' }}>
                        <button className="bar-slider-btn btn tooltip" data-tooltip="25%" role="slider"/>
                    </div>
                    <div className="bar-item" role="progressbar" style={{ width: '65%' }}>
                        <button className="bar-slider-btn btn tooltip" data-tooltip="65%" role="slider"/>
                    </div>
                </div>
            </DocSample>
            <DocNote>
                You can add the <code>bar-slider</code> class to the Bars container. And add child elements
                with the
                <code>bar-item</code> class and <code>bar-slider-btn</code> inside bar-item. You need to set
                the
                <code>bar-item</code> width manually to have the slider point.<br/><br/>
                If there are two <code>bar-item</code> divs in one bar-slider, you will have a range slider.
            </DocNote>
            <Code className="HTML">{E2}</Code>
        </DocSection>
    }
}


const E1 = `<div class="bar bar-sm">
  <div class="bar-item" role="progressbar" style="width:25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>

<!-- multi-bars -->
<div class="bar">
  <div class="bar-item tooltip" data-tooltip="25%" style="width:25%;">25%</div>
  <div class="bar-item" style="width:15%;background:#818bd5;">15%</div>
</div>`;
const E2 = `<!-- slider -->
<div class="bar bar-slider">
  <div class="bar-item" role="progressbar" style="width:25%;">
    <button class="bar-slider-btn btn" role="slider"></button>
  </div>
</div>

<!-- range slider -->
<div class="bar bar-slider">
  <div class="bar-item" role="progressbar" style="width:15%;">
    <button class="bar-slider-btn btn" role="slider"></button>
  </div>
  <div class="bar-item" role="progressbar" style="width:65%;">
    <button class="bar-slider-btn btn" role="slider"></button>
  </div>
</div>`;