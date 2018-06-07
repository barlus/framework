import * as React from "@barlus/nerv"
import {Tag} from "@barlus/spectre"
import { DocExample, DocText, DocPage, DocSample, DocSection, DocTitle } from '../../comps/DocPage';

export class DocTypography extends DocPage {
    static title = "Typography";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text={`
                Typography sets default styles for headings, paragraphs,
                semantic text, ~blockquote~ and lists elements.
            `}/>
            <DocTitle>Headings</DocTitle>
            <DocSample>
                <h1>H1 Heading <Tag small>40px</Tag></h1>
                <h2>H2 Heading <Tag small>32px</Tag></h2>
                <h3>H3 Heading <Tag small>28px</Tag></h3>
                <span className="h4">H4 Heading <Tag small>24px</Tag></span>
                <span className="h5">H5 Heading <Tag small>20px</Tag></span>
                <span className="h6">H6 Heading <Tag small>16px</Tag></span>
            </DocSample>
            <DocExample content={`
                <h1>H1 Heading <Tag small>40px</small></h1>
                <h2>H2 Heading <Tag small>32px</small></h2>
                <h3>H3 Heading <Tag small>28px</small></h3>
                <span className="h4">H4 Heading <Tag small>24px</Tagsmall></span>
                <span className="h5">H5 Heading <Tag small>20px</Tagsmall></span>
                <span className="h6">H6 Heading <Tag small>16px</Tagsmall></span>
            `}/>
            <DocTitle>Paragraphs</DocTitle>
            <DocSample>
                <p>
                    Lorem ipsum dolor sit amet, consectetur <a href="#typography">
                    adipiscing elit. Praesent risus leo, dictum in vehicula sit amet</a>,
                    feugiat tempus tellus. Duis quis sodales risus. Etiam
                    euismod ornare consequat.
                </p>
                <p>
                    Climb leg rub face on everything give attitude nap all
                    day for under the bed. Chase mice attack feet
                    but rub face on everything hopped up on goofballs.
                </p>
            </DocSample>
            <DocExample content={`
                <p>
                    Lorem ipsum dolor sit amet, consectetur <a href="#typography">
                    adipiscing elit. Praesent risus leo, dictum in vehicula sit amet</a>,
                    feugiat tempus tellus. Duis quis sodales risus. Etiam
                    euismod ornare consequat.
                </p>
                <p>
                    Climb leg rub face on everything give attitude nap all
                    day for under the bed. Chase mice attack feet
                    but rub face on everything hopped up on goofballs.
                </p>
            `}/>
            <DocTitle>Semantic text elements</DocTitle>
            <DocSample columns={2}>
                <div><abbr title="Internationalization">I18N</abbr><code className="ml-2">&lt;abbr&gt;</code></div>
                <div><strong>Bold</strong><code className="ml-2">&lt;strong&gt;</code> <code>&lt;b&gt;</code></div>
                <div><cite>Citation</cite><code className="ml-2">&lt;cite&gt;</code></div>
                <div><code>Hello World!</code><code className="ml-2">&lt;code&gt;</code></div>
                <div>
                    <del>Deleted</del>
                    <code className="ml-2">&lt;del&gt;</code></div>
                <div><em>Emphasis</em><code className="ml-2">&lt;em&gt;</code></div>
                <div><i>Italic</i><code className="ml-2">&lt;i&gt;</code></div>
                <div>
                    <ins>Inserted</ins>
                    <code className="ml-2">&lt;ins&gt;</code></div>
                <div><kbd>Ctrl + S</kbd><code className="ml-2">&lt;kbd&gt;</code></div>
                <div>
                    <mark>Highlighted</mark>
                    <code className="ml-2">&lt;mark&gt;</code></div>
                <div>
                    <ruby>漢
                        <rt>kan</rt>
                        字
                        <rt>ji</rt>
                    </ruby>
                    <code className="ml-2">&lt;ruby&gt;</code></div>
                <div><s>Strikethrough</s><code className="ml-2">&lt;s&gt;</code></div>
                <div><samp>Sample</samp><code className="ml-2">&lt;samp&gt;</code></div>
                <div>Text <sub>Subscripted</sub><code className="ml-2">&lt;sub&gt;</code></div>
                <div>Text <sup>Superscripted</sup><code className="ml-2">&lt;sup&gt;</code></div>
                <div>
                    <time>20:00</time>
                    <code className="ml-2">{'<time>'}</code></div>
                <div><u>Underline</u><code className="ml-2">&lt;u&gt;</code></div>
                <div><var>x</var> = <var>y</var> + 2<code className="ml-2">&lt;var&gt;</code></div>
            </DocSample>
            <DocTitle>Fonts</DocTitle>
            <DocText text={`
                Spectre sets the most common and best ~font-family~ for each
                OS with fallback support in old [systems](http://example.com). There are also fonts targeted
                East Asian typography.
            `}/>
            <DocExample lang={'CSS'} content={`
               html {
                    /* Western typography targeted */
                    font-family:
                        -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
                        "Helvetica Neue", sans-serif;
                    /* Monospace typography targeted */
                    font-family: "SF Mono", "Segoe UI Mono", "Roboto Mono", Menlo,
                        Courier, monospace;
                    /* Chinese (lang="zh-Hans" and lang="zh-Hant") targeted */
                    font-family: -apple-system, system-ui, BlinkMacSystemFont,
                        "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
                        "Microsoft YaHei", "Helvetica Neue", sans-serif;
                    /* Japanese (lang="ja") targeted */
                    font-family: -apple-system, system-ui, BlinkMacSystemFont,
                        "Segoe UI", Roboto, "Hiragino Sans",
                        "Hiragino Kaku Gothic Pro", "Yu Gothic", YuGothic, Meiryo,
                        "Helvetica Neue", sans-serif;
                    /* Korean (lang="ko") targeted */
                    font-family: -apple-system, system-ui, BlinkMacSystemFont,
                        "Segoe UI", Roboto, "Malgun Gothic", "Helvetica Neue", sans-serif;
                }
            `}/>
            <DocExample lang={'JS'} content={`
                // Comment Here
                function render(){
                    return <ul className="list">
                        <li>list item 1</li>
                        <li>list item 2
                            <ul>
                                <li>list item 2.1</li>
                                <li>list item 2.2</li>
                                <li>list item 2.3</li>
                            </ul>
                        </li>
                        <li>list item 3</li>
                    </ul>;
                }
            `}/>
            <DocSample>
                <blockquote>
                    <p>
                        The advance of technology is based on making it fit in so that you don't really
                        even notice it, so it's part of everyday life.
                    </p>
                    <cite>- Bill Gates</cite>
                </blockquote>
            </DocSample>
            <DocExample content={`
                <blockquote>
                    <p>
                        The advance of technology is based on making it fit
                        in so that you don't really even notice it,
                        so it's part of everyday life.
                    </p>
                    <cite> - Bill Gates</cite>
                </blockquote>
            `}/>
            <DocTitle>Lists</DocTitle>
            <DocSample columns={3}>
                <ul className="list">
                    <li>list item 1</li>
                    <li>list item 2
                        <ul>
                            <li>list item 2.1</li>
                            <li>list item 2.2</li>
                            <li>list item 2.3</li>
                        </ul>
                    </li>
                    <li>list item 3</li>
                </ul>
                <ol className="list">
                    <li>list item 1</li>
                    <li>list item 2
                        <ol>
                            <li>list item 2.1</li>
                            <li>list item 2.2</li>
                            <li>list item 2.3</li>
                        </ol>
                    </li>
                    <li>list item 3</li>
                </ol>
                <dl className="list">
                    <dt>description list term 1</dt>
                    <dd>description list description 1</dd>
                    <dt>description list term 2</dt>
                    <dd>description list description 2</dd>
                    <dt>description list term 3</dt>
                    <dd>description list description 3</dd>
                </dl>
            </DocSample>
            <DocExample content={`
                <!-- unordered list -->
                <ul>
                  <li>list item 1</li>
                  <li>list item 2
                    <ul>
                      <li>list item 2.1</li>
                      <li>list item 2.2</li>
                      <li>list item 2.3</li>
                    </ul>
                  </li>
                  <li>list item 3</li>
                </ul>
                <!-- description list -->
                <dl>
                  <dt>description list term</dt>
                  <dd>description list description</dd>
                </dl>
            `}/>
        </DocSection>
    }
}
