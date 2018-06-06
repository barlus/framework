import * as React from "@barlus/nerv"
import { Code } from "../../comps/Code";
import { DocNote, DocPage, DocSample, DocSection } from "../../comps/DocPage";


export class DocText extends DocPage {
    static title = "Text";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Text utilities are used for text alignment, styles and overflow things.
            </DocNote>
            <DocSample>
                <div class="text-left">left-aligned text</div>
                <div class="text-center">center-aligned tex</div>
                <div class="text-right">right-aligned text</div>
                <div class="text-justify">justified text</div>
                <div class="text-lowercase">Lowercased text</div>
                <div class="text-uppercase">Uppercased text</div>
                <div class="text-capitalize"> Capitalized text</div>
                <div class="text-normal">Normal weight text</div>
                <div class="text-bold">Bold text</div>
                <div class="text-italic">Italicized text</div>
                <div class="text-large">Larger text (120%)</div>
                <div class="text-ellipsis">Overflow behavior: display an ellipsis to represent clipped text</div>
                <div class="text-clip">Overflow behavior: truncate the text</div>
                <div class="text-break">Text may be broken at arbitrary points</div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<!-- left-aligned text -->
<div class="text-left"></div>
<!-- center-aligned text -->
<div class="text-center"></div>
<!-- right-aligned text -->
<div class="text-right"></div>
<!-- justified text -->
<div class="text-justify"></div>

<!-- Lowercased text -->
<div class="text-lowercase"></div>
<!-- Uppercased text -->
<div class="text-uppercase"></div>
<!-- Capitalized text -->
<div class="text-capitalize"></div>

<!-- Normal weight text -->
<div class="text-normal"></div>
<!-- Bold text -->
<div class="text-bold"></div>
<!-- Italicized text -->
<div class="text-italic"></div>
<!-- Larger text (120%) -->
<div class="text-large"></div>

<!-- Overflow behavior: display an ellipsis to represent clipped text -->
<div class="text-ellipsis"></div>
<!-- Overflow behavior: truncate the text -->
<div class="text-clip"></div>
<!-- Text may be broken at arbitrary points -->
<div class="text-break"></div>`;