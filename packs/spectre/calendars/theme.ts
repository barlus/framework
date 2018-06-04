// import { stylesheet, rem } from '@barlus/styles';
// import { config } from '../config';
// import { buttonVariant } from '../mixins/button';
// import { controlShadow } from '../mixins/shadow';
// import { controlTransition } from '../mixins/transition';

// export const enum Theme {
//     Calendar = "calendar",
//     nav = "calendar-nav",
//     events = "calendar-events",
//     event = "calendar-event",
//     large = "calendar-lg",
//     container = "calendar-container",
//     header = "calendar-header",
//     date = "calendar-date",
//     dateItem = "date-item",
//     today = "date-today",
//     active = "active",
//     body = "calendar-body",
//     prevMonth = "prev-month",
//     currentMonth = "current-month",
//     nextMonth = "next-month",
//     disabled = "disabled",
//     rangeStart = "range-start",
//     range = "calendar-range",
//     rangeEnd = "range-end",
// }

import { $, list, nest, percent, px, rem, stylesheet, translate, translateY } from "@barlus/styles"
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export default Theme;
export const enum Theme {
    active = 'active',
    badge = 'badge',
    calendar = 'calendar',
    calendarBody = 'calendar-body',
    calendarDate = 'calendar-date',
    calendarEvent = 'calendar-event',
    calendarEvents = 'calendar-events',
    calendarHeader = 'calendar-header',
    calendarLg = 'calendar-lg',
    calendarNav = 'calendar-nav',
    calendarRange = 'calendar-range',
    dateItem = 'date-item',
    dateToday = 'date-today',
    disabled = 'disabled',
    rangeEnd = 'range-end',
    rangeStart = 'range-start',
    container = "calendar-container",
    prevMonth = "prev-month",
    currentMonth = "current-month",
    nextMonth = "next-month",
}

stylesheet('calendars.css')('', {
    ...nest([ `.${Theme.calendar}` ], {
        border: list(rem($.borderWidth), 'solid', $.borderColor.rgba),
        borderRadius: rem($.borderRadius),
        display: 'block',
        minWidth: px(280),
        ...nest([ `.${Theme.calendarNav}` ], {
            alignItems: 'center',
            background: $.bgColor.rgba,
            borderTopLeftRadius: rem($.borderRadius),
            borderTopRightRadius: rem($.borderRadius),
            display: 'flex',
            fontSize: rem($.fontSizeLg),
            padding: rem($.layoutSpacing),
        }),
        ...nest([ `.${Theme.calendarHeader}`, `.${Theme.calendarBody}` ], {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: list(rem($.layoutSpacing), 0),
            ...nest([ `.${Theme.calendarDate}` ], {
                flex: `0 0 14.28%`,
                maxWidth: percent(14.28),
            }),
        }),
        ...nest([ `.${Theme.calendarHeader}` ], {
            background: $.bgColor.rgba,
            borderBottom: list(rem($.borderWidth), 'solid', $.borderColor),
            color: $.grayColor.rgba,
            fontSize: rem($.fontSizeSm),
            textAlign: 'center',
        }),
        ...nest([ `.${Theme.calendarBody}` ], {
            color: $.grayColorDark.rgba,
        }),
        ...nest([ `.${Theme.calendarDate}` ], {
            border: 0,
            padding: rem($.unit1),
            ...nest([ `.${Theme.dateItem}` ], {
                ...controlTransition(),
                appearance: 'none',
                background: 'transparent',
                border: list(rem($.borderWidth), 'solid', 'transparent'),
                borderRadius: percent(50),
                color: $.grayColorDark.rgba,
                cursor: 'pointer',
                fontSize: rem($.fontSizeSm),
                height: rem($.unit7),
                lineHeight: rem($.unit5),
                outline: 'none',
                padding: rem($.unitH),
                position: 'relative',
                textAlign: 'center',
                textDecoration: 'none',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',
                width: rem($.unit7),
                ...nest([ `&.${Theme.dateToday}` ], {
                    borderColor: $.secondaryColorDark.rgba,
                    color: $.primaryColor.rgba,
                }),
                ...nest([ `&:focus` ], {
                    ...controlShadow(),
                }),
                ...nest([ `&:focus`, `&:hover` ], {
                    background: $.secondaryColorLight.rgba,
                    borderColor: $.secondaryColorDark.rgba,
                    color: $.primaryColor.rgba,
                    textDecoration: 'none',
                }),
                ...nest([ `&:active`, `&.${Theme.active}` ], {
                    background: $.primaryColorDark.rgba,
                    borderColor: $.primaryColorDark.darken(5).rgba,
                    color: $.lightColor.rgba,
                }),
                ...nest([ `&.${Theme.badge}` ], {
                    ...nest([ `&::after` ], {
                        position: 'absolute',
                        top: px(3),
                        right: px(3),
                        transform: translate(percent(50), percent(-50)),
                    }),
                }),
            }),
            ...nest([ `&.${Theme.disabled} .date-item`, `&.${Theme.disabled} .calendar-event`, `.${Theme.dateItem}:disabled`, `.${Theme.calendarEvent}:disabled` ], {
                cursor: 'default',
                opacity: .25,
                pointerEvents: 'none',
            }),
        }),
        ...nest([ `.${Theme.calendarRange}` ], {
            position: 'relative',
            ...nest([ `&::before` ], {
                background: $.secondaryColor.rgba,
                content: '""',
                height: rem($.unit7),
                left: 0,
                position: 'absolute',
                right: 0,
                top: percent(50),
                transform: translateY(percent(-50)),
            }),
            ...nest([ `&.${Theme.rangeStart}` ], {
                ...nest([ `&::before` ], {
                    left: percent(50),
                }),
            }),
            ...nest([ `&.${Theme.rangeEnd}` ], {
                ...nest([ `&::before` ], {
                    right: percent(50),
                }),
            }),
            ...nest([ `.${Theme.dateItem}` ], {
                color: $.primaryColor.rgba,
            }),
        }),
        ...nest([ `&.${Theme.calendarLg}` ], {
            ...nest([ `.${Theme.calendarBody}` ], {
                padding: 0,
                ...nest([ `.${Theme.calendarDate}` ], {
                    borderBottom: list(rem($.borderWidth), 'solid', $.borderColor.rgba),
                    borderRight: list(rem($.borderWidth), 'solid', $.borderColor.rgba),
                    display: 'flex',
                    flexDirection: 'column',
                    height: rem(5.5),
                    padding: 0,
                    ...nest([ `&:nth-child(7n)` ], {
                        borderRight: 0,
                    }),
                    ...nest([ `&:nth-last-child(-n+7)` ], {
                        borderBottom: 0,
                    }),
                }),
            }),
            ...nest([ `.${Theme.dateItem}` ], {
                alignSelf: 'flex-end',
                height: rem($.unit7),
                marginRight: rem($.layoutSpacingSm),
                marginTop: rem($.layoutSpacingSm),
            }),
            ...nest([ `.${Theme.calendarRange}` ], {
                ...nest([ `&::before` ], {
                    top: px(19),
                }),
                ...nest([ `&.${Theme.rangeStart}` ], {
                    ...nest([ `&::before` ], {
                        left: 'auto',
                        width: px(19),
                    }),
                }),
                ...nest([ `&.${Theme.rangeEnd}` ], {
                    ...nest([ `&::before` ], {
                        right: px(19),
                    }),
                }),
            }),
            ...nest([ `.${Theme.calendarEvents}` ], {
                flexGrow: 1,
                lineHeight: 1,
                overflowY: 'auto',
                padding: rem($.layoutSpacingSm),
            }),
            ...nest([ `.${Theme.calendarEvent}` ], {
                borderRadius: rem($.borderRadius),
                fontSize: rem($.fontSizeSm),
                display: 'block',
                margin: list(rem($.unitH), 'auto'),
                overflow: 'hidden',
                padding: list(px(3), px(4)),
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }),
        }),
    }),
});
