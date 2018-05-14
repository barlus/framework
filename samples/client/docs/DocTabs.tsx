import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";

export class DocTabs extends DocPage {
    static title = "Tabs";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Tabs enable quick switch between different views.
            </DocNote>
            <DocSample columns={2}>
                <ul className="tab">
                    <li className="tab-item active">
                        <a href="#tabs">
                            Music
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Playlists
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Radio
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Store
                        </a>
                    </li>
                </ul>
                <ul className="tab tab-block">
                    <li className="tab-item active">
                        <a href="#tabs">
                            Music
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Playlists
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Radio
                        </a>
                    </li>
                </ul>
            </DocSample>
            <DocNote>
                Add a container element with the <code>tab</code> class. And add child elements with
                the <code>tab-item</code>
                class. You can add the <code>tab-block</code> class for a full-width tab.
                The <code>tab-item</code>
                or its child {'<a>'} with the <code>active</code> class will be highlighted.
            </DocNote>
            <Code className="HTML">{E1}</Code>
            <DocSample columns={2}>
                <ul className="tab">
                    <li className="tab-item active">
                        <a href="#tabs" className="badge" data-badge={999}>
                            Music
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Playlists
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Radio
                        </a>
                    </li>
                </ul>
                <ul className="tab tab-block">
                    <li className="tab-item active">
                        <a href="#tabs" className="badge" data-badge={9}>
                            Music
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs" className="badge" data-badge={99}>
                            Playlists
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Radio
                        </a>
                    </li>
                </ul>
            </DocSample>
            <DocNote>
                If you need <code>badges</code> on tabs, you can add badge class to the element within
                <code>tab-item</code>.
            </DocNote>
            <Code className="HTML">{E2}</Code>
            <DocSample>
                <ul className="tab">
                    <li className="tab-item active">
                        <a href="#tabs">
                            Music
                            <span className="btn btn-clear"/>
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Playlists
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Radio
                        </a>
                    </li>
                    <li className="tab-item">
                        <a href="#tabs">
                            Store
                        </a>
                    </li>
                    <li className="tab-item tab-action">
                        <div className="input-group input-inline">
                            <input className="form-input input-sm" type="text" placeholder="search"/>
                            <button className="btn btn-primary btn-sm input-group-btn">Search</button>
                        </div>
                    </li>
                </ul>
            </DocSample>
            <DocNote>
                You could add a search box or buttons inside a tab.
                Add the <code>tab-action</code> class to the <code>tab-item</code>.
            </DocNote>
            <Code className="HTML">{E3}</Code>
        </DocSection>
    }
}

const E1 = `<ul class="tab tab-block">
  <li class="tab-item active">
    <a href="#">Music</a>
  </li>
  <li class="tab-item">
    <a href="#" class="active">Playlists</a>
  </li>
  <li class="tab-item">
    <a href="#">Radio</a>
  </li>
  <li class="tab-item">
    <a href="#">Connect</a>
  </li>
</ul>`;
const E2 = `<ul class="tab tab-block">
  <li class="tab-item active">
    <a href="#" class="badge" data-badge="9">
      Music
    </a>
  </li>
</ul>`;
const E3 = `<ul class="tab">
  <li class="tab-item active">
    <a href="#">
      Music
    </a>
  </li>
  <li class="tab-item tab-action">
    <div class="input-group input-inline">
      <input class="form-input input-sm" type="text" placeholder="search">
      <button class="btn btn-primary btn-sm input-group-btn">Search</button>
    </div>
  </li>
</ul>`;