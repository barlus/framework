import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import { DocPage, DocSection,DocTitle,DocNote } from '../comps/DocPage';


export class DocForms extends DocPage {
    static title = 'Forms';

    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Forms provide the most common control styles used in forms, including input, textarea,
                select, checkbox, radio and switch.
            </DocNote>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="input-example-1">Name</label>
                        <input className="form-input" type="text" id="input-example-1" placeholder="Name"/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="input-example-2">Email</label>
                        <input className="form-input" type="email" id="input-example-2" placeholder="Email"/>
                    </div>
                </div>
            </div>
            <Code className="HTML">{E1}</Code>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="input-example-3">Message</label>
                        <textarea className="form-input" id="input-example-3" placeholder="Textarea" rows={3}
                                  defaultValue={""}/>
                    </div>
                </div>
            </div>
            <Code className="HTML">{E2}</Code>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <div className="form-group">
                        <select className="form-select">
                            <option>Choose an option</option>
                            <option>Slack</option>
                            <option>Skype</option>
                            <option>Hipchat</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="form-select" multiple>
                            <option>Choose an option</option>
                            <option>Slack</option>
                            <option>Skype</option>
                            <option>Hipchat</option>
                        </select>
                    </div>
                </div>
            </div>
            <Code className="HTML">{E3}</Code>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <form>
                        <div className="form-group">
                            <label className="form-label">Gender</label>
                            <label className="form-radio">
                                <input type="radio" name="gender" defaultChecked/>
                                <i className="form-icon"/> Male
                            </label>
                            <label className="form-radio">
                                <input type="radio" name="gender"/>
                                <i className="form-icon"/> Female
                            </label>
                        </div>
                    </form>
                </div>
            </div>
            <Code className="HTML">{E4}</Code>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <div className="form-group">
                        <label className="form-switch">
                            <input type="checkbox"/>
                            <i className="form-icon"/> Send me emails with news and tips
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="form-switch">
                            <input type="checkbox" defaultChecked/>
                            <i className="form-icon"/> Send me emails with news and tips
                        </label>
                    </div>
                </div>
            </div>
            <Code className="HTML">{E5}</Code>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <div className="form-group">
                        <label className="form-checkbox">
                            <input type="checkbox"/>
                            <i className="form-icon"/> Remember me
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="form-checkbox">
                            <input type="checkbox" defaultChecked/>
                            <i className="form-icon"/> Remember me
                        </label>
                    </div>
                </div>
            </div>
            <Code className="HTML">{E6}</Code>
            <DocNote>
                You can use <code>:indeterminate</code> pseudo class for indeterminate state of checkboxes.
            </DocNote>
            <DocTitle>Horizontal forms</DocTitle>
            <DocNote>If you want to have a horizontal form, add the <code>form-horizontal</code> class to
                the &lt;form&gt;
                container. And add the <code>col-[1-12]</code> and <code>col-xs/sm/lg/xl-[1-12]</code> class
                to the
                child elements for responsive form row layout.
            </DocNote>
            <div className="columns">
                <div className="column col-9 col-sm-12">
                    <form className="form-horizontal" action="#forms">
                        <div className="form-group">
                            <div className="col-3 col-sm-12">
                                <label className="form-label" htmlFor="input-example-4">Name</label>
                            </div>
                            <div className="col-9 col-sm-12">
                                <input className="form-input" type="text" id="input-example-4"
                                       placeholder="Name"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3 col-sm-12">
                                <label className="form-label" htmlFor="input-example-5">Email</label>
                            </div>
                            <div className="col-9 col-sm-12">
                                <input className="form-input" type="email" id="input-example-5"
                                       placeholder="Email"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3 col-sm-12">
                                <label className="form-label">Gender</label>
                            </div>
                            <div className="col-9 col-sm-12">
                                <label className="form-radio">
                                    <input type="radio" name="gender"/>
                                    <i className="form-icon"/> Male
                                </label>
                                <label className="form-radio">
                                    <input type="radio" name="gender" defaultChecked/>
                                    <i className="form-icon"/> Female
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3 col-sm-12">
                                <label className="form-label">Source</label>
                            </div>
                            <div className="col-9 col-sm-12">
                                <select className="form-select" multiple>
                                    <option>Slack</option>
                                    <option>Skype</option>
                                    <option>Hipchat</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-9 col-sm-12 col-ml-auto">
                                <label className="form-switch">
                                    <input type="checkbox"/>
                                    <i className="form-icon"/> Send me emails with news and tips
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3 col-sm-12">
                                <label className="form-label" htmlFor="input-example-6">Message</label>
                            </div>
                            <div className="col-9 col-sm-12">
                                        <textarea className="form-input" id="input-example-6" placeholder="Textarea"
                                                  rows={3} defaultValue={""}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-9 col-sm-12 col-ml-auto">
                                <label className="form-checkbox">
                                    <input type="checkbox"/>
                                    <i className="form-icon"/> Remember me
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Code className="HTML">{E7}</Code>
            <DocTitle>Form sizes</DocTitle>
            <DocNote>
                For smaller or larger input and select controls, you could add
                the <code>input-sm</code>/<code>input-lg</code>,
                <code>select-sm</code>/<code>select-lg</code> and <code>label-sm</code>/<code>label-lg</code>
                classes to the elements.
            </DocNote>
            <div className="columns">
                <div className="column col-4 col-xs-12">
                    <label className="form-label label-sm">Label</label>
                </div>
                <div className="column col-4 col-xs-12">
                    <input className="form-input input-sm" type="text" placeholder="Name"/>
                </div>
                <div className="column col-4 col-xs-12">
                    <select className="form-select select-sm">
                        <option>Choose an option</option>
                        <option>Slack</option>
                        <option>Skype</option>
                        <option>Hipchat</option>
                    </select>
                </div>
            </div>
            <div className="columns">
                <div className="column col-4 col-xs-12">
                    <label className="form-label label-lg">Label</label>
                </div>
                <div className="column col-4 col-xs-12">
                    <input className="form-input input-lg" type="text" placeholder="Name"/>
                </div>
                <div className="column col-4 col-xs-12">
                    <select className="form-select select-lg">
                        <option>Choose an option</option>
                        <option>Slack</option>
                        <option>Skype</option>
                        <option>Hipchat</option>
                    </select>
                </div>
            </div>
            <DocNote>
                You can add the <code>input-sm</code>/<code>input-lg</code> classes to the input-checkbox,
                input-radio and input-switch to have different sizes.
            </DocNote>
            <DocTitle>Form icons</DocTitle>
            <DocNote>
                Spectre Form components has <a href="#icons">Spectre Icons</a> support. <br/>
                Add a wrapper with the <code>has-icon-left</code>/<code>has-icon-right</code> class
                    to &lt;input&gt;
                    element. And add the icon with <code>form-icon</code> class next to the &lt;input&gt;.
            </DocNote>
            <div className="columns">
                <div className="column col-4 col-xs-12">
                    <div className="has-icon-left">
                        <input className="form-input input-sm" type="text" placeholder="Name"/>
                        <i className="form-icon icon icon-arrow-right"/>
                    </div>
                </div>
                <div className="column col-4 col-xs-12">
                    <div className="has-icon-left tooltip" data-tooltip="Lorem ipsum dolor sit amet">
                        <input className="form-input" type="text" placeholder="Name"/>
                        <i className="form-icon icon icon-arrow-right"/>
                    </div>
                </div>
                <div className="column col-4 col-xs-12">
                    <div className="has-icon-left">
                        <input className="form-input input-lg" type="text" placeholder="Name"/>
                        <i className="form-icon icon icon-arrow-right"/>
                    </div>
                </div>
            </div>
            <Code className="HTML">{E8}</Code>
            <div className="columns">
                <div className="column col-4 col-xs-12">
                    <div className="has-icon-right">
                        <input className="form-input input-sm" type="text" placeholder="Name"/>
                        <i className="form-icon icon icon-check"/>
                    </div>
                </div>
                <div className="column col-4 col-xs-12">
                    <div className="has-icon-right">
                        <input className="form-input" type="text" placeholder="Name"/>
                        <i className="form-icon icon icon-check"/>
                    </div>
                </div>
                <div className="column col-4 col-xs-12">
                    <div className="has-icon-right">
                        <input className="form-input input-lg" type="text" placeholder="Name"/>
                        <i className="form-icon icon icon-check"/>
                    </div>
                </div>
            </div>
            <div className="docs-note">
                <p>You can use the <code>loading</code> class for loading or posting state.</p>
            </div>
            <div className="columns">
                <div className="column col-4 col-xs-12">
                    <div className="has-icon-right">
                        <input className="form-input input-sm" type="text" placeholder="Name"/>
                        <i className="form-icon loading"/>
                    </div>
                </div>
                <div className="column col-4 col-xs-12">
                    <div className="has-icon-right">
                        <input className="form-input" type="text" placeholder="Name"/>
                        <i className="form-icon loading"/>
                    </div>
                </div>
                <div className="column col-4 col-xs-12">
                    <div className="has-icon-right">
                        <input className="form-input input-lg" type="text" placeholder="Name"/>
                        <i className="form-icon loading"/>
                    </div>
                </div>
            </div>
            <Code className="HTML">{E9}</Code>
            <DocTitle>Input types</DocTitle>
            <div className="columns">
                <div className="column col-9 col-sm-12">
                    <form className="form-horizontal" action="#forms">
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="input-example-8">Email</label>
                            </div>
                            <div className="col-9">
                                <input className="form-input" type="email" id="input-example-8"
                                       placeholder="Email" defaultValue="spectre@example.com"
                                       pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="input-example-9">URL</label>
                            </div>
                            <div className="col-9">
                                <input className="form-input" type="url" id="input-example-9" placeholder="URL"
                                       defaultValue="https://github.com/picturepan2/spectre"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="input-example-10">Search</label>
                            </div>
                            <div className="col-9">
                                <input className="form-input" type="search" id="input-example-10"
                                       placeholder="Search"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="input-example-11">Tel</label>
                            </div>
                            <div className="col-9">
                                <input className="form-input" type="tel" id="input-example-11" placeholder="Tel"
                                       defaultValue="1-(888)-888-8888"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="input-example-12">Password</label>
                            </div>
                            <div className="col-9">
                                <input className="form-input" type="password" id="input-example-12"
                                       placeholder="Password" defaultValue={123456789}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="input-example-13">Number</label>
                            </div>
                            <div className="col-9">
                                <input className="form-input" type="number" id="input-example-13"
                                       placeholder={'00'} defaultValue={66}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="input-example-14">Date</label>
                            </div>
                            <div className="col-9">
                                <input className="form-input" type="date" id="input-example-14"
                                       defaultValue="2016-12-31"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="input-example-15">Color</label>
                            </div>
                            <div className="col-9">
                                <input className="form-input" type="color" id="input-example-15"
                                       defaultValue="#5755d9"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3">
                                <label className="form-label" htmlFor="input-example-16">File</label>
                            </div>
                            <div className="col-9">
                                <input className="form-input" type="file" id="input-example-16"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <DocTitle>Input groups</DocTitle>
            <div className="columns">
                <div className="column col-xs-12">
                    <div className="input-group">
                        <input type="text" className="form-input input-sm" placeholder="username"/>
                        <select className="form-select select-sm">
                            <option>Slack</option>
                            <option>Skype</option>
                            <option>Hipchat</option>
                        </select>
                    </div>
                </div>
                <div className="column col-xs-12">
                    <div className="input-group">
                        <span className="input-group-addon addon-sm">slack.com/</span>
                        <input type="text" className="form-input input-sm" placeholder="site name"/>
                        <button className="btn btn-primary input-group-btn btn-sm">Submit</button>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-xs-12">
                    <div className="input-group">
                        <input type="text" className="form-input" placeholder="username"/>
                        <select className="form-select">
                            <option>Slack</option>
                            <option>Skype</option>
                            <option>Hipchat</option>
                        </select>
                    </div>
                </div>
                <div className="column col-xs-12">
                    <div className="input-group">
                        <span className="input-group-addon">slack.com/</span>
                        <input type="text" className="form-input" placeholder="site name"/>
                        <button className="btn btn-primary input-group-btn">Submit</button>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-xs-12">
                    <div className="input-group">
                        <label className="form-switch">
                            <input type="checkbox"/>
                            <i className="form-icon"/>
                        </label>
                        <input type="text" className="form-input" placeholder="name"/>
                    </div>
                </div>
                <div className="column col-xs-12">
                    <div className="input-group">
                        <label className="form-checkbox">
                            <input type="checkbox"/>
                            <i className="form-icon"/>
                        </label>
                        <input type="text" className="form-input" placeholder="name"/>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column col-xs-12">
                    <div className="input-group">
                        <input type="text" className="form-input input-lg" placeholder="username"/>
                        <select className="form-select select-lg">
                            <option>Slack</option>
                            <option>Skype</option>
                            <option>Hipchat</option>
                        </select>
                    </div>
                </div>
                <div className="column col-xs-12">
                    <div className="input-group">
                        <span className="input-group-addon addon-lg">slack.com/</span>
                        <input type="text" className="form-input input-lg" placeholder="site name"/>
                        <button className="btn btn-primary input-group-btn btn-lg">Submit</button>
                    </div>
                </div>
            </div>
            <DocNote>
                If you want to attach text and button along with an input, add
                    the <code>input-group</code> class to
                    the input container. And add the <code>input-group-addon</code> class to the text element
                    and <code>input-group-btn</code>
                    to the button element.
            </DocNote>
            <Code className="HTML">{E10}</Code>
            <DocTitle>Form validation styles</DocTitle>
            <DocNote>
                To use form validation styles, add <code>is-success</code> or <code>is-error</code> class to
                    the
                    controls or add <code>has-success</code> or <code>has-error</code> class to parent elements.
                    You can
                    use the <code>form-input-hint</code> class to provide form validation success and error
                    messages.

            </DocNote>
            <div className="columns">
                <div className="column col-9 col-sm-12">
                    <fieldset>
                        <legend>Input</legend>
                        <div className="form-group">
                            <label className="form-label" htmlFor="input-example-17">Name</label>
                            <input className="form-input is-success" type="text" id="input-example-17"
                                   placeholder="Name"/>
                            <p className="form-input-hint">The name is valid.</p>
                        </div>
                        <div className="form-group has-error">
                            <label className="form-label" htmlFor="input-example-18">Password</label>
                            <input className="form-input" type="password" id="input-example-18"
                                   placeholder="Password"/>
                            <p className="form-input-hint">Passwords must have at least 8 characters.</p>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="input-example-21">Email</label>
                            <input className="form-input" type="text" id="input-example-21" placeholder="Email"
                                   pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"/>
                            <p className="form-input-hint">The Email address is unavailable.</p>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Select</legend>
                        <div className="form-group">
                            <select className="form-select is-error">
                                <option>Choose an option</option>
                                <option>Slack</option>
                                <option>Skype</option>
                                <option>Hipchat</option>
                            </select>
                            <p className="form-input-hint">The option is invalid.</p>
                        </div>
                        <div className="form-group has-success">
                            <select className="form-select">
                                <option>Choose an option</option>
                                <option>Slack</option>
                                <option>Skype</option>
                                <option>Hipchat</option>
                            </select>
                            <p className="form-input-hint">The option is available.</p>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Checkbox, Radio and Switch (Error state only)</legend>
                        <div className="form-group">
                            <label className="form-checkbox is-error">
                                <input type="checkbox" defaultChecked/>
                                <i className="form-icon"/> I'm not a robot.
                            </label>
                        </div>
                        <div className="form-group has-error">
                            <label className="form-radio">
                                <input type="radio" name="gender" defaultChecked/>
                                <i className="form-icon"/> Male
                            </label>
                            <label className="form-radio">
                                <input type="radio" name="gender"/>
                                <i className="form-icon"/> Female
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="form-switch is-error">
                                <input type="checkbox" defaultChecked/>
                                <i className="form-icon"/> Send me emails with news and tips
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>
            <Code className="HTML">{E11}</Code>
            <DocTitle>Form disabled styles</DocTitle>
            <DocNote>
               Add the <code>disabled</code> attribute to the element or &lt;fieldset&gt; for a disabled
                    form components style.
            </DocNote>
            <div className="columns">
                <div className="column col-6 col-xs-12">
                    <form action="#forms">
                        <fieldset disabled>
                            <div className="form-group">
                                <label className="form-label" htmlFor="input-example-19">Name</label>
                                <input className="form-input" type="text" id="input-example-19"
                                       placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Gender</label>
                                <label className="form-radio">
                                    <input type="radio" name="gender" disabled/>
                                    <i className="form-icon"/> Male
                                </label>
                                <label className="form-radio">
                                    <input type="radio" name="gender" disabled/>
                                    <i className="form-icon"/> Female
                                </label>
                            </div>
                            <div className="form-group">
                                <select className="form-select" disabled>
                                    <option>Choose an option</option>
                                    <option>Slack</option>
                                    <option>Skype</option>
                                    <option>Hipchat</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-switch">
                                    <input type="checkbox" disabled/>
                                    <i className="form-icon"/> Send me emails with news and tips
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="input-example-20">Message</label>
                                <textarea className="form-input" id="input-example-20" placeholder="Textarea" rows={3} disabled defaultValue={""}/>
                            </div>
                            <div className="form-group">
                                <label className="form-checkbox">
                                    <input type="checkbox" disabled/>
                                    <i className="form-icon"/> Remember me
                                </label>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </DocSection>
    }
}


const E1 = `<div class="form-group">
  <!-- form input control -->
  <label class="form-label" for="input-example-1">Name</label>
  <input class="form-input" type="text" id="input-example-1" placeholder="Name">
</div>`;
const E2 = `<div class="form-group">
  <!-- form textarea control -->
  <label class="form-label" for="input-example-3">Message</label>
  <textarea class="form-input" id="input-example-3" placeholder="Textarea" rows="3"/>
</div>`;
const E3 = `<div class="form-group">
  <!-- form select control -->
  <select class="form-select">
    <option>Choose an option</option>
    <option>Slack</option>
    <option>Skype</option>
    <option>Hipchat</option>
  </select>
</div>`;
const E4 = `<div class="form-group">
  <!-- form radio control -->
  <label class="form-label">Gender</label>
  <label class="form-radio">
    <input type="radio" name="gender" checked>
    <i class="form-icon"/> Male
  </label>
  <label class="form-radio">
    <input type="radio" name="gender">
    <i class="form-icon"/> Female
  </label>
</div>`;
const E5 = `<div class="form-group">
  <!-- form switch control -->
  <label class="form-switch">
    <input type="checkbox">
    <i class="form-icon"></i> Send me emails with news and tips
  </label>
</div>`;
const E6 = `<div class="form-group">
  <!-- form checkbox control -->
  <label class="form-checkbox">
    <input type="checkbox">
    <i class="form-icon"></i> Remember me
  </label>
</div>`;
const E7 = `<form class="form-horizontal">
  <div class="form-group">
    <div class="col-3 col-sm-12">
      <label class="form-label" for="input-example-1">Name</label>
    </div>
    <div class="col-9 col-sm-12">
      <input class="form-input" type="text" id="input-example-1" placeholder="Name">
    </div>
  </div>
  <!-- form structure -->
</form>`;
const E8 = `<div class="has-icon-left">
  <!-- form input with Spectre icon -->
  <input type="text" class="form-input" placeholder="...">
  <i class="form-icon icon icon-check"></i>
</div>`;
const E9 = `<div class="has-icon-right">
  <!-- form input with loading icon -->
  <input type="text" class="form-input" placeholder="...">
  <i class="form-icon loading"></i>
</div>`;
const E10 = `
<!-- normal input group -->
<div class="input-group">
  
  <span class="input-group-addon">...</span>
  <input type="text" class="form-input" placeholder="...">
</div>

<!-- large input group -->
<div class="input-group">
  <span class="input-group-addon addon-lg">...</span>
  <input type="text" class="form-input input-lg" placeholder="...">
</div>

<!-- normal input group with button -->
<div class="input-group">
  <span class="input-group-addon">...</span>
  <input type="text" class="form-input" placeholder="...">
  <button class="btn btn-primary input-group-btn">Submit</button>
</div>
`;
const E11 = `<form>
  <!-- form validation class: has-success -->
  <div class="form-group has-success">
    <label class="form-label" for="input-example-1">Name</label>
    <input class="form-input" type="text" id="input-example-1" placeholder="...">
    <p class="form-input-hint">The name is invalid.</p>
  </div>

  <!-- form validation class: is-success -->
  <div class="form-group">
    <label class="form-label" for="input-example-1">Name</label>
    <input class="form-input is-success" type="text" id="input-example-1" placeholder="...">
    <p class="form-input-hint">The name is invalid.</p>
  </div>

  <!-- form validation example for checkbox, radio and switch -->
  <div class="form-group">
    <label class="form-checkbox is-error">
      <input type="checkbox">
      <i class="form-icon"></i> Remember me
    </label>
  </div>
</form>`;