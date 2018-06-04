import { stylesheet,cssRule,css,media } from '@barlus/styles';
export const enum Theme {
    TodoOverview = 'todooverview',
    TodoOverviewToggleAll = 'toggle-all',
    TodoOverviewList = 'todo-list'
}

stylesheet(`styles/${Theme.TodoOverview}.tcss`)(`.${Theme.TodoOverview}`,{
    position: 'relative',
    zIndex: 2,
    borderTop: '1px solid #e6e6e6',
    ...css.nest(`&>.${Theme.TodoOverviewToggleAll}`,{
        textAlign: 'center',
        border: 'none', /* Mobile Safari */
        opacity: 0,
        position: 'absolute',
        ...css.nest('& + label',{
            width: 60,
            height: 34,
            fontSize: 0,
            position: 'absolute',
            top: -52,
            left: -13,
            '-webkit-transform': 'rotate(90deg)',
            transform: 'rotate(90deg)'
        }),
        ...css.nest('& + label:before',{
            content: "'❯'",
            fontSize: 22,
            color: '#e6e6e6',
            padding: '10px 27px 10px 27px'
        }),
        ...css.nest('&:checked + label:before',{
            color: '#737373',
        })
    }),
    ...css.nest(`& .${Theme.TodoOverviewList}`,{
        margin: 0,
        padding: 0,
        listStyle: 'none'
    })
});

media({type:'screen'/*,'-webkit-min-device-pixel-ratio':0*/},{
    ...css.nest(`.${Theme.TodoOverviewToggleAll}`,{
        background:'none'
    }),
});