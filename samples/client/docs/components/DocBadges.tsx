import * as React from "@barlus/react"
import { DocExample, DocPage, DocSample, DocSection, DocText } from "../../comps/DocPage";
import { Avatar, Badge, Button } from "@barlus/spectre";

export class DocBadges extends DocPage {
    static title = "Badges";
    static ready = true;
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text='Badges are often used as unread number indicators.'/>

            <DocSample columns={4}>
                <Badge label={3}><span>Notifications</span></Badge>
                <Badge label={3}><Button>Button</Button></Badge>
                <Badge label={3}>
                    <Avatar xl src='https://picturepan2.github.io/spectre/img/avatar-3.png'/>
                </Badge>
                <Badge label={3}>
                    <Avatar lg src='https://picturepan2.github.io/spectre/img/avatar-3.png'/>
                </Badge>
            </DocSample>
            <DocText text={`
                Wrap non self closing elements with the ~Badge~ .
                And add the ~label~ attribute to define the content of a badge.
                The badge will appear in the top-right direction
                of the element.
                If there is no ~label~ attribute, the badge will appear as a dot.
            `}/>

            <DocText text={`
                Badges support ~Button~ and ~Avatars~ components as well.
            `}/>
            <DocExample content={`
                <Badge label={3}><span>Notifications</span></Badge>
                <Badge label={3}><Button>Button</Button></Badge>
                <Badge label={3}>
                    <Avatar xl src='https://picturepan2.github.io/spectre/img/avatar-3.png'/>
                </Badge>
                <Badge label={3}>
                    <Avatar lg src='https://picturepan2.github.io/spectre/img/avatar-3.png'/>
                </Badge>
            `}/>
        </DocSection>
    }
}