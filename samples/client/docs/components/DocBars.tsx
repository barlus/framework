import * as React                                                      from "@barlus/react"
import {DocExample, DocPage, DocSample, DocSection, DocText, DocTitle} from "../../comps/DocPage";
import {Bar, BarItem, Slider, SliderButton, Tooltip}                   from "@barlus/spectre";


export class DocBars extends DocPage {
  static title = "Bars";
  static ready = true;
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocText text={`
                Bars represent the progress of a task or the value within the known range. Bars are custom
                components for displaying HTML5 ~progress~, ~meter~ and ~input range~
                elements.
            `}/>

      <DocSample columns={12 / 8}>
        <Bar progress={25} small/>
      </DocSample>

      <DocSample columns={12 / 8}>
        <Bar progress={75}/>
      </DocSample>

      <DocSample columns={12 / 8}>
        <Bar>
          <Tooltip label="25%"><BarItem progress={25}>25%</BarItem></Tooltip>
          <Tooltip label="15%"><BarItem progress={15}
                                        style={{ background: '#817fe3' }}>15%</BarItem></Tooltip>
          <Tooltip label="10%"><BarItem progress={10}
                                        style={{ background: '#aaa9eb' }}>10%</BarItem></Tooltip>
          <Tooltip label="10%"><BarItem progress={15}>15%</BarItem></Tooltip>
        </Bar>
      </DocSample>
      <DocText text={`
                Use the container ~Bar~ component, and add child ~BarItem~ component.
                There is the ~small~ attribute for thinner Bars. Also, you could use
                ~Tooltips~ for any ~BarItem~.
            `}/>
      <DocExample content={`
                <Bar progress={75} />
                <Bar >
                    <Tooltip label="25%"><BarItem progress={25}>25%</BarItem></Tooltip>
                    <Tooltip label="15%"><BarItem progress={15} style={{ background: '#817fe3' }}>15%</BarItem></Tooltip>
                    <Tooltip label="10%"><BarItem progress={10} style={{ background: '#aaa9eb' }}>10%</BarItem></Tooltip>
                    <Tooltip label="10%"><BarItem progress={15}>15%</BarItem></Tooltip>
                </Bar>
            `}/>
      <DocTitle>Slider bars</DocTitle>
      <DocSample columns={12 / 8}>
        <Slider progress={95}/>
        <Slider>
          <BarItem progress={29}>
            <Tooltip label="29%"><SliderButton/></Tooltip>
          </BarItem>
          <BarItem progress={65}>
            <Tooltip label="65%"><SliderButton/></Tooltip>
          </BarItem>
        </Slider>
      </DocSample>
      <DocText text={`
                You can use the ~Slider~ . And add child ~BarItem~ components and ~SliderButton~ inside ~BarItem~.
                If there are two ~BarItem~s in one ~Slider~, you will have a range slider.

            `}/>

      <DocExample content={`
                <Slider progress={95}/>
                <Slider>
                    <BarItem progress={29}>
                        <Tooltip label="29%"><SliderButton/></Tooltip>
                    </BarItem>
                    <BarItem progress={65}>
                        <Tooltip label="65%"><SliderButton/></Tooltip>
                    </BarItem>
                </Slider>
            `}/>
    </DocSection>
  }
}

const E1 = `<div className="bar bar-sm">
  <div className="bar-item" role="progressbar" style="width:25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>

<!-- multi-bars -->
<div className="bar">
  <div className="bar-item tooltip" data-tooltip="25%" style="width:25%;">25%</div>
  <div className="bar-item" style="width:15%;background:#818bd5;">15%</div>
</div>`;
const E2 = `<!-- slider -->
<div className="bar bar-slider">
  <div className="bar-item" role="progressbar" style="width:25%;">
    <button className="bar-slider-btn btn" role="slider"></button>
  </div>
</div>

<!-- range slider -->
<div className="bar bar-slider">
  <div className="bar-item" role="progressbar" style="width:15%;">
    <button className="bar-slider-btn btn" role="slider"></button>
  </div>
  <div className="bar-item" role="progressbar" style="width:65%;">
    <button className="bar-slider-btn btn" role="slider"></button>
  </div>
</div>`;