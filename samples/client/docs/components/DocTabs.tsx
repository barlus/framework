import * as React from "@barlus/nerv"

import {DocExample, DocPage, DocSample, DocSection, DocText} from "../../comps/DocPage";
import {Badge, Input, InputGroup, InputGroupButton, Tab, TabItem} from "@barlus/spectre"

export class DocTabs extends DocPage {
    static title = "Tabs";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text='Tabs enable quick switch between different views.'/>
            <DocSample columns={2}>
                <Tab >
                    <TabItem active>
                        <a href="#tabs">
                            Music
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Playlists
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Radio
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Store
                        </a>
                    </TabItem>
                </Tab>
                <Tab block>
                    <TabItem active>
                        <a href="#tabs">
                            Music
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Playlists
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Radio
                        </a>
                    </TabItem>
                </Tab>
            </DocSample>
            <DocText text={`
                Add a container element with the ~Tab~ components. And add child elements with
                the ~TabItem~ component. You can add the ~block~  attribute for a full-width tab.
                The ~TabItem~ or its child ~a~ with the ~active~ attribute will be highlighted.
            `}/>
            <DocExample content={`
                <Tab block>
                    <TabItem active>
                        <a href="#tabs">
                            Music
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Playlists
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Radio
                        </a>
                    </TabItem>
                </Tab>
            `}/>
            <DocSample columns={2}>
                <Tab>
                    <TabItem active>
                        <Badge label={999}>
                            <a href="#tabs">
                                Music
                            </a>
                        </Badge>
                    </TabItem>
                    <TabItem >
                        <a href="#tabs">
                            Playlists
                        </a>
                    </TabItem>
                    <TabItem >
                        <a href="#tabs">
                            Radio
                        </a>
                    </TabItem>
                </Tab>
                <Tab block>
                    <TabItem active>
                        <Badge label={9}>
                            <a href="#tabs">
                                Music
                            </a>
                        </Badge>
                    </TabItem>
                    <TabItem active>
                        <Badge label={999}>
                            <a href="#tabs">
                                Playlists
                            </a>
                        </Badge>
                    </TabItem>
                    <TabItem active>
                        <a href="#tabs">
                            Radio
                        </a>
                    </TabItem>
                </Tab>
            </DocSample>
            <DocText text={`
                If you need badges on tabs, you can wrap element within
                ~TabItem~ with ~badge~ component
            `}/>
            <DocExample content={`
                <Tab block>
                    <TabItem active>
                        <Badge label={9}>
                            <a href="#tabs">
                                Music
                            </a>
                        </Badge>
                    </TabItem>
                    <TabItem active>
                        <Badge label={999}>
                            <a href="#tabs">
                                Playlists
                            </a>
                        </Badge>
                    </TabItem>
                    <TabItem active>
                        <a href="#tabs">
                            Radio
                        </a>
                    </TabItem>
                </Tab>
            `}/>
            <DocSample>
                <Tab>
                    <TabItem active>
                        <a href="#tabs">
                            Music
                            <span className="btn btn-clear"/>
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Playlists
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Radio
                        </a>
                    </TabItem>
                    <TabItem action>
                        <InputGroup inline>
                            <Input small placeholder="search"/>
                            <InputGroupButton small primary>Search</InputGroupButton>
                        </InputGroup>
                    </TabItem>
                </Tab>
            </DocSample>
            <DocText text={`
                You could add a search box or buttons inside a tab.
                Add the ~action~ attribute to the ~TabItem~.
            `}/>
            <DocExample content={`
                <Tab>
                    <TabItem active>
                        <a href="#tabs">
                            Music
                            <span className="btn btn-clear"/>
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Playlists
                        </a>
                    </TabItem>
                    <TabItem>
                        <a href="#tabs">
                            Radio
                        </a>
                    </TabItem>
                    <TabItem action>
                        <InputGroup inline>
                            <Input small placeholder="search"/>
                            <InputGroupButton small primary>Search</InputGroupButton>
                        </InputGroup>
                    </TabItem>
                </Tab>
            `}/>
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