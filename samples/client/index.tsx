import '@barlus/runtime';
import {Tag} from '@barlus/bui/core/component';
import {CSSProperties, TypeStyle} from '@barlus/bui';

const ts = new TypeStyle({
    autoGenerateTag: true
});

function style(css:CSSProperties){
    return (target:any)=>{
        ts.cssRule(`.${target.name}`,css);
    }
}

@style({color:'red'})
class MyComponent extends Tag {
    tag(...elements :(string|JSX.Element)[]){
        return Tag.create('c',{class:`${this.constructor.name}`},...elements);
    }
    render(){
        return <div>{this.props.children}</div>
    }
}


Tag.render(<div>
    <div>1</div>
    2 {'3'} 4
    <MyComponent>5 {6} {[ <b>7</b>, '8' ]}</MyComponent>
</div>,document.body);