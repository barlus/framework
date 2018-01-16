import '@barlus/runtime';
import {CSSProperties, TypeStyle, Tag, render} from '@barlus/bui';

const ts = new TypeStyle({
    autoGenerateTag: true
});

function style(css:CSSProperties){
    return (target:any)=>{
        ts.cssRule(`.${target.name}`,css);
    }
}

@style({color:'red'})
class MyComponent extends Tag<{gago:8},{count:number}> {
    state = {count:0};
    componentDidMount(){
        console.info("MOUNTED")
        setInterval(()=>this.setState(s=>({
            count:s.count+1
        })),1000);
    }
    render() {
        return (
            <div>
                <div class={'556'}>{this.props.children}</div>
                <div>{this.state.count}</div>
            </div>
        );
    }
}


render(<div>
    <div>1</div>
    2 {'3'} 4
    <MyComponent gago={8}>5 {6} {[ <b>7</b>, '8' ]}</MyComponent>
</div>,document.body);