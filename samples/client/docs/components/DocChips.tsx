import * as React                                            from "@barlus/react"
import {DocExample, DocPage, DocSample, DocSection, DocText} from "../../comps/DocPage";
import {Avatar, Button, Chip}                                from "@barlus/spectre";


export class DocChips extends DocPage {
  static title = "Chips";
  static ready = true;
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocText text='Chips are complex entities in small blocks.'/>
      <DocSample>
        <div>
          <Chip>Crime</Chip>
          <Chip>Drama</Chip>
          <Chip>
            Biography
            <Button clear/>
          </Chip>
          <Chip>
            Mystery
            <Button clear/>
          </Chip>
        </div>
        <div>
          <Chip>
            <Avatar sm initial='TS'/>
            Tony Stark
          </Chip>
          <Chip>
            <Avatar sm src="https://picturepan2.github.io/spectre/img/avatar-1.png" initial='TS'/>
            Thor Odinson
          </Chip>
          <Chip>
            <Avatar sm src="https://picturepan2.github.io/spectre/img/avatar-4.png" initial='SR'/>
            Steve Rogers
          </Chip>
        </div>
      </DocSample>
      <DocText text={`
                Add a container component ~Chip~.
                And add child text element, buttons or avatars.
            `}/>
      <DocExample content={`
                <Chip>Drama</Chip>
                <Chip>
                    Mystery
                    <Button clear></Button>
                </Chip>
                <Chip>
                    <Avatar sm  src="/img/avatar-4.png" initial='SR'/>
                    Steve Rogers
                </Chip>
            `}/>
    </DocSection>
  }
}