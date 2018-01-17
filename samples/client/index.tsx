import '@barlus/runtime';
import {CSSProperties, TypeStyle, Component, React} from '@barlus/bui';
const ts = new TypeStyle({
    autoGenerateTag: true
});
function style(css: CSSProperties) {
    return (target: any) => {
        ts.cssRule(`.${target.name}`, css);
    }
}

function Stateless(p:{count:number}){
    return <div>Count:{p.count}</div>
}

type MyComponentProps = {
    gago?:number
};

type MyComponentState = {
    count: number
};

@style({color: 'red'})
class MyComponent extends Component<MyComponentProps,MyComponentState>{
    componentDidMount() {
        console.info("MOUNTED");
        setInterval(() => this.setState(s => ({
            count: s.count + 1
        })), 1000);
    }
    render() {
        return (
            <div>
                <div class={'556'}>{this.props.children}</div>
                <Stateless count={this.state.count}/>
            </div>
        );
    }
}

const comp = <div>
    <a href="5656565">1</a>
    2 {3}{true}{false}{null} 4
    <MyComponent gago={1000}>5{6}{[<b>7</b>, '8']}</MyComponent>
</div>;

console.info(comp);

React.render(comp, document.body);