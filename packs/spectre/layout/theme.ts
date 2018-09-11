import {$, list, media, nest, percent, stylesheet, rem} from "@barlus/styles"
import {clearfix}                                       from "../mixins/clearfix"


export default Theme;
export const enum Theme {
  col1 = 'col-1',
  col10 = 'col-10',
  col11 = 'col-11',
  col12 = 'col-12',
  col2 = 'col-2',
  col3 = 'col-3',
  col4 = 'col-4',
  col5 = 'col-5',
  col6 = 'col-6',
  col7 = 'col-7',
  col8 = 'col-8',
  col9 = 'col-9',
  colAuto = 'col-auto',
  colGapless = 'col-gapless',
  colLg1 = 'col-lg-1',
  colLg10 = 'col-lg-10',
  colLg11 = 'col-lg-11',
  colLg12 = 'col-lg-12',
  colLg2 = 'col-lg-2',
  colLg3 = 'col-lg-3',
  colLg4 = 'col-lg-4',
  colLg5 = 'col-lg-5',
  colLg6 = 'col-lg-6',
  colLg7 = 'col-lg-7',
  colLg8 = 'col-lg-8',
  colLg9 = 'col-lg-9',
  colMd1 = 'col-md-1',
  colMd10 = 'col-md-10',
  colMd11 = 'col-md-11',
  colMd12 = 'col-md-12',
  colMd2 = 'col-md-2',
  colMd3 = 'col-md-3',
  colMd4 = 'col-md-4',
  colMd5 = 'col-md-5',
  colMd6 = 'col-md-6',
  colMd7 = 'col-md-7',
  colMd8 = 'col-md-8',
  colMd9 = 'col-md-9',
  colMlAuto = 'col-ml-auto',
  colMrAuto = 'col-mr-auto',
  colMxAuto = 'col-mx-auto',
  colOneline = 'col-oneline',
  colSm1 = 'col-sm-1',
  colSm10 = 'col-sm-10',
  colSm11 = 'col-sm-11',
  colSm12 = 'col-sm-12',
  colSm2 = 'col-sm-2',
  colSm3 = 'col-sm-3',
  colSm4 = 'col-sm-4',
  colSm5 = 'col-sm-5',
  colSm6 = 'col-sm-6',
  colSm7 = 'col-sm-7',
  colSm8 = 'col-sm-8',
  colSm9 = 'col-sm-9',
  colXl1 = 'col-xl-1',
  colXl10 = 'col-xl-10',
  colXl11 = 'col-xl-11',
  colXl12 = 'col-xl-12',
  colXl2 = 'col-xl-2',
  colXl3 = 'col-xl-3',
  colXl4 = 'col-xl-4',
  colXl5 = 'col-xl-5',
  colXl6 = 'col-xl-6',
  colXl7 = 'col-xl-7',
  colXl8 = 'col-xl-8',
  colXl9 = 'col-xl-9',
  colXs1 = 'col-xs-1',
  colXs10 = 'col-xs-10',
  colXs11 = 'col-xs-11',
  colXs12 = 'col-xs-12',
  colXs2 = 'col-xs-2',
  colXs3 = 'col-xs-3',
  colXs4 = 'col-xs-4',
  colXs5 = 'col-xs-5',
  colXs6 = 'col-xs-6',
  colXs7 = 'col-xs-7',
  colXs8 = 'col-xs-8',
  colXs9 = 'col-xs-9',
  column = 'column',
  columns = 'columns',
  container = 'container',
  gridLg = 'grid-lg',
  gridMd = 'grid-md',
  gridSm = 'grid-sm',
  gridXl = 'grid-xl',
  gridXs = 'grid-xs',
  hideLg = 'hide-lg',
  hideMd = 'hide-md',
  hideSm = 'hide-sm',
  hideXl = 'hide-xl',
  hideXs = 'hide-xs',
  showLg = 'show-lg',
  showMd = 'show-md',
  showSm = 'show-sm',
  showXl = 'show-xl',
  showXs = 'show-xs',
}

stylesheet('layout.ts')('', {
  ...nest([ `.${Theme.container}` ], {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: $.layoutSpacing,
    paddingRight: $.layoutSpacing,
    width: percent(100),
    ...clearfix(),
    ...nest([ `&.${Theme.gridXl}` ], {
      maxWidth: rem($.gridSpacing * 2 + $.sizeXl),
    }),
    ...nest([ `&.${Theme.gridLg}` ], {
      maxWidth: rem($.gridSpacing * 2 + $.sizeLg),
    }),
    ...nest([ `&.${Theme.gridMd}` ], {
      maxWidth: rem($.gridSpacing * 2 + $.sizeMd),
    }),
    ...nest([ `&.${Theme.gridSm}` ], {
      maxWidth: rem($.gridSpacing * 2 + $.sizeSm),
    }),
    ...nest([ `&.${Theme.gridXs}` ], {
      maxWidth: rem($.gridSpacing * 2 + $.sizeXs),
    }),
  }),
  ...nest([ `.${Theme.showXs}`, `.${Theme.showSm}`, `.${Theme.showMd}`, `.${Theme.showLg}`, `.${Theme.showXl}` ], {
    display: 'none',
  }),
  ...nest([ `.${Theme.columns}` ], {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: rem(-$.layoutSpacing),
    marginRight: rem(-$.layoutSpacing),
    ...nest([ `&.${Theme.colGapless}` ], {
      marginLeft: 0,
      marginRight: 0,
      ...nest([ `& > .${Theme.column}` ], {
        paddingLeft: 0,
        paddingRight: 0,
      }),
    }),
    ...nest([ `&.${Theme.colOneline}` ], {
      flexWrap: 'nowrap',
      overflowX: 'auto',
    }),
  }),
  ...nest([ `.${Theme.column}` ], {
    flex: 1,
    maxWidth: percent(100),
    paddingLeft: $.layoutSpacing,
    paddingRight: $.layoutSpacing,
    ...nest([ `&.${Theme.col12}`, `&.${Theme.col11}`, `&.${Theme.col10}`, `&.${Theme.col9}`, `&.${Theme.col8}`, `&.${Theme.col7}`, `&.${Theme.col6}`, `&.${Theme.col5}`, `&.${Theme.col4}`, `&.${Theme.col3}`, `&.${Theme.col2}`, `&.${Theme.col1}` ], {
      flex: 'none',
    }),
  }),
  ...nest([ `.${Theme.col12}` ], {
    width: percent(100),
  }),
  ...nest([ `.${Theme.col11}` ], {
    width: percent(91.66666667),
  }),
  ...nest([ `.${Theme.col10}` ], {
    width: percent(83.33333333),
  }),
  ...nest([ `.${Theme.col9}` ], {
    width: percent(75),
  }),
  ...nest([ `.${Theme.col8}` ], {
    width: percent(66.66666667),
  }),
  ...nest([ `.${Theme.col7}` ], {
    width: percent(58.33333333),
  }),
  ...nest([ `.${Theme.col6}` ], {
    width: percent(50),
  }),
  ...nest([ `.${Theme.col5}` ], {
    width: percent(41.66666667),
  }),
  ...nest([ `.${Theme.col4}` ], {
    width: percent(33.33333333),
  }),
  ...nest([ `.${Theme.col3}` ], {
    width: percent(25),
  }),
  ...nest([ `.${Theme.col2}` ], {
    width: percent(16.66666667),
  }),
  ...nest([ `.${Theme.col1}` ], {
    width: percent(8.33333333),
  }),
  ...nest([ `.${Theme.colAuto}` ], {
    flex: list(0, 0, 'auto'),
    maxWidth: 'none',
    width: 'auto',
  }),
  ...nest([ `.${Theme.colMxAuto}` ], {
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
  ...nest([ `.${Theme.colMlAuto}` ], {
    marginLeft: 'auto',
  }),
  ...nest([ `.${Theme.colMrAuto}` ], {
    marginRight: 'auto',
  }),
  ...media({ maxWidth: $.sizeXl }, {
    ...nest([ `.${Theme.colXl12}`, `.${Theme.colXl11}`, `.${Theme.colXl10}`, `.${Theme.colXl9}`, `.${Theme.colXl8}`, `.${Theme.colXl7}`, `.${Theme.colXl6}`, `.${Theme.colXl5}`, `.${Theme.colXl4}`, `.${Theme.colXl3}`, `.${Theme.colXl2}`, `.${Theme.colXl1}` ], {
      flex: 'none',
    }),
    ...nest([ `.${Theme.colXl12}` ], {
      width: percent(100),
    }),
    ...nest([ `.${Theme.colXl11}` ], {
      width: percent(91.66666667),
    }),
    ...nest([ `.${Theme.colXl10}` ], {
      width: percent(83.33333333),
    }),
    ...nest([ `.${Theme.colXl9}` ], {
      width: percent(75),
    }),
    ...nest([ `.${Theme.colXl8}` ], {
      width: percent(66.66666667),
    }),
    ...nest([ `.${Theme.colXl7}` ], {
      width: percent(58.33333333),
    }),
    ...nest([ `.${Theme.colXl6}` ], {
      width: percent(50),
    }),
    ...nest([ `.${Theme.colXl5}` ], {
      width: percent(41.66666667),
    }),
    ...nest([ `.${Theme.colXl4}` ], {
      width: percent(33.33333333),
    }),
    ...nest([ `.${Theme.colXl3}` ], {
      width: percent(25),
    }),
    ...nest([ `.${Theme.colXl2}` ], {
      width: percent(16.66666667),
    }),
    ...nest([ `.${Theme.colXl1}` ], {
      width: percent(8.33333333),
    }),
    ...nest([ `.${Theme.hideXl}` ], {
      display: 'none',
    }),
    ...nest([ `.${Theme.showXl}` ], {
      display: 'block',
    }),
  }),
  ...media({ maxWidth: $.sizeLg }, {
    ...nest([ `.${Theme.colLg12}`, `.${Theme.colLg11}`, `.${Theme.colLg10}`, `.${Theme.colLg9}`, `.${Theme.colLg8}`, `.${Theme.colLg7}`, `.${Theme.colLg6}`, `.${Theme.colLg5}`, `.${Theme.colLg4}`, `.${Theme.colLg3}`, `.${Theme.colLg2}`, `.${Theme.colLg1}` ], {
      flex: 'none',
    }),
    ...nest([ `.${Theme.colLg12}` ], {
      width: percent(100),
    }),
    ...nest([ `.${Theme.colLg11}` ], {
      width: percent(91.66666667),
    }),
    ...nest([ `.${Theme.colLg10}` ], {
      width: percent(83.33333333),
    }),
    ...nest([ `.${Theme.colLg9}` ], {
      width: percent(75),
    }),
    ...nest([ `.${Theme.colLg8}` ], {
      width: percent(66.66666667),
    }),
    ...nest([ `.${Theme.colLg7}` ], {
      width: percent(58.33333333),
    }),
    ...nest([ `.${Theme.colLg6}` ], {
      width: percent(50),
    }),
    ...nest([ `.${Theme.colLg5}` ], {
      width: percent(41.66666667),
    }),
    ...nest([ `.${Theme.colLg4}` ], {
      width: percent(33.33333333),
    }),
    ...nest([ `.${Theme.colLg3}` ], {
      width: percent(25),
    }),
    ...nest([ `.${Theme.colLg2}` ], {
      width: percent(16.66666667),
    }),
    ...nest([ `.${Theme.colLg1}` ], {
      width: percent(8.33333333),
    }),
    ...nest([ `.${Theme.hideLg}` ], {
      display: 'none',
    }),
    ...nest([ `.${Theme.showLg}` ], {
      display: 'block',
    }),
  }),
  ...media({ maxWidth: $.sizeMd }, {
    ...nest([ `.${Theme.colMd12}`, `.${Theme.colMd11}`, `.${Theme.colMd10}`, `.${Theme.colMd9}`, `.${Theme.colMd8}`, `.${Theme.colMd7}`, `.${Theme.colMd6}`, `.${Theme.colMd5}`, `.${Theme.colMd4}`, `.${Theme.colMd3}`, `.${Theme.colMd2}`, `.${Theme.colMd1}` ], {
      flex: 'none',
    }),
    ...nest([ `.${Theme.colMd12}` ], {
      width: percent(100),
    }),
    ...nest([ `.${Theme.colMd11}` ], {
      width: percent(91.66666667),
    }),
    ...nest([ `.${Theme.colMd10}` ], {
      width: percent(83.33333333),
    }),
    ...nest([ `.${Theme.colMd9}` ], {
      width: percent(75),
    }),
    ...nest([ `.${Theme.colMd8}` ], {
      width: percent(66.66666667),
    }),
    ...nest([ `.${Theme.colMd7}` ], {
      width: percent(58.33333333),
    }),
    ...nest([ `.${Theme.colMd6}` ], {
      width: percent(50),
    }),
    ...nest([ `.${Theme.colMd5}` ], {
      width: percent(41.66666667),
    }),
    ...nest([ `.${Theme.colMd4}` ], {
      width: percent(33.33333333),
    }),
    ...nest([ `.${Theme.colMd3}` ], {
      width: percent(25),
    }),
    ...nest([ `.${Theme.colMd2}` ], {
      width: percent(16.66666667),
    }),
    ...nest([ `.${Theme.colMd1}` ], {
      width: percent(8.33333333),
    }),
    ...nest([ `.${Theme.hideMd}` ], {
      display: 'none',
    }),
    ...nest([ `.${Theme.showMd}` ], {
      display: 'block',
    }),
  }),
  ...media({ maxWidth: $.sizeSm }, {
    ...nest([ `.${Theme.colSm12}`, `.${Theme.colSm11}`, `.${Theme.colSm10}`, `.${Theme.colSm9}`, `.${Theme.colSm8}`, `.${Theme.colSm7}`, `.${Theme.colSm6}`, `.${Theme.colSm5}`, `.${Theme.colSm4}`, `.${Theme.colSm3}`, `.${Theme.colSm2}`, `.${Theme.colSm1}` ], {
      flex: 'none',
    }),
    ...nest([ `.${Theme.colSm12}` ], {
      width: percent(100),
    }),
    ...nest([ `.${Theme.colSm11}` ], {
      width: percent(91.66666667),
    }),
    ...nest([ `.${Theme.colSm10}` ], {
      width: percent(83.33333333),
    }),
    ...nest([ `.${Theme.colSm9}` ], {
      width: percent(75),
    }),
    ...nest([ `.${Theme.colSm8}` ], {
      width: percent(66.66666667),
    }),
    ...nest([ `.${Theme.colSm7}` ], {
      width: percent(58.33333333),
    }),
    ...nest([ `.${Theme.colSm6}` ], {
      width: percent(50),
    }),
    ...nest([ `.${Theme.colSm5}` ], {
      width: percent(41.66666667),
    }),
    ...nest([ `.${Theme.colSm4}` ], {
      width: percent(33.33333333),
    }),
    ...nest([ `.${Theme.colSm3}` ], {
      width: percent(25),
    }),
    ...nest([ `.${Theme.colSm2}` ], {
      width: percent(16.66666667),
    }),
    ...nest([ `.${Theme.colSm1}` ], {
      width: percent(8.33333333),
    }),
    ...nest([ `.${Theme.hideSm}` ], {
      display: 'none',
    }),
    ...nest([ `.${Theme.showSm}` ], {
      display: 'block',
    }),
  }),
  ...media({ maxWidth: $.sizeXs }, {
    ...nest([ `.${Theme.colXs12}`, `.${Theme.colXs11}`, `.${Theme.colXs10}`, `.${Theme.colXs9}`, `.${Theme.colXs8}`, `.${Theme.colXs7}`, `.${Theme.colXs6}`, `.${Theme.colXs5}`, `.${Theme.colXs4}`, `.${Theme.colXs3}`, `.${Theme.colXs2}`, `.${Theme.colXs1}` ], {
      flex: 'none',
    }),
    ...nest([ `.${Theme.colXs12}` ], {
      width: percent(100),
    }),
    ...nest([ `.${Theme.colXs11}` ], {
      width: percent(91.66666667),
    }),
    ...nest([ `.${Theme.colXs10}` ], {
      width: percent(83.33333333),
    }),
    ...nest([ `.${Theme.colXs9}` ], {
      width: percent(75),
    }),
    ...nest([ `.${Theme.colXs8}` ], {
      width: percent(66.66666667),
    }),
    ...nest([ `.${Theme.colXs7}` ], {
      width: percent(58.33333333),
    }),
    ...nest([ `.${Theme.colXs6}` ], {
      width: percent(50),
    }),
    ...nest([ `.${Theme.colXs5}` ], {
      width: percent(41.66666667),
    }),
    ...nest([ `.${Theme.colXs4}` ], {
      width: percent(33.33333333),
    }),
    ...nest([ `.${Theme.colXs3}` ], {
      width: percent(25),
    }),
    ...nest([ `.${Theme.colXs2}` ], {
      width: percent(16.66666667),
    }),
    ...nest([ `.${Theme.colXs1}` ], {
      width: percent(8.33333333),
    }),
    ...nest([ `.${Theme.hideXs}` ], {
      display: 'none',
    }),
    ...nest([ `.${Theme.showXs}` ], {
      display: 'block',
    }),
  }),
});
