import * as React                                from "@barlus/react"
import {Code}                                    from "../../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../../comps/DocPage";


export class DocMeters extends DocPage {
  static title = "Meters";
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocNote>
        Meters represent the value within the known range.
      </DocNote>
      <DocSample columns={4}>
        <meter className="meter" value={20} min={0} max={100}/>
        <meter className="meter" value={60} min={0} low={30} optimum={60} high={80} max={100}/>
        <meter className="meter" value={85} min={0} low={30} high={80} max={100}/>
        <meter className="meter" value={20} min={0} low={30} optimum={90} high={80} max={100}/>
      </DocSample>
      <Code className="HTML">{E1}</Code>
    </DocSection>
  }
}

const E1 = `<!-- Meter is green when low < value < high -->
<meter className="meter" value="20" min="0" max="100"></meter>
<meter className="meter" value="60" min="0" max="100" low="30" high="80"></meter>
<!-- Meter is yellow when value < low  or high < value -->
<meter className="meter" value="85" min="0" max="100" low="30" high="80"></meter>
<!-- Meter is red when value < low < high < optimum or optimum < low < high < value -->
<meter className="meter" value="20" optimum="90" min="0" max="100" low="30" high="80"></meter>`;