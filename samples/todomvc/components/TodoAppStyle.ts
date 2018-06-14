import { stylesheet, cssRule, nest } from '@barlus/styles';


export const enum Theme {
    TodoApp = 'todoapp',
    Header = 'header'
}

stylesheet(`styles/${Theme.TodoApp}.tcss`)(`.${Theme.TodoApp}`,{
    background: '#fff',
    margin: '130px 0 40px 0',
    position: 'relative',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',
    ...nest(`& .${Theme.Header} h1`,{
        position: 'absolute',
        top: -155,
        width: '100%',
        fontSize: 100,
        fontWeight: 100,
        textAlign: 'center',
        color: 'rgba(175, 47, 47, 0.15)',
        /*'-webkit-text-rendering': 'optimizeLegibility',
        '-moz-text-rendering': 'optimizeLegibility',*/
        textRendering: 'optimizeLegibility',
    })
});

cssRule('html, body',{
    margin: 0,
    padding: 0
});
cssRule('button',{
    margin: 0,
    padding: 0,
    border: 0,
    background: 'none',
    fontSize: '100%',
    verticalAlign: 'baseline',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    color: 'inherit',
    "-webkit-appearance": 'none',
    appearance: 'none',
    '-webkit-font-smoothing' : 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
} as any);
cssRule('body', {
    font: "14px 'Helvetica Neue', Helvetica, Arial, sans-serif",
    lineHeight: '1.4em',
    background: '#f5f5f5',
    color: '#4d4d4d',
    minWidth: '230px',
    maxWidth: '550px',
    margin: '0 auto',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    fontWeight: 300,
} as any);
cssRule(':focus', {
    outline: 0
});
cssRule('.hidden', {
    display: 'none'
});
