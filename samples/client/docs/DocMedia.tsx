import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocMedia extends React.PureComponent<{}, {}> {
    render() {
        return <div id="media" className="container">
            <h3 className="s-title"><a href="#media" className="anchor" aria-hidden="true">#</a>Media</h3>
            <div className="docs-note">
                <p>Media includes responsive images, figures and video classes. </p>
            </div>
            <h4 id="media-images" className="s-subtitle">Images</h4>
            <div className="docs-note">
                <p>Add the <code>img-responsive</code> class to &lt;img&gt; elements. The images will scale with
                    the
                    parent sizes.</p>
            </div>
            <div className="columns">
                <div className="column col-12">
                    <img src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"
                         className="img-responsive rounded" alt="macOS El Capitan Wallpaper"/>
                </div>
            </div>
            <div className="docs-note">
                <p>Add the <code>img-fit-contain</code> or <code>img-fit-cover</code> class
                    to &lt;img&gt; or &lt;video&gt;
                    elements. The media will crop itself to fit inside the element (and you don't need another
                    container). This feature can replace the background image trick. Microsoft Edge support
                    is <a
                        href="https://developer.microsoft.com/en-us/microsoft-edge/platform/status/objectfitandobjectposition/"
                        target="_blank">in preview</a>.</p>
            </div>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <figure className="figure">
                        <img src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg"
                             className="img-fit-contain rounded" alt="macOS Yosemite Wallpaper"
                             style={{ background: '#f8f9fa', height: '10rem', width: '100%' }}/>
                        <figcaption className="figure-caption text-center">img-fit-contain</figcaption>
                    </figure>
                </div>
                <div className="column col-6 col-xs-12">
                    <figure className="figure">
                        <img src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"
                             className="img-fit-cover rounded" alt="macOS Yosemite Wallpaper"
                             style={{ background: '#f8f9fa', height: '10rem', width: '100%' }}/>
                        <figcaption className="figure-caption text-center">img-fit-cover</figcaption>
                    </figure>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">img</span> <span
                className="atn">src</span>=<span className="atv">"img/osx-el-capitan.jpg"</span> <span
                className="atn">class</span>=<span className="atv">"img-responsive ..."</span> <span
                className="atn">alt</span>=<span className="atv">"..."</span>&gt;{"\n"}&lt;<span
                className="tag">img</span> <span className="atn">src</span>=<span
                className="atv">"img/osx-el-capitan.jpg"</span> <span className="atn">class</span>=<span
                className="atv">"img-fit-contain ..."</span> <span className="atn">alt</span>=<span
                className="atv">"..."</span>&gt;{"\n"}&lt;<span className="tag">img</span> <span
                className="atn">src</span>=<span className="atv">"img/osx-el-capitan.jpg"</span> <span
                className="atn">class</span>=<span className="atv">"img-fit-cover ..."</span> <span
                className="atn">alt</span>=<span className="atv">"..."</span>&gt;{"\n"}</code></pre>
            <div className="docs-note">
                <p>You can use the element &lt;figure&gt; for an image with a caption. Add
                    the <code>figure</code> class
                    to &lt;figure&gt; element. The images with the <code>img-responsive</code> class will be
                    responsive.
                    And the included class <code>figure-caption</code> will provide basic style for caption.
                    Also, you
                    can use <code>text-left</code>, <code>text-center</code> and <code>text-right</code> for
                    caption
                    alignment. </p>
            </div>
            <div className="columns">
                <div className="column col-12">
                    <figure className="figure">
                        <img src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"
                             className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
                        <figcaption className="figure-caption text-center">macOS Yosemite wallpaper</figcaption>
                    </figure>
                </div>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">figure</span> <span
                className="atn">class</span>=<span className="atv">"figure"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">img</span> <span className="atn">src</span>=<span
                className="atv">"img/osx-yosemite-2.jpg"</span> <span className="atn">class</span>=<span
                className="atv">"img-responsive ..."</span> <span className="atn">alt</span>=<span
                className="atv">"..."</span>&gt;{"\n"}{"  "}&lt;<span className="tag">figcaption</span> <span
                className="atn">class</span>=<span className="atv">"figure-caption text-center"</span>&gt;macOS Yosemite wallpaper&lt;
                <span className="tag">/figcaption</span>&gt;{"\n"}&lt;<span
                    className="tag">/figure</span>&gt;{"\n"}</code></pre>
        </div>
    }
}