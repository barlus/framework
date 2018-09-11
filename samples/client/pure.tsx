import * as React from "@barlus/react"

//import * as Dev from "@barlus/react/devtools"
//declare const React,ReactDOM;

class Child extends React.PureComponent<{}, {}> {
  props;
  render() {
    return <div style={{ backgroundColor: '#ff0000' }}>{this.props.children}</div>
  }
}

class App extends React.Component {
  render() {
    return <Child>Hello World</Child>
  }
}

//Dev.initDevTools();
React.render(
  <App/>,
  document.getElementById('root')
);