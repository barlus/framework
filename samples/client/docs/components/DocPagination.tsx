import * as React from "@barlus/nerv"

import { DocExample, DocPage, DocSample, DocSection, DocText } from "../../comps/DocPage";
import { Pagination, PaginationItem, PaginationSubtitle, PaginationTitle } from "@barlus/spectre";

export class DocPagination extends DocPage {
    static title = "Pagination";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocSample columns={2}>
                <Pagination>
                    <PaginationItem>
                        <a href="#pagination">Prev</a>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">1</a>
                    </PaginationItem>
                    <PaginationItem>
                        <span>...</span>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">4</a>
                    </PaginationItem>
                    <PaginationItem active>
                        <a href="#pagination">5</a>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">6</a>
                    </PaginationItem>
                    <PaginationItem>
                        <span>...</span>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">9</a>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">Next</a>
                    </PaginationItem>
                </Pagination>
                <Pagination>
                    <PaginationItem disabled>
                        <a href="#pagination">Prev</a>
                    </PaginationItem>
                    <PaginationItem active>
                        <a href="#pagination">1</a>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">2</a>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">5</a>
                    </PaginationItem>
                    <PaginationItem>
                        <span>...</span>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">9</a>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">Next</a>
                    </PaginationItem>
                </Pagination>
            </DocSample>
            <DocText text={`
                Add a container element with the ~Pagination~ component. And add child elements with
                the ~PaginationItem~. The ~PaginationItem~ with the ~active~ attribute
                will be highlighted. You can add the ~disabled~ to the ~PaginationItem~ to have unclickable page links.
            `}/>
            <DocExample content={`
                <Pagination>
                    <PaginationItem disabled>
                        <a href="#pagination">Prev</a>
                    </PaginationItem>
                    <PaginationItem active>
                        <a href="#pagination">1</a>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">2</a>
                    </PaginationItem>
                    <PaginationItem >
                        <a href="#pagination">5</a>
                    </PaginationItem>
                    <PaginationItem>
                        <span>...</span>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">9</a>
                    </PaginationItem>
                    <PaginationItem>
                        <a href="#pagination">Next</a>
                    </PaginationItem>
                </Pagination>
            `}/>
            <DocSample>
                <Pagination>
                    <PaginationItem prev>
                        <PaginationSubtitle>
                            Previous
                        </PaginationSubtitle>
                        <PaginationTitle className='h5'>
                            Getting started
                        </PaginationTitle>
                    </PaginationItem>
                    <PaginationItem next>
                        <PaginationSubtitle>
                            Next
                        </PaginationSubtitle>
                        <PaginationTitle className='h5'>
                            Layout
                        </PaginationTitle>
                    </PaginationItem>
                </Pagination>

            </DocSample>
            <DocText text='You could use previous and next pagination to navigate.'/>
            <DocExample content={`
                <Pagination>
                    <PaginationItem prev>
                        <PaginationSubtitle>
                            Previous
                        </PaginationSubtitle>
                        <PaginationTitle className='h5'>
                            Getting started
                        </PaginationTitle>
                    </PaginationItem>
                    <PaginationItem next>
                        <PaginationSubtitle>
                            Next
                        </PaginationSubtitle>
                        <PaginationTitle className='h5'>
                            Layout
                        </PaginationTitle>
                    </PaginationItem>
                </Pagination>
            `}/>
        </DocSection>
    }
}