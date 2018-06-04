import * as React from "@barlus/nerv"
import { DocExample, DocPage, DocSample, DocSection, DocText } from "../../comps/DocPage";
import { Breadcrumb, BreadcrumbItem, Tooltip } from "@barlus/spectre";

export class DocBreadcrumbs extends DocPage {
    static title = "Breadcrumbs";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text='Breadcrumbs are used as navigational hierarchies to indicate current location.'/>
            <DocSample>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Tooltip label='Home'>
                            <a href="#breadcrumbs" className="tooltip" data-tooltip="Home">Home</a>
                        </Tooltip>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Tooltip label='Settings'>
                            <a href="#breadcrumbs" className="tooltip" data-tooltip="Settings">Settings</a>
                        </Tooltip>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Tooltip label='Home'><a href="#breadcrumbs">Home</a></Tooltip>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Tooltip label='Settings'><a href="#breadcrumbs">Settings</a></Tooltip>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Tooltip label='Settings'><a href="#breadcrumbs">Change</a></Tooltip>
                    </BreadcrumbItem>
                </Breadcrumb>
            </DocSample>
            <DocText text={`
                Add a ~Breadcrumb~ container component with the.
                And add ~BreadcrumbItem~ child component
            `}/>
            <DocExample content={`
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Tooltip label='Home'><a href="#breadcrumbs" >Home</a></Tooltip>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Tooltip label='Settings'><a href="#breadcrumbs" >Settings</a></Tooltip>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Tooltip label='Settings'><a href="#breadcrumbs" >Change</a></Tooltip>
                    </BreadcrumbItem>
                </Breadcrumb>
            `}/>
        </DocSection>
    }
}