import * as React from '@barlus/nerv';
import * as Styles from '@barlus/styles';
import { observer, store } from '@barlus/storex';
import { AuthStore, RoutesStore } from '../../stores';

export type LoginProps = React.PropsOf<typeof LoginPage>

@observer
export class LoginPage extends React.Component {
    static defaultTheme = {
        base: Styles.extend(Styles.centerCenter, Styles.flex),
        form: Styles.extend(Styles.vertical, Styles.evenlyJustified, {
            boxShadow: '1px 1px 1px #000000',
            padding: '50px',
            maxHeight: 400,
            //maxWidth: 520,
            minHeight: '40%',
            minWidth: 400
        }),
        content: Styles.extend(Styles.vertical, {}),
        footer: Styles.extend(Styles.horizontal,Styles.start,{})
    };
    static defaultProps = {
        mode: undefined as 'A'|"B",
        theme: Styles.theme(LoginPage)
    };

    props: LoginProps;

    @store auth: AuthStore;
    @store router: RoutesStore;

    render() {
        const { theme } = this.props;
        return (
            <div class={theme.base}>
                <div class={theme.form}>
                    <Logo/>
                    <h3>You need just 30 seconds to enjoy your new workforce.<br/>Just tell us:</h3>
                    <TextInput/>
                    <TextInput/>
                    <div class={theme.footer}>
                        <Button>Login</Button>
                        <Button href="/#/register">Register</Button>
                    </div>
                </div>
            </div>
        );
    }
}

type ButtonProps = React.PropsOf<typeof Button> & { children }
export class Button extends React.Component {
    static defaultTheme = {
        base: Styles.extend({
            padding: '5px'
        })
    };
    static defaultProps = {
        href: undefined as string,
        theme: Styles.theme(Button)
    };

    props: ButtonProps;

    render() {
        return <button type="button" className={this.props.theme.base}>{this.props.children}</button>
    }
}

type TextInputProps = React.PropsOf<typeof TextInput>

export class TextInput extends React.Component {
    static defaultTheme = {
        base: Styles.extend({}),
        input: Styles.extend(Styles.flex, {
            width: '100%',
            outlineStyle: 'none',
            border: 'none',
            borderBottom: '1px solid #DDDBDA',
            padding: '5px'
        }),
    };
    static defaultProps = {
        theme: Styles.theme(TextInput)
    };

    props: TextInputProps;

    render() {
        return <div class={this.props.theme.base}>
            <label>LABEL</label>
            <input class={this.props.theme.input} placeholder="Login"/>
        </div>
    }
}

export class Logo<T> extends React.Component {
    static defaultTheme = {};
    static defaultProps = {
        theme: Styles.theme(TextInput),
        size:68,
        color:'white',
        backgroundColor:'blue',
    };
    render(){
        const {color,backgroundColor,size,...p} = this.props;
        return <svg {...p} width={size} height={size} viewBox='0 0 68 68'>
            <g id="login" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-87.000000, -50.000000)" id="Group-2">
                    <g transform="translate(87.000000, 50.000000)">
                        <g id="Group">
                            <circle id="Oval-2" fill={backgroundColor} cx="34" cy="34" r="34"/>
                            <path d="M48.029554,64 C45.9102527,64 43.7961775,63.8026171 41.6872649,63.4078452 C39.5783523,63.0130734 37.5421914,62.4728675 35.5787211,61.7872112 C33.6152508,61.1015549 31.7349185,60.3120231 29.9376679,59.4185922 C28.1404173,58.5251612 26.4782451,57.5798008 24.9511016,56.5824825 C23.423958,55.5851643 22.0526659,54.5670838 20.8371843,53.5282106 C19.6217027,52.4893375 18.6192051,51.4920342 17.8296615,50.5362708 C15.3571433,49.9337244 13.0924337,48.8896725 11.0354648,47.4040838 C8.97849589,45.9184952 7.20724368,44.1680201 5.72165502,42.1526061 C4.23606637,40.1371921 3.07774014,37.9452026 2.24664159,35.5765717 C1.41554304,33.2079409 1,30.828957 1,28.4395486 C1,26.3825797 1.27010298,24.3983617 1.81031703,22.486835 C2.35053109,20.5753084 3.12448001,18.7884733 4.132187,17.1262762 C5.13989399,15.4640791 6.3501631,13.947347 7.76303063,12.5760344 C9.17589816,11.2047218 10.760156,10.036007 12.5158517,9.06985492 C14.2715474,8.10370285 16.1726568,7.35053109 18.219237,6.81031703 C20.2658171,6.27010298 22.4110581,6 24.6550242,6 C26.8989903,6 29.0390369,6.27010298 31.0752284,6.81031703 C33.1114198,7.35053109 35.0073349,8.10370285 36.7630306,9.06985492 C38.5187263,10.036007 40.1081784,11.2047218 41.5314347,12.5760344 C42.954691,13.947347 44.1701544,15.4640791 45.1778614,17.1262762 C46.1855684,18.7884733 46.9595173,20.5753084 47.4997313,22.486835 C48.0399454,24.3983617 48.3100484,26.3825797 48.3100484,28.4395486 C48.3100484,30.1225232 48.1074711,31.7898896 47.7023106,33.441698 C47.29715,35.0935064 46.7205841,36.6881528 45.9725954,38.2256851 C45.2246067,39.7632174 44.3156063,41.2124238 43.2455669,42.5733477 C42.1755275,43.9342715 40.975647,45.1653178 39.6458893,46.2665234 C38.3161316,47.367729 36.8721196,48.3078951 35.3138098,49.08705 C33.7555,49.8662049 32.1037164,50.4323823 30.3584095,50.7855991 C30.8362911,52.2192441 31.6362115,53.6580619 32.7581945,55.1020956 C33.8801776,56.5461294 35.2254982,57.8395071 36.7941967,58.9822676 C38.3628952,60.1250281 40.1029817,61.0548057 42.0145083,61.7716282 C43.926035,62.4884507 45.9310302,62.8468565 48.029554,62.8468565 L48.029554,64 Z M24.6550242,49.2584632 C27.1067649,48.9883562 29.2883659,48.3130987 31.1998925,47.2326706 C33.1114192,46.1522425 34.7216485,44.7238133 36.0306287,42.9473401 C37.3396089,41.170867 38.3317179,39.0619861 39.0069855,36.6206341 C39.6822531,34.1792821 40.0198818,31.4522809 40.0198818,28.4395486 C40.0198818,25.4683713 39.6822531,22.7413701 39.0069855,20.2584632 C38.3317179,17.7755563 37.3448032,15.6355096 36.0462117,13.838259 C34.7476202,12.0410084 33.1425852,10.6437449 31.2310586,9.64642665 C29.3195319,8.64910839 27.1275424,8.15045674 24.6550242,8.15045674 C22.1201736,8.15045674 19.891824,8.64910839 17.9699087,9.64642665 C16.0479933,10.6437449 14.4429583,12.0410084 13.1547555,13.838259 C11.8665528,15.6355096 10.8952209,17.7755563 10.2407308,20.2584632 C9.58624068,22.7413701 9.25900054,25.4683713 9.25900054,28.4395486 C9.25900054,31.4522809 9.58624068,34.231225 10.2407308,36.7764643 C10.8952209,39.3217036 11.8665528,41.5188874 13.1547555,43.3680817 C14.4429583,45.2172759 16.0479933,46.661288 17.9699087,47.7001612 C19.891824,48.7390344 22.1201736,49.2584632 24.6550242,49.2584632 Z" id="Q" fill={color}/>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    }
}