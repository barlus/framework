import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";


export class DocAutocomplete extends DocPage {
    static title = "Autocomplete";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Autocomplete form component provides suggestions while you type. It is often used for tags
                and contacts input.
            </DocNote>
            <DocSample columns={12/9}>
                <div className="form-group">
                    <div className="form-autocomplete">
                        <div className="form-autocomplete-input form-input">
                      <span className="chip">
                        Bruce Banner
                      </span>
                            <div className="chip">
                                <img src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                                     className="avatar avatar-sm" alt="Avatar"/>
                                Thor Odinson
                            </div>
                            <div className="chip">
                                <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                                     className="avatar avatar-sm" alt="Avatar"/>
                                Steve Rogers
                            </div>
                            <div className="chip">
                                <figure className="avatar avatar-sm" data-initial="TS"
                                        style={{ backgroundColor: '#5755d9' }}/>
                                Tony Stark
                            </div>
                            <span className="chip active">
                        Natasha Romanoff
                      </span>
                            <input className="form-input" type="text" placeholder/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-autocomplete">
                        <div className="form-autocomplete-input form-input is-focused">
                      <span className="chip">
                        Bruce Banner
                        <a href="#" className="btn btn-clear" aria-label="Close" role="button"/>
                      </span>
                            <span className="chip">
                        <img src="https://picturepan2.github.io/spectre/img/avatar-1.png" className="avatar avatar-sm"
                             alt="Thor Odinson"/>
                        Thor Odinson
                        <a href="#" className="btn btn-clear" aria-label="Close" role="button"/>
                      </span>
                            <div className="has-icon-left">
                                <input className="form-input" type="text" placeholder defaultValue="S"/>
                                <i className="form-icon loading"/>
                            </div>
                        </div>
                        <ul className="menu">
                            <li className="menu-item">
                                <a href="#autocomplete">
                                    <div className="tile tile-centered">
                                        <div className="tile-icon">
                                            <img
                                                src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                                                className="avatar avatar-sm" alt="Steve Rogers"/>
                                        </div>
                                        <div className="tile-content">
                                            <mark>S</mark>
                                            teve Roger
                                            <mark>s</mark>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="#autocomplete">
                                    <div className="tile tile-centered">
                                        <div className="tile-icon">
                                            <figure className="avatar avatar-sm" data-initial="TS"
                                                    style={{ backgroundColor: '#5755d9' }}/>
                                        </div>
                                        <div className="tile-content">
                                            Tony <mark>S</mark>tark
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </DocSample>
            <DocNote>
                Add a container element with the <code>form-autocomplete</code> class. There are 2 parts of
                it, one is <code>form-autocomplete-input</code>, another is <code>menu</code> component. You
                may add the <code>is-focused</code> class to <code>form-autocomplete-input</code> to make it
                appear as focus state.<br/><br/>
                Spectre.css does NOT include JavaScript code, you will need to implement your JS to interact
                with the autocomplete. The autocomplete HTML structure is exampled below.
            </DocNote>
            <DocSample columns={2}>
                <div className="form-group">
                    <div className="form-autocomplete autocomplete-oneline">
                        <div className="form-autocomplete-input form-input">
                            <span className="chip">
                                Bruce Banner
                            </span>
                            <div className="chip">
                                <img src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                                    className="avatar avatar-sm" alt="Avatar"/>
                                Thor Odinson
                            </div>
                            <div className="chip">
                                <img src="https://picturepan2.github.io/spectre/img/avatar-4.png"
                                    className="avatar avatar-sm" alt="Avatar"/>
                                Steve Rogers
                            </div>
                            <div className="chip">
                                <figure className="avatar avatar-sm" data-initial="TS"
                                style={{backgroundColor: '#5755d9'}}/>
                                Tony Stark
                            </div>
                            <span className="chip active">
                                Natasha Romanoff
                            </span>
                            <input className="form-input" type="text" placeholder/>
                        </div>
                    </div>
                </div>
            </DocSample>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}
const E1 = `<div class="form-autocomplete">
  <!-- autocomplete input container -->
  <div class="form-autocomplete-input form-input">

    <!-- autocomplete chips -->
    <div class="chip">
      <img src="img/avatar-1.png" class="avatar avatar-sm" alt="Thor Odinson">
      Thor Odinson
      <a href="#" class="btn btn-clear" aria-label="Close" role="button"></a>
    </div>

    <!-- autocomplete real input box -->
    <input class="form-input" type="text" placeholder="typing here">
  </div>

  <!-- autocomplete suggestion list -->
  <ul class="menu">
    <!-- menu list chips -->
    <li class="menu-item">
      <a href="#">
        <div class="tile tile-centered">
          <div class="tile-icon">
            <img src="img/avatar-4.png" class="avatar avatar-sm" alt="Steve Rogers">
          </div>
          <div class="tile-content">
            Steve Rogers
          </div>
        </div>
      </a>
    </li>
  </ul>
</div>`;