import * as React from "@barlus/nerv"
import { Code } from "../../comps/Code";
import { DocNote, DocPage, DocSample, DocSection } from "../../comps/DocPage";

export class DocComparison extends DocPage {
    static title = 'Comparison';
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Comparison Sliders are sliders for comparing two images. It is built in pure CSS.
            </DocNote>
            <DocSample>
                <div className="comparison-slider">
                    <figure className="comparison-before">
                        <img src="https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg"
                             className="rounded" alt="macOS Sierra Wallpaper"/>
                        <div className="comparison-label">Before</div>
                    </figure>
                    <figure className="comparison-after">
                        <img src="https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg"
                             className="filter-grayscale rounded" alt="macOS Sierra Wallpaper"/>
                        <div className="comparison-label">After</div>
                        <textarea className="comparison-resizer" readOnly defaultValue={""}/>
                    </figure>
                </div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<div className="comparison-slider">
  <figure className="comparison-before">
    <!-- image (before) -->
    <div className="comparison-label">Before</div>
  </figure>

  <figure className="comparison-after">
    <!-- image (after) -->
    <div className="comparison-label">After</div>
    <textarea className="comparison-resizer" readonly></textarea>
  </figure>
</div>`;
