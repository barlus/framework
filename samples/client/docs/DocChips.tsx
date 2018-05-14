import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocChips extends DocPage{
    static title = "Chips";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>Chips are complex entities in small blocks. </DocNote>
            <DocSample>
                <div>
                      <span className="chip">
                      Crime
                    </span>
                    <span className="chip">
                      Drama
                    </span>
                    <span className="chip">
                      Biography
                      <a href="#" className="btn btn-clear" aria-label="Close" role="button"/>
                    </span>
                    <span className="chip">
                      Mystery
                      <a href="#" className="btn btn-clear" aria-label="Close" role="button"/>
                    </span>
                </div>
                <div>
                    <div className="chip">
                        <figure className="avatar avatar-sm" data-initial="TS"
                                style={{ backgroundColor: '#5755d9' }}/>
                        Tony Stark
                    </div>
                    <div className="chip">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                             className="avatar avatar-sm" alt="Thor Odinson"/>
                        Thor Odinson
                    </div>
                    <div className="chip">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                             className="avatar avatar-sm" alt="Steve Rogers"/>
                        Steve Rogers
                    </div>
                </div>
            </DocSample>
            <div className="columns">
                <div className="column col-12">

                </div>
                <div className="column col-12">

                </div>
            </div>
            <DocNote>
                Add a container element with the <code>chip</code> class.
                And add child text element, buttons or avatars with the <code>avatar</code> class.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<span class="chip">Crime</span>

<span class="chip">
  Biography
  <a href="#" class="btn btn-clear" aria-label="Close" role="button"></a>
</span>

<div class="chip">
  <img src="img/avatar-1.png" class="avatar avatar-sm">
  Yan Zhu
  <a href="#" class="btn btn-clear" aria-label="Close" role="button"></a>
</div>`;
