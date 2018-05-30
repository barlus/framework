import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocExample, DocNote, DocPage, DocSample, DocSection, DocText, DocTitle} from "../comps/DocPage";
import {
    Avatar, Button, ButtonGroup, CheckBox, Dropdown, DropdownToggle, Menu, MenuBadge, MenuDivider, MenuItem, Radio,
    Switch, Tile,
    TileContent,
    TileIcon,
    TileTitle
} from "@barlus/spectre";

export class DocMenus extends DocPage{
    static title = "Menus";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text='Menus are vertical list of links or buttons for actions and navigation.'/>
            <DocSample columns={3}>
                <Menu>
                    <MenuItem>
                        <Tile centered>
                            <TileIcon>
                                <Avatar src="https://picturepan2.github.io/spectre/img/avatar-4.png"/>
                            </TileIcon>
                            <TileContent>
                                Steve Rogers
                            </TileContent>
                        </Tile>
                    </MenuItem>
                    <MenuDivider/>
                    <MenuItem>
                        <MenuBadge>
                            <label className="label label-primary">2</label>
                        </MenuBadge>
                        <a href="#menus" className="active">
                            My profile
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a href="#menus">
                            Settings
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a href="#menus">
                            Logout
                        </a>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuDivider content='LINKS'/>
                    <MenuItem>
                        <a href="#menus">
                            Slack
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a href="#menus">
                            Hipchat
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a href="#menus">
                            Skype
                        </a>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem>
                        <CheckBox label='Form-checkbox'/>
                    </MenuItem>
                    <MenuItem>
                        <Radio label='Form-radio'/>
                    </MenuItem>
                    <MenuItem>
                        <Switch label='Form-switch'defaultChecked/>
                    </MenuItem>
                </Menu>
            </DocSample>
            <DocText text={`
                USE the container component ~Menu~. And add child elements with
                the ~MenuItem~ components. You can separate menu items with a ~Divider~. Spectre.css does not include
                JavaScript code, you will need to implement your JS to interact with the menus.

                Menus also have Form controls (~Checkbox~, ~Radio~ and
                checkbox) support.
            `}/>
            <DocExample content={`
                <Menu>
                    <MenuItem>
                        <Tile centered>
                            <TileIcon>
                                <Avatar src="https://picturepan2.github.io/spectre/img/avatar-4.png"/>
                            </TileIcon>
                            <TileContent>
                                Steve Rogers
                            </TileContent>
                        </Tile>
                    </MenuItem>
                    <MenuDivider/>
                    <MenuItem>
                        <MenuBadge>
                            <label className="label label-primary">2</label>
                        </MenuBadge>
                        <a href="#menus" className="active">
                            My profile
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a href="#menus">
                            Settings
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a href="#menus">
                            Logout
                        </a>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuDivider content='LINKS'/>
                    <MenuItem>
                        <a href="#menus">
                            Slack
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a href="#menus">
                            Hipchat
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a href="#menus">
                            Skype
                        </a>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem>
                        <CheckBox label='Form-checkbox'/>
                    </MenuItem>
                    <MenuItem>
                        <Radio label='Form-radio'/>
                    </MenuItem>
                    <MenuItem>
                        <Switch label='Form-switch'defaultChecked/>
                    </MenuItem>
                </Menu>
            `}/>
            <DocTitle>Dropdown menus</DocTitle>
            <DocText text='The dropdown is a combination of buttons and menus.'/>
            <DocSample columns={2}>
                <Dropdown>
                    <ButtonGroup>
                        <Button>Dropdown button</Button>
                        <DropdownToggle>
                            <Button primary><i className="icon icon-caret"/></Button>
                        </DropdownToggle>
                        <Menu>
                            <MenuItem>
                                <a href="#menus">
                                    Slack
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a href="#menus">
                                    Hipchat
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a href="#menus">
                                    Skype
                                </a>
                            </MenuItem>
                        </Menu>
                    </ButtonGroup>
                </Dropdown>
                <Dropdown>
                    <DropdownToggle>
                        <Button  link>dropdown button <i className="icon icon-caret"/></Button>
                    </DropdownToggle>
                    <Menu>
                        <MenuItem>
                            <a href="#menus">
                                Slack
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a href="#menus">
                                Hipchat
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a href="#menus">
                                Skype
                            </a>
                        </MenuItem>
                    </Menu>
                </Dropdown>
            </DocSample>
            <DocExample content={`
                <Dropdown>
                    <DropdownToggle>
                        <Button  link>dropdown button <i className="icon icon-caret"/></Button>
                    </DropdownToggle>
                    <Menu>
                        <MenuItem>
                            <a href="#menus">
                                Slack
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a href="#menus">
                                Hipchat
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a href="#menus">
                                Skype
                            </a>
                        </MenuItem>
                    </Menu>
                </Dropdown>
            `}/>
            <DocText text={`
                Dropdown menus component is built entirely in CSS. It is triggered
                by ~:focus~ event.

                Add a container component ~Dropdown~ class.
                And add a focusable element with the
                ~DropdownToggle~ for the button and a ~Menu~ component right
                next to it. You also need to add ~tabindex~ to make the buttons focusable.


                If the dropdown is close to the right edge of the browser, you can add the
                ~right~ attribute to the container to prevent it appearing off screen.
            `}/>
            <DocSample>
                <div className="text-right">
                    <Dropdown right>
                        <DropdownToggle>
                            <Button  link>dropdown button <i className="icon icon-caret"/></Button>
                        </DropdownToggle>
                        <Menu>
                            <MenuItem>
                                <a href="#menus">
                                    Slack
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a href="#menus">
                                    Hipchat
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a href="#menus">
                                    Skype
                                </a>
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                </div>
            </DocSample>
            <DocText text={`
                Also, you can implement your JS to interact with the dropdown menus by adding
                the ~active~ attribute to the ~Dropdown~ component.
            `}/>
            <DocExample content={`
                <Dropdown right>
                    <DropdownToggle>
                        <Button  link>dropdown button <i className="icon icon-caret"/></Button>
                    </DropdownToggle>
                    <Menu>
                        <MenuItem>
                            <a href="#menus">
                                Slack
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a href="#menus">
                                Hipchat
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a href="#menus">
                                Skype
                            </a>
                        </MenuItem>
                    </Menu>
                </Dropdown>
            `}/>
        </DocSection>
    }
}
