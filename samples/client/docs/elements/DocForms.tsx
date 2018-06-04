import * as React from "@barlus/nerv"
import { DocPage, DocText, DocExample, DocSection, DocTitle, DocSample } from '../../comps/DocPage';
import {
    CheckBox, Column, Form, FormGroup, Input, Radio, Select, Switch,
    TextArea, Label, InputGroup, InputGroupAddon, InputGroupButton, Hint
} from "@barlus/spectre";

export class DocForms extends DocPage {
    static title = 'Forms';
    static ready = true;

    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text={`
                 Forms provide the most common control styles used in forms, including input, textarea,
                select, checkbox, radio and switch.
            `}/>
            <DocSample columns={2}>
                <div>
                    <Input placeholder="name"/>
                    <Input label="Email" placeholder="email"/>
                </div>
            </DocSample>
            <DocExample content={`
                <Input placeholder="name"/>
                <Input label="Email" placeholder="email"/>
            `}/>
            <DocSample columns={2}>
                <div>
                    <TextArea label="Message" placeholder="TextArea" rows={3}/>
                </div>
            </DocSample>
            <DocExample content={`
                    <TextArea label="Message" placeholder="TextArea" rows={3} />
            `}/>
            <DocSample columns={2}>
                <Select>
                    <option>Choose an option</option>
                    <option>Slack</option>
                    <option>Skype</option>
                    <option>Hipchat</option>
                </Select>
                <Select multiple>
                    <option>Choose an option</option>
                    <option>Slack</option>
                    <option>Skype</option>
                    <option>Hipchat</option>
                </Select>
            </DocSample>
            <DocExample content={`
                <Select>
                    <option>Choose an option</option>
                    <option>Slack</option>
                    <option>Skype</option>
                    <option>Hipchat</option>
                </Select>
                <Select multiple>
                    <option>Choose an option</option>
                    <option>Slack</option>
                    <option>Skype</option>
                    <option>Hipchat</option>
                </Select>
            `}/>
            <DocSample columns={2}>
                <FormGroup label="Gender">
                    <Radio name="gender" label="Male"/>
                    <Radio name="gender" label="Female"/>
                </FormGroup>
            </DocSample>
            <DocExample content={`
                <FormGroup label="Gender">
                    <Radio name="gender" label="Male" />
                    <Radio name="gender" label="Female" />
                </FormGroup>
            `}/>
            <DocSample>
                <Switch label='Send me emails with news and tips'/>
                <Switch label='Send me emails with news and tips' defaultChecked/>
            </DocSample>
            <DocExample content={`
                <Switch label='Send me emails with news and tips'/>
                <Switch label='Send me emails with news and tips' defaultChecked/>
            `}/>
            <DocSample>
                <CheckBox label='Remember me'/>
                <CheckBox label='Remember me' defaultChecked/>
            </DocSample>
            <DocExample content={`
                <CheckBox label='Remember me'/>
                <CheckBox label='Remember me' defaultChecked/>
            `}/>
            <DocText text={`
                You can use ~:indeterminate~ pseudo class for indeterminate state of checkboxes.
            `}/>
            <DocTitle>Horizontal forms</DocTitle>

            <DocText text={`
                If you want to have a horizontal form, add the ~horizontal~ attribute to
                the ~Form~ component. And add the ~col-[1-12]~ and ~col-xs/sm/lg/xl-[1-12]~ attributes
                to the child components for responsive form row layout.
            `}/>
            <DocSample>
                <Form horizontal>
                    <FormGroup>
                        <Column sm={12} lg={3} xl={3}>
                            <Label htmlFor="input-example--21">Name</Label>
                        </Column>
                        <Column sm={12} lg={9} xl={9}>
                            <Input id='input-example--20' autocomplete='name' placeholder="Name"/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column sm={12} lg={3} xl={3}>
                            <Label htmlFor="input-example--5">Email</Label>
                        </Column>
                        <Column sm={12} lg={9} xl={9}>
                            <Input id='input-example--5' autocomplete='email' placeholder="Email" type="email"/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column sm={12} lg={3} xl={3}>
                            <Label htmlFor="input-example--6">Gender</Label>
                        </Column>
                        <Column sm={12} lg={9} xl={9}>
                            <Radio name="gender" label='Male'/>
                            <Radio name="gender" label='Female' defaultChecked={true}/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column sm={12} lg={3} xl={3}>
                            <label className="form-label">Source</label>
                        </Column>
                        <Column sm={12} lg={9} xl={9}>
                            <Select multiple>
                                <option>Slack</option>
                                <option>Skype</option>
                                <option>Hipchat</option>
                            </Select>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column sm={12} lg={3} xl={3}>
                            <label className="form-label">Gender</label>
                        </Column>
                        <Column sm={12} lg={9} xl={9}>
                            <Switch label='Send me emails with news and tips'/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column sm={12} lg={3} xl={3}>
                            <label className="form-label">Message</label>
                        </Column>
                        <Column sm={12} lg={9} xl={9}>
                            <TextArea placeholder="Textarea" rows={3}/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column sm={12} lg={9} xl={9} className="col-ml-auto">
                            <CheckBox label="Remember me"/>
                        </Column>
                    </FormGroup>
                </Form>
            </DocSample>
            <DocExample content={`
                <Form horizontal>
                    <FormGroup>
                        <Column sm={12} lg={3} xl={3}>
                            <Label htmlFor="input-example--4">Name</Label>
                        </Column>
                        <Column sm={12} lg={9} xl={9} >
                            <Input id='input-example--4'  placeholder="Name"/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column sm={12} lg={3} xl={3}>
                            <Label htmlFor="input-example--5">Email</Label>
                        </Column>
                        <Column sm={12} lg={9} xl={9} >
                            <Input id='input-example--5' placeholder="Email" type="email"/>
                        </Column>
                    </FormGroup>
                </Form>
            `}/>
            <DocTitle>Form sizes</DocTitle>
            <DocText text={`
                For smaller or larger input and select controls, you could add the ~sm/lg~ attributes to the elements.
            `}/>
            <DocSample columns={3}>
                <Label small>Label</Label>
                <Input small placeholder="Name"/>
                <Select small>
                    <option>Choose an option</option>
                    <option>Slack</option>
                    <option>Skype</option>
                    <option>Hipchat</option>
                </Select>
                <Label large>Label</Label>
                <Input large placeholder="Name"/>
                <Select large>
                    <option>Choose an option</option>
                    <option>Slack</option>
                    <option>Skype</option>
                    <option>Hipchat</option>
                </Select>
            </DocSample>
            <DocText text={`
                You can add the ~small/large~ attributes to the Checkbox, Radio and Switch to have different sizes.
            `}/>

            <DocTitle>Form icons</DocTitle>
            <DocText text={`
                You can add icons to ~Input~ component by adding ~iconLeft/iconRight~ attributes
            `}/>
            <DocSample columns={3}>
                <Input iconLeft={<i class="icon icon-arrow-right"/>} placeholder="Name"/>
                <Input large iconLeft={<i class="icon icon-arrow-right"/>} placeholder="Name"/>
                <Input large iconLeft={<i class="icon loading"/>} placeholder="Name"/>
                <Input iconRight={<i class="icon icon-check"/>} placeholder="Name"/>
                <Input large iconRight={<i class="icon icon-check"/>} placeholder="Name"/>
                <Input large iconRight={<i class="icon loading"/>} placeholder="Name"/>
            </DocSample>
            <DocExample content={`
                <Input iconLeft={<i class="icon icon-arrow-right"/>} placeholder="Name"/>
                <Input large iconLeft={<i class="icon icon-arrow-right"/>} placeholder="Name"/>
                <Input large iconLeft={<i class="icon loading"/>} placeholder="Name"/>
                <Input iconRight={<i class="icon icon-check"/>} placeholder="Name"/>
                <Input large iconRight={<i class="icon icon-check"/>} placeholder="Name"/>
                <Input large iconRight={<i class="icon loading"/>} placeholder="Name"/>
            `}/>
            <DocTitle>Input types</DocTitle>
            <DocSample>
                <Form horizontal>
                    <FormGroup>
                        <Column all={3}>
                            <Label htmlFor="input-example--31">Email</Label>
                        </Column>
                        <Column all={9}>
                            <Input id='input-example--31' type="Email" defaultValue='spectre@example.com'
                                   placeholder="Email"/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column all={3}>
                            <Label htmlFor="input-example--32">URL</Label>
                        </Column>
                        <Column all={9}>
                            <Input id='input-example--32' type="url"
                                   defaultValue="https://github.com/picturepan2/spectre" placeholder="URl"/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column all={3}>
                            <Label htmlFor="input-example--33">Search</Label>
                        </Column>
                        <Column all={9}>
                            <Input id='input-example--33' type="search" placeholder="Search"/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column all={3}>
                            <Label htmlFor="input-example--34">Tel</Label>
                        </Column>
                        <Column all={9}>
                            <Input id='input-example--34' type="tel" placeholder="Tel" defaultValue="1-(888)-888-8888"/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column all={3}>
                            <Label htmlFor="input-example--35">Password</Label>
                        </Column>
                        <Column all={9}>
                            <Input id='input-example--35' autocomplete='none' type="password" placeholder="Password"
                                   defaultValue="123456"/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column all={3}>
                            <Label htmlFor="input-example--36">Number</Label>
                        </Column>
                        <Column all={9}>
                            <Input id='input-example--36' type="number" placeholder="Number" defaultValue={66}/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column all={3}>
                            <Label htmlFor="input-example--37">Date</Label>
                        </Column>
                        <Column all={9}>
                            <Input id='input-example--37' type="date" placeholder="Date" defaultValue="2016-12-31"/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column all={3}>
                            <Label htmlFor="input-example--38">Color</Label>
                        </Column>
                        <Column all={9}>
                            <Input id='input-example--38' type="color" placeholder="Date" defaultValue="#5755d9"/>
                        </Column>
                    </FormGroup>
                    <FormGroup>
                        <Column all={3}>
                            <Label htmlFor="input-example--39">File</Label>
                        </Column>
                        <Column all={9}>
                            <Input id='input-example--39' type="file"/>
                        </Column>
                    </FormGroup>
                </Form>
            </DocSample>
            <DocTitle>Input groups</DocTitle>
            <DocSample columns={2}>
                <InputGroup>
                    <Input small id='input-example--12' placeholder="Username"/>
                    <Select small>
                        <option>Slack</option>
                        <option>Skype</option>
                        <option>Hipchat</option>
                    </Select>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon small>slack.com</InputGroupAddon>
                    <Input small id='input-example--13' placeholder="Username"/>
                    <InputGroupButton small>Submit</InputGroupButton>
                </InputGroup>

                <InputGroup>
                    <Input id='input-example--14' placeholder="Username"/>
                    <Select>
                        <option>Slack</option>
                        <option>Skype</option>
                        <option>Hipchat</option>
                    </Select>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon>slack.com</InputGroupAddon>
                    <Input id='input-example--15' placeholder="Username"/>
                    <InputGroupButton>Submit</InputGroupButton>
                </InputGroup>

                <InputGroup>
                    <Input large id='input-example--16' placeholder="Username"/>
                    <Select large>
                        <option>Slack</option>
                        <option>Skype</option>
                        <option>Hipchat</option>
                    </Select>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon large>slack.com</InputGroupAddon>
                    <Input large id='input-example--17' placeholder="Username"/>
                    <InputGroupButton large>Submit</InputGroupButton>
                </InputGroup>

                <InputGroup>
                    <Switch/>
                    <Input id='input-example--18' autocomplete='none' placeholder="Name"/>
                </InputGroup>
                <InputGroup>
                    <Switch large/>
                    <Input large id='input-example--19' placeholder="Name"/>
                </InputGroup>
            </DocSample>
            <DocText text={`
                If you want to attach text and button along with an input,
                wrap input with ~InputGroup~ component. And use the ~InputGroupAddon~ component for the text element and ~InputGroupButton~ for the button element.
            `}/>
            <DocExample content={`
                <!-- input group with select element-->
                <InputGroup>
                    <Input small id='input-example--12' placeholder="Username"/>
                    <Select small>
                        <option>Slack</option>
                        <option>Skype</option>
                        <option>Hipchat</option>
                    </Select>
                </InputGroup>
                <!-- input group with button and prefix-->
                <InputGroup>
                    <InputGroupAddon small>slack.com</InputGroupAddon>
                    <Input small id='input-example--124' placeholder="Username"/>
                    <InputGroupButton small >Submit</InputGroupButton>
                </InputGroup>
            `}/>

            <DocTitle>Form validation styles</DocTitle>
            <DocText text={`
                To use form validation styles, add ~success~ or ~error~ attributes to the controls or to parent components.
                You can use the ~Hint~ component to provide form validation success and error messages.
            `}/>
            <DocSample columns={2}>
                <Form>
                    <legend>Input</legend>
                    <FormGroup success>
                        <Input label='Name' id="validation-1" placeholder="Name"/>
                        <Hint>The name is valid.</Hint>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='validation-2'>Password</Label>
                        <Input error id="validation-2" placeholder="Password"/>
                        <Hint>Passwords must have at least 8 characters.</Hint>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='validation-3'>Email</Label>
                        <Input id="validation-3" placeholder="Email"
                               pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"/>
                        <Hint>The Email address is unavailable.</Hint>
                    </FormGroup>
                </Form>
            </DocSample>
            <DocSample columns={2}>
                <Form>
                    <legend>Select</legend>
                    <FormGroup success>
                        <Select>
                            <option>Choose an option</option>
                            <option>Slack</option>
                            <option>Skype</option>
                            <option>Hipchat</option>
                        </Select>
                        <Hint>The option is available.</Hint>
                    </FormGroup>
                    <FormGroup>
                        <Select error>
                            <option>Choose an option</option>
                            <option>Slack</option>
                            <option>Skype</option>
                            <option>Hipchat</option>
                        </Select>
                        <Hint>The option is invalid.</Hint>
                    </FormGroup>
                </Form>
            </DocSample>
            <DocSample columns={2}>
                <Form>
                    <legend>Checkbox, Radio and Switch (Error state only)</legend>
                    <FormGroup error>
                        <CheckBox label="I'm not a robot." defaultChecked={true}/>
                    </FormGroup>
                    <FormGroup error>
                        <Radio name="gender12" label='Male'/>
                        <Radio name="gender12" label='Female' defaultChecked={true}/>
                    </FormGroup>
                    <FormGroup error>
                        <Switch label="Send me emails with news and tips" defaultChecked={true}/>
                    </FormGroup>
                </Form>
            </DocSample>
            <DocExample content={`
                <FormGroup success>
                    <Input label='Name' id="validation-1"  placeholder="Name" />
                    <Hint>The name is valid.</Hint>
                </FormGroup>
                <FormGroup >
                    <Label  htmlFor='validation-2'>Password</Label>
                    <Input error id="validation-2"  placeholder="Password" />
                    <Hint>Passwords must have at least 8 characters.</Hint>
                </FormGroup>
                <FormGroup >
                    <Select error>
                        <option>Choose an option</option>
                        <option>Slack</option>
                        <option>Skype</option>
                        <option>Hipchat</option>
                    </Select>
                    <Hint>The option is invalid.</Hint>
                </FormGroup>
                <FormGroup error>
                    <Radio name="gender12" label='Male'/>
                    <Radio name="gender12" label='Female' defaultChecked={true}/>
                </FormGroup>
            `}/>
            <DocTitle>Form disabled styles</DocTitle>
            <DocText text={`
                Add the ~disabled~ attribute to the element or ~fieldset~ for a disabled form components style.
            `}/>
            <DocSample columns={2}>
                <Form>
                    <FormGroup>
                        <Input disabled label='Name' id="validation-1" placeholder="Name"/>
                    </FormGroup>
                    <FormGroup>
                        <Radio disabled name="gender12" label='Male'/>
                        <Radio disabled name="gender12" label='Female'/>
                    </FormGroup>
                    <FormGroup>
                        <Select disabled>
                            <option>Choose an option</option>
                            <option>Slack</option>
                            <option>Skype</option>
                            <option>Hipchat</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Switch disabled label='Send me emails with news and tips'/>
                    </FormGroup>
                    <FormGroup>
                        <CheckBox disabled label='Remember me'/>
                    </FormGroup>
                    <FormGroup>
                        <fieldset disabled>
                            <CheckBox label='Remember me 2'/>
                        </fieldset>
                    </FormGroup>
                </Form>
            </DocSample>
            <DocExample content={`
                <Form>
                    <FormGroup >
                        <Input disabled label='Name' id="validation-1"  placeholder="Name" />
                    </FormGroup>
                    <FormGroup >
                        <Radio disabled name="gender12" label='Male'/>
                        <Radio disabled name="gender12" label='Female' />
                    </FormGroup>
                    <FormGroup >
                        <Select disabled>
                            <option>Choose an option</option>
                            <option>Slack</option>
                            <option>Skype</option>
                            <option>Hipchat</option>
                        </Select>
                    </FormGroup>
                    <FormGroup >
                        <Switch disabled  label='Send me emails with news and tips'/>
                    </FormGroup>
                    <FormGroup >
                        <CheckBox disabled  label='Remember me'/>
                    </FormGroup>
                    <FormGroup>
                        <fieldset disabled>
                            <CheckBox  label='Remember me 2'/>
                        </fieldset>
                    </FormGroup>
                </Form>
            `}/>
        </DocSection>
    }
}