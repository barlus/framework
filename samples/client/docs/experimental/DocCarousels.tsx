import * as React from "@barlus/nerv"
import { Code } from "../../comps/Code";
import { DocNote, DocPage, DocSample, DocSection } from "../../comps/DocPage";

export class DocCarousels extends DocPage {
    static title = 'Carousels';
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Carousels are slideshows for cycling images. It is built in pure CSS.
            </DocNote>
            <DocSample>
                <div className="column col-12">
                    <div className="carousel">
                        <input type="radio" id="slide-1" name="carousel-radio" hidden
                               className="carousel-locator" defaultChecked/>
                        <input type="radio" id="slide-2" name="carousel-radio" hidden
                               className="carousel-locator"/>
                        <input type="radio" id="slide-3" name="carousel-radio" hidden
                               className="carousel-locator"/>
                        <input type="radio" id="slide-4" name="carousel-radio" hidden
                               className="carousel-locator"/>
                        <div className="carousel-container">
                            <figure className="carousel-item">
                                <label className="item-prev btn btn-action btn-lg" htmlFor="slide-4">
                                    <i className="icon icon-arrow-left"/>
                                </label>
                                <label className="item-next btn btn-action btn-lg" htmlFor="slide-2">
                                    <i className="icon icon-arrow-right"/>
                                </label>
                                <img src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg"
                                     className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
                            </figure>
                            <figure className="carousel-item">
                                <label className="item-prev btn btn-action btn-lg" htmlFor="slide-1">
                                    <i className="icon icon-arrow-left"/>
                                </label>
                                <label className="item-next btn btn-action btn-lg" htmlFor="slide-3">
                                    <i className="icon icon-arrow-right"/>
                                </label>
                                <img src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"
                                     className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
                            </figure>
                            <figure className="carousel-item">
                                <label className="item-prev btn btn-action btn-lg" htmlFor="slide-2">
                                    <i className="icon icon-arrow-left"/>
                                </label>
                                <label className="item-next btn btn-action btn-lg" htmlFor="slide-4">
                                    <i className="icon icon-arrow-right"/>
                                </label>
                                <img src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"
                                     className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
                            </figure>
                            <figure className="carousel-item">
                                <label className="item-prev btn btn-action btn-lg" htmlFor="slide-3">
                                    <i className="icon icon-arrow-left"/>
                                </label>
                                <label className="item-next btn btn-action btn-lg" htmlFor="slide-1">
                                    <i className="icon icon-arrow-right"/>
                                </label>
                                <img src="https://picturepan2.github.io/spectre/img/osx-el-capitan-2.jpg"
                                     className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
                            </figure>
                        </div>
                        <div className="carousel-nav">
                            <label className="nav-item text-hide c-hand" htmlFor="slide-1">1</label>
                            <label className="nav-item text-hide c-hand" htmlFor="slide-2">2</label>
                            <label className="nav-item text-hide c-hand" htmlFor="slide-3">3</label>
                            <label className="nav-item text-hide c-hand" htmlFor="slide-4">4</label>
                        </div>
                    </div>
                </div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<div className="column col-12">
<div className="carousel">
    <input type="radio" id="slide-1" name="carousel-radio" hidden
           className="carousel-locator" defaultChecked/>
    <input type="radio" id="slide-2" name="carousel-radio" hidden
           className="carousel-locator"/>
    <input type="radio" id="slide-3" name="carousel-radio" hidden
           className="carousel-locator"/>
    <input type="radio" id="slide-4" name="carousel-radio" hidden
           className="carousel-locator"/>
    <div className="carousel-container">
        <figure className="carousel-item">
            <label className="item-prev btn btn-action btn-lg" htmlFor="slide-4">
                <i className="icon icon-arrow-left"/>
            </label>
            <label className="item-next btn btn-action btn-lg" htmlFor="slide-2">
                <i className="icon icon-arrow-right"/>
            </label>
            <img src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg"
                 className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
        </figure>
        <figure className="carousel-item">
            <label className="item-prev btn btn-action btn-lg" htmlFor="slide-1">
                <i className="icon icon-arrow-left"/>
            </label>
            <label className="item-next btn btn-action btn-lg" htmlFor="slide-3">
                <i className="icon icon-arrow-right"/>
            </label>
            <img src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"
                 className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
        </figure>
        <figure className="carousel-item">
            <label className="item-prev btn btn-action btn-lg" htmlFor="slide-2">
                <i className="icon icon-arrow-left"/>
            </label>
            <label className="item-next btn btn-action btn-lg" htmlFor="slide-4">
                <i className="icon icon-arrow-right"/>
            </label>
            <img src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"
                 className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
        </figure>
        <figure className="carousel-item">
            <label className="item-prev btn btn-action btn-lg" htmlFor="slide-3">
                <i className="icon icon-arrow-left"/>
            </label>
            <label className="item-next btn btn-action btn-lg" htmlFor="slide-1">
                <i className="icon icon-arrow-right"/>
            </label>
            <img src="https://picturepan2.github.io/spectre/img/osx-el-capitan-2.jpg"
                 className="img-responsive rounded" alt="macOS Yosemite Wallpaper"/>
        </figure>
    </div>
    <div className="carousel-nav">
        <label className="nav-item text-hide c-hand" htmlFor="slide-1">1</label>
        <label className="nav-item text-hide c-hand" htmlFor="slide-2">2</label>
        <label className="nav-item text-hide c-hand" htmlFor="slide-3">3</label>
        <label className="nav-item text-hide c-hand" htmlFor="slide-4">4</label>
    </div>
</div>
</div>`;