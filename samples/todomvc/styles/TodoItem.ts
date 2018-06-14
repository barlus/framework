import { stylesheet,media,nest } from '@barlus/styles';

export const enum Theme {
    TodoItem = 'todoitem',
    TodoEntry = 'todoentryedit',
    TodoItemCompleted = 'completed',
    TodoItemEditing = 'editing',
    TodoItemView = 'view',
    TodoItemToggle = 'toggle',
    TodoItemDestroy = 'destroy'
}

stylesheet(`styles/${Theme.TodoItem}.tcss`)(`.${Theme.TodoItem}`,{
    position: 'relative',
    fontSize: 24,
    borderBottom: '1px solid #ededed',
    ...nest(`&:last-child`,{
        borderBottom:'none'
    }),
    ...nest(`& .${Theme.TodoEntry}`,{
        position: 'relative',
        margin: 0,
        width: '100%',
        fontSize: '24px',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        lineHeight: '1.4em',
        color: 'inherit',
        boxSizing: 'border-box',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor:'#999',
        padding: 6,
        display: 'none',
        boxShadow: 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)'
    } as any),
    ...nest(`&.${Theme.TodoItemEditing}`,{
        borderBottom:'none',
        padding:0,
        ...nest(`& .${Theme.TodoEntry}`,{
            display:'block',
            padding:'12px 16px',
            width:505,
            margin:'0 0 0 43px'
        }),
        ...nest(`& .${Theme.TodoItemView}`,{
            display:'none'
        }),
        ...nest(`:last-child`,{
            marginBottom:-1
        }),
    }),
    ...nest(`& .${Theme.TodoItemToggle}`,{
        textAlign: 'center',
        width: 40,
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: 'auto',
        position: 'absolute',
        top: 0,
        bottom: 0,
        margin: 'auto 0',
        border: 'none', /* Mobile Safari */
        '-webkit-appearance': 'none',
        appearance: 'none',
        opacity: 0,
        ...nest(`& + label`,{
            backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center left'
        }),
        ...nest(`&:checked + label`,{
            backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')",
        }),
    }),
    ...nest(`& label`,{
        wordBreak:'break-all',
        padding:'15px 15px 15px 60px',
        display:'block',
        lineHeight:1.2,
        transition:'color 0.4s'
    }),
    ...nest(`& .${Theme.TodoItemCompleted} label`,{
        color:'#d9d9d9',
        textDecoration: 'line-through'
    }),
    ...nest(`& .${Theme.TodoItemDestroy}`,{
        display: 'none',
        position: 'absolute',
        top: 0,
        right: 10,
        bottom: 0,
        width: 40,
        height: 40,
        margin: 'auto 0',
        fontSize: 30,
        color: '#cc9a9a',
        marginBottom: 11,
        transition: 'color 0.2s ease-out',
        ...nest('&:hover',{
            color: '#af5b5e'
        }),
        ...nest('&:after',{
            content: "'×'"
        }),
    }),
    ...nest('&:hover .destroy',{
        display: 'block'
    })
});

media({type:'screen'/*,'-webkit-min-device-pixel-ratio':0*/},{


    ...nest(`.${Theme.TodoItem} ${Theme.TodoItemToggle}`,{
        background:'none',
        height:40
    }),
});