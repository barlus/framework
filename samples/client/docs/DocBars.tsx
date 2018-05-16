import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocBars extends React.PureComponent<{}, {}> {
    render() {
        return <div id="bars" className="container">
            <h3 className="s-title"><a href="#bars" className="anchor" aria-hidden="true">#</a>Bars</h3>
            <div className="docs-note">
                <p>Bars represent the progress of a task or the value within the known range. Bars are custom
                    components
                    for displaying HTML5 <code>progress</code>, <code>meter</code> and <code>input range</code>
                    elements.</p>
            </div>
            <div className="columns">
                <div className="column col-8 col-xs-12">
                    <div className="bar bar-sm">
                        <div className="bar-item tooltip" data-tooltip="25%" role="progressbar"
                             style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}/>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-8 col-xs-12">
                    <div className="bar">
                        <div className="bar-item tooltip" data-tooltip="50%" role="progressbar"
                             style={{ width: '50%' }}/>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-8 col-xs-12">
                    <div className="bar">
                        <div className="bar-item tooltip" data-tooltip="25%" role="progressbar"
                             style={{ width: '25%' }}>25%
                        </div>
                        <div className="bar-item tooltip" data-tooltip="15%" role="progressbar"
                             style={{ width: '15%', background: '#817fe3' }}>15%
                        </div>
                        <div className="bar-item tooltip" data-tooltip="10%" role="progressbar"
                             style={{ width: '10%', background: '#aaa9eb' }}>10%
                        </div>
                        <div className="bar-item tooltip" data-tooltip="15%" role="progressbar"
                             style={{ width: '15%' }}>15%
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>bar</code> class. And add child elements with
                    the <code>bar-item</code>
                    class. The width percentage value is needed for every <code>bar-item</code>.</p>
                <p>There is the <code>bar-sm</code> class for thinner Bars. Also, you could use <a
                    href="#tooltips">Tooltips</a>
                    for any <code>bar-item</code>.</p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"bar bar-sm"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"bar-item"</span> <span className="atn">role</span>=<span
                className="atv">"progressbar"</span> <span className="atn">style</span>=<span
                className="atv">"width:25%;"</span> <span className="atn">aria-valuenow</span>=<span
                className="atv">"25"</span> <span className="atn">aria-valuemin</span>=<span
                className="atv">"0"</span> <span className="atn">aria-valuemax</span>=<span
                className="atv">"100"</span>&gt;&lt;<span className="tag">/div</span>&gt;{"\n"}&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"\n"}<span
                className="com">&lt;!-- multi-bars --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"bar"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span className="atv">"bar-item tooltip"</span> <span
                className="atn">data-tooltip</span>=<span className="atv">"25%"</span> <span
                className="atn">style</span>=<span className="atv">"width:25%;"</span>&gt;25%&lt;<span
                className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"bar-item"</span> <span
                className="atn">style</span>=<span
                className="atv">"width:15%;background:#818bd5;"</span>&gt;15%&lt;<span
                className="tag">/div</span>&gt;{"\n"}&lt;<span
                className="tag">/div</span>&gt;{"\n"}</code></pre>
            <h4 id="bars-slider" className="s-subtitle">Slider bars</h4>
            <div className="columns">
                <div className="column col-8 col-xs-12">
                    <div className="bar bar-slider">
                        <div className="bar-item" role="progressbar" style={{ width: '50%' }}>
                            <button className="bar-slider-btn btn tooltip" data-tooltip="50%" role="slider"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-8 col-xs-12">
                    <div className="bar bar-slider">
                        <div className="bar-item" role="progressbar" style={{ width: '15%' }}>
                            <button className="bar-slider-btn btn tooltip" data-tooltip="25%" role="slider"/>
                        </div>
                        <div className="bar-item" role="progressbar" style={{ width: '65%' }}>
                            <button className="bar-slider-btn btn tooltip" data-tooltip="65%" role="slider"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>You can add the <code>bar-slider</code> class to the Bars container. And add child elements
                    with the
                    <code>bar-item</code> class and <code>bar-slider-btn</code> inside bar-item. You need to set
                    the
                    <code>bar-item</code> width manually to have the slider point.</p>
                <p>If there are two <code>bar-item</code> divs in one bar-slider, you will have a range slider.
                </p>
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- slider --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"bar bar-slider"</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">div</span> <span className="atn">class</span>=<span
                    className="atv">"bar-item"</span> <span className="atn">role</span>=<span
                    className="atv">"progressbar"</span> <span className="atn">style</span>=<span
                    className="atv">"width:25%;"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">button</span> <span
                    className="atn">class</span>=<span className="atv">"bar-slider-btn btn"</span> <span
                    className="atn">role</span>=<span className="atv">"slider"</span>&gt;&lt;<span
                    className="tag">/button</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"\n"}<span
                    className="com">&lt;!-- range slider --&gt;</span>{"\n"}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"bar bar-slider"</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"bar-item"</span> <span
                    className="atn">role</span>=<span className="atv">"progressbar"</span> <span
                    className="atn">style</span>=<span className="atv">"width:15%;"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">button</span> <span className="atn">class</span>=<span className="atv">"bar-slider-btn btn"</span> <span
                    className="atn">role</span>=<span className="atv">"slider"</span>&gt;&lt;<span
                    className="tag">/button</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"bar-item"</span> <span
                    className="atn">role</span>=<span className="atv">"progressbar"</span> <span
                    className="atn">style</span>=<span className="atv">"width:65%;"</span>&gt;{"\n"}{"    "}&lt;
                <span className="tag">button</span> <span className="atn">class</span>=<span className="atv">"bar-slider-btn btn"</span> <span
                    className="atn">role</span>=<span className="atv">"slider"</span>&gt;&lt;<span
                    className="tag">/button</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}