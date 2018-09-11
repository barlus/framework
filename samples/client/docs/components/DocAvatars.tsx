import * as React                                            from "@barlus/react"
import {DocExample, DocPage, DocSample, DocSection, DocText} from "../../comps/DocPage";
import {Avatar, AvatarPresence}                              from "@barlus/spectre";


export class DocAvatars extends DocPage {
  static title = "Avatars";
  static ready = true;
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocText text={`Avatars are user profile pictures.`}/>
      <DocSample columns={2}>
        <div>
          <Avatar xl src='https://picturepan2.github.io/spectre/img/avatar-1.png' initial="YZ"/>
          <Avatar lg src='https://picturepan2.github.io/spectre/img/avatar-2.png'/>
          <Avatar src='https://picturepan2.github.io/spectre/img/avatar-3.png'/>
          <Avatar sm src='https://picturepan2.github.io/spectre/img/avatar-4.png'/>
          <Avatar xs src='https://picturepan2.github.io/spectre/img/avatar-5.png'/>
        </div>
        <div>
          <Avatar xl initial="YZ"/>
          <Avatar lg initial="YZ"/>
          <Avatar initial="YZ"/>
          <Avatar sm initial="YZ"/>
          <Avatar xs initial="YZ"/>
        </div>
      </DocSample>
      <DocText text={`
                There are 4 additional sizes available, including ~xl~ (64px), ~lg~ (48px), ~sm~ (24px), and ~xs~ (16px).
                By default, the avatar size is 32px.
                For users who don't have profile pictures, you may use their initials for avatars.
                Add the ~initial~ attribute is the name appear inside the avatar.
            `}/>
      <DocSample columns={2}>
        <div>
          <Avatar xl src='https://picturepan2.github.io/spectre/img/avatar-1.png'
                  icon='https://picturepan2.github.io/spectre/img/avatar-5.png'/>
          <Avatar lg src='https://picturepan2.github.io/spectre/img/avatar-2.png'
                  icon='https://picturepan2.github.io/spectre/img/avatar-4.png'/>
          <Avatar src='https://picturepan2.github.io/spectre/img/avatar-3.png'
                  icon='https://picturepan2.github.io/spectre/img/avatar-3.png'/>
          <Avatar sm src='https://picturepan2.github.io/spectre/img/avatar-4.png'
                  icon='https://picturepan2.github.io/spectre/img/avatar-2.png'/>
          <Avatar xs src='https://picturepan2.github.io/spectre/img/avatar-5.png'
                  icon='https://picturepan2.github.io/spectre/img/avatar-1.png'/>
        </div>
      </DocSample>
      <DocText text={`
                Use ~icon~ attribute to add icon to the avatar
            `}/>
      <DocExample content={`
                <Avatar xl src='/img/avatar-1.png' icon='/img/avatar-5.png'/>
                <Avatar lg src='/img/avatar-2.png' icon='/img/avatar-4.png' />
                <Avatar    src='/img/avatar-3.png' icon='/img/avatar-3.png' />
                <Avatar sm src='/img/avatar-4.png' icon='/img/avatar-2.png' />
                <Avatar xs src='/img/avatar-5.png' icon='/img/avatar-1.png' />
            `}/>
      <DocSample columns={2}>
        <div>
          <Avatar xl initial='YZ'><AvatarPresence online/></Avatar>
          <Avatar lg initial='YZ'><AvatarPresence busy/></Avatar>
          <Avatar initial='YZ'><AvatarPresence away/></Avatar>
          <Avatar sm initial='YZ'><AvatarPresence/></Avatar>
          <Avatar xs initial='YZ'><AvatarPresence busy/></Avatar>
        </div>
      </DocSample>
      <DocText text={`
                You can add an ~AvatarPresence~ component with the, and add ~online~, ~busy~ or ~away~ attributes for different status colors. The default is gray which means offline.
            `}/>
      <DocExample content={`
                <Avatar xl initial='YZ'><AvatarPresence online/></Avatar>
                <Avatar lg initial='YZ'><AvatarPresence busy/></Avatar>
                <Avatar    initial='YZ'><AvatarPresence away/></Avatar>
                <Avatar sm initial='YZ'><AvatarPresence /></Avatar>
            `}/>
    </DocSection>
  }
}