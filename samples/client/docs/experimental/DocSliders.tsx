import * as React                                from "@barlus/react"
import {Code}                                    from "../../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../../comps/DocPage";


export class DocSliders extends DocPage {
  static title = 'Sliders';
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocNote>
        Sliders are for selecting values from ranges.<br/><br/>
        You can add the class <code>tooltip</code> to have tooltip labels. If
        no <code>data-tooltip</code> is set, the <code>value</code> will be used instead.
      </DocNote>
      <DocSample columns={2}>
        <input className="slider tooltip" type="range" min={0} max={100} defaultValue="50"/>
        <input className="slider" type="range" min={0} max={100} defaultValue="50" disabled/>
      </DocSample>
      <Code className="HTML">{E1}</Code>
    </DocSection>
  }
}

const E1 = `<!-- Sliders -->
<input className="slider" type="range" min="0" max="100" value="50">
<!-- Sliders with tooltips -->
<input className="slider tooltip" type="range" min="0" max="100" value="50" oninput="this.setAttribute('value', this.value);">`;
