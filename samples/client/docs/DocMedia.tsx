import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection, DocTitle} from "../comps/DocPage";

export class DocMedia extends DocPage {
    static title = 'Media';

    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>Media includes responsive images, figures and video classes. </DocNote>
            <DocTitle>Images</DocTitle>
            <DocNote>
                Add the <code>img-responsive</code> class to {'<img>'} elements.
                The images will scale with the parent sizes.
            </DocNote>
            <DocSample>
                <img src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"
                     className="img-responsive rounded" alt="macOS El Capitan Wallpaper"/>
            </DocSample>
            <DocNote>
                Add the <code>img-fit-contain</code> or <code>img-fit-cover</code> class
                to {'<img>'} or {'<video>'}
                elements. The media will crop itself to fit inside the element (and you don't need another
                container). This feature can replace the background image trick. Microsoft Edge support
                is <a
                href="https://developer.microsoft.com/en-us/microsoft-edge/platform/status/objectfitandobjectposition/"
                target="_blank">in preview</a>.
            </DocNote>
            <DocSample columns={2}>
                <figure className="figure">
                    <img src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg"
                         className="img-fit-contain rounded" alt="macOS Yosemite Wallpaper"
                         style={{ background: '#f8f9fa', height: '10rem', width: '100%' }}/>
                    <figcaption className="figure-caption text-center">img-fit-contain</figcaption>
                </figure>
                <figure className="figure">
                    <img src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"
                         className="img-fit-cover rounded" alt="macOS Yosemite Wallpaper"
                         style={{ background: '#f8f9fa', height: '10rem', width: '100%' }}/>
                    <figcaption className="figure-caption text-center">img-fit-cover</figcaption>
                </figure>
            </DocSample>
            <Code className="HTML">{E1}</Code>
            <DocNote>
                You can use the element {'<figure>'} for an image with a caption. Add
                the <code>figure</code> class
                to {'<figure>'} element. The images with the <code>img-responsive</code> class will be
                responsive.
                And the included class <code>figure-caption</code> will provide basic style for caption.
                Also, you
                can use <code>text-left</code>, <code>text-center</code> and <code>text-right</code> for
                caption
                alignment.
            </DocNote>
            <DocSample>
                <figure className="figure">
                    <img src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"
                         className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
                    <figcaption className="figure-caption text-center">macOS Yosemite wallpaper</figcaption>
                </figure>
            </DocSample>
            <Code className="HTML">{E2}</Code>
        </DocSection>
    }
}
const E1 = `<img src="img/osx-el-capitan.jpg" class="img-responsive ..." alt="...">
<img src="img/osx-el-capitan.jpg" class="img-fit-contain ..." alt="...">
<img src="img/osx-el-capitan.jpg" class="img-fit-cover ..." alt="...">`;
const E2 = `<figure class="figure">
  <img src="img/osx-yosemite-2.jpg" class="img-responsive ..." alt="...">
  <figcaption class="figure-caption text-center">macOS Yosemite wallpaper</figcaption>
</figure>`;