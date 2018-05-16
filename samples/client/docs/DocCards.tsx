import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocCards extends React.PureComponent<{}, {}> {
    static title = 'Cards';

    render() {
        return <div id="cards" className="container">
            <h3 className="s-title"><a href="#cards" className="anchor" aria-hidden="true">#</a>Cards</h3>
            <div className="docs-note">
                <p>Cards are flexible content containers.</p>
            </div>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <div className="card">
                        <div className="card-image">
                            <img className="img-responsive"
                                 src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"
                                 alt="OS X El Capitan"/>
                        </div>
                        <div className="card-header">
                            <div className="card-title h5">Microsoft</div>
                            <div className="card-subtitle text-gray">Software and hardware</div>
                        </div>
                        <div className="card-body">
                            Empower every person and every organization on the planet to achieve more.
                        </div>
                        <div className="card-footer">
                            <a href="#cards" className="btn btn-primary">Do</a>
                        </div>
                    </div>
                </div>
                <div className="column col-6 col-xs-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title h5">Apple</div>
                            <div className="card-subtitle text-gray">Hardware and software</div>
                        </div>
                        <div className="card-image">
                            <img className="img-responsive"
                                 src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg"
                                 alt="OS X Yosemite"/>
                        </div>
                        <div className="card-body">
                            To make a contribution to the world by making tools for the mind that advance
                            humankind.
                        </div>
                        <div className="card-footer">
                            <div className="btn-group btn-group-block">
                                <button className="btn btn-primary">Buy</button>
                                <button className="btn">Buy</button>
                                <button className="btn">Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column col-6 col-xs-12">
                    <div className="card">
                        <div className="card-image">
                            <img className="img-responsive"
                                 src="https://picturepan2.github.io/spectre/img/macos-sierra-2.jpg"
                                 alt="macOS Sierra"/>
                        </div>
                        <div className="card-header">
                            <button className="btn btn-primary float-right"><i className="icon icon-plus"/>
                            </button>
                            <div className="card-title h5">Google I/O</div>
                            <div className="card-subtitle text-gray">Software and hardware</div>
                        </div>
                        <div className="card-body">
                            An immersive, three-day experience focused on exploring the next generation of
                            technology,
                            mobile and beyond.
                        </div>
                    </div>
                </div>
                <div className="column col-6 col-xs-12">
                    <div className="card">
                        <div className="card-image">
                            <img className="img-responsive"
                                 src="https://picturepan2.github.io/spectre/img/osx-el-capitan-2.jpg"
                                 alt="OS X El Capitan"/>
                        </div>
                        <div className="card-footer">
                            <a href="#cards" className="btn btn-primary">Buy</a>
                            <a href="#cards" className="btn btn-link">Share</a>
                        </div>
                        <div className="card-body">
                            <strong>Surface Studio</strong>. Turn your desk into a Studio. Surface Studio is
                            designed
                            for the creative process.
                        </div>
                    </div>
                </div>
                <div className="column col-6 col-xs-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title h5">Apple</div>
                            <div className="card-subtitle text-gray">Hardware and software</div>
                        </div>
                        <div className="card-body">
                            To make a contribution to the world by making tools for the mind that advance
                            humankind.
                        </div>
                        <div className="card-image">
                            <img className="img-responsive"
                                 src="https://picturepan2.github.io/spectre/img/macos-sierra.jpg"
                                 alt="macOS Sierra"/>
                        </div>
                    </div>
                </div>
                <div className="column col-6 col-xs-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title h5">Google</div>
                            <div className="card-subtitle text-gray">Software and hardware</div>
                        </div>
                        <div className="card-body">
                            Organize the world’s information and make it universally accessible and useful.
                        </div>
                        <div className="card-image">
                            <img className="img-responsive"
                                 src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"
                                 alt="OS X Yosemite"/>
                        </div>
                        <div className="card-footer">
                            <a href="#cards" className="btn btn-primary">Search</a>
                            <a href="#cards" className="btn btn-link">Share</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>Add a container element with the <code>card</code> class. And add child elements with
                    the <code>card-image</code>,
                    <code>card-header</code>, <code>card-body</code> and/or <code>card-footer</code> classes.
                    The <code>card-image</code>
                    can be placed in any position. </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">div</span> <span
                className="atn">class</span>=<span className="atv">"card"</span>&gt;{"\n"}{"  "}&lt;<span
                className="tag">div</span> <span className="atn">class</span>=<span
                className="atv">"card-image"</span>&gt;{"\n"}{"    "}&lt;<span className="tag">img</span> <span
                className="atn">src</span>=<span className="atv">"img/osx-el-capitan.jpg"</span> <span
                className="atn">class</span>=<span className="atv">"img-responsive"</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"card-header"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">div</span> <span className="atn">class</span>=<span className="atv">"card-title h5"</span>&gt;Microsoft&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"    "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"card-subtitle text-gray"</span>&gt;Software and hardware&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span className="atv">"card-body"</span>&gt;{"\n"}{"    "}Empower every person and every organization on the planet to achieve more.{"\n"}{"  "}&lt;
                <span className="tag">/div</span>&gt;{"\n"}{"  "}&lt;<span className="tag">div</span> <span
                    className="atn">class</span>=<span
                    className="atv">"card-footer"</span>&gt;{"\n"}{"    "}&lt;<span
                    className="tag">button</span> <span className="atn">class</span>=<span className="atv">"btn btn-primary"</span>&gt;Do&lt;
                <span className="tag">/button</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">/div</span>&gt;{"\n"}&lt;<span className="tag">/div</span>&gt;{"\n"}</code></pre>
        </div>
    }
}