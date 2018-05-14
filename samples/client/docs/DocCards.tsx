import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocCards extends DocPage {
    static title = 'Cards';

    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>Cards are flexible content containers.</DocNote>
            <DocSample columns={2}>
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
            </DocSample>
            <DocNote>
                Add a container element with the <code>card</code> class. And add child elements with
                the <code>card-image</code>,
                <code>card-header</code>, <code>card-body</code> and/or <code>card-footer</code> classes.
                The <code>card-image</code>
                can be placed in any position.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}
const E1 = `<div class="card">
  <div class="card-image">
    <img src="img/osx-el-capitan.jpg" class="img-responsive">
  </div>
  <div class="card-header">
    <div class="card-title h5">Microsoft</div>
    <div class="card-subtitle text-gray">Software and hardware</div>
  </div>
  <div class="card-body">
    Empower every person and every organization on the planet to achieve more.
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Do</button>
  </div>
</div>`;