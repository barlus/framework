import {stylesheet, nest, media} from '@barlus/styles';


export const enum Theme {
  TodoOverview = 'main',
  TodoOverviewToggleAll = 'toggle-all',
  TodoOverviewList = 'todo-list'
}

stylesheet(`styles/${Theme.TodoOverview}.tcss`)(`.${Theme.TodoOverview}`, {
  position: 'relative',
  zIndex: 2,
  borderTop: '1px solid #e6e6e6',
  ...nest(`& .${Theme.TodoOverviewToggleAll}`, {
    textAlign: 'center',
    border: 'none', /* Mobile Safari */
    opacity: 0,
    position: 'absolute',
    ...nest('& + label', {
      width: 60,
      height: 34,
      fontSize: 0,
      position: 'absolute',
      top: -52,
      left: -13,
      '-webkit-transform': 'rotate(90deg)',
      transform: 'rotate(90deg)'
    }),
    ...nest('& + label:before', {
      content: "'❯'",
      fontSize: 22,
      color: '#e6e6e6',
      padding: '10px 27px 10px 27px'
    }),
    ...nest('&:checked + label:before', {
      color: '#737373',
    })
  }),
  ...nest(`& .${Theme.TodoOverviewList}`, {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  })
});

media({ type: 'screen'/*,'-webkit-min-device-pixel-ratio':0*/ }, {
  ...nest(`.${Theme.TodoOverviewToggleAll}`, {
    background: 'none'
  }),
});