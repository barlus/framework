import * as React                                                                  from "@barlus/react"
import {Container, OffCanvas, OffCanvasContent, OffCanvasSidebar, OffCanvasToggle} from "@barlus/spectre";
import {DocExample, DocPage, DocSample, DocSection, DocText}                       from "../../comps/DocPage";


export class DocSideview extends DocPage {
  static title = "Sideview";
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocText text={`
                The ~OffCanvas~ is a navigation layout that the sidebar can slide in and out of the viewport.
                It is built in pure CSS.
                By default, the off-canvas menu is collapsed whenever the window width is. But you can add
                the ~show~ attribute to the ~OffCanvas~ to make the
                sidebar expanded when the window width is larger than or equal to **960px**
            `}/>

      <DocSample>
        <OffCanvas>
          <OffCanvasToggle primary action> <i className="icon icon-menu"/></OffCanvasToggle>
          <OffCanvasSidebar className={'flex-centered'}>
            <span>Sidebar</span>
          </OffCanvasSidebar>
          <OffCanvasContent>
            <Container>
              <h4>Lorem ipsum</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo,
                dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales risus.
                Etiam euismod ornare consequat.</p>
              <p>Climb leg rub face on everything give attitude nap all day for under the bed.
                Chase mice attack feet but rub face on everything hopped up on
                goofballs.</p>
            </Container>
          </OffCanvasContent>
        </OffCanvas>
      </DocSample>
      <DocText text={`
                You can open the sidebar by adding the
                ~active~ attribute to ~OffCanvasSidebar~ component.
                And remove the ~active~ to close it.
            `}/>
      <DocExample content={`
                <OffCanvas>
                    <OffCanvasToggle primary action> <i className="icon icon-menu"/></OffCanvasToggle>
                    <OffCanvasSidebar className='flex-centered'>
                        <span>Sidebar</span>
                    </OffCanvasSidebar>
                    <OffCanvasContent>
                        <Container>
                            <h4>Lorem ipsum</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo,
                                dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales risus.
                                Etiam euismod ornare consequat.</p>
                            <p>Climb leg rub face on everything give attitude nap all day for under the bed.
                                Chase mice attack feet but rub face on everything hopped up on
                                goofballs.</p>
                        </Container>
                    </OffCanvasContent>
                </OffCanvas>
            `}/>
    </DocSection>
  }
}