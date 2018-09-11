import * as React                                from "@barlus/react"
import {Code}                                    from "../../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../../comps/DocPage";


export class DocText extends DocPage {
  static title = "Text";
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocNote>
        Text utilities are used for text alignment, styles and overflow things.
      </DocNote>
      <DocSample>
        <div className="text-left">left-aligned text</div>
        <div className="text-center">center-aligned tex</div>
        <div className="text-right">right-aligned text</div>
        <div className="text-justify">justified text</div>
        <div className="text-lowercase">Lowercased text</div>
        <div className="text-uppercase">Uppercased text</div>
        <div className="text-capitalize"> Capitalized text</div>
        <div className="text-normal">Normal weight text</div>
        <div className="text-bold">Bold text</div>
        <div className="text-italic">Italicized text</div>
        <div className="text-large">Larger text (120%)</div>
        <div className="text-ellipsis">Overflow behavior: display an ellipsis to represent clipped text</div>
        <div className="text-clip">Overflow behavior: truncate the text</div>
        <div className="text-break">Text may be broken at arbitrary points</div>
      </DocSample>
      <Code className="HTML">{E1}</Code>
    </DocSection>
  }
}

const E1 = `<!-- left-aligned text -->
<div className="text-left"></div>
<!-- center-aligned text -->
<div className="text-center"></div>
<!-- right-aligned text -->
<div className="text-right"></div>
<!-- justified text -->
<div className="text-justify"></div>

<!-- Lowercased text -->
<div className="text-lowercase"></div>
<!-- Uppercased text -->
<div className="text-uppercase"></div>
<!-- Capitalized text -->
<div className="text-capitalize"></div>

<!-- Normal weight text -->
<div className="text-normal"></div>
<!-- Bold text -->
<div className="text-bold"></div>
<!-- Italicized text -->
<div className="text-italic"></div>
<!-- Larger text (120%) -->
<div className="text-large"></div>

<!-- Overflow behavior: display an ellipsis to represent clipped text -->
<div className="text-ellipsis"></div>
<!-- Overflow behavior: truncate the text -->
<div className="text-clip"></div>
<!-- Text may be broken at arbitrary points -->
<div className="text-break"></div>`;