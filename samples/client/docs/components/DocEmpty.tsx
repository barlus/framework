import * as React                                            from "@barlus/react"
import {DocExample, DocPage, DocSample, DocSection, DocText} from "../../comps/DocPage";
import {
  Button, Empty, EmptyAction, EmptyIcon, EmptySubtitle, EmptyTitle, Input,
  InputGroup, InputGroupButton
}                                                            from "@barlus/spectre";


export class DocEmpty extends DocPage {
  static title = "Empty";
  static ready = true;
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocText text='Empty states/blank slates are commonly used as placeholders for first time use,
                empty data and error screens.'/>
      <DocSample>
        <Empty>
          <EmptyIcon>
            <i className="icon icon-3x icon-mail"/>
          </EmptyIcon>
          <EmptyTitle className="h5">You have no new messages</EmptyTitle>
          <EmptySubtitle>Click the button to start a conversation</EmptySubtitle>
          <EmptyAction>
            <Button primary>Send a message</Button>
          </EmptyAction>
        </Empty>
        <Empty>
          <EmptyIcon>
            <i className="icon icon-3x icon-mail"/>
          </EmptyIcon>
          <EmptyTitle className="h5">You've successfully signed up</EmptyTitle>
          <EmptySubtitle>Click the button to invite your friends</EmptySubtitle>
          <EmptyAction>
            <Button primary>Invite your friends</Button>
          </EmptyAction>
          <EmptyAction>
            <Button link>Skip</Button>
          </EmptyAction>
        </Empty>
        <Empty>
          <EmptyIcon>
            <i className="icon icon-3x icon-people"/>
          </EmptyIcon>
          <EmptyTitle className="h5">You are not following anyone</EmptyTitle>
          <EmptySubtitle>Start to meet new friends</EmptySubtitle>
          <EmptyAction>
            <InputGroup inline>
              <Input name='search' placeholder='Search'></Input>
              <InputGroupButton primary> Search</InputGroupButton>
            </InputGroup>
          </EmptyAction>
        </Empty>
      </DocSample>
      <DocText text={`
                An ~Empty~ component can include ~EmptyIcons~, messages (~EmptyTitle~ and ~EmptySubtitle~ messages) and ~EmptyAction~
                buttons
                or any combination of those elements.
            `}/>
      <DocExample content={`
                <Empty>
                    <EmptyIcon>
                        <i className="icon icon-3x icon-people"/>
                    </EmptyIcon>
                    <EmptyTitle className="h5">You are not following anyone</EmptyTitle>
                    <EmptySubtitle >Start to meet new friends</EmptySubtitle>
                    <EmptyAction>
                        <InputGroup inline >
                            <Input name='search' placeholder='Search'></Input>
                            <InputGroupButton primary> Search</InputGroupButton>
                        </InputGroup>
                    </EmptyAction>
                </Empty>
            `}/>
    </DocSection>
  }
}