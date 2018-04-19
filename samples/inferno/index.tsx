import { bound } from '@barlus/runtime/decor';
import * as React from '@barlus/nerv/index';
import { style, color, border, normalize, setupPage } from '@barlus/nerv/styles';
import * as css from '@barlus/nerv/styles';
import { initDevTools } from '@barlus/nerv/devtools';

normalize();
setupPage('body',false);

const className = style(
    {
        $debugName: 'TimeSpan',
        backgroundColor: color('#ff9900').toHexString()
    },
    border('2px solid red', '2px solid green')
);
const bg = (color) => ({ backgroundColor: color });
class Time extends React.Component<{ date: Date }> {
    render() {
        return <div>Time:<span class={className}>{this.props.date.toString()}</span></div>
    }
}
class Timer extends React.Component<{}> {
    timer = null;
    state = {
        running: false,
        time: new Date(),
    };

    componentDidMount() {
        console.info("APP MOUNTED");

    }

    @bound
    updateTimer() {
        this.setState({
            time: new Date(),
        })
    }

    @bound
    startTimer() {
        if (this.timer === null) {
            this.timer = setInterval(this.updateTimer, 1000);
            this.setState({
                running: true,
            })
        }
    }

    @bound
    stopTimer() {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
            this.setState({
                running: false,
            })
        }
    }

    render() {
        return <div>
            <Time date={this.state.time}/>
            {
                this.state.running
                    ? <button onClick={this.stopTimer}>Stop</button>
                    : <button onClick={this.startTimer}>Start</button>
            }
        </div>
    }
}

type PropsOf<T extends { defaultProps }> = Partial<T['defaultProps']>;

function theme<T, K extends keyof T>(theme: T): {[P in K]: string} {
    return Object.keys(theme).reduce((o, k) => (o[ k ] = style(theme[ k ]), o), {}) as {[P in K]: string};
}

class App extends React.Component<PropsOf<typeof App>> {
    static defaultTheme = {
        root/*          */: css.extend(css.fillParent, css.horizontal),
        navigation/*    */: css.extend(css.content, css.width(200), bg('lightpink')),
        page/*          */: css.extend(css.flex, css.vertical),
        header/*        */: css.extend(css.content, css.height(50), bg('lightskyblue')),
        content/*       */: css.extend(css.flex, css.horizontal),
        body/*          */: css.extend(css.flex, bg('darkorange')),
        sidebar/*       */: css.extend(css.content, css.width(200), bg('limegreen')),
    };
    static defaultProps = {
        theme: theme(App.defaultTheme)
    };

    render() {
        const { theme } = this.props;
        return <div class={theme.root}>
            <div class={theme.navigation}>Sidebar</div>
            <div class={theme.page}>
                <div class={theme.header}>Header</div>
                <div class={theme.content}>
                    <div class={theme.body}>Body</div>
                    <div class={theme.sidebar}>Sidebar</div>
                </div>
            </div>
        </div>
    }
}
function patch<T extends object>(object: T, patch: Partial<T>): T {
    return { ...object as object, ...patch as object } as T;
}
initDevTools();

React.render(<App theme={patch(App.defaultProps.theme, {})}/>, document.body);



