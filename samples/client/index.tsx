import '@barlus/runtime';
import {container} from '@barlus/runtime/inject/injection';
import {injectable} from '@barlus/runtime/inject/decorators';
import {style, React, Component, TypeStyle} from '@barlus/bui';

container.useValue(TypeStyle, new TypeStyle({
    autoGenerateTag: true
}));

@injectable
class Test {
    public ts: TypeStyle;

    constructor(ts: TypeStyle) {
        this.ts = ts;
        console.info(ts);
    }
}

@injectable
@style({
    display: 'flex',
    flex: 1
})
class Layout extends Component<{ direction: 'vertical' | 'horizontal', class?: string }> {
    private ts: TypeStyle;
    constructor() {
        console.info("TYPESTYLE");
        super();
    }
    render() {
        const test = container.resolve(Test);
        test.ts.cssRule('.horizontal', {flexDirection: 'row'});
        test.ts.cssRule('.vertical', {flexDirection: 'column'});
        console.info(this.props.direction);
        return <div class={[this.props.class, this.props.direction].join(' ')}>{this.props.children}</div>
    }
}

@injectable
@style({
    backgroundColor: 'red',
    $nest: {
        "&>.Layout.vertical":{
            backgroundColor:'green'
        }
    }
})
class App extends Component<{}> {
    render() {
        return <Layout direction={'horizontal'}>
            <Layout direction={'vertical'}>
                <div class="one">V1</div>
                <div>V1</div>
                <div>V1</div>
            </Layout>
            <Layout direction={'horizontal'}>
                <div>V2</div>
                <div>V2</div>
                <div>V2</div>
                <div>V2</div>
            </Layout>
        </Layout>
    }
}

React.render(<App/>, document.body);