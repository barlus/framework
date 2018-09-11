import * as React                                from "@barlus/react"
import {Code}                                    from "../../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from "../../comps/DocPage";


export class DocFilters extends DocPage {
  static title = "Filters";
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocNote>
        Filters are CSS only content filters.
      </DocNote>
      <DocSample>
        <div className="filter">
          <input type="radio" id="tag-0" className="filter-tag" name="filter-radio" hidden
                 defaultChecked/>
          <input type="radio" id="tag-1" className="filter-tag" name="filter-radio" hidden/>
          <input type="radio" id="tag-2" className="filter-tag" name="filter-radio" hidden/>
          <input type="radio" id="tag-3" className="filter-tag" name="filter-radio" hidden/>
          <input type="radio" id="tag-4" className="filter-tag" name="filter-radio" hidden/>
          <div className="filter-nav">
            <label className="chip" htmlFor="tag-0">All</label>
            <label className="chip" htmlFor="tag-1">Action</label>
            <label className="chip" htmlFor="tag-2">Roleplaying</label>
            <label className="chip" htmlFor="tag-3">Shooter</label>
            <label className="chip" htmlFor="tag-4">Sports</label>
          </div>
          <div className="filter-body columns">
            <div className="column col-4 filter-item" data-tag="tag-2">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Fallout 4</div>
                  <div className="card-subtitle">Roleplaying</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-3">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Halo 5</div>
                  <div className="card-subtitle">Shooter</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-1">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Quantum Break</div>
                  <div className="card-subtitle">Action</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-4">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Forza Horizon 3</div>
                  <div className="card-subtitle">Sports</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-2">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Final Fantasy XV</div>
                  <div className="card-subtitle">Roleplaying</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-4">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">NBA 2K17</div>
                  <div className="card-subtitle">Sports</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-3">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Battlefield 1</div>
                  <div className="card-subtitle">Shooter</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-1">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">GTA V</div>
                  <div className="card-subtitle">Action</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-4">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">FIFA 17</div>
                  <div className="card-subtitle">Sports</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-3">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Overwatch</div>
                  <div className="card-subtitle">Shooter</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-3">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Titanfall 2</div>
                  <div className="card-subtitle">Shooter</div>
                </div>
              </div>
            </div>
            <div className="column col-4 filter-item" data-tag="tag-3">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Gears of Wars 4</div>
                  <div className="card-subtitle">Shooter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocSample>
      <DocNote>
        Filters use <code>tag-1</code> to <code>tag-8</code> to flag different
        tags. <code>tag-0</code> is reserved for clearing filter (or showing all). You can
        overwrite <code>$filter-number</code> in <code>_filters.scss</code> to have more filters.
      </DocNote>
      <Code className='HTML'>{E1}</Code>
    </DocSection>
  }
}

const E1 = `<div className="filter">
  <input type="radio" id="tag-0" className="filter-tag" name="filter-radio" hidden checked>
  <input type="radio" id="tag-1" className="filter-tag" name="filter-radio" hidden>
  <input type="radio" id="tag-2" className="filter-tag" name="filter-radio" hidden>

  <div className="filter-nav">
    <label className="chip" for="tag-0">All</label>
    <label className="chip" for="tag-1">Action</label>
    <label className="chip" for="tag-2">Roleplaying</label>
  </div>

  <div className="filter-body">
    <div className="filter-item card" data-tag="tag-1">
      <!-- Filter item content -->
    </div>
    <div className="filter-item card" data-tag="tag-2">
      <!-- Filter item content -->
    </div>
    <!-- Filter items -->
  </div>
</div>`;