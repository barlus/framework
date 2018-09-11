import * as React                                                     from "@barlus/react"
import {Code}                                                         from "../../comps/Code";
import {DocExample, DocNote, DocPage, DocSample, DocSection, DocText} from "../../comps/DocPage";
import {Tag}                                                          from "@barlus/spectre";


export class DocTags extends DocPage {
  static title = 'Tags';
  static ready = true;

  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocNote>Tags are formatted text tags for highlighted, informative information.</DocNote>
      <DocSample columns={2}>
        <div>
          <Tag>default tag</Tag>
          {' '}
          <Tag primary>primary tag</Tag>
          {' '}
          <Tag secondary>secondary tag</Tag>
        </div>
        <div>
          {' '}
          <Tag success>success tag</Tag>
          {' '}
          <Tag warning>warning tag</Tag>
          {' '}
          <Tag error>error tag</Tag>
        </div>
      </DocSample>
      <DocText text={`
                You can add
                ~primary~, ~secondary~, ~success~, ~warning~
                and ~error~ attributes for colored labels.
            `}/>
      <DocSample columns={2}>
        <div>
          <Tag rounded>default tag</Tag>
          {' '}
          <Tag rounded primary>primary tag</Tag>
          {' '}
          <Tag rounded secondary>secondary tag</Tag>
        </div>
        <div>
          {' '}
          <Tag rounded success>success tag</Tag>
          {' '}
          <Tag rounded warning>warning tag</Tag>
          {' '}
          <Tag rounded error>error tag</Tag>
        </div>
      </DocSample>
      <DocText text={`
               Add the ~rounded~ attribute to have rounded labels.
            `}/>
      <DocExample content={`
                <Tag>default tag</Tag>
                <Tag primary>primary tag</Tag>
                <Tag secondary>secondary tag</Tag>
            `}/>
      <DocSample columns={2}>
        <div>
          <Tag rounded small>default tag</Tag>
          {' '}
          <Tag rounded primary small>primary tag</Tag>
          {' '}
          <Tag rounded secondary small>secondary tag</Tag>
        </div>
        <div>
          {' '}
          <Tag rounded success small>success tag</Tag>
          {' '}
          <Tag rounded warning small>warning tag</Tag>
          {' '}
          <Tag rounded error small>error tag</Tag>
        </div>
      </DocSample>
      <DocText text={`
               Add the ~small~ attribute to have small labels.
            `}/>
      <DocExample content={`
                <Tag>default tag</Tag>
                <Tag primary rounded >primary tag</Tag>
                <Tag secondary rounded small>secondary tag</Tag>
            `}/>
    </DocSection>
  }
}