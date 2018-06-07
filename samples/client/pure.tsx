import * as React from "@barlus/nerv"


//import * as Dev from "@barlus/nerv/devtools"
//declare const React,ReactDOM;

class Child extends React.PureComponent<{},{}> {
    props;
    render(){
        return <div style={{backgroundColor:'#ff0000'}}>{this.props.children}</div>
    }
}

class App extends React.Component {
    render(){
        return <Child>Hello World</Child>
    }
}

//Dev.initDevTools();
React.render(
    <App/>,
    document.getElementById('root')
);