import { stylesheet, rem, css } from '@barlus/styles';
import { config } from '../config';
import { buttonVariant } from '../mixins/button';
import { controlShadow } from '../mixins/shadow';
import { controlTransition } from '../mixins/transition';

export const enum Theme {
    Calendar = "calendar",
    nav = "calendar-nav",
    events = "calendar-events",
    event = "calendar-event",
    large = "calendar-lg",
    container = "calendar-container",
    header = "calendar-header",
    date = "calendar-date",
    dateItem = "date-item",
    today = "date-today",
    active = "active",
    body = "calendar-body",
    prevMonth = "prev-month",
    currentMonth = "current-month",
    nextMonth = "next-month",
    disabled = "disabled",
    rangeStart = "range-start",
    range = "calendar-range",
    rangeEnd = "range-end",


}
