import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocAvatars extends DocPage {
    static title = "Avatars";
    render() {
        return  <DocSection id={this.id} title={this.title}>
            <DocNote>Avatars are user profile pictures.</DocNote>
            <DocSample columns={2}>
                <div>
                    <figure className="avatar avatar-xl">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" alt="Avatar XL"/>
                    </figure>
                    <figure className="avatar avatar-lg">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-2.png" alt="Avatar LG"/>
                    </figure>
                    <figure className="avatar">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-3.png" alt="Avatar"/>
                    </figure>
                    <figure className="avatar avatar-sm">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-4.png" alt="Avatar SM"/>
                    </figure>
                    <figure className="avatar avatar-xs">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-5.png" alt="Avatar XS"/>
                    </figure>
                </div>
                <div>
                    <figure className="avatar avatar-xl" data-initial="YZ"/>
                    <figure className="avatar avatar-lg" data-initial="YZ"/>
                    <figure className="avatar" data-initial="YZ"/>
                    <figure className="avatar avatar-sm" data-initial="YZ"/>
                    <figure className="avatar avatar-xs" data-initial="YZ"/>
                </div>
            </DocSample>
            <DocNote>
                Add the <code>avatar</code> class to &lt;img&gt; element. There are 4 additional sizes
                available,
                including <code>avatar-xl</code> (64px), <code>avatar-lg</code> (48px), <code>avatar-sm</code>
                (24px), and <code>avatar-xs</code> (16px). By default, the avatar size is 32px.<br/><br/>
                For users who don't have profile pictures, you may use their initials for avatars. Add
                the <code>avatar</code>
                class and avatar size class to &lt;div&gt; element. The <code>data-initial</code> attribute
                is the
                name appear inside the avatar.
            </DocNote>
            <DocSample columns={2}>
                <div>
                    <figure className="avatar avatar-xl">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" alt="Avatar"/>
                        <img src="https://picturepan2.github.io/spectre/img/avatar-2.png"
                             className="avatar-icon" alt="Avatar"/>
                    </figure>
                    <figure className="avatar avatar-lg">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-2.png" alt="Avatar"/>
                        <img src="https://picturepan2.github.io/spectre/img/avatar-3.png"
                             className="avatar-icon" alt="Avatar"/>
                    </figure>
                    <figure className="avatar">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-3.png" alt="Avatar"/>
                        <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                             className="avatar-icon" alt="Avatar"/>
                    </figure>
                    <figure className="avatar avatar-sm">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-4.png" alt="Avatar"/>
                        <img src="https://picturepan2.github.io/spectre/img/avatar-5.png"
                             className="avatar-icon" alt="Avatar"/>
                    </figure>
                    <figure className="avatar avatar-xs">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-5.png" alt="Avatar"/>
                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                             className="avatar-icon" alt="Avatar"/>
                    </figure>
                </div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
            <DocSample columns={2}>
                <div>
                    <figure className="avatar avatar-xl" data-initial="YZ">
                        <i className="avatar-presence online"/>
                    </figure>
                    <figure className="avatar avatar-lg" data-initial="YZ">
                        <i className="avatar-presence busy"/>
                    </figure>
                    <figure className="avatar" data-initial="YZ">
                        <i className="avatar-presence away"/>
                    </figure>
                    <figure className="avatar avatar-sm" data-initial="YZ">
                        <i className="avatar-presence offline"/>
                    </figure>
                    <figure className="avatar avatar-xs" data-initial="YZ">
                        <i className="avatar-presence online"/>
                    </figure>
                </div>
            </DocSample>
            <DocNote>
                Avatars support presence indicators. You can add an <code>i</code> element with
                the <code>avatar-presence</code>
                class, and add <code>online</code>, <code>busy</code> or <code>away</code> class for
                different
                status colors. The default is gray which means offline.
            </DocNote>
            <Code className="HTML">{E2}</Code>
        </DocSection>
    }
}

const E1 = `<!-- Basic avatar examples -->
<figure class="avatar avatar-xl">
  <img src="img/avatar-1.png" alt="...">
</figure>

<figure class="avatar avatar-xl">
  <img src="img/avatar-1.png" alt="...">
  <img src="img/avatar-5.png" class="avatar-icon" alt="...">
</figure>

<figure class="avatar avatar-xl" data-initial="YZ" style="background-color: #5755d9;"></figure>

<!-- Show initals when avatar image is unavailable or not fully loaded -->
<figure class="avatar avatar-xl" data-initial="YZ" style="background-color: #5755d9;">
  <img src="img/avatar-1.png" alt="...">
</figure>`;
const E2 = `<figure class="avatar avatar-xl">
  <img src="img/avatar-1.png" alt="...">
  <i class="avatar-presence online"></i>
</figure>`;
