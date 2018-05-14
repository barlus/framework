import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocEmpty extends DocPage{
    static title = "Empty";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>
                Empty states/blank slates are commonly used as placeholders for first time use,
                empty data and error screens.
            </DocNote>
            <DocSample>
                <div className="empty">
                    <div className="empty-icon">
                        <i className="icon icon-3x icon-mail"/>
                    </div>
                    <p className="empty-title h5">You have no new messages</p>
                    <p className="empty-subtitle">Click the button to start a conversation</p>
                    <div className="empty-action">
                        <button className="btn btn-primary">Send a message</button>
                    </div>
                </div>
                <div className="empty">
                    <div className="empty-icon">
                        <i className="icon icon-3x icon-mail"/>
                    </div>
                    <p className="empty-title h5">You've successfully signed up</p>
                    <p className="empty-subtitle">Click the button to invite your friends</p>
                    <div className="empty-action">
                        <button className="btn btn-primary">Invite your friends</button>
                    </div>
                    <div className="empty-action">
                        <button className="btn btn-link">Skip</button>
                    </div>
                </div>
                <div className="empty">
                    <div className="empty-icon">
                        <i className="icon icon-3x icon-people"/>
                    </div>
                    <p className="empty-title h5">You are not following anyone</p>
                    <p className="empty-subtitle">Start to meet new friends</p>
                    <div className="empty-action input-group input-inline">
                        <input type="text" className="form-input" placeholder/>
                        <button className="btn btn-primary input-group-btn">Search</button>
                    </div>
                </div>
            </DocSample>
            <DocNote>
                An empty state component can include icons, messages (title and subtitle messages) and action
                buttons
                or any combination of those elements.
                Add <code>empty-icon</code>, <code>empty-title</code>, <code>empty-subtitle</code>
                or <code>empty-action</code> to the elements. HTML structure is exampled below.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<div class="empty">
  <div class="empty-icon">
    <i class="icon icon-people"></i>
  </div>
  <p class="empty-title h5">You have no new messages</p>
  <p class="empty-subtitle">Click the button to start a conversation.</p>
  <div class="empty-action">
    <button class="btn btn-primary">Send a message</button>
  </div>
</div>`;