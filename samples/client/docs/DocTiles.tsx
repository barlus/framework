import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection, DocTitle} from "../comps/DocPage";

export class DocTiles extends DocPage{
    static title = "Tiles";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Tiles are repeatable or embeddable information blocks.
            </DocNote>
            <DocSample columns={12/9}>
                <div className="tile">
                    <div className="tile-icon">
                        <figure className="avatar avatar-lg">
                            <img src="https://picturepan2.github.io/spectre/img/avatar-3.png" alt="Avatar"/>
                        </figure>
                    </div>
                    <div className="tile-content">
                        <p className="tile-title">The Avengers</p>
                        <p className="tile-subtitle text-gray">Earth's Mightiest Heroes joined forces to
                            take on threats
                            that were too big for any one hero to tackle...</p>
                    </div>
                    <div className="tile-action">
                        <button className="btn btn-primary">Join</button>
                        <button className="btn">Contact</button>
                    </div>
                </div>
                <div className="tile">
                    <div className="tile-icon">
                        <figure className="avatar avatar-lg">
                            <img src="https://picturepan2.github.io/spectre/img/avatar-2.png" alt="Avatar"/>
                        </figure>
                    </div>
                    <div className="tile-content">
                        <p className="tile-title">The S.H.I.E.L.D.</p>
                        <p className="tile-subtitle text-gray">The Strategic Homeland Intervention,
                            Enforcement, and
                            Logistics Division...</p>
                        <p>
                            <button className="btn btn-primary btn-sm">Join</button>
                            <button className="btn btn-sm">Contact</button>
                        </p>
                    </div>
                </div>
            </DocSample>
            <DocNote>
                Add a container with the <code>tile</code> class. And add child elements with the
                <code>tile-icon</code>, <code>tile-content</code> or/and <code>tile-action</code> classes.
                The
                <code>tile-icon</code> and <code>tile-action</code> are optional.<br/><br/>
                There are <code>tile-title</code> and <code>tile-subtitle</code> classes for title and
                subtitle text
                styles.
            </DocNote>
            <Code className="HTML">{E1}</Code>
            <DocTitle>Compact tiles</DocTitle>
            <DocNote>
                There is compact version of Tiles component, which is often used as contact and file info
                blocks.<br/><br/>
                Add the <code>tile-centered</code> class to the container <code>tile</code>. The
                <code>tile-icon</code>, <code>tile-content</code> and <code>tile-action</code> will be
                vertically
                centered.
            </DocNote>
            <DocSample columns={2}>
                <div className="tile tile-centered">
                    <div className="tile-icon">
                        <div className="example-tile-icon">
                            <i className="icon icon-mail centered"/>
                        </div>
                    </div>
                    <div className="tile-content">
                        <div className="tile-title">spectre-docs.pdf</div>
                        <div className="tile-subtitle text-gray">14MB · Public · 1 Jan, 2017</div>
                    </div>
                    <div className="tile-action">
                        <button className="btn btn-link btn-action"><i className="icon icon-more-vert"/>
                        </button>
                    </div>
                </div>
            </DocSample>
            <Code className="HTML">{E2}</Code>
        </DocSection>
    }
}


const E1 = `<div class="tile">
  <div class="tile-icon">
    <div class="example-tile-icon">
      <i class="icon icon-file centered"></i>
    </div>
  </div>
  <div class="tile-content">
    <p class="tile-title">The Avengers</p>
    <p class="tile-subtitle text-gray">Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...</p>
  </div>
  <div class="tile-action">
    <button class="btn btn-primary">Join</button>
  </div>
</div>`;
const E2 = `<div class="tile tile-centered">
  <div class="tile-icon">
    <div class="example-tile-icon">
      <i class="icon icon-file centered"></i>
    </div>
  </div>
  <div class="tile-content">
    <div class="tile-title">spectre-docs.pdf</div>
    <div class="tile-subtitle text-gray">14MB · Public · 1 Jan, 2017</div>
  </div>
  <div class="tile-action">
    <button class="btn btn-link">
      <i class="icon icon-more-vert"></i>
    </button>
  </div>
</div>`;
