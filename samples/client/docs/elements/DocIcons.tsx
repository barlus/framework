import * as React                                                      from "@barlus/react"
import {DocPage, DocSection, DocNote, DocSample, DocTitle, DocExample} from '../../comps/DocPage';

//import * as Icons                                                      from '@barlus/icons';

export class DocIcons extends DocPage {
  static title = "Icons";
  state = {
    icons: null
  };

  async componentDidMount() {
    try {
      const iconsBase = '../../../../@barlus/icons/index.js';
      const stylesBase = '../../../../@barlus/icons/styles.js';
      const styles = import(stylesBase);
      const icons = await import(iconsBase);
      console.log(icons);
      await styles;
      this.setState({ icons })
    } catch (e) {
      console.error("Make sure that @barlus/icons/ is not ignored by server.", e);
    }
  }

  render() {
    return <DocSection id={this.id} title={this.title}>
      <DocTitle>Svg icons</DocTitle>
      <DocSample columns={4}>
        {this.state.icons ? Object.keys(this.state.icons).map((name, i) => {
          let Ic = this.state.icons[ name ];
          return <div key={i} style={{ 'display': 'flex', 'alignItems': "center" }}>
            <Ic/>
            <code style={{ 'flexBasis': '150', 'overflow': 'scroll' }}>{`<${name}/>`}</code>
          </div>
        }) : <div className="loading loading-lg"></div>}
      </DocSample>
      <DocNote>
        {'Icons are single-element, responsive and pure CSS icons. You can include '}
        <code>spectre-icons.css</code>
        {' located in the '}
        <code>dist</code>
        {' folder to your web '}
        <code>{'<head>'}</code>
        {' to have these CSS icons.'}
      </DocNote>
      <DocTitle>Navigation icons</DocTitle>
      <DocSample columns={6}>
        <i className="icon icon-arrow-up"/>
        <i className="icon icon-arrow-right"/>
        <i className="icon icon-arrow-down"/>
        <i className="icon icon-arrow-left"/>
        <i className="icon icon-upward"/>
        <i className="icon icon-forward"/>
        <i className="icon icon-downward"/>
        <i className="icon icon-back"/>
        <i className="icon icon-caret"/>
        <i className="icon icon-menu"/>
        <i className="icon icon-apps"/>
        <i className="icon icon-more-horiz"/>
        <i className="icon icon-more-vert"/>
      </DocSample>
      <DocExample content={E1}/>
      <DocTitle>Action icons</DocTitle>
      <DocSample columns={6}>
        <i className="icon icon-resize-horiz"/>
        <i className="icon icon-resize-vert"/>
        <i className="icon icon-plus"/>
        <i className="icon icon-minus"/>
        <i className="icon icon-cross"/>
        <i className="icon icon-check"/>
        <i className="icon icon-stop"/>
        <i className="icon icon-shutdown"/>
        <i className="icon icon-refresh"/>
        <i className="icon icon-search"/>
        <i className="icon icon-flag"/>
        <i className="icon icon-bookmark"/>
        <i className="icon icon-edit"/>
        <i className="icon icon-delete"/>
        <i className="icon icon-share"/>
        <i className="icon icon-download"/>
        <i className="icon icon-upload"/>
      </DocSample>
      <DocTitle>Object icons</DocTitle>
      <DocSample columns={6}>
        <i className="icon icon-mail"/>
        <i className="icon icon-people"/>
        <i className="icon icon-message"/>
        <i className="icon icon-photo"/>
        <i className="icon icon-time"/>
        <i className="icon icon-location"/>
        <i className="icon icon-link"/>
        <i className="icon icon-emoji"/>
      </DocSample>
      <DocTitle>Icon sizes</DocTitle>
      <DocNote>
        <p>Use <code>icon-2x</code>, <code>icon-3x</code> and <code>icon-4x</code> classes to increase
          icon sizes. You can set <code>font-size</code> to have different icon sizes.</p>
      </DocNote>
      <DocSample columns={3}>
        <div>
          <p><i className="icon icon-2x icon-mail"/></p>
          <p>icon-2x (32px)</p>
        </div>
        <div>
          <p><i className="icon icon-3x icon-mail"/></p>
          <p>icon-3x (48px)</p>
        </div>
        <div>
          <p><i className="icon icon-4x icon-mail"/></p>
          <p>icon-4x (64px)</p>
        </div>
      </DocSample>
      <DocExample content={E2}/>
    </DocSection>
  }
}

const E1 = [ `
<i className="icon icon-arrow-up"/>
<i className="icon icon-arrow-right"/>
` ];
const E2 = [ `
<i className="icon icon-2x icon-mail"/>
` ];