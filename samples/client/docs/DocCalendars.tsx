import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection, DocTitle} from "../comps/DocPage";


export class DocCalendars extends DocPage{
    static title = "Calendars";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Calendars are designed for date or date range picker and events display.
                It is made with flex layout.
            </DocNote>
            <DocSample columns={3}>
                <div className="calendar">
                    <div className="calendar-nav navbar">
                        <button className="btn btn-action btn-link btn-lg">
                            <i className="icon icon-arrow-left"/>
                        </button>
                        <div className="navbar-primary">March 2017</div>
                        <button className="btn btn-action btn-link btn-lg">
                            <i className="icon icon-arrow-right"/>
                        </button>
                    </div>
                    <div className="calendar-container">
                        <div className="calendar-header">
                            <div className="calendar-date">Sun</div>
                            <div className="calendar-date">Mon</div>
                            <div className="calendar-date">Tue</div>
                            <div className="calendar-date">Wed</div>
                            <div className="calendar-date">Thu</div>
                            <div className="calendar-date">Fri</div>
                            <div className="calendar-date">Sat</div>
                        </div>
                        <div className="calendar-body">
                            <div className="calendar-date prev-month disabled">
                                <button className="date-item">26</button>
                            </div>
                            <div className="calendar-date prev-month disabled">
                                <button className="date-item">27</button>
                            </div>
                            <div className="calendar-date prev-month disabled">
                                <button className="date-item">28</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">1</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">2</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">3</button>
                            </div>
                            <div className="calendar-date current-month tooltip" data-tooltip="Today">
                                <button className="date-item date-today">4</button>
                            </div>
                            <div className="calendar-date current-month tooltip"
                                 data-tooltip="Not available">
                                <button className="date-item" disabled>5</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">6</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">7</button>
                            </div>
                            <div className="calendar-date current-month tooltip"
                                 data-tooltip="You have appointments">
                                <button className="date-item badge">8</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">9</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">10</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">11</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">12</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">13</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">14</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">15</button>
                            </div>
                            <div className="calendar-date current-month calendar-range range-start">
                                <button className="date-item active">16</button>
                            </div>
                            <div className="calendar-date current-month calendar-range">
                                <button className="date-item">17</button>
                            </div>
                            <div className="calendar-date current-month calendar-range">
                                <button className="date-item">18</button>
                            </div>
                            <div className="calendar-date current-month calendar-range">
                                <button className="date-item">19</button>
                            </div>
                            <div className="calendar-date current-month calendar-range range-end">
                                <button className="date-item active">20</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">21</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">22</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">23</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">24</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">25</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">26</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">27</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">28</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">29</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">30</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">31</button>
                            </div>
                            <div className="calendar-date next-month disabled">
                                <button className="date-item">1</button>
                            </div>
                        </div>
                    </div>
                </div>
            </DocSample>
            <Code className="HTML">{E1}</Code>

            <DocTitle>Calendars sizes</DocTitle>
            <DocSample>
                <div className="calendar calendar-lg">
                    <div className="calendar-nav navbar">
                        <button className="btn btn-action btn-link btn-lg">
                            <i className="icon icon-arrow-left"/>
                        </button>
                        <div className="navbar-primary">March 2017</div>
                        <button className="btn btn-action btn-link btn-lg">
                            <i className="icon icon-arrow-right"/>
                        </button>
                    </div>
                    <div className="calendar-container">
                        <div className="calendar-header">
                            <div className="calendar-date">Sun</div>
                            <div className="calendar-date">Mon</div>
                            <div className="calendar-date">Tue</div>
                            <div className="calendar-date">Wed</div>
                            <div className="calendar-date">Thu</div>
                            <div className="calendar-date">Fri</div>
                            <div className="calendar-date">Sat</div>
                        </div>
                        <div className="calendar-body">
                            <div className="calendar-date prev-month disabled">
                                <button className="date-item">26</button>
                            </div>
                            <div className="calendar-date prev-month disabled">
                                <button className="date-item">27</button>
                                <div className="calendar-events">
                                    <a className="calendar-event bg-error text-light" href="#calendars">Zhonghe
                                        Festival</a>
                                </div>
                            </div>
                            <div className="calendar-date prev-month disabled">
                                <button className="date-item">28</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">1</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">2</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">3</button>
                            </div>
                            <div className="calendar-date current-month tooltip" data-tooltip="Today">
                                <button className="date-item date-today">4</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item" disabled>5</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">6</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">7</button>
                            </div>
                            <div className="calendar-date current-month tooltip"
                                 data-tooltip="You have appointments">
                                <button className="date-item badge">8</button>
                                <div className="calendar-events">
                                    <a className="calendar-event bg-primary text-light" href="#calendars">Product
                                        launch event</a>
                                    <a className="calendar-event bg-error text-light" href="#calendars">International
                                        Women's Day</a>
                                </div>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">9</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">10</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">11</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">12</button>
                                <div className="calendar-events">
                                    <a className="calendar-event bg-error text-light" href="#calendars">Arbor
                                        Day</a>
                                </div>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">13</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">14</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">15</button>
                            </div>
                            <div className="calendar-date current-month calendar-range range-start">
                                <button className="date-item active">16</button>
                            </div>
                            <div className="calendar-date current-month calendar-range">
                                <button className="date-item">17</button>
                            </div>
                            <div className="calendar-date current-month calendar-range">
                                <button className="date-item">18</button>
                            </div>
                            <div className="calendar-date current-month calendar-range">
                                <button className="date-item">19</button>
                            </div>
                            <div className="calendar-date current-month calendar-range range-end">
                                <button className="date-item active">20</button>
                                <div className="calendar-events">
                                    <a className="calendar-event bg-success text-light" href="#calendars">Spring
                                        Equinox</a>
                                </div>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">21</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">22</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">23</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">24</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">25</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">26</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">27</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">28</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">29</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">30</button>
                            </div>
                            <div className="calendar-date current-month">
                                <button className="date-item">31</button>
                            </div>
                            <div className="calendar-date next-month disabled">
                                <button className="date-item">1</button>
                                <div className="calendar-events">
                                    <a className="calendar-event bg-error text-light" href="#calendars">April
                                        Fools' Day</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DocSample>
            <Code className="HTML">{E2}</Code>

        </DocSection>
    }
}

const E1 = `<div className="calendar">
    <div className="calendar-nav navbar">
        <button className="btn btn-action btn-link btn-lg">
            <i className="icon icon-arrow-left"/>
        </button>
        <div className="navbar-primary">March 2017</div>
        <button className="btn btn-action btn-link btn-lg">
            <i className="icon icon-arrow-right"/>
        </button>
    </div>
    <div className="calendar-container">
        <div className="calendar-header">
            <div className="calendar-date">Sun</div>
            <div className="calendar-date">Mon</div>
            <div className="calendar-date">Tue</div>
            <div className="calendar-date">Wed</div>
            <div className="calendar-date">Thu</div>
            <div className="calendar-date">Fri</div>
            <div className="calendar-date">Sat</div>
        </div>
        <div className="calendar-body">
            <div className="calendar-date prev-month disabled">
                <button className="date-item">26</button>
            </div>
            <div className="calendar-date prev-month disabled">
                <button className="date-item">27</button>
            </div>
            <div className="calendar-date prev-month disabled">
                <button className="date-item">28</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">1</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">2</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">3</button>
            </div>
            <div className="calendar-date current-month tooltip" data-tooltip="Today">
                <button className="date-item date-today">4</button>
            </div>
            <div className="calendar-date current-month tooltip"
                 data-tooltip="Not available">
                <button className="date-item" disabled>5</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">6</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">7</button>
            </div>
            <div className="calendar-date current-month tooltip"
                 data-tooltip="You have appointments">
                <button className="date-item badge">8</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">9</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">10</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">11</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">12</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">13</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">14</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">15</button>
            </div>
            <div className="calendar-date current-month calendar-range range-start">
                <button className="date-item active">16</button>
            </div>
            <div className="calendar-date current-month calendar-range">
                <button className="date-item">17</button>
            </div>
            <div className="calendar-date current-month calendar-range">
                <button className="date-item">18</button>
            </div>
            <div className="calendar-date current-month calendar-range">
                <button className="date-item">19</button>
            </div>
            <div className="calendar-date current-month calendar-range range-end">
                <button className="date-item active">20</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">21</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">22</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">23</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">24</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">25</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">26</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">27</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">28</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">29</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">30</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">31</button>
            </div>
            <div className="calendar-date next-month disabled">
                <button className="date-item">1</button>
            </div>
        </div>
    </div>
</div>`;
const E2 = `<div className="calendar calendar-lg">
    <div className="calendar-nav navbar">
        <button className="btn btn-action btn-link btn-lg">
            <i className="icon icon-arrow-left"/>
        </button>
        <div className="navbar-primary">March 2017</div>
        <button className="btn btn-action btn-link btn-lg">
            <i className="icon icon-arrow-right"/>
        </button>
    </div>
    <div className="calendar-container">
        <div className="calendar-header">
            <div className="calendar-date">Sun</div>
            <div className="calendar-date">Mon</div>
            <div className="calendar-date">Tue</div>
            <div className="calendar-date">Wed</div>
            <div className="calendar-date">Thu</div>
            <div className="calendar-date">Fri</div>
            <div className="calendar-date">Sat</div>
        </div>
        <div className="calendar-body">
            <div className="calendar-date prev-month disabled">
                <button className="date-item">26</button>
            </div>
            <div className="calendar-date prev-month disabled">
                <button className="date-item">27</button>
                <div className="calendar-events">
                    <a className="calendar-event bg-error text-light" href="#calendars">Zhonghe
                        Festival</a>
                </div>
            </div>
            <div className="calendar-date prev-month disabled">
                <button className="date-item">28</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">1</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">2</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">3</button>
            </div>
            <div className="calendar-date current-month tooltip" data-tooltip="Today">
                <button className="date-item date-today">4</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item" disabled>5</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">6</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">7</button>
            </div>
            <div className="calendar-date current-month tooltip"
                 data-tooltip="You have appointments">
                <button className="date-item badge">8</button>
                <div className="calendar-events">
                    <a className="calendar-event bg-primary text-light" href="#calendars">Product
                        launch event</a>
                    <a className="calendar-event bg-error text-light" href="#calendars">International
                        Women's Day</a>
                </div>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">9</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">10</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">11</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">12</button>
                <div className="calendar-events">
                    <a className="calendar-event bg-error text-light" href="#calendars">Arbor
                        Day</a>
                </div>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">13</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">14</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">15</button>
            </div>
            <div className="calendar-date current-month calendar-range range-start">
                <button className="date-item active">16</button>
            </div>
            <div className="calendar-date current-month calendar-range">
                <button className="date-item">17</button>
            </div>
            <div className="calendar-date current-month calendar-range">
                <button className="date-item">18</button>
            </div>
            <div className="calendar-date current-month calendar-range">
                <button className="date-item">19</button>
            </div>
            <div className="calendar-date current-month calendar-range range-end">
                <button className="date-item active">20</button>
                <div className="calendar-events">
                    <a className="calendar-event bg-success text-light" href="#calendars">Spring
                        Equinox</a>
                </div>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">21</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">22</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">23</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">24</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">25</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">26</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">27</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">28</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">29</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">30</button>
            </div>
            <div className="calendar-date current-month">
                <button className="date-item">31</button>
            </div>
            <div className="calendar-date next-month disabled">
                <button className="date-item">1</button>
                <div className="calendar-events">
                    <a className="calendar-event bg-error text-light" href="#calendars">April
                        Fools' Day</a>
                </div>
            </div>
        </div>
    </div>
</div>`;