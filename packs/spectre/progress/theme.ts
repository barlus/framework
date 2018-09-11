import {$}          from "@barlus/styles";
import {list}       from "@barlus/styles";
import {nest}       from "@barlus/styles";
import {percent}    from "@barlus/styles";
import {s}          from "@barlus/styles";
import {rem}        from "@barlus/styles";
import {stylesheet} from "@barlus/styles";
import {appearance} from "../mixins/appearance";


export default Theme;
export const enum Theme {
  progress = 'progress',
}

stylesheet('progress.ts')('', {
  ...nest([ `.${Theme.progress}` ], {
    ...appearance('none'),
    background: $.bgColorDark.rgba,
    border: 0,
    borderRadius: rem($.borderRadius),
    color: $.primaryColor.rgba,
    height: rem($.unit1),
    position: 'relative',
    width: percent(100),

    ...nest([ `&::-webkit-progress-bar` ], {
      background: 'transparent',
      borderRadius: rem($.borderRadius),
    }),
    ...nest([ `&::-webkit-progress-value` ], {
      background: $.primaryColor.rgba,
      borderRadius: rem($.borderRadius),
    }),
    ...nest([ `&:indeterminate` ], {
      animation: list('progress-indeterminate', s(1.5), 'linear', 'infinite'),
      background: `${$.bgColorDark.rgba} linear-gradient(to right,${$.primaryColor} 30%,${$.bgColorDark} 30%) top left/150% 150% no-repeat`,
      ...nest([ `&::-moz-progress-bar` ], {
        background: 'transparent',
      }),
    }),
  }),
});