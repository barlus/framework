import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSample, DocSection} from '../comps/DocPage';



export class DocTables extends DocPage {
    static title = 'Tables';

    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>Tables include default styles for tables and data sets.</DocNote>
            <DocSample>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Release date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>The Shawshank Redemption</td>
                        <td>Crime, Drama</td>
                        <td>14 October 1994</td>
                    </tr>
                    <tr>
                        <td>The Godfather</td>
                        <td>Crime, Drama</td>
                        <td>24 March 1972</td>
                    </tr>
                    <tr>
                        <td>Schindler's List</td>
                        <td>Biography, Drama, History</td>
                        <td>4 February 1994</td>
                    </tr>
                    <tr>
                        <td>Se7en</td>
                        <td>Crime, Drama, Mystery</td>
                        <td>22 September 1995</td>
                    </tr>
                    </tbody>
                </table>
            </DocSample>
            <DocNote>
                Add the <code>table</code> class to any &lt;table&gt; element. The class will add padding,
                border and
                emphasized table header. Use the <code>table-striped</code> class to &lt;table&gt; to add
                zebra
                striped style. For hoverable table rows, you can add the <code>table-hover</code> class to
                enable
                hover style. <br/><br/>
                Use the <code>active</code> class to make &lt;tr&gt; element highlighted.
            </DocNote>
            <Code className="HTML">{E1}</Code>
            <DocNote>If you need the tables with horizontal scroll, add the <code>table-scroll</code> class to the {'<table>'} element.</DocNote>
            <DocSample>
                <table className="table table-scroll">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Director</th>
                        <th>Rating</th>
                        <th>Duration</th>
                        <th>Release date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>The Shawshank Redemption</td>
                        <td>Crime, Drama</td>
                        <td>Frank Darabont</td>
                        <td>R</td>
                        <td>2h 22min</td>
                        <td>14 October 1994</td>
                    </tr>
                    <tr>
                        <td>The Godfather</td>
                        <td>Crime, Drama</td>
                        <td>Francis Ford Coppola</td>
                        <td>R</td>
                        <td>2h 55min</td>
                        <td>24 March 1972</td>
                    </tr>
                    <tr>
                        <td>Schindler's List</td>
                        <td>Biography, Drama, History</td>
                        <td>Steven Spielberg</td>
                        <td>R</td>
                        <td>3h 15min</td>
                        <td>4 February 1994</td>
                    </tr>
                    <tr>
                        <td>Se7en</td>
                        <td>Crime, Drama, Mystery</td>
                        <td>David Fincher</td>
                        <td>R</td>
                        <td>2h 7min</td>
                        <td>22 September 1995</td>
                    </tr>
                    </tbody>
                </table>
            </DocSample>
            <Code className="HTML">{E2}</Code>
        </DocSection>
    }
}

const E1 = `<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>name</th>
      <th>genre</th>
      <th>release date</th>
    </tr>
  </thead>
  <tbody>
    <tr class="active">
      <td>The Shawshank Redemption</td>
      <td>Crime, Drama</td>
      <td>14 October 1994</td>
    </tr>
  </tbody>
</table>`;
const E2 = `<table class="table table-scroll">
  <!-- table content -->
</table>`;