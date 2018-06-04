import * as React from "@barlus/nerv"
import { Code } from "../../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../../comps/DocPage";

export class DocParallax extends DocPage {
    static title = "Parallax";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                The Parallax acts like Apple TV/tvOS hover parallax effect. It is built in pure CSS.
            </DocNote>
            <DocSample columns={12/8}>
                <div className="parallax">
                    <div className="parallax-top-left" tabIndex={1}/>
                    <div className="parallax-top-right" tabIndex={2}/>
                    <div className="parallax-bottom-left" tabIndex={3}/>
                    <div className="parallax-bottom-right" tabIndex={4}/>
                    <div className="parallax-content">
                        <div className="parallax-front">
                            <h2>tvOS parallax demo</h2>
                        </div>
                        <div className="parallax-back">
                            <img src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"
                                 className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
                        </div>
                    </div>
                </div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}


const E1 = `<div class="parallax">
  <div class="parallax-top-left" tabindex="1"></div>
  <div class="parallax-top-right" tabindex="2"></div>
  <div class="parallax-bottom-left" tabindex="3"></div>
  <div class="parallax-bottom-right" tabindex="4"></div>
  <div class="parallax-content">
    <div class="parallax-front">
      <h2>tvOS parallax demo</h2>
    </div>
    <div class="parallax-back">
      <img src="img/osx-el-capitan.jpg" class="img-responsive rounded" ...>
    </div>
  </div>
</div>`;