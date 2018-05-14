import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection, DocTitle} from "../comps/DocPage";

export class DocMenus extends DocPage{
    static title = "Menus";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Menus are vertical list of links or buttons for actions and navigation.
            </DocNote>
            <DocSample columns={3}>
                <ul className="menu">
                    <li className="menu-item">
                        <div className="tile tile-centered">
                            <div className="tile-icon">
                                <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                                     className="avatar" alt="Avatar"/>
                            </div>
                            <div className="tile-content">
                                Steve Rogers
                            </div>
                        </div>
                    </li>
                    <li className="divider"/>
                    <li className="menu-item">
                        <div className="menu-badge">
                            <label className="label label-primary">2</label>
                        </div>
                        <a href="#menus" className="active">
                            My profile
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="#menus">
                            Settings
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="#menus">
                            Logout
                        </a>
                    </li>
                </ul>
                <ul className="menu">
                    <li className="divider" data-content="LINKS"/>
                    <li className="menu-item">
                        <a href="#menus">Slack</a>
                    </li>
                    <li className="menu-item">
                        <a href="#menus">Hipchat</a>
                    </li>
                    <li className="menu-item">
                        <a href="#menus">Skype</a>
                    </li>
                </ul>
                <ul className="menu">
                    <li className="menu-item">
                        <label className="form-checkbox">
                            <input type="checkbox" defaultChecked/>
                            <i className="form-icon"/> form-checkbox
                        </label>
                    </li>
                    <li className="menu-item">
                        <label className="form-radio">
                            <input type="radio" defaultChecked/>
                            <i className="form-icon"/> form-radio
                        </label>
                    </li>
                    <li className="menu-item">
                        <label className="form-switch">
                            <input type="checkbox" defaultChecked/>
                            <i className="form-icon"/> form-switch
                        </label>
                    </li>
                </ul>
            </DocSample>
            <DocNote>
                Add a container element with the <code>menu</code> class. And add child elements with
                the <code>menu-item</code>
                class. You can separate menu items with a <code>divider</code>. Spectre.css does not include
                JavaScript code, you will need to implement your JS to interact with the menus.<br/><br/>
                Menus also have <a href="#forms" target="_blank">Form controls</a> (checkbox, radio and
                checkbox) support.
            </DocNote>
            <Code className="HTML">{E1}</Code>
            <DocTitle>Dropdown menus</DocTitle>
            <DocNote>The dropdown is a combination of buttons and menus.</DocNote>
            <DocSample columns={2}>
                <div className="dropdown">
                    <div className="btn-group">
                        <a className="btn btn-primary">dropdown button</a>
                        <a className="btn btn-primary dropdown-toggle" tabIndex={0}><i
                            className="icon icon-caret"/></a>
                        <ul className="menu">
                            <li className="menu-item">
                                <a href="#dropdowns">
                                    Slack
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="#dropdowns">
                                    Hipchat
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="#dropdowns">
                                    Skype
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="dropdown">
                    <a className="btn btn-link dropdown-toggle" tabIndex={0}>dropdown button <i
                        className="icon icon-caret"/></a>
                    <ul className="menu">
                        <li className="menu-item">
                            <a href="#dropdowns">
                                Slack
                            </a>
                        </li>
                        <li className="menu-item">
                            <a href="#dropdowns">
                                Hipchat
                            </a>
                        </li>
                        <li className="menu-item">
                            <a href="#dropdowns">
                                Skype
                            </a>
                        </li>
                    </ul>
                </div>
            </DocSample>
            <DocNote>
                Dropdown menus component is built entirely in CSS. It is triggered
                by <code>:focus</code> event.<br/><br/>
                Add a container element with the <code>dropdown</code> class.
                And add a focusable element with the
                <code>dropdown-toggle</code> class for the button and a <code>menu</code> component right
                next to it. You also need to add <code>tabindex</code> to make the buttons focusable.<br/><br/>
                If the dropdown is close to the right edge of the browser, you can add the
                <code>dropdown-right</code> class to the container to prevent it appearing off screen.
            </DocNote>
            <DocSample>
                <div className="text-right">
                    <div className="dropdown dropdown-right">
                        <a className="btn btn-primary dropdown-toggle" tabIndex={0}>dropdown button <i
                            className="icon icon-caret"/></a>
                        <ul className="menu text-left">
                            <li className="menu-item">
                                <a href="#dropdowns">Slack</a>
                            </li>
                            <li className="menu-item">
                                <a href="#dropdowns">Hipchat</a>
                            </li>
                            <li className="menu-item">
                                <a href="#dropdowns">Skype</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </DocSample>
            <DocNote>
                Also, you can implement your JS to interact with the dropdown menus by adding
                the <code>active</code>
                class to the <code>dropdown</code> container.
            </DocNote>
            <Code className="HTML">{E2}</Code>
        </DocSection>
    }
}

const E1 = `<ul class="menu">
  <!-- menu header text -->
  <li class="divider" data-content="LINKS">
  </li>
  <!-- menu item standard -->
  <li class="menu-item">
    <a href="#">
      <i class="icon icon-link"></i> Slack
    </a>
  </li>
  <!-- menu item with form control -->
  <li class="menu-item">
    <label class="form-checkbox">
      <input type="checkbox">
      <i class="form-icon"></i> form-checkbox
    </label>
  </li>
  <!-- menu divider -->
  <li class="divider"></li>
  <!-- menu item with badge -->
  <li class="menu-item">
    <div class="menu-badge">
      <label class="label label-primary">2</label>
    </div>
    <a href="#">
      <i class="icon icon-link"></i> Settings
    </a>
  </li>
</ul>`;
const E2 = `<!-- basic dropdown button -->
<div class="dropdown">
  <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
    dropdown menu <i class="icon icon-caret"></i>
  </a>
  <!-- menu component -->
  <ul class="menu">
    ...
  </ul>
</div>

<!-- dropdown button group -->
<div class="dropdown">
  <div class="btn-group">
    <a href="#" class="btn">
      dropdown button
    </a>
    <a href="#" class="btn dropdown-toggle" tabindex="0">
      <i class="icon icon-caret"></i>
    </a>

    <!-- menu component -->
    <ul class="menu">
      ...
    </ul>
  </div>
</div>`;