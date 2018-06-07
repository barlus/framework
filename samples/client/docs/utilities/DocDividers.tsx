import * as React from "@barlus/react"
import { Button } from '@barlus/spectre';
import { Code } from "../../comps/Code";
import { DocNote, DocPage, DocSample, DocSection } from "../../comps/DocPage";

export class DocDivider extends DocPage {
    static title = 'Divider';
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                A Divider is used for separating elements.
            </DocNote>
            <DocSample>
                <div className="divider"/>
            </DocSample>
            <DocSample>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in
                vehicula sit amet, feugiat tempus tellus.
                <div className="divider text-center" data-content="OR"/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in
                vehicula sit amet, feugiat tempus tellus.
            </DocSample>
            <DocSample wrapChildren={false}>
                <div className="column">
                    <form>
                        <div className="form-group">
                            <label className="form-label" htmlFor="input-example-44">Email</label>
                            <input className="form-input" type="text" id="input-example-44"
                                   placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="input-example-22">Password</label>
                            <input className="form-input" type="password" id="input-example-22"
                                   placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label className="form-checkbox">
                                <input type="checkbox"/>
                                <i className="form-icon"/> Remember me
                            </label>
                        </div>
                        <div className="form-group">
                            <Button primary>Sign in</Button>
                        </div>
                    </form>
                </div>
                <div className="divider-vert" data-content="OR"/>
                <div className="column">
                    <form>
                        <div className="form-group">
                            <label className="form-label" htmlFor="input-example-33">Email</label>
                            <input className="form-input" type="text" id="input-example-33"
                                   placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <Button primary block>Sign up</Button>
                            <Button link block>Learn more</Button>
                        </div>
                    </form>
                </div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}
const E1 = `<!-- divider element -->
<div className="divider"></div>
<!-- divider element with text -->
<div className="divider text-center" data-content="OR"></div>

<!-- vertical divider element with text -->
<div className="columns">
  <div className="column">
    <!-- column content -->
  </div>
  <div className="divider-vert" data-content="OR"></div>
  <div className="column">
    <!-- column content -->
  </div>
</div>`;