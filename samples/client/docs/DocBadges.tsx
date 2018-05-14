import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocBadges extends DocPage {
    static title = "Badges";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>Badges are often used as unread number indicators.</DocNote>
            <DocSample columns={4}>
                <span className="badge" data-badge>
                  Notifications
                </span>
                <span className="badge" data-badge={8}>
                  Notifications
                </span>
                <span className="badge" data-badge={88}>
                  Notifications
                </span>
                <span className="badge" data-badge={888}>
                  Notifications
                </span>
            </DocSample>
            <DocNote>
                Add the <code>badge</code> class to non self closing elements. And add
                the <code>data-badge</code>
                attribute to define the content of a badge. The badge will appear in the top-right direction
                of the element.<br/><br/>
                If there is no <code>data-badge</code> or the attribute is not specified, the badge will
                appear as a dot.
            </DocNote>
            <DocSample columns={4}>
                <div >
                    <button className="btn badge" data-badge={1}>Button</button>
                    {' '}
                    <button className="btn badge" data-badge={8}>Button</button>
                </div>
                <div >
                    <button className="btn btn-primary badge" data-badge={1}>Button</button>
                    {' '}
                    <button className="btn btn-primary badge" data-badge={8}>Button</button>
                </div>
                <div >
                    <figure className="avatar avatar-xl badge" data-badge={8} data-initial="YZ">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" alt="YZ"/>
                    </figure>
                    {' '}
                    <figure className="avatar avatar-lg badge" data-badge={8} data-initial="YZ">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-2.png" alt="YZ"/>
                    </figure>
                    {' '}
                    <figure className="avatar badge" data-badge={8} data-initial="YZ">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-3.png" alt="YZ"/>
                    </figure>
                </div>
            </DocSample>
            <DocNote>
                Badges support <code>button</code> and <code>avatars</code> elements as well.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}
const E1 = `<span class="badge">
  Notifications
</span>

<span class="badge" data-badge="8">
  Notifications
</span>

<button class="btn badge" data-badge="8">
  Button
</button>

<figure class="avatar badge" data-badge="8" data-initial="YZ">
  <img src="img/avatar-3.png" alt="YZ">
</figure>`;