import * as React                                from "@barlus/react"
import {Code}                                    from "../../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../../comps/DocPage";


export class DocShape extends DocPage {
  static title = "Shape";
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocNote>
        Shape utilities are used for change element shapes.
      </DocNote>
      <DocSample className="text-center" columns={2}>
        <div className="bg-primary text-light docs-shape rounded centered">
          rounded
        </div>
        <div className="bg-primary text-light docs-shape circle centered">
          circle
        </div>
      </DocSample>
      <Code className="HTML">{E1}</Code>
    </DocSection>
  }
}

const E1 = `<!-- rounded element -->
<div className="rounded"></div>
<!-- circle element -->
<div className="circle"></div>`;