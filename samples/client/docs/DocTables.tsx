import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocExample,DocText, DocPage, DocSample, DocSection} from '../comps/DocPage';
import {Table, TableBody, TableCell, TableHeader, TableHeading, TableRow} from "@barlus/spectre";



export class DocTables extends DocPage {
    static title = 'Tables';

    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text={`Tables include default styles for tables and data sets.`}/>
            <DocSample>
                <Table striped>
                    <TableHeader>
                        <TableRow>
                            <TableHeading>Name</TableHeading>
                            <TableHeading>Genre</TableHeading>
                            <TableHeading>Release date</TableHeading>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>The Shawshank Redemption</TableCell>
                            <TableCell>Crime, Drama</TableCell>
                            <TableCell>14 October 1994</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>The Godfather</TableCell>
                            <TableCell>Crime, Drama</TableCell>
                            <TableCell>24 March 1972</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Schindler's List</TableCell>
                            <TableCell>Biography, Drama, History</TableCell>
                            <TableCell>4 February 1994</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Se7en</TableCell>
                            <TableCell>Crime, Drama, Mystery</TableCell>
                            <TableCell>22 September 1995</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DocSample>
            <DocText text={`Use the ~striped~ attribute to add zebra striped style.
                For hoverable table rows, you can add the ~hover~ attribute to
                enable hover style.
                Use the ~active~ attribute to make ~TableRow~ element highlighted.`}/>
            <DocExample content={`
                <Table striped>
                    <TableHeader>
                        <TableRow>
                            <TableHeading>Name</TableHeading>
                            <TableHeading>Genre</TableHeading>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>The Shawshank Redemption</TableCell>
                            <TableCell>Crime, Drama</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>The Godfather</TableCell>
                            <TableCell>Crime, Drama</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            `}/>
            <DocText text={`If you need the tables with horizontal scroll, add the ~scroll~ attribute to the {'<Table>'} component.`}/>
            <DocSample>
                <Table scroll>
                    <TableHeader>
                        <TableRow>
                            <TableHeading>Name</TableHeading>
                            <TableHeading>Genre</TableHeading>
                            <TableHeading>Director</TableHeading>
                            <TableHeading>Rating</TableHeading>
                            <TableHeading>Duration</TableHeading>
                            <TableHeading>Release date</TableHeading>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>The Shawshank Redemption</TableCell>
                            <TableCell>Crime, Drama</TableCell>
                            <TableCell>Frank Darabont</TableCell>
                            <TableCell>R</TableCell>
                            <TableCell>2h 22min</TableCell>
                            <TableCell>14 October 1994</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>The Godfather</TableCell>
                            <TableCell>Crime, Drama</TableCell>
                            <TableCell>Francis Ford Coppola</TableCell>
                            <TableCell>R</TableCell>
                            <TableCell>2h 55min</TableCell>
                            <TableCell>24 March 1972</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Schindler's List</TableCell>
                            <TableCell>Biography, Drama, History</TableCell>
                            <TableCell>Francis Ford Coppola</TableCell>
                            <TableCell>R</TableCell>
                            <TableCell>2h 55min</TableCell>
                            <TableCell>4 February 1994</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Se7en</TableCell>
                            <TableCell>Crime, Drama, Mystery</TableCell>
                            <TableCell>Steven Spielberg</TableCell>
                            <TableCell>R</TableCell>
                            <TableCell>3h 15min</TableCell>
                            <TableCell>22 September 1995</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DocSample>
            <DocExample content={`
                <Table scroll>
                     <!-- table content -->
                </Table>
            `}/>
        </DocSection>
    }
}