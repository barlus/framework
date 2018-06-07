import * as React from "@barlus/react"
import {DocExample,  DocPage, DocSample, DocSection, DocText} from "../../comps/DocPage";
import { Toast,Button } from "@barlus/spectre";


export class DocToasts extends DocPage {
    static title = "Toasts";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text={`
                Toasts are used to show alert or information to users.
            `}/>
            <DocSample columns={12/9}>
                <Toast>
                    <Button clear className="float-right"/>
                    <h6>Toast Title</h6>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Toast>
            </DocSample>
            <DocText text={`
               Add a container element with the ~toast~ class. You can add any text within the
                container,
                and even icons. You may also add a close button with the ~btn-clear~ class if you
                need.
            `}/>
            <DocSample columns={3}>
                <Toast success>
                    <Button clear className="float-right"/>
                    Toast success
                </Toast>
                <Toast warning>
                    <Button clear className="float-right"/>
                    Toast warning
                </Toast>
                <Toast error>
                    <Button clear className="float-right"/>
                    Toast error
                </Toast>
            </DocSample>
            <DocText text={`
                  And you can add the ~toast-primary~, ~toast-success~,
                ~toast-warning~ or ~toast-error~class for additional toast colors.
            `}/>
            <DocExample content={`
                <Toast>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Toast>
                <Toast primary>
                    <Button clear className="float-right"/>
                    Toast success
                </Toast>
            `}/>
        </DocSection>
    }
}