import * as React     from "@barlus/react"
import {style}        from "@barlus/styles"
import {Button}       from "@barlus/spectre";
import {ButtonGroup}  from "@barlus/spectre";
import {Card}         from "@barlus/spectre";
import {CardBody}     from "@barlus/spectre";
import {CardFooter}   from "@barlus/spectre";
import {CardHeader}   from "@barlus/spectre";
import {CardImage}    from "@barlus/spectre";
import {CardSubTitle} from "@barlus/spectre";
import {CardTitle}    from "@barlus/spectre";
import {DocExample}   from "../../comps/DocPage";
import {DocPage}      from "../../comps/DocPage";
import {DocSample}    from "../../comps/DocPage";
import {DocSection}   from "../../comps/DocPage";
import {DocText}      from "../../comps/DocPage";


interface MyCardProps {
  theme?: {
    card?: string
    cardImage?: string;
    cardTitle?: string;
    cardBody?: string;
    cardFooter?: string;
  }
}

class MyCard extends React.Component<MyCardProps> {
  static defaultProps = {
    theme: {
      card: '',
      cardImage: '',
      cardTitle: '',
      cardBody: '',
      cardFooter: '',
    }
  };

  render() {
    const { theme } = this.props;
    return <Card className={theme.card}>
      <CardImage className={theme.cardImage} src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"/>
      <CardHeader>
        <CardTitle className={theme.cardTitle} h5>Microsoft</CardTitle>
        <CardSubTitle className={theme.cardTitle}>Software and hardware</CardSubTitle>
      </CardHeader>
      <CardBody className={theme.cardBody}>
        Empower every person and every organization on the planet to achieve more.
      </CardBody>
      <CardFooter className={theme.cardFooter}>
        <Button primary>Do</Button>
      </CardFooter>
    </Card>
  }
}

export class DocCards extends DocPage {
  static title = 'Cards';
  static ready = true;
  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocText text='Cards are flexible content containers.'/>
      <DocSample columns={2}>
        <MyCard theme={{ card: style({ backgroundColor: '#c8fff7' }) }}/>
        <Card>
          <CardHeader>
            <CardTitle h5>Apple</CardTitle>
            <CardSubTitle>Hardware and software</CardSubTitle>
          </CardHeader>
          <CardImage src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg"/>
          <CardBody>
            To make a contribution to the world by making tools for the mind that advance
            humankind.
          </CardBody>
          <CardFooter>
            <ButtonGroup>
              <Button primary>Buy</Button>
              <Button>Buy</Button>
              <Button>Buy</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </DocSample>
      <DocText text={`
                Add a container component ~Card~. And add child elements with
                the ~CardImage~,
                ~CardHeader~, ~CardBody~, and/or ~CardFooter~ classes.
                The ~CardImage~ can be placed in any position.
            `}/>
      <DocExample content={`
                <Card>
                    <CardImage  src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"/>
                    <CardHeader>
                        <CardTitle h5>Microsoft</CardTitle>
                        <CardSubTitle>Software and hardware</CardSubTitle>
                    </CardHeader>
                    <CardBody>
                        Empower every person and every organization on the planet to achieve more.
                    </CardBody>
                    <CardFooter>
                        <Button primary>Do</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle h5>Apple</CardTitle>
                        <CardSubTitle>Hardware and software</CardSubTitle>
                    </CardHeader>
                    <CardImage   src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg"/>
                    <CardBody>
                        To make a contribution to the world by making tools for the mind that advance
                        humankind.
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup>
                            <Button primary>Buy</Button>
                            <Button>Buy</Button>
                            <Button>Buy</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            `}/>
    </DocSection>
  }
}