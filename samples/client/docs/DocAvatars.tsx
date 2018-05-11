import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";

const E1 = ``;
const E2 = ``;

export class DocAvatars extends React.PureComponent<{}, {}> {
    render() {
        return <div id="avatars" className="container">
            <h3 className="s-title"><a href="#avatars" className="anchor" aria-hidden="true">#</a>Avatars</h3>
            <div className="docs-note">
                <p>Avatars are user profile pictures. </p>
            </div>
            <div className="columns">
                <div className="column col-6 col-xs-12">
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
                <div className="column col-6 col-xs-12">
                    <figure className="avatar avatar-xl" data-initial="YZ"/>
                    <figure className="avatar avatar-lg" data-initial="YZ"/>
                    <figure className="avatar" data-initial="YZ"/>
                    <figure className="avatar avatar-sm" data-initial="YZ"/>
                    <figure className="avatar avatar-xs" data-initial="YZ"/>
                </div>
            </div>
            <div className="docs-note">
                <p>Add the <code>avatar</code> class to &lt;img&gt; element. There are 4 additional sizes
                    available,
                    including <code>avatar-xl</code> (64px), <code>avatar-lg</code> (48px), <code>avatar-sm</code>
                    (24px), and <code>avatar-xs</code> (16px). By default, the avatar size is 32px.</p>
                <p>For users who don't have profile pictures, you may use their initials for avatars. Add
                    the <code>avatar</code>
                    class and avatar size class to &lt;div&gt; element. The <code>data-initial</code> attribute
                    is the
                    name appear inside the avatar.</p>
            </div>
            <div className="columns">
                <div className="column col-6 col-xs-12">
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
            </div>
            <pre className="code" data-lang="HTML"><code><span
                className="com">&lt;!-- Basic avatar examples --&gt;</span>{"\n"}&lt;<span
                className="tag">figure</span> <span className="atn">class</span>=<span className="atv">"avatar avatar-xl"</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">img</span> <span className="atn">src</span>=<span
                    className="atv">"img/avatar-1.png"</span> <span className="atn">alt</span>=<span
                    className="atv">"..."</span>&gt;{"\n"}&lt;<span
                    className="tag">/figure</span>&gt;{"\n"}{"\n"}&lt;<span className="tag">figure</span> <span
                    className="atn">class</span>=<span
                    className="atv">"avatar avatar-xl"</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">img</span> <span className="atn">src</span>=<span
                    className="atv">"img/avatar-1.png"</span> <span className="atn">alt</span>=<span
                    className="atv">"..."</span>&gt;{"\n"}{"  "}&lt;<span className="tag">img</span> <span
                    className="atn">src</span>=<span className="atv">"img/avatar-5.png"</span> <span
                    className="atn">class</span>=<span className="atv">"avatar-icon"</span> <span
                    className="atn">alt</span>=<span className="atv">"..."</span>&gt;{"\n"}&lt;<span
                    className="tag">/figure</span>&gt;{"\n"}{"\n"}&lt;<span className="tag">figure</span> <span
                    className="atn">class</span>=<span className="atv">"avatar avatar-xl"</span> <span
                    className="atn">data-initial</span>=<span className="atv">"YZ"</span> <span
                    className="atn">style</span>=<span
                    className="atv">"background-color: #5755d9;"</span>&gt;&lt;<span
                    className="tag">/figure</span>&gt;{"\n"}{"\n"}<span className="com">&lt;!-- Show initals when avatar image is unavailable or not fully loaded --&gt;</span>{"\n"}&lt;
                <span className="tag">figure</span> <span className="atn">class</span>=<span className="atv">"avatar avatar-xl"</span> <span
                    className="atn">data-initial</span>=<span className="atv">"YZ"</span> <span
                    className="atn">style</span>=<span
                    className="atv">"background-color: #5755d9;"</span>&gt;{"\n"}{"  "}&lt;<span
                    className="tag">img</span> <span className="atn">src</span>=<span
                    className="atv">"img/avatar-1.png"</span> <span className="atn">alt</span>=<span
                    className="atv">"..."</span>&gt;{"\n"}&lt;<span
                    className="tag">/figure</span>&gt;{"\n"}</code></pre>
            <div className="columns">
                <div className="column col-6 col-xs-12">
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
            </div>
            <div className="docs-note">
                <p>Avatars support presence indicators. You can add an <code>i</code> element with
                    the <code>avatar-presence</code>
                    class, and add <code>online</code>, <code>busy</code> or <code>away</code> class for
                    different
                    status colors. The default is gray which means offline. </p>
            </div>
            <pre className="code" data-lang="HTML"><code>&lt;<span className="tag">figure</span> <span
                className="atn">class</span>=<span className="atv">"avatar avatar-xl"</span>&gt;{"\n"}{"  "}&lt;
                <span className="tag">img</span> <span className="atn">src</span>=<span
                    className="atv">"img/avatar-1.png"</span> <span className="atn">alt</span>=<span
                    className="atv">"..."</span>&gt;{"\n"}{"  "}&lt;<span className="tag">i</span> <span
                    className="atn">class</span>=<span className="atv">"avatar-presence online"</span>&gt;&lt;
                <span className="tag">/i</span>&gt;{"\n"}&lt;<span
                    className="tag">/figure</span>&gt;{"\n"}</code></pre>
        </div>
    }
}