import {stylesheet, nest} from '@barlus/styles';


export const enum Theme {
  TodoEntry = 'todoentry'
}

stylesheet(`styles/${Theme.TodoEntry}.tcss`)(`.${Theme.TodoEntry}`, {
  padding: '16px 16px 16px 60px',
  border: 'none',
  background: 'rgba(0, 0, 0, 0.003)',
  boxShadow: 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)',

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
  ...nest(
    [
      `&::-webkit-input-placeholder`,
      `&::-moz-placeholder`,
      `&::input-placeholder`
    ],
    {
      fontStyle: 'italic',
      fontWeight: 300,
      color: '#e6e6e6'
    }
  )
} as any);
