import * as React    from "@barlus/react"
import {HashHistory} from "@barlus/history"

import {Code} from "./Code";
import {
  Accordion, AccordionBody, AccordionHeader, Container, Menu, MenuItem, OffCanvas, OffCanvasContent, OffCanvasOverlay,
  OffCanvasSidebar,
  OffCanvasToggle
}             from "@barlus/spectre";


const history = new HashHistory();
export class DocNavItem extends React.PureComponent<{ href: string, title: string, ready: boolean }, {}> {
  render() {
    const style = this.props.ready ? undefined : { backgroundColor: '#fbffca' };
    return <MenuItem style={style}>
      <a href={this.props.href}>{this.props.title}</a>
    </MenuItem>
  }
}
export class DocNavCategory extends React.PureComponent<{ active?: boolean, title: string }, {}> {
  render() {
    const active = this.props.active;
    const title = this.props.title;
    const children = this.props.children;
    const key = String(this.props.title).toLowerCase();
    const id = `docs-accordion-${key}`;
    return <Accordion id={id} defaultChecked={active} type="checkbox" name='docs-accordion-checkbox' key={key}>
      <AccordionHeader className='c-hand'>
        {title}
      </AccordionHeader>
      <AccordionBody>
        <Menu className='menu-nav'>
          {children}
        </Menu>
      </AccordionBody>
    </Accordion>
    // return <div className="accordion" key={key}>
    //     <input type="checkbox" id={id} name="docs-accordion-checkbox" hidden defaultChecked={active}/>
    //     <label className="accordion-header c-hand" htmlFor={id}>{title}</label>
    //     <div className="accordion-body">
    //         <ul className="menu menu-nav">
    //             {children}
    //         </ul>
    //     </div>
    // </div>
  }
}
export class DocSection extends React.PureComponent<{ id: string, title: string }, {}> {
  render() {
    const { id, title, children } = this.props;
    const href = `#${id}`;
    return <Container id={id}>
      <h3 className="s-title">
        {title}
      </h3>
      {children}
    </Container>
  }
}
export class DocText extends React.Component<React.PropsOf<typeof DocText>> {
  static defaultProps = {
    trim: true as boolean,
    text: '' as string,
    className: '' as string,
  };
  render() {
    let { text, trim, ...props } = this.props;
    return <div className="docs-note">
      <p dangerouslySetInnerHTML={{ __html: this.format(text.trim()) }}/>
    </div>
  }
  format(md) {
    return md.replace(/!\[(.*?)\]\((.*?)\)/igm, '<img src=\'$2\' alt=\'$1\'</img>') //images
      .replace(/\[(.*?)\]\((.*?)\)/igm, '<a href=\'$2\'>$1</a>') // links
      .replace(/\*\*(.*?)\*\*/igm, '<strong>$1</strong>') // bold
      .replace(/__(.*?)__/igm, "<strong>$1</strong>") //bold
      .replace(/\*(.*?)\*/igm, '<em>$1</em>') // italics
      .replace(/_(.*?)_/igm, "<em>$1</em>") // italics
      .replace(/`(.*?)`/igm, '<code>$1</code>') //code
      .replace(/~~(.*?)~~/igm, '<del>$1</del>') //strikeThrough
      .replace(/~(.*?)~/igm, '<code>$1</code>') //code
      .replace(/^\s*#\s+(.*?$)/igm, "<h1>$1</h1>") // h1
      .replace(/^\s*##\s+(.*?$)/igm, "<h2>$1</h2>") // h2
      .replace(/^\s*###\s+(.*?$)/igm, "<h3>$1</h3>") // h3
      .replace(/^\s*####\s+(.*?$)/igm, "<h4>$1</h4>") // h4
      .replace(/^\s*#####\s+(.*?$)/igm, "<h5>$1</h5>") // h5
      .replace(/^\s*######\s+(.*?$)/igm, "<h6>$1</h6>") // h6
      .replace(/\n\n/igm, "<br/>") // break
  }
}

export class DocNote extends React.PureComponent<{}, {}> {
  render() {
    return <div className="docs-note">
      {this.props.children}
    </div>
  }
}
export class DocTitle extends React.PureComponent<{}, {}> {
  render() {
    return <h4 className="s-subtitle">{this.props.children}</h4>
  }
}
export class DocSample extends React.PureComponent<{ columns?: number, wrapChildren?: boolean, className?: string }, {}> {
  static defaultProps = {
    columns: 1,
    wrapChildren: true,
  };
  render() {
    const col = `column col-${12 / this.props.columns}`;
    return <div className={'columns ' + (this.props.className || '')}>{
      this.props.wrapChildren ?
        React.Children.map(this.props.children, child => {
          return <div className={col}>{child}</div>
        })
        : this.props.children
    }</div>
  }
}
export class DocExample extends React.PureComponent<{ lang?: string, content: string | string[] }, {}> {
  static defaultProps = {
    lang: "HTML",
    content: ''
  };
  outdent(str) {
    let arr = str.split(/\n/);
    while (arr[ 0 ].trim() == '') {
      arr.shift()
    }
    str = arr.join('\n');
    return str.replace(RegExp('^' + (str.match(/^(\t| )+/) || '')[ 0 ], 'gm'), '');
  }
  render() {
    return <Code className={this.props.lang}>{
      this.outdent(
        Array.isArray(this.props.content)
          ? this.props.content.join('\n')
          : this.props.content
      )
    }</Code>
  }
}
export class DocPage<P = {}, S = {}> extends React.PureComponent<P, S> {
  static get id() {
    return slug(this.name)
  }
  static get href() {
    return `/#/${slug(this.name)}`
  }
  get id() {
    return slug(this.constructor.name);
  }
  get title() {
    return this.constructor[ 'title' ] || this.constructor.name;
  }
  get href() {
    return `/#/${this.id}`;
  }
  constructor(props, context) {
    super(props, context);
  }
}

export class DocNavBar extends React.PureComponent<{ docs }, {}> {
  render() {
    const { docs } = this.props;
    const category = (c, d) => {
      const href = `/#/${docs[ d ][ c ].id || docs[ d ][ c ].name}`;
      const title = docs[ d ][ c ].title || docs[ d ][ c ].name;
      const ready = docs[ d ][ c ].ready || false;
      return <DocNavItem key={`${d}-${c}`} href={href} title={title} ready={ready}/>
    };
    const items = Object.keys(docs).map((d) => {
      return <DocNavCategory title={d} key={d} active>
        {Object.keys(docs[ d ]).map(c => category(c, d))}
      </DocNavCategory>;
    });
    return <div>
      <div className="docs-brand">
        <a href="#" className="docs-logo">
          <img src="https://picturepan2.github.io/spectre/img/spectre-logo.svg"
               alt="Spectre.css CSS Framework"/>
          <h2>SPECTRE</h2>
        </a>
      </div>
      <div className="docs-nav">
        <div className="accordion-container">
          {items}
        </div>
      </div>
    </div>
  }
}

//@observer
export class DocApp extends React.PureComponent<{ docs }, { sidebarOpen: boolean, path: string }> {

  //@store router: RoutesStore;
  history: HashHistory;

  constructor(p, c) {
    super(p, c);
    this.history = new HashHistory();
    console.info(this.history.location);
    this.state = { sidebarOpen: false, path: this.history.location.pathname.substr(1) || 'doc-typography' };

  }

  componentDidMount() {
    this.history.listen(location => this.setState({
      path: location.pathname.substr(1)
    }));
    window.onpopstate = () => (this.closeSidebarOnRoutExit())
  }

  closeSidebarOnRoutExit() {
    this.setState({ sidebarOpen: false });
    return Promise.resolve();
  }

  toggleSidebar = () => {
    const { sidebarOpen } = this.state;
    this.setState({ sidebarOpen: !sidebarOpen })
  };

  onCanvasClose = () => {
    this.setState({ sidebarOpen: false })
  };

  render() {
    //const routeName = 'doc-accordions';//this.router.routerState.routeName;
    const { docs } = this.props;
    const { sidebarOpen, path } = this.state;
    const components = [];
    Object.keys(docs).forEach(d => {
      Object.keys(docs[ d ]).forEach(c => {
        const Component = docs[ d ][ c ];
        if (Component.id == path || Component.name == path) {
          components.push(<Component key={`${d}-${c}`}/>)
        }
      })
    });
    return (
      <OffCanvas className='docs-container' active={sidebarOpen} closeOnBgClick onBgClick={this.onCanvasClose}>
        <div className="docs-navbar">
          <OffCanvasToggle onClick={this.toggleSidebar} link action>
            <i className="icon icon-menu"/>
          </OffCanvasToggle>
          <a href="https://github.com/picturepan2/spectre" target="_blank"
             className="btn btn-primary">GitHub</a>
        </div>
        <OffCanvasSidebar className='docs-sidebar'>
          <DocNavBar docs={this.props.docs}/>
        </OffCanvasSidebar>
        <OffCanvasContent className='docs-content'>
          {components}
        </OffCanvasContent>
      </OffCanvas>
    );
  }
}
function slug(name: string) {
  return name.replace(/([a-z])([A-Z])/m, '$1-$2').toLocaleLowerCase();
}