import * as React from "@barlus/nerv"
import { Button } from '@barlus/spectre';
import { Code } from "../../comps/Code";
import { DocNote, DocPage, DocSample, DocSection } from "../../comps/DocPage";

export class DocTimelines extends DocPage {
    static title = 'Timelines';
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Timelines are ordered sequences of activities.
            </DocNote>
            <DocSample columns={12 / 9}>
                <div className="timeline">
                    <div className="timeline-item" id="timeline-example-1">
                        <div className="timeline-left">
                            <a href="#timeline-example-1" className="timeline-icon tooltip"
                               data-tooltip="March 2016"/>
                        </div>
                        <div className="timeline-content">
                            <div className="tile">
                                <div className="tile-content">
                                    <p className="tile-subtitle">March 2016</p>
                                    <p className="tile-title">Initial commit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-item" id="timeline-example-2">
                        <div className="timeline-left">
                            <a href="#timeline-example-2" className="timeline-icon icon-lg tooltip"
                               data-tooltip="February 2017">
                                <i className="icon icon-check"/>
                            </a>
                        </div>
                        <div className="timeline-content">
                            <div className="tile">
                                <div className="tile-content">
                                    <p className="tile-subtitle">February 2017</p>
                                    <p className="tile-title">New Documents experience</p>
                                    <p className="tile-title"><a href="#bars">Bars</a>: represent the
                                        progress of a task</p>
                                    <p className="tile-title"><a href="#steps">Steps</a>: progress
                                        indicators of a sequence of task steps</p>
                                    <p className="tile-title"><a href="#tiles">Tiles</a>: repeatable or
                                        embeddable information blocks</p>
                                </div>
                                <div className="tile-action">
                                    <Button>View</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-item" id="timeline-example-3">
                        <div className="timeline-left">
                            <a href="#timeline-example-3" className="timeline-icon icon-lg tooltip"
                               data-tooltip="March 2017">
                                <i className="icon icon-check"/>
                            </a>
                        </div>
                        <div className="timeline-content">
                            <div className="tile">
                                <div className="tile-content">
                                    <p className="tile-subtitle">March 2017</p>
                                    <p className="tile-title"><a href="#icons">Icons</a>: single-element,
                                        responsive and pure CSS icons</p>
                                    <p className="tile-title"><a href="#popovers">Popovers</a>: small
                                        overlay content containers</p>
                                    <p className="tile-title"><a href="#calendars">Calendars</a>: date or
                                        date range picker and events display</p>
                                    <p className="tile-title"><a href="#carousels">Carousels</a>: slideshows
                                        for cycling images</p>
                                </div>
                                <div className="tile-action">
                                    <Button>View</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<div className="timeline">
  <div className="timeline-item" id="timeline-example-1">
    <div className="timeline-left">
      <a className="timeline-icon" href="#timeline-example-1"></a>
    </div>
    <div className="timeline-content">
      <!-- tiles structure -->
    </div>
  </div>

  <div className="timeline-item" id="timeline-example-2">
    <div className="timeline-left">
      <a className="timeline-icon icon-lg" href="#timeline-example-2">
        <i className="icon icon-check"></i>
      </a>
    </div>
    <div className="timeline-content">
      <!-- tiles structure -->
    </div>
  </div>
  ...
</div>`;