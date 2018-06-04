import { stylesheet,nest,media} from '@barlus/styles';

export const enum Theme {
    TodoFooter = 'footer',
    TodoFilters = 'filters',
    TodoCount = 'todo-count',
    TodoFooterClearCompleted = 'clear-completed',
}

stylesheet(`styles/${Theme.TodoFooter}.tcss`)(`.${Theme.TodoFooter}`,{
    color: "#777",
    padding: '10px 15px',
    height: 20,
    textAlign: 'center',
    borderTop: '1px solid #e6e6e6',
    ...nest('&:before',{
        content: "''",
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        height: 50,
        overflow: "hidden",
        boxShadow: `0 1px 1px rgba(0, 0, 0, 0.2),
        0 8px 0 -3px #f6f6f6,
        0 9px 1px -3px rgba(0, 0, 0, 0.2),
        0 16px 0 -6px #f6f6f6,
        0 17px 2px -6px rgba(0, 0, 0, 0.2)`
    }),
    ...nest(`& .${Theme.TodoCount}`,{
        float: 'left',
        textAlign: 'left',
        ...nest('strong',{
            fontWeight: 300
        })
    }),
    ...nest(`& .${Theme.TodoFilters}`,{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        position: 'absolute',
        right: 0,
        left: 0,
        ...nest('& li',{
            display: 'inline',
            ...nest('& a',{
                color: 'inherit',
                margin: 3,
                padding: '3px 7px',
                textDecoration: 'none',
                border: '1px solid transparent',
                borderRadius: 3,
                ...nest('&:hover',{
                    borderColor: 'rgba(175, 47, 47, 0.1)'
                }),
                ...nest('&.selected',{
                    borderColor: 'rgba(175, 47, 47, 0.2)'
                })
            })
        })
    }),
    ...nest([
        `& .${Theme.TodoFooterClearCompleted}`,
        `& .${Theme.TodoFooterClearCompleted}:active`
    ],{
        float: 'right',
        position: 'relative',
        lineHeight: 20,
        textDecoration:'none',
        cursor:'pointer'
    }),
    ...nest(`& .${Theme.TodoFooterClearCompleted}:hover`,{
        textDecoration:'none',
    }),
});


media({maxWidth:430},{
    ...nest(`.${Theme.TodoFooter}`,{
        height:50
    }),
    ...nest(`.${Theme.TodoFilters}`,{
        bottom:10
    })
});