import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";

export class DocPopovers extends DocPage {
    static title = "Popovers";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Popovers are small overlay content containers. Popovers component is built entirely in
                CSS.
            </DocNote>
            <DocSample columns={4}>
                <div className="popover">
                    <a href="#popovers" className="btn btn-primary">
                        top popover
                    </a>
                    <div className="popover-container">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title h5">Apple</div>
                                <div className="card-subtitle text-gray">Software and hardware</div>
                            </div>
                            <div className="card-body">
                                To make a contribution to the world by making tools for the mind that
                                advance
                                humankind.
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="popover popover-right">
                    <a href="#popovers" className="btn btn-primary">
                        right popover
                    </a>
                    <div className="popover-container">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title h5">Apple</div>
                                <div className="card-subtitle text-gray">Software and hardware</div>
                            </div>
                            <div className="card-body">
                                To make a contribution to the world by making tools for the mind that
                                advance
                                humankind.
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="popover popover-bottom">
                    <a href="#popovers" className="btn btn-primary">
                        bottom popover
                    </a>
                    <div className="popover-container">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title h5">Apple</div>
                                <div className="card-subtitle text-gray">Software and hardware</div>
                            </div>
                            <div className="card-body">
                                To make a contribution to the world by making tools for the mind that
                                advance
                                humankind.
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="popover popover-left">
                    <a href="#popovers" className="btn btn-primary">
                        left popover
                    </a>
                    <div className="popover-container">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title h5">Apple</div>
                                <div className="card-subtitle text-gray">Software and hardware</div>
                            </div>
                            <div className="card-body">
                                To make a contribution to the world by making tools for the mind that
                                advance
                                humankind.
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </DocSample>
            <DocNote>
                Wrap an element by a container with the <code>popover</code> class. And add a container with
                the <code>popover-container</code> next to the element. You can use <a href="#cards">Cards</a> component
                inside the <code>popover-container</code>.<br/><br/>
                Also, you can add the <code>popover-right</code>, <code>popover-bottom</code> or
                <code>popover-left</code> class to define the position. By default, the popovers appear
                above the element.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}


const E1 = `<div class="popover popover-right">
  <button class="btn btn-primary">right popover</button>
  <div class="popover-container">
    <div class="card">
      <div class="card-header">
        ...
      </div>
      <div class="card-body">
        ...
      </div>
      <div class="card-footer">
        ...
      </div>
    </div>
  </div>
</div>`;