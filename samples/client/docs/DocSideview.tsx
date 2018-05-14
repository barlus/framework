import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocSideview extends DocPage {
    static title = "Sideview";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                The Off-canvas is a navigation layout that the sidebar can slide in and out of the viewport.
                It is built in pure CSS.<br/><br/>
                By default, the off-canvas menu is collapsed whenever the window width is. But you can add
                the <code>off-canvas-sidebar-show</code> class to the <code>off-canvas</code> to make the
                sidebar expanded when the window width is larger than or equal to <strong>960px</strong>.
            </DocNote>
            <DocSample>
                <div className="off-canvas off-canvas-sidebar-show">
                    <a className="off-canvas-toggle btn btn-primary btn-action" href="#sidebar-demo">
                        <i className="icon icon-menu"/>
                    </a>
                    <div id="sidebar-demo" className="off-canvas-sidebar flex-centered">
                        <span>Sidebar</span>
                    </div>
                    <a className="off-canvas-overlay" href="#close"/>
                    <div className="off-canvas-content">
                        <div className="content">
                            <h4>Lorem ipsum</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo,
                                dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales risus.
                                Etiam euismod ornare consequat.</p>
                            <p>Climb leg rub face on everything give attitude nap all day for under the bed.
                                Chase mice attack feet but rub face on everything hopped up on
                                goofballs.</p>
                        </div>
                    </div>
                </div>
            </DocSample>
            <DocNote>
                You can open the sidebar by adding the
                class <code>active</code> to <code>off-canvas-sidebar</code>.
                And remove the <code>active</code> to close it.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}


const E1 = `<div class="off-canvas">
  <!-- off-screen toggle button -->
  <a class="off-canvas-toggle btn btn-primary btn-action" href="#sidebar-id">
    <i class="icon icon-menu"></i>
  </a>

  <div id="sidebar-id" class="off-canvas-sidebar">
    <!-- off-screen sidebar -->
  </div>

  <a class="off-canvas-overlay" href="#close"></a>

  <div class="off-canvas-content">
    <!-- off-screen content -->
  </div>
</div>`;