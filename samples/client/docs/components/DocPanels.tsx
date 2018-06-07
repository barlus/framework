import * as React from "@barlus/react"
import { DocExample, DocNote, DocPage, DocSample, DocSection, DocText } from "../../comps/DocPage";
import {
    Avatar, Button, Input, InputGroup, InputGroupButton, Panel, PanelBody, PanelFooter, PanelHeader, PanelNav,
    PanelSubtitle,
    PanelTitle, Tab, TabItem, Tile, TileAction, TileContent, TileIcon, TileSubtitle, TileTitle
} from "@barlus/spectre";

export class DocPanels extends DocPage {
    static title = "Panels";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Panels are flexible view container with auto-expand content section.
            </DocNote>
            <DocSample columns={2}>
                <Panel>
                    <PanelHeader>
                        <Avatar lg src="https://picturepan2.github.io/spectre/img/avatar-2.png"/>
                        <PanelTitle>
                            Bruce Banner
                        </PanelTitle>
                        <PanelSubtitle>
                            THE HULK
                        </PanelSubtitle>
                    </PanelHeader>
                    <PanelNav>
                        <Tab block>
                            <TabItem active>
                                <a href="#panels">
                                    Profile
                                </a>
                            </TabItem>
                            <TabItem>
                                <a href="#panels">
                                    Files
                                </a>
                            </TabItem>
                            <TabItem>
                                <a href="#panels">
                                    Tasks
                                </a>
                            </TabItem>
                        </Tab>
                    </PanelNav>
                    <PanelBody>
                        <Tile centered>
                            <TileContent>
                                <TileTitle>E-mail</TileTitle>
                                <TileSubtitle>bruce.banner@hulk.com</TileSubtitle>
                            </TileContent>
                            <TileAction>
                                <Button large action link><i className="icon icon-edit"/></Button>
                            </TileAction>
                        </Tile>
                        <Tile centered>
                            <TileContent>
                                <TileTitle>Skype</TileTitle>
                                <TileSubtitle>bruce.banner</TileSubtitle>
                            </TileContent>
                            <TileAction>
                                <Button large action link><i className="icon icon-edit"/></Button>
                            </TileAction>
                        </Tile>
                        <Tile centered>
                            <TileContent>
                                <TileTitle>Location</TileTitle>
                                <TileSubtitle>Dayton, Ohio</TileSubtitle>
                            </TileContent>
                            <TileAction>
                                <Button large action link><i className="icon icon-edit"/></Button>
                            </TileAction>
                        </Tile>
                    </PanelBody>
                    <PanelFooter>
                        <Button block>Save</Button>
                    </PanelFooter>
                </Panel>
                <Panel>
                    <PanelHeader>
                        <PanelTitle>Comments</PanelTitle>
                    </PanelHeader>
                    <PanelBody>
                        <Tile>
                            <TileIcon>
                                <Avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png"/>
                            </TileIcon>
                            <TileContent>
                                <TileTitle>Thor Odinson</TileTitle>
                                <TileSubtitle>
                                    Earth's Mightiest Heroes joined forces to take on threats
                                    that were too big for any one hero to tackle...
                                </TileSubtitle>
                            </TileContent>
                        </Tile>
                        <Tile>
                            <TileIcon>
                                <Avatar src="https://picturepan2.github.io/spectre/img/avatar-2.png"/>
                            </TileIcon>
                            <TileContent>
                                <TileTitle>Bruce Banner</TileTitle>
                                <TileSubtitle>
                                    Earth's Mightiest Heroes joined forces to take on threats
                                    that were too big for any one hero to tackle...
                                </TileSubtitle>
                            </TileContent>
                        </Tile>
                        <Tile>
                            <TileIcon>
                                <Avatar initial="TS"/>
                            </TileIcon>
                            <TileContent>
                                <TileTitle>Tony Stark</TileTitle>
                                <TileSubtitle>
                                    Earth's Mightiest Heroes joined forces to take on threats
                                    that were too big for any one hero to tackle...
                                </TileSubtitle>
                            </TileContent>
                        </Tile>
                        <Tile>
                            <TileIcon>
                                <Avatar initial="SR"/>
                            </TileIcon>
                            <TileContent>
                                <TileTitle>Steve Rogers</TileTitle>
                                <TileSubtitle>
                                    Earth's Mightiest Heroes joined forces to take on threats
                                    that were too big for any one hero to tackle...
                                </TileSubtitle>
                            </TileContent>
                        </Tile>
                        <Tile>
                            <TileIcon>
                                <Avatar src="https://picturepan2.github.io/spectre/img/avatar-4.png"/>
                            </TileIcon>
                            <TileContent>
                                <TileTitle>Natasha Romanoff</TileTitle>
                                <TileSubtitle>
                                    Earth's Mightiest Heroes joined forces to take on threats
                                    that were too big for any one hero to tackle...
                                </TileSubtitle>
                            </TileContent>
                        </Tile>
                    </PanelBody>
                    <PanelFooter>
                        <InputGroup>
                            <Input placeholder='Hello'/>
                            <InputGroupButton primary>Send</InputGroupButton>
                        </InputGroup>
                    </PanelFooter>
                </Panel>
            </DocSample>
            <DocText text={`
                Add a container element with the ~Panel~ components. And add child elements with
                the ~PanelHeader~,~PanelNav, ~PanelBody~ and/or ~PanelFooter~ components.
                The ~PanelBody~ can be auto expanded and vertically scrollable.
            `}/>
            <DocExample content={`
                <Panel>
                    <PanelHeader>
                        <Avatar lg src="/img/avatar-2.png"/>
                        <PanelTitle>
                            Bruce Banner
                        </PanelTitle>
                        <PanelSubtitle>
                            THE HULK
                        </PanelSubtitle>
                    </PanelHeader>
                    <PanelNav>
                           <!-- navigation components: tabs, breadcrumbs or pagination -->
                    </PanelNav>
                    <PanelBody>
                           <!-- contents -->
                    </PanelBody>
                    <PanelFooter>
                            <!-- buttons or inputs -->
                    </PanelFooter>
                </Panel>
            `}/>
        </DocSection>
    }
}

const E1 = `<div className="panel">
  <div className="panel-header">
    <div className="panel-title">Comments</div>
  </div>
  <div className="panel-nav">
    <!-- navigation components: tabs, breadcrumbs or pagination -->
  </div>
  <div className="panel-body">
    <!-- contents -->
  </div>
  <div className="panel-footer">
    <!-- buttons or inputs -->
  </div>
</div>`;