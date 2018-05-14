import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../comps/DocPage";



export class DocPagination extends DocPage{
    static title = "Pagination";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocSample columns={2}>
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#pagination">Prev</a>
                    </li>
                    <li className="page-item">
                        <a href="#pagination">1</a>
                    </li>
                    <li className="page-item">
                        <span>...</span>
                    </li>
                    <li className="page-item">
                        <a href="#pagination">4</a>
                    </li>
                    <li className="page-item active">
                        <a href="#pagination">5</a>
                    </li>
                    <li className="page-item">
                        <a href="#pagination">6</a>
                    </li>
                    <li className="page-item">
                        <span>...</span>
                    </li>
                    <li className="page-item">
                        <a href="#pagination">9</a>
                    </li>
                    <li className="page-item">
                        <a href="#pagination">Next</a>
                    </li>
                </ul>
                <ul className="pagination">
                    <li className="page-item disabled">
                        <a href="#pagination" tabIndex={-1}>Prev</a>
                    </li>
                    <li className="page-item active">
                        <a href="#pagination">1</a>
                    </li>
                    <li className="page-item">
                        <a href="#pagination">2</a>
                    </li>
                    <li className="page-item">
                        <a href="#pagination">3</a>
                    </li>
                    <li className="page-item">
                        <span>...</span>
                    </li>
                    <li className="page-item">
                        <a href="#pagination">9</a>
                    </li>
                    <li className="page-item">
                        <a href="#pagination">Next</a>
                    </li>
                </ul>
            </DocSample>
            <DocNote>
                Add a container element with the <code>pagination</code> class. And add child elements with
                the<code>page-item</code> class. The <code>page-item</code> with the <code>active</code> class
                will be highlighted. You can add the <code>disabled</code> to the <code>page-item</code> to have unclickable page links.
            </DocNote>
            <Code className="HTML">{E1}</Code>
            <DocSample>
                <ul className="pagination">
                    <li className="page-item page-prev">
                        <a href="#pagination">
                            <div className="page-item-subtitle">Previous</div>
                            <div className="page-item-title h5">Getting started</div>
                        </a>
                    </li>
                    <li className="page-item page-next">
                        <a href="#pagination">
                            <div className="page-item-subtitle">Next</div>
                            <div className="page-item-title h5">Layout</div>
                        </a>
                    </li>
                </ul>
            </DocSample>
            <DocNote>
                You could use previous and next pagination to navigate.
            </DocNote>
            <Code className="HTML">{E2}</Code>
        </DocSection>
    }
}

const E1 = `<ul class="pagination">
  <li class="page-item disabled">
    <a href="#" tabindex="-1">Previous</a>
  </li>
  <li class="page-item active">
    <a href="#">1</a>
  </li>
  <li class="page-item">
    <a href="#">2</a>
  </li>
  <li class="page-item">
    <a href="#">3</a>
  </li>
  <li class="page-item">
    <span>...</span>
  </li>
  <li class="page-item">
    <a href="#">12</a>
  </li>
  <li class="page-item">
    <a href="#">Next</a>
  </li>
</ul>`;
const E2 = `<ul class="pagination">
  <li class="page-item page-prev">
    <a href="#">
      <div class="page-item-subtitle">Previous</div>
      <div class="page-item-title h5">Getting started</div>
    </a>
  </li>
  <li class="page-item page-next">
    <a href="#">
      <div class="page-item-subtitle">Next</div>
      <div class="page-item-title h5">Layout</div>
    </a>
  </li>
</ul>`;