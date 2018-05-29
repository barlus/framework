import './mixins';
import { cssRule } from '@barlus/styles';


export * from './buttons/Button';
export * from './buttons/ButtonGroup';
export * from './toasts/Toast';
export * from './accordions/Accordion';
export * from './accordions/AccordionBody';
export * from './accordions/AccordionHeader';
export * from './tables/Table';
export * from './tables/TableBody';
export * from './tables/TableCell';
export * from './tables/TableHeader';
export * from './tables/TableHeading';
export * from './tables/TableRow';
export * from './forms/Form';
export * from './forms/FormGroup';
export * from './forms/Label';
export * from './forms/Input';
export * from './forms/InputGroup';
export * from './forms/InputGroupAddon';
export * from './forms/InputGroupButton';
export * from './forms/Hint';
export * from './forms/TextArea';
export * from './forms/Select';
export * from './forms/Radio';
export * from './forms/CheckBox';
export * from './forms/Switch';
export * from './media/Figure';
export * from './media/FigureCaption';
export * from './media/Image';
export * from './media/Video';
export * from './media/VideoContainer';
export * from './avatars/Avatar';
export * from './avatars/AvatarIcon';
export * from './avatars/AvatarPresence';
export * from './layout/Column';
export * from './layout/Columns';
export * from './layout/Container';
export * from './badges/Badge';
export * from './navbar/Navbar';
export * from './navbar/NavbarBrand';
export * from './navbar/NavbarSection';
export * from './bars/Bar';
export * from './bars/BarItem';
export * from './bars/Slider';
export * from './bars/SliderButton';
export * from './tooltips/Tooltip';
export * from './breadcrumbs/Breadcrumb';
export * from './breadcrumbs/BreadcrumbItem';
export * from './cards/Card';
export * from './cards/CardBody';
export * from './cards/CardFooter';
export * from './cards/CardHeader';
export * from './cards/CardImage';
export * from './cards/CardSubTitle';
export * from './cards/CardTitle';
export * from './chips/Chip';
export * from './empty/Empty';
export * from './empty/EmptyIcon';
export * from './empty/EmptyTitle';
export * from './empty/EmptySubtitle';
export * from './empty/EmptyAction';
export * from './tiles/Tile';
export * from './tiles/TileAction';
export * from './tiles/TileSubtitle';
export * from './tiles/TileTitle';
export * from './tiles/TileContent';
export * from './tiles/TileIcon';
export * from './menus/Dropdown';
export * from './menus/DropdownToggle';
export * from './menus/Menu';
export * from './menus/MenuItem';
export * from './menus/MenuBadge';
export * from './menus/MenuDivider';
export * from './modals/Modal';
export * from './modals/ModalBody';
export * from './modals/ModalHeader';
export * from './modals/ModalFooter';
export * from './navs/Nav';
export * from './navs/NavItem';
export * from './pagination/Pagination';
export * from './pagination/PaginationItem';
export * from './pagination/PaginationTitle';
export * from './pagination/PaginationSubtitle';
export * from './panels/Panel';
export * from './panels/PanelBody';
export * from './panels/PanelHeader';
export * from './panels/PanelTitle';
export * from './panels/PanelSubtitle';
export * from './panels/PanelFooter';
export * from './panels/PanelNav';
export * from './tabs/Tab';
export * from './tabs/TabItem';
export * from './popovers/Popover';
export * from './popovers/PopoverContainer';
export * from './steps/Step';
export * from './steps/StepItem';
export * from './calendars/Calendar';
export * from './offCanvas/OffCanvas';
export * from './offCanvas/OffCanvasContent';
export * from './offCanvas/OffCanvasOverlay';
export * from './offCanvas/OffCanvasSidebar';
export * from './offCanvas/OffCanvasToggle';

// Themes
import './core/normalize';
import './core/base';
import './core/typography';
import './core/table';
import './buttons/theme';
import './toasts/theme';
import './accordions/theme';
import './tables/theme';
import './forms/theme';
import './media/theme';
import './avatars/theme';
import './badges/theme';
import './navbar/theme';
import './bars/theme';
import './tooltips/theme';
import './breadcrumbs/theme';
import './cards/theme';
import './chips/theme';
import './empty/theme';
import './tiles/theme';
import './menus/theme';
import './modals/theme';
import './navs/theme';
import './pagination/theme';
import './panels/theme';
import './tabs/theme';
import './popovers/theme';
import './steps/theme';
import './calendars/theme';
import './offCanvas/theme';


//
cssRule('.form-group:not(:last-child)', {
    "marginBottom": ".4rem"
});
cssRule('fieldset', {
    "marginBottom": ".8rem"
});
cssRule('legend', {
    "fontSize": ".9rem",
    "fontWeight": 500,
    "marginBottom": ".8rem"
});
cssRule('.form-label', {
    "display": "block",
    "lineHeight": "1rem",
    "padding": ".4rem 0"
});
cssRule('.form-label.label-sm', {
    "fontSize": ".7rem",
    "padding": ".2rem 0"
});
cssRule('.form-label.label-lg', {
    "fontSize": ".9rem",
    "padding": ".5rem 0"
});
cssRule('.form-input', {
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    "appearance": "none",
    "background": "#fff",
    "backgroundImage": "none",
    "border": ".05rem solid #caced7",
    "borderRadius": ".1rem",
    "color": "#50596c",
    "display": "block",
    "fontSize": ".8rem",
    "height": "1.8rem",
    "lineHeight": "1rem",
    "maxWidth": "100%",
    "outline": 0,
    "padding": ".35rem .4rem",
    "position": "relative",
    "transition": "all .2s ease",
    "width": "100%"
});
cssRule('.form-input:focus', {
    "borderColor": "#5755d9",
    "boxShadow": "0 0 0 .1rem rgba(87,85,217,.2)"
});
cssRule('.form-input::-webkit-input-placeholder', {
    "color": "#acb3c2"
});
cssRule('.form-input:-ms-input-placeholder', {
    "color": "#acb3c2"
});
cssRule('.form-input::-ms-input-placeholder', {
    "color": "#acb3c2"
});
cssRule('.form-input::placeholder', {
    "color": "#acb3c2"
});
cssRule('.form-input.input-sm', {
    "fontSize": ".7rem",
    "height": "1.4rem",
    "padding": ".15rem .3rem"
});
cssRule('.form-input.input-lg', {
    "fontSize": ".9rem",
    "height": "2rem",
    "padding": ".45rem .6rem"
});
cssRule('.form-input.input-inline', {
    "display": "inline-block",
    "verticalAlign": "middle",
    "width": "auto"
});
cssRule('.form-input[type=file]', {
    "height": "auto"
});
cssRule('textarea.form-input', {
    "height": "auto"
});
cssRule('.form-input-hint', {
    "color": "#acb3c2",
    "fontSize": ".7rem",
    "marginTop": ".2rem"
});
cssRule('.has-success .form-input-hint,.is-success+.form-input-hint', {
    "color": "#32b643"
});
cssRule('.has-error .form-input-hint,.is-error+.form-input-hint', {
    "color": "#e85600"
});
cssRule('.form-select', {
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    "appearance": "none",
    "border": ".05rem solid #caced7",
    "borderRadius": ".1rem",
    "color": "inherit",
    "fontSize": ".8rem",
    "height": "1.8rem",
    "lineHeight": "1rem",
    "outline": 0,
    "padding": ".35rem .4rem",
    "verticalAlign": "middle",
    "width": "100%"
});
cssRule('.form-select[multiple],.form-select[size]', {
    "height": "auto"
});
cssRule('.form-select[multiple] option,.form-select[size] option', {
    "padding": ".1rem .2rem"
});
cssRule('.form-select:not([multiple]):not([size])', {
    "background": "#fff url(\"data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%204%205'%3E%3Cpath%20fill='%23667189'%20d='M2%200L0%202h4zm0%205L0%203h4z'/%3E%3C/svg%3E\") no-repeat right .35rem center/.4rem .5rem",
    "paddingRight": "1.2rem"
});
cssRule('.form-select:focus', {
    "borderColor": "#5755d9",
    "boxShadow": "0 0 0 .1rem rgba(87,85,217,.2)"
});
cssRule('.form-select::-ms-expand', {
    "display": "none"
});
cssRule('.form-select.select-sm', {
    "fontSize": ".7rem",
    "height": "1.4rem",
    "padding": ".15rem 1.1rem .15rem .3rem"
});
cssRule('.form-select.select-lg', {
    "fontSize": ".9rem",
    "height": "2rem",
    "padding": ".45rem 1.4rem .45rem .6rem"
});
cssRule('.has-icon-left,.has-icon-right', {
    "position": "relative"
});
cssRule('.has-icon-left .form-icon,.has-icon-right .form-icon', {
    "height": ".8rem",
    "margin": "0 .35rem",
    "position": "absolute",
    "top": "50%",
    "transform": "translateY(-50%)",
    "width": ".8rem",
    "zIndex": 2
});
cssRule('.has-icon-left .form-icon', {
    "left": ".05rem"
});
cssRule('.has-icon-left .form-input', {
    "paddingLeft": "1.5rem"
});
cssRule('.has-icon-right .form-icon', {
    "right": ".05rem"
});
cssRule('.has-icon-right .form-input', {
    "paddingRight": "1.5rem"
});
cssRule('.form-checkbox,.form-radio,.form-switch', {
    "display": "inline-block",
    "lineHeight": "1rem",
    "margin": ".2rem 0",
    "minHeight": "1.2rem",
    "padding": ".2rem .4rem .2rem 1.2rem",
    "position": "relative"
});
cssRule('.form-checkbox input,.form-radio input,.form-switch input', {
    "clip": "rect(0,0,0,0)",
    "height": "1px",
    "margin": "-1px",
    "overflow": "hidden",
    "position": "absolute",
    "width": "1px"
});
cssRule('.form-checkbox input:focus+.form-icon,.form-radio input:focus+.form-icon,.form-switch input:focus+.form-icon', {
    "borderColor": "#5755d9",
    "boxShadow": "0 0 0 .1rem rgba(87,85,217,.2)"
});
cssRule('.form-checkbox input:checked+.form-icon,.form-radio input:checked+.form-icon,.form-switch input:checked+.form-icon', {
    "background": "#5755d9",
    "borderColor": "#5755d9"
});
cssRule('.form-checkbox .form-icon,.form-radio .form-icon,.form-switch .form-icon', {
    "border": ".05rem solid #caced7",
    "cursor": "pointer",
    "display": "inline-block",
    "position": "absolute",
    "transition": "all .2s ease"
});
cssRule('.form-checkbox.input-sm,.form-radio.input-sm,.form-switch.input-sm', {
    "fontSize": ".7rem",
    "margin": 0
});
cssRule('.form-checkbox.input-lg,.form-radio.input-lg,.form-switch.input-lg', {
    "fontSize": ".9rem",
    "margin": ".3rem 0"
});
cssRule('.form-checkbox .form-icon,.form-radio .form-icon', {
    "background": "#fff",
    "height": ".8rem",
    "left": 0,
    "top": ".3rem",
    "width": ".8rem"
});
cssRule('.form-checkbox input:active+.form-icon,.form-radio input:active+.form-icon', {
    "background": "#f0f1f4"
});
cssRule('.form-checkbox .form-icon', {
    "borderRadius": ".1rem"
});
cssRule('.form-checkbox input:checked+.form-icon::before', {
    "backgroundClip": "padding-box",
    "border": ".1rem solid #fff",
    "borderLeftWidth": 0,
    "borderTopWidth": 0,
    "content": "\"\"",
    "height": "12px",
    "left": "50%",
    "marginLeft": "-4px",
    "marginTop": "-8px",
    "position": "absolute",
    "top": "50%",
    "transform": "rotate(45deg)",
    "width": "8px"
});
cssRule('.form-checkbox input:indeterminate+.form-icon', {
    "background": "#5755d9",
    "borderColor": "#5755d9"
});
cssRule('.form-checkbox input:indeterminate+.form-icon::before', {
    "background": "#fff",
    "content": "\"\"",
    "height": "2px",
    "left": "50%",
    "marginLeft": "-5px",
    "marginTop": "-1px",
    "position": "absolute",
    "top": "50%",
    "width": "10px"
});
cssRule('.form-radio .form-icon', {
    "borderRadius": "50%"
});
cssRule('.form-radio input:checked+.form-icon::before', {
    "background": "#fff",
    "borderRadius": "50%",
    "content": "\"\"",
    "height": "4px",
    "left": "50%",
    "position": "absolute",
    "top": "50%",
    "transform": "translate(-50%,-50%)",
    "width": "4px"
});
cssRule('.form-switch', {
    "paddingLeft": "2rem"
});
cssRule('.form-switch .form-icon', {
    "background": "#e7e9ed",
    "backgroundClip": "padding-box",
    "borderRadius": ".45rem",
    "height": ".9rem",
    "left": 0,
    "top": ".25rem",
    "width": "1.6rem"
});
cssRule('.form-switch .form-icon::before', {
    "background": "#fff",
    "borderRadius": "50%",
    "content": "\"\"",
    "display": "block",
    "height": ".8rem",
    "left": 0,
    "position": "absolute",
    "top": 0,
    "transition": "all .2s ease",
    "width": ".8rem"
});
cssRule('.form-switch input:checked+.form-icon::before', {
    "left": "14px"
});
cssRule('.form-switch input:active+.form-icon::before', {
    "background": "#f8f9fa"
});
cssRule('.input-group', {
    "display": [
        "flex",
        "-ms-flexbox"
    ]
});
cssRule('.input-group .input-group-addon', {
    "background": "#f8f9fa",
    "border": ".05rem solid #caced7",
    "borderRadius": ".1rem",
    "lineHeight": "1rem",
    "padding": ".35rem .4rem",
    "whiteSpace": "nowrap"
});
cssRule('.input-group .input-group-addon.addon-sm', {
    "fontSize": ".7rem",
    "padding": ".15rem .3rem"
});
cssRule('.input-group .input-group-addon.addon-lg', {
    "fontSize": ".9rem",
    "padding": ".45rem .6rem"
});
cssRule('.input-group .form-input,.input-group .form-select', {
    "-ms-flex": "1 1 auto",
    "flex": "1 1 auto"
});
cssRule('.input-group .input-group-btn', {
    "zIndex": 1
});
cssRule('.input-group .form-input:first-child:not(:last-child),.input-group .form-select:first-child:not(:last-child),.input-group .input-group-addon:first-child:not(:last-child),.input-group .input-group-btn:first-child:not(:last-child)', {
    "borderBottomRightRadius": 0,
    "borderTopRightRadius": 0
});
cssRule('.input-group .form-input:not(:first-child):not(:last-child),.input-group .form-select:not(:first-child):not(:last-child),.input-group .input-group-addon:not(:first-child):not(:last-child),.input-group .input-group-btn:not(:first-child):not(:last-child)', {
    "borderRadius": 0,
    "marginLeft": "-.05rem"
});
cssRule('.input-group .form-input:last-child:not(:first-child),.input-group .form-select:last-child:not(:first-child),.input-group .input-group-addon:last-child:not(:first-child),.input-group .input-group-btn:last-child:not(:first-child)', {
    "borderBottomLeftRadius": 0,
    "borderTopLeftRadius": 0,
    "marginLeft": "-.05rem"
});
cssRule('.input-group .form-input:focus,.input-group .form-select:focus,.input-group .input-group-addon:focus,.input-group .input-group-btn:focus', {
    "zIndex": 2
});
cssRule('.input-group .form-select', {
    "width": "auto"
});
cssRule('.input-group.input-inline', {
    "display": [
        "inline-flex",
        "-ms-inline-flexbox"
    ]
});
cssRule('.form-input.is-success,.form-select.is-success,.has-success .form-input,.has-success .form-select', {
    "borderColor": "#32b643"
});
cssRule('.form-input.is-success:focus,.form-select.is-success:focus,.has-success .form-input:focus,.has-success .form-select:focus', {
    "boxShadow": "0 0 0 .1rem rgba(50,182,67,.2)"
});
cssRule('.form-input.is-error,.form-select.is-error,.has-error .form-input,.has-error .form-select', {
    "borderColor": "#e85600"
});
cssRule('.form-input.is-error:focus,.form-select.is-error:focus,.has-error .form-input:focus,.has-error .form-select:focus', {
    "boxShadow": "0 0 0 .1rem rgba(232,86,0,.2)"
});
cssRule('.form-checkbox.is-error .form-icon,.form-radio.is-error .form-icon,.form-switch.is-error .form-icon,.has-error .form-checkbox .form-icon,.has-error .form-radio .form-icon,.has-error .form-switch .form-icon', {
    "borderColor": "#e85600"
});
cssRule('.form-checkbox.is-error input:checked+.form-icon,.form-radio.is-error input:checked+.form-icon,.form-switch.is-error input:checked+.form-icon,.has-error .form-checkbox input:checked+.form-icon,.has-error .form-radio input:checked+.form-icon,.has-error .form-switch input:checked+.form-icon', {
    "background": "#e85600",
    "borderColor": "#e85600"
});
cssRule('.form-checkbox.is-error input:focus+.form-icon,.form-radio.is-error input:focus+.form-icon,.form-switch.is-error input:focus+.form-icon,.has-error .form-checkbox input:focus+.form-icon,.has-error .form-radio input:focus+.form-icon,.has-error .form-switch input:focus+.form-icon', {
    "borderColor": "#e85600",
    "boxShadow": "0 0 0 .1rem rgba(232,86,0,.2)"
});
cssRule('.form-input:not(:placeholder-shown):invalid', {
    "borderColor": "#e85600"
});
cssRule('.form-input:not(:placeholder-shown):invalid:focus', {
    "boxShadow": "0 0 0 .1rem rgba(232,86,0,.2)"
});
cssRule('.form-input:not(:placeholder-shown):invalid+.form-input-hint', {
    "color": "#e85600"
});
cssRule('.form-input.disabled,.form-input:disabled,.form-select.disabled,.form-select:disabled', {
    "backgroundColor": "#f0f1f4",
    "cursor": "not-allowed",
    "opacity": 0.5
});
cssRule('.form-input[readonly]', {
    "backgroundColor": "#f8f9fa"
});
cssRule('input.disabled+.form-icon,input:disabled+.form-icon', {
    "background": "#f0f1f4",
    "cursor": "not-allowed",
    "opacity": 0.5
});
cssRule('.form-switch input.disabled+.form-icon::before,.form-switch input:disabled+.form-icon::before', {
    "background": "#fff"
});
cssRule('.form-horizontal', {
    "padding": ".4rem 0"
});
cssRule('.form-horizontal .form-group', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-wrap": "wrap",
    "flexWrap": "wrap"
});
cssRule('.label', {
    "background": "#f0f1f4",
    "borderRadius": ".1rem",
    "color": "#5b657a",
    "display": "inline-block",
    "lineHeight": 1.2,
    "padding": ".1rem .15rem"
});
cssRule('.label.label-rounded', {
    "borderRadius": "5rem",
    "paddingLeft": ".4rem",
    "paddingRight": ".4rem"
});
cssRule('.label.label-primary', {
    "background": "#5755d9",
    "color": "#fff"
});
cssRule('.label.label-secondary', {
    "background": "#f1f1fc",
    "color": "#5755d9"
});
cssRule('.label.label-success', {
    "background": "#32b643",
    "color": "#fff"
});
cssRule('.label.label-warning', {
    "background": "#ffb700",
    "color": "#fff"
});
cssRule('.label.label-error', {
    "background": "#e85600",
    "color": "#fff"
});
cssRule('code', {
    "background": "#fdf4f4",
    "borderRadius": ".1rem",
    "color": "#e06870",
    "fontSize": "85%",
    "lineHeight": 1.2,
    "padding": ".1rem .15rem"
});
cssRule('.code', {
    "borderRadius": ".1rem",
    "color": "#50596c",
    "position": "relative"
});
cssRule('.code::before', {
    "color": "#acb3c2",
    "content": "attr(data-lang)",
    "fontSize": ".7rem",
    "position": "absolute",
    "right": ".4rem",
    "top": ".1rem"
});
cssRule('.code code', {
    "background": "#f8f9fa",
    "color": "inherit",
    "display": "block",
    "lineHeight": 1.5,
    "overflowX": "auto",
    "padding": "1rem",
    "width": "100%"
});
cssRule('.img-responsive', {
    "display": "block",
    "height": "auto",
    "maxWidth": "100%"
});
cssRule('.img-fit-cover', {
    "objectFit": "cover"
});
cssRule('.img-fit-contain', {
    "objectFit": "contain"
});
cssRule('.video-responsive', {
    "display": "block",
    "overflow": "hidden",
    "padding": 0,
    "position": "relative",
    "width": "100%"
});
cssRule('.video-responsive::before', {
    "content": "\"\"",
    "display": "block",
    "paddingBottom": "56.25%"
});
cssRule('.video-responsive embed,.video-responsive iframe,.video-responsive object', {
    "border": 0,
    "bottom": 0,
    "height": "100%",
    "left": 0,
    "position": "absolute",
    "right": 0,
    "top": 0,
    "width": "100%"
});
cssRule('video.video-responsive', {
    "height": "auto",
    "maxWidth": "100%"
});
cssRule('video.video-responsive::before', {
    "content": "none"
});
cssRule('.video-responsive-4-3::before', {
    "paddingBottom": "75%"
});
cssRule('.video-responsive-1-1::before', {
    "paddingBottom": "100%"
});
cssRule('.figure', {
    "margin": "0 0 .4rem 0"
});
cssRule('.figure .figure-caption', {
    "color": "#667189",
    "marginTop": ".4rem"
});
cssRule('.container', {
    "marginLeft": "auto",
    "marginRight": "auto",
    "paddingLeft": ".4rem",
    "paddingRight": ".4rem",
    "width": "100%"
});
cssRule('.container.grid-xl', {
    "maxWidth": "1296px"
});
cssRule('.container.grid-lg', {
    "maxWidth": "976px"
});
cssRule('.container.grid-md', {
    "maxWidth": "856px"
});
cssRule('.container.grid-sm', {
    "maxWidth": "616px"
});
cssRule('.container.grid-xs', {
    "maxWidth": "496px"
});
cssRule('.show-lg,.show-md,.show-sm,.show-xl,.show-xs', {
    "display": "none"
});
cssRule('.columns', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-wrap": "wrap",
    "flexWrap": "wrap",
    "marginLeft": "-.4rem",
    "marginRight": "-.4rem"
});
cssRule('.columns.col-gapless', {
    "marginLeft": 0,
    "marginRight": 0
});
cssRule('.columns.col-gapless>.column', {
    "paddingLeft": 0,
    "paddingRight": 0
});
cssRule('.columns.col-oneline', {
    "-ms-flex-wrap": "nowrap",
    "flexWrap": "nowrap",
    "overflowX": "auto"
});
cssRule('.column', {
    "-ms-flex": 1,
    "flex": 1,
    "maxWidth": "100%",
    "paddingLeft": ".4rem",
    "paddingRight": ".4rem"
});
cssRule('.column.col-1,.column.col-10,.column.col-11,.column.col-12,.column.col-2,.column.col-3,.column.col-4,.column.col-5,.column.col-6,.column.col-7,.column.col-8,.column.col-9', {
    "-ms-flex": "none",
    "flex": "none"
});
cssRule('.col-12', {
    "width": "100%"
});
cssRule('.col-11', {
    "width": "91.66666667%"
});
cssRule('.col-10', {
    "width": "83.33333333%"
});
cssRule('.col-9', {
    "width": "75%"
});
cssRule('.col-8', {
    "width": "66.66666667%"
});
cssRule('.col-7', {
    "width": "58.33333333%"
});
cssRule('.col-6', {
    "width": "50%"
});
cssRule('.col-5', {
    "width": "41.66666667%"
});
cssRule('.col-4', {
    "width": "33.33333333%"
});
cssRule('.col-3', {
    "width": "25%"
});
cssRule('.col-2', {
    "width": "16.66666667%"
});
cssRule('.col-1', {
    "width": "8.33333333%"
});
cssRule('.col-auto', {
    "-ms-flex": "0 0 auto",
    "flex": "0 0 auto",
    "maxWidth": "none",
    "width": "auto"
});
cssRule('.col-mx-auto', {
    "marginLeft": "auto",
    "marginRight": "auto"
});
cssRule('.col-ml-auto', {
    "marginLeft": "auto"
});
cssRule('.col-mr-auto', {
    "marginRight": "auto"
});
cssRule('.navbar', {
    "alignItems": "stretch",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-align": "stretch",
    "-ms-flex-pack": "justify",
    "-ms-flex-wrap": "wrap",
    "flexWrap": "wrap",
    "justifyContent": "space-between"
});
cssRule('.navbar .navbar-section', {
    "alignItems": "center",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex": "1 0 0",
    "flex": "1 0 0",
    "-ms-flex-align": "center"
});
cssRule('.navbar .navbar-section:not(:first-child):last-child', {
    "-ms-flex-pack": "end",
    "justifyContent": "flex-end"
});
cssRule('.navbar .navbar-center', {
    "alignItems": "center",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex": "0 0 auto",
    "flex": "0 0 auto",
    "-ms-flex-align": "center"
});
cssRule('.navbar .navbar-brand', {
    "fontSize": ".9rem",
    "fontWeight": 500,
    "textDecoration": "none"
});
cssRule('.accordion input:checked~.accordion-header .icon,.accordion[open] .accordion-header .icon', {
    "transform": "rotate(90deg)"
});
cssRule('.accordion input:checked~.accordion-body,.accordion[open] .accordion-body', {
    "maxHeight": "50rem"
});
cssRule('.accordion .accordion-header', {
    "display": "block",
    "padding": ".2rem .4rem"
});
cssRule('.accordion .accordion-header .icon', {
    "transition": "all .2s ease"
});
cssRule('.accordion .accordion-body', {
    "marginBottom": ".4rem",
    "maxHeight": 0,
    "overflow": "hidden",
    "transition": "max-height .2s ease"
});
cssRule('summary.accordion-header::-webkit-details-marker', {
    "display": "none"
});
cssRule('.avatar', {
    "background": "#5755d9",
    "borderRadius": "50%",
    "color": "rgba(255,255,255,.85)",
    "display": "inline-block",
    "fontSize": ".8rem",
    "fontWeight": 300,
    "height": "1.6rem",
    "lineHeight": 1.25,
    "margin": 0,
    "position": "relative",
    "verticalAlign": "middle",
    "width": "1.6rem"
});
cssRule('.avatar.avatar-xs', {
    "fontSize": ".4rem",
    "height": ".8rem",
    "width": ".8rem"
});
cssRule('.avatar.avatar-sm', {
    "fontSize": ".6rem",
    "height": "1.2rem",
    "width": "1.2rem"
});
cssRule('.avatar.avatar-lg', {
    "fontSize": "1.2rem",
    "height": "2.4rem",
    "width": "2.4rem"
});
cssRule('.avatar.avatar-xl', {
    "fontSize": "1.6rem",
    "height": "3.2rem",
    "width": "3.2rem"
});
cssRule('.avatar img', {
    "borderRadius": "50%",
    "height": "100%",
    "position": "relative",
    "width": "100%",
    "zIndex": 1
});
cssRule('.avatar .avatar-icon,.avatar .avatar-presence', {
    "background": "#fff",
    "bottom": "14.64%",
    "height": "50%",
    "padding": ".1rem",
    "position": "absolute",
    "right": "14.64%",
    "transform": "translate(50%,50%)",
    "width": "50%",
    "zIndex": 2
});
cssRule('.avatar .avatar-presence', {
    "background": "#acb3c2",
    "borderRadius": "50%",
    "boxShadow": "0 0 0 .1rem #fff",
    "height": ".5em",
    "width": ".5em"
});
cssRule('.avatar .avatar-presence.online', {
    "background": "#32b643",
});
cssRule('.avatar .avatar-presence.busy', {
    "background": "#e85600"
});
cssRule('.avatar .avatar-presence.away', {
    "background": "#ffb700"
});
cssRule('.avatar[data-initial]::before', {
    "color": "currentColor",
    "content": "attr(data-initial)",
    "left": "50%",
    "position": "absolute",
    "top": "50%",
    "transform": "translate(-50%,-50%)",
    "zIndex": 1
});
cssRule('.badge', {
    "position": "relative",
    "whiteSpace": "nowrap"
});
cssRule('.badge:not([data-badge])::after,.badge[data-badge]::after', {
    "background": "#5755d9",
    "backgroundClip": "padding-box",
    "borderRadius": ".5rem",
    "boxShadow": "0 0 0 .1rem #fff",
    "color": "#fff",
    "content": "attr(data-badge)",
    "display": "inline-block",
    "transform": "translate(-.1rem,-.5rem)"
});
cssRule('.badge[data-badge]::after', {
    "fontSize": ".7rem",
    "height": ".9rem",
    "lineHeight": 1,
    "minWidth": ".9rem",
    "padding": ".1rem .2rem",
    "textAlign": "center",
    "whiteSpace": "nowrap"
});
cssRule('.badge:not([data-badge])::after,.badge[data-badge=""]::after', {
    "height": "6px",
    "minWidth": "6px",
    "padding": 0,
    "width": "6px"
});
cssRule('.badge.Button::after', {
    "position": "absolute",
    "right": 0,
    "top": 0,
    "transform": "translate(50%,-50%)"
});
cssRule('.badge.avatar::after', {
    "position": "absolute",
    "right": "14.64%",
    "top": "14.64%",
    "transform": "translate(50%,-50%)",
    "zIndex": 100
});
cssRule('.badge.avatar-xs::after', {
    "content": "\"\"",
    "height": ".4rem",
    "minWidth": ".4rem",
    "padding": 0,
    "width": ".4rem"
});
cssRule('.breadcrumb', {
    "listStyle": "none",
    "margin": ".2rem 0",
    "padding": ".2rem 0"
});
cssRule('.breadcrumb .breadcrumb-item', {
    "color": "#667189",
    "display": "inline-block",
    "margin": 0,
    "padding": ".2rem 0"
});
cssRule('.breadcrumb .breadcrumb-item:not(:last-child)', {
    "marginRight": ".2rem"
});
cssRule('.breadcrumb .breadcrumb-item:not(:last-child) a', {
    "color": "#667189"
});
cssRule('.breadcrumb .breadcrumb-item:not(:first-child)::before', {
    "color": "#e7e9ed",
    "content": "\"/\"",
    "paddingRight": ".4rem"
});
cssRule('.bar', {
    "background": "#f0f1f4",
    "borderRadius": ".1rem",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-wrap": "nowrap",
    "flexWrap": "nowrap",
    "height": ".8rem",
    "width": "100%"
});
cssRule('.bar.bar-sm', {
    "height": ".2rem"
});
cssRule('.bar .bar-item', {
    "background": "#5755d9",
    "color": "#fff",
    "display": "block",
    "-ms-flex-negative": 0,
    "flexShrink": 0,
    "fontSize": ".7rem",
    "height": "100%",
    "lineHeight": ".8rem",
    "position": "relative",
    "textAlign": "center",
    "width": 0
});
cssRule('.bar .bar-item:first-child', {
    "borderBottomLeftRadius": ".1rem",
    "borderTopLeftRadius": ".1rem"
});
cssRule('.bar .bar-item:last-child', {
    "borderBottomRightRadius": ".1rem",
    "borderTopRightRadius": ".1rem",
    "-ms-flex-negative": 1,
    "flexShrink": 1
});
cssRule('.bar-slider', {
    "height": ".1rem",
    "margin": ".4rem 0",
    "position": "relative"
});
cssRule('.bar-slider .bar-item', {
    "left": 0,
    "padding": 0,
    "position": "absolute"
});
cssRule('.bar-slider .bar-item:not(:last-child):first-child', {
    "background": "#f0f1f4",
    "zIndex": 1
});
cssRule('.bar-slider .bar-slider-btn', {
    "background": "#5755d9",
    "border": 0,
    "borderRadius": "50%",
    "height": ".6rem",
    "padding": 0,
    "position": "absolute",
    "right": 0,
    "top": "50%",
    "transform": "translate(50%,-50%)",
    "width": ".6rem"
});
cssRule('.bar-slider .bar-slider-btn:active', {
    "boxShadow": "0 0 0 .1rem #5755d9"
});
cssRule('.card', {
    "background": "#fff",
    "border": ".05rem solid #e7e9ed",
    "borderRadius": ".1rem",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-direction": "column",
    "flexDirection": "column"
});
cssRule('.card .card-body,.card .card-footer,.card .card-header', {
    "padding": ".8rem",
    "paddingBottom": 0
});
cssRule('.card .card-body:last-child,.card .card-footer:last-child,.card .card-header:last-child', {
    "paddingBottom": ".8rem"
});
cssRule('.card .card-image', {
    "paddingTop": ".8rem"
});
cssRule('.card .card-image:first-child', {
    "paddingTop": 0
});
cssRule('.card .card-image:first-child img', {
    "borderTopLeftRadius": ".1rem",
    "borderTopRightRadius": ".1rem"
});
cssRule('.card .card-image:last-child img', {
    "borderBottomLeftRadius": ".1rem",
    "borderBottomRightRadius": ".1rem"
});
cssRule('.chip', {
    "alignItems": "center",
    "background": "#f0f1f4",
    "borderRadius": "5rem",
    "color": "#667189",
    "display": [
        "inline-flex",
        "-ms-inline-flexbox"
    ],
    "-ms-flex-align": "center",
    "fontSize": "90%",
    "height": "1.2rem",
    "lineHeight": ".8rem",
    "margin": ".1rem",
    "maxWidth": "100%",
    "padding": ".2rem .4rem",
    "textDecoration": "none",
    "verticalAlign": "middle"
});
cssRule('.chip.active', {
    "background": "#5755d9",
    "color": "#fff"
});
cssRule('.chip .avatar', {
    "marginLeft": "-.4rem",
    "marginRight": ".2rem"
});
cssRule('.dropdown', {
    "display": "inline-block",
    "position": "relative"
});
cssRule('.dropdown .menu', {
    "animation": "slide-down .15s ease 1",
    "display": "none",
    "left": 0,
    "maxHeight": "50vh",
    "overflowY": "auto",
    "position": "absolute",
    "top": "100%"
});
cssRule('.dropdown.dropdown-right .menu', {
    "left": "auto",
    "right": 0
});
cssRule('.dropdown .dropdown-toggle:focus+.menu,.dropdown .menu:hover,.dropdown.active .menu', {
    "display": "block"
});
cssRule('.dropdown .ButtonGroup .dropdown-toggle:nth-last-child(2)', {
    "borderBottomRightRadius": ".1rem",
    "borderTopRightRadius": ".1rem"
});
cssRule('.empty', {
    "background": "#f8f9fa",
    "borderRadius": ".1rem",
    "color": "#667189",
    "padding": "3.2rem 1.6rem",
    "textAlign": "center"
});
cssRule('.empty .empty-icon', {
    "marginBottom": ".8rem"
});
cssRule('.empty .empty-subtitle,.empty .empty-title', {
    "margin": ".4rem auto"
});
cssRule('.empty .empty-action', {
    "marginTop": ".8rem"
});
cssRule('.menu', {
    "background": "#fff",
    "borderRadius": ".1rem",
    "boxShadow": "0 .05rem .2rem rgba(69,77,93,.3)",
    "listStyle": "none",
    "margin": 0,
    "minWidth": "180px",
    "padding": ".4rem",
    "transform": "translateY(.2rem)",
    "zIndex": 300
});
cssRule('.menu.menu-nav', {
    "background": "0 0",
    "boxShadow": "none"
});
cssRule('.menu .menu-item', {
    "marginTop": 0,
    "padding": "0 .4rem",
    "textDecoration": "none",
    "-webkit-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "userSelect": "none"
});
cssRule('.menu .menu-item>a', {
    "borderRadius": ".1rem",
    "color": "inherit",
    "display": "block",
    "margin": "0 -.4rem",
    "padding": ".2rem .4rem",
    "textDecoration": "none"
});
cssRule('.menu .menu-item>a:focus,.menu .menu-item>a:hover', {
    "background": "#f1f1fc",
    "color": "#5755d9"
});
cssRule('.menu .menu-item>a.active,.menu .menu-item>a:active', {
    "background": "#f1f1fc",
    "color": "#5755d9"
});
cssRule('.menu .menu-item .form-checkbox,.menu .menu-item .form-radio,.menu .menu-item .form-switch', {
    "margin": ".1rem 0"
});
cssRule('.menu .menu-item+.menu-item', {
    "marginTop": ".2rem"
});
cssRule('.menu .menu-badge', {
    "float": "right",
    "padding": ".2rem 0"
});
cssRule('.menu .menu-badge .btn', {
    "marginTop": "-.1rem"
});
cssRule('.modal', {
    "alignItems": "center",
    "bottom": 0,
    "display": "none",
    "-ms-flex-align": "center",
    "-ms-flex-pack": "center",
    "justifyContent": "center",
    "left": 0,
    "opacity": 0,
    "overflow": "hidden",
    "padding": ".4rem",
    "position": "fixed",
    "right": 0,
    "top": 0
});
cssRule('.modal.active,.modal:target', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "opacity": 1,
    "zIndex": 400
});
cssRule('.modal.active .modal-overlay,.modal:target .modal-overlay', {
    "background": "rgba(248,249,250,.75)",
    "bottom": 0,
    "cursor": "default",
    "display": "block",
    "left": 0,
    "position": "absolute",
    "right": 0,
    "top": 0
});
cssRule('.modal.active .modal-container,.modal:target .modal-container', {
    "animation": "slide-down .2s ease 1",
    "maxWidth": "640px",
    "width": "100%",
    "zIndex": 1
});
cssRule('.modal.modal-sm .modal-container', {
    "maxWidth": "320px",
    "padding": "0 .4rem"
});
cssRule('.modal.modal-lg .modal-overlay', {
    "background": "#fff"
});
cssRule('.modal.modal-lg .modal-container', {
    "boxShadow": "none",
    "maxWidth": "960px"
});
cssRule('.modal-container', {
    "background": "#fff",
    "borderRadius": ".1rem",
    "boxShadow": "0 .2rem .5rem rgba(69,77,93,.3)",
    "display": "block",
    "padding": "0 .8rem"
});
cssRule('.modal-container .modal-header', {
    "padding": ".8rem"
});
cssRule('.modal-container .modal-body', {
    "maxHeight": "50vh",
    "overflowY": "auto",
    "padding": ".8rem",
    "position": "relative"
});
cssRule('.modal-container .modal-footer', {
    "padding": ".8rem",
    "textAlign": "right"
});
cssRule('.nav', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-direction": "column",
    "flexDirection": "column",
    "listStyle": "none",
    "margin": ".2rem 0"
});
cssRule('.nav .nav-item a', {
    "color": "#667189",
    "padding": ".2rem .4rem",
    "textDecoration": "none"
});
cssRule('.nav .nav-item a:focus,.nav .nav-item a:hover', {
    "color": "#5755d9"
});
cssRule('.nav .nav-item.active>a', {
    "color": "#50596c",
    "fontWeight": 700
});
cssRule('.nav .nav-item.active>a:focus,.nav .nav-item.active>a:hover', {
    "color": "#5755d9"
});
cssRule('.nav .nav', {
    "marginBottom": ".4rem",
    "marginLeft": ".8rem"
});
cssRule('.pagination', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "listStyle": "none",
    "margin": ".2rem 0",
    "padding": ".2rem 0"
});
cssRule('.pagination .page-item', {
    "margin": ".2rem .05rem"
});
cssRule('.pagination .page-item span', {
    "display": "inline-block",
    "padding": ".2rem .2rem"
});
cssRule('.pagination .page-item a', {
    "borderRadius": ".1rem",
    "color": "#667189",
    "display": "inline-block",
    "padding": ".2rem .4rem",
    "textDecoration": "none"
});
cssRule('.pagination .page-item a:focus,.pagination .page-item a:hover', {
    "color": "#5755d9"
});
cssRule('.pagination .page-item.disabled a', {
    "cursor": "default",
    "opacity": 0.5,
    "pointerEvents": "none"
});
cssRule('.pagination .page-item.active a', {
    "background": "#5755d9",
    "color": "#fff"
});
cssRule('.pagination .page-item.page-next,.pagination .page-item.page-prev', {
    "-ms-flex": "1 0 50%",
    "flex": "1 0 50%"
});
cssRule('.pagination .page-item.page-next', {
    "textAlign": "right"
});
cssRule('.pagination .page-item .page-item-title', {
    "margin": 0
});
cssRule('.pagination .page-item .page-item-subtitle', {
    "margin": 0,
    "opacity": 0.5
});
cssRule('.panel', {
    "border": ".05rem solid #e7e9ed",
    "borderRadius": ".1rem",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-direction": "column",
    "flexDirection": "column"
});
cssRule('.panel .panel-footer,.panel .panel-header', {
    "-ms-flex": "0 0 auto",
    "flex": "0 0 auto",
    "padding": ".8rem"
});
cssRule('.panel .panel-nav', {
    "-ms-flex": "0 0 auto",
    "flex": "0 0 auto"
});
cssRule('.panel .panel-body', {
    "-ms-flex": "1 1 auto",
    "flex": "1 1 auto",
    "overflowY": "auto",
    "padding": "0 .8rem"
});
cssRule('.popover', {
    "display": "inline-block",
    "position": "relative"
});
cssRule('.popover .popover-container', {
    "left": "50%",
    "opacity": 0,
    "padding": ".4rem",
    "position": "absolute",
    "top": 0,
    "transform": "translate(-50%,-50%) scale(0)",
    "transition": "transform .2s ease",
    "width": "320px",
    "zIndex": 300
});
cssRule('.popover .popover-container:hover,.popover :focus+.popover-container,.popover:hover .popover-container', {
    "display": "block",
    "opacity": 1,
    "transform": "translate(-50%,-100%) scale(1)"
});
cssRule('.popover.popover-right .popover-container', {
    "left": "100%",
    "top": "50%"
});
cssRule('.popover.popover-right .popover-container:hover,.popover.popover-right :focus+.popover-container,.popover.popover-right:hover .popover-container', {
    "transform": "translate(0,-50%) scale(1)"
});
cssRule('.popover.popover-bottom .popover-container', {
    "left": "50%",
    "top": "100%"
});
cssRule('.popover.popover-bottom .popover-container:hover,.popover.popover-bottom :focus+.popover-container,.popover.popover-bottom:hover .popover-container', {
    "transform": "translate(-50%,0) scale(1)"
});
cssRule('.popover.popover-left .popover-container', {
    "left": 0,
    "top": "50%"
});
cssRule('.popover.popover-left .popover-container:hover,.popover.popover-left :focus+.popover-container,.popover.popover-left:hover .popover-container', {
    "transform": "translate(-100%,-50%) scale(1)"
});
cssRule('.popover .card', {
    "border": 0,
    "boxShadow": "0 .2rem .5rem rgba(69,77,93,.3)"
});
cssRule('.step', {
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-wrap": "nowrap",
    "flexWrap": "nowrap",
    "listStyle": "none",
    "margin": ".2rem 0",
    "width": "100%"
});
cssRule('.step .step-item', {
    "-ms-flex": "1 1 0",
    "flex": "1 1 0",
    "marginTop": 0,
    "minHeight": "1rem",
    "position": "relative",
    "textAlign": "center"
});
cssRule('.step .step-item:not(:first-child)::before', {
    "background": "#5755d9",
    "content": "\"\"",
    "height": "2px",
    "left": "-50%",
    "position": "absolute",
    "top": "9px",
    "width": "100%"
});
cssRule('.step .step-item a', {
    "color": "#acb3c2",
    "display": "inline-block",
    "padding": "20px 10px 0",
    "textDecoration": "none"
});
cssRule('.step .step-item a::before', {
    "background": "#5755d9",
    "border": ".1rem solid #fff",
    "borderRadius": "50%",
    "content": "\"\"",
    "display": "block",
    "height": ".6rem",
    "left": "50%",
    "position": "absolute",
    "top": ".2rem",
    "transform": "translateX(-50%)",
    "width": ".6rem",
    "zIndex": 1
});
cssRule('.step .step-item.active a::before', {
    "background": "#fff",
    "border": ".1rem solid #5755d9"
});
cssRule('.step .step-item.active~.step-item::before', {
    "background": "#e7e9ed"
});
cssRule('.step .step-item.active~.step-item a::before', {
    "background": "#e7e9ed"
});
cssRule('.tab', {
    "alignItems": "center",
    "borderBottom": ".05rem solid #e7e9ed",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-align": "center",
    "-ms-flex-wrap": "wrap",
    "flexWrap": "wrap",
    "listStyle": "none",
    "margin": ".2rem 0 .15rem 0"
});
cssRule('.tab .tab-item', {
    "marginTop": 0
});
cssRule('.tab .tab-item a', {
    "borderBottom": ".1rem solid transparent",
    "color": "inherit",
    "display": "block",
    "margin": "0 .4rem 0 0",
    "padding": ".4rem .2rem .3rem .2rem",
    "textDecoration": "none"
});
cssRule('.tab .tab-item a:focus,.tab .tab-item a:hover', {
    "color": "#5755d9"
});
cssRule('.tab .tab-item a.active,.tab .tab-item.active a', {
    "borderBottomColor": "#5755d9",
    "color": "#5755d9"
});
cssRule('.tab .tab-item.tab-action', {
    "-ms-flex": "1 0 auto",
    "flex": "1 0 auto",
    "textAlign": "right"
});
cssRule('.tab .tab-item .btn-clear', {
    "marginTop": "-.2rem"
});
cssRule('.tab.tab-block .tab-item', {
    "-ms-flex": "1 0 0",
    "flex": "1 0 0",
    "textAlign": "center"
});
cssRule('.tab.tab-block .tab-item a', {
    "margin": 0
});
cssRule('.tab.tab-block .tab-item .badge[data-badge]::after', {
    "position": "absolute",
    "right": ".1rem",
    "top": ".1rem",
    "transform": "translate(0,0)"
});
cssRule('.tab:not(.tab-block) .badge', {
    "paddingRight": 0
});
cssRule('.tile', {
    "alignContent": "space-between",
    "alignItems": "flex-start",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-align": "start",
    "-ms-flex-line-pack": "justify"
});
cssRule('.tile .tile-action,.tile .tile-icon', {
    "-ms-flex": "0 0 auto",
    "flex": "0 0 auto"
});
cssRule('.tile .tile-content', {
    "-ms-flex": "1 1 auto",
    "flex": "1 1 auto"
});
cssRule('.tile .tile-content:not(:first-child)', {
    "paddingLeft": ".4rem"
});
cssRule('.tile .tile-content:not(:last-child)', {
    "paddingRight": ".4rem"
});
cssRule('.tile .tile-subtitle,.tile .tile-title', {
    "lineHeight": "1rem"
});
cssRule('.tile.tile-centered', {
    "alignItems": "center",
    "-ms-flex-align": "center"
});
cssRule('.tile.tile-centered .tile-content', {
    "overflow": "hidden"
});
cssRule('.tile.tile-centered .tile-subtitle,.tile.tile-centered .tile-title', {
    "marginBottom": 0,
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap"
});
cssRule('.toast', {
    "background": "rgba(69,77,93,.9)",
    "border": ".05rem solid #454d5d",
    "borderColor": "#454d5d",
    "borderRadius": ".1rem",
    "color": "#fff",
    "display": "block",
    "padding": ".4rem",
    "width": "100%"
});
cssRule('.toast.toast-primary', {
    "background": "rgba(87,85,217,.9)",
    "borderColor": "#5755d9"
});
cssRule('.toast.toast-success', {
    "background": "rgba(50,182,67,.9)",
    "borderColor": "#32b643"
});
cssRule('.toast.toast-warning', {
    "background": "rgba(255,183,0,.9)",
    "borderColor": "#ffb700"
});
cssRule('.toast.toast-error', {
    "background": "rgba(232,86,0,.9)",
    "borderColor": "#e85600"
});
cssRule('.toast a', {
    "color": "#fff",
    "textDecoration": "underline"
});
cssRule('.toast a.active,.toast a:active,.toast a:focus,.toast a:hover', {
    "opacity": 0.75
});
cssRule('.toast .btn-clear', {
    "margin": "4px -2px 4px 4px"
});
cssRule('.tooltip', {
    "position": "relative"
});
cssRule('.tooltip::after', {
    "background": "rgba(69,77,93,.9)",
    "borderRadius": ".1rem",
    "bottom": "100%",
    "color": "#fff",
    "content": "attr(data-tooltip)",
    "display": "block",
    "fontSize": ".7rem",
    "left": "50%",
    "maxWidth": "320px",
    "opacity": 0,
    "overflow": "hidden",
    "padding": ".2rem .4rem",
    "pointerEvents": "none",
    "position": "absolute",
    "textOverflow": "ellipsis",
    "transform": "translate(-50%,.4rem)",
    "transition": "all .2s ease",
    "whiteSpace": "pre",
    "zIndex": 300
});
cssRule('.tooltip:focus::after,.tooltip:hover::after', {
    "opacity": 1,
    "transform": "translate(-50%,-.2rem)"
});
cssRule('.tooltip.disabled,.tooltip[disabled]', {
    "pointerEvents": "auto"
});
cssRule('.tooltip.tooltip-right::after', {
    "bottom": "50%",
    "left": "100%",
    "transform": "translate(-.2rem,50%)"
});
cssRule('.tooltip.tooltip-right:focus::after,.tooltip.tooltip-right:hover::after', {
    "transform": "translate(.2rem,50%)"
});
cssRule('.tooltip.tooltip-bottom::after', {
    "bottom": "auto",
    "top": "100%",
    "transform": "translate(-50%,-.4rem)"
});
cssRule('.tooltip.tooltip-bottom:focus::after,.tooltip.tooltip-bottom:hover::after', {
    "transform": "translate(-50%,.2rem)"
});
cssRule('.tooltip.tooltip-left::after', {
    "bottom": "50%",
    "left": "auto",
    "right": "100%",
    "transform": "translate(.4rem,50%)"
});
cssRule('.tooltip.tooltip-left:focus::after,.tooltip.tooltip-left:hover::after', {
    "transform": "translate(-.2rem,50%)"
});
cssRule('.text-primary', {
    "color": "#5755d9"
});
cssRule('a.text-primary:focus,a.text-primary:hover', {
    "color": "#4240d4"
});
cssRule('.text-secondary', {
    "color": "#e5e5f9"
});
cssRule('a.text-secondary:focus,a.text-secondary:hover', {
    "color": "#d1d0f4"
});
cssRule('.text-gray', {
    "color": "#acb3c2"
});
cssRule('a.text-gray:focus,a.text-gray:hover', {
    "color": "#9ea6b7"
});
cssRule('.text-light', {
    "color": "#fff"
});
cssRule('a.text-light:focus,a.text-light:hover', {
    "color": "#f2f2f2"
});
cssRule('.text-success', {
    "color": "#32b643"
});
cssRule('a.text-success:focus,a.text-success:hover', {
    "color": "#2da23c"
});
cssRule('.text-warning', {
    "color": "#ffb700"
});
cssRule('a.text-warning:focus,a.text-warning:hover', {
    "color": "#e6a500"
});
cssRule('.text-error', {
    "color": "#e85600"
});
cssRule('a.text-error:focus,a.text-error:hover', {
    "color": "#cf4d00"
});
cssRule('.bg-primary', {
    "background": "#5755d9",
    "color": "#fff"
});
cssRule('.bg-secondary', {
    "background": "#f1f1fc"
});
cssRule('.bg-dark', {
    "background": "#454d5d",
    "color": "#fff"
});
cssRule('.bg-gray', {
    "background": "#f8f9fa"
});
cssRule('.bg-success', {
    "background": "#32b643",
    "color": "#fff"
});
cssRule('.bg-warning', {
    "background": "#ffb700",
    "color": "#fff"
});
cssRule('.bg-error', {
    "background": "#e85600",
    "color": "#fff"
});
cssRule('.c-hand', {
    "cursor": "pointer"
});
cssRule('.c-move', {
    "cursor": "move"
});
cssRule('.c-zoom-in', {
    "cursor": "zoom-in"
});
cssRule('.c-zoom-out', {
    "cursor": "zoom-out"
});
cssRule('.c-not-allowed', {
    "cursor": "not-allowed"
});
cssRule('.c-auto', {
    "cursor": "auto"
});
cssRule('.d-block', {
    "display": "block"
});
cssRule('.d-inline', {
    "display": "inline"
});
cssRule('.d-inline-block', {
    "display": "inline-block"
});
cssRule('.d-flex', {
    "display": [
        "flex",
        "-ms-flexbox"
    ]
});
cssRule('.d-inline-flex', {
    "display": [
        "inline-flex",
        "-ms-inline-flexbox"
    ]
});
cssRule('.d-hide,.d-none', {
    "display": "none"
});
cssRule('.d-visible', {
    "visibility": "visible"
});
cssRule('.d-invisible', {
    "visibility": "hidden"
});
cssRule('.text-hide', {
    "background": "0 0",
    "border": 0,
    "color": "transparent",
    "fontSize": 0,
    "lineHeight": 0,
    "textShadow": "none"
});
cssRule('.text-assistive', {
    "border": 0,
    "clip": "rect(0,0,0,0)",
    "height": "1px",
    "margin": "-1px",
    "overflow": "hidden",
    "padding": 0,
    "position": "absolute",
    "width": "1px"
});
cssRule('.divider,.divider-vert', {
    "display": "block",
    "position": "relative"
});
cssRule('.divider-vert[data-content]::after,.divider[data-content]::after', {
    "background": "#fff",
    "color": "#acb3c2",
    "content": "attr(data-content)",
    "display": "inline-block",
    "fontSize": ".7rem",
    "padding": "0 .4rem",
    "transform": "translateY(-.65rem)"
});
cssRule('.divider', {
    "borderTop": ".05rem solid #e7e9ed",
    "height": ".05rem",
    "margin": ".4rem 0"
});
cssRule('.divider[data-content]', {
    "margin": ".8rem 0"
});
cssRule('.divider-vert', {
    "display": "block",
    "padding": ".8rem"
});
cssRule('.divider-vert::before', {
    "borderLeft": ".05rem solid #e7e9ed",
    "bottom": ".4rem",
    "content": "\"\"",
    "display": "block",
    "left": "50%",
    "position": "absolute",
    "top": ".4rem",
    "transform": "translateX(-50%)"
});
cssRule('.divider-vert[data-content]::after', {
    "left": "50%",
    "padding": ".2rem 0",
    "position": "absolute",
    "top": "50%",
    "transform": "translate(-50%,-50%)"
});
cssRule('.loading', {
    "color": "transparent!important",
    "minHeight": ".8rem",
    "pointerEvents": "none",
    "position": "relative"
});
cssRule('.loading::after', {
    "animation": "loading .5s infinite linear",
    "border": ".1rem solid #5755d9",
    "borderRadius": "50%",
    "borderRightColor": "transparent",
    "borderTopColor": "transparent",
    "content": "\"\"",
    "display": "block",
    "height": ".8rem",
    "left": "50%",
    "marginLeft": "-.4rem",
    "marginTop": "-.4rem",
    "position": "absolute",
    "top": "50%",
    "width": ".8rem",
    "zIndex": 1
});
cssRule('.loading.loading-lg', {
    "minHeight": "2rem"
});
cssRule('.loading.loading-lg::after', {
    "height": "1.6rem",
    "marginLeft": "-.8rem",
    "marginTop": "-.8rem",
    "width": "1.6rem"
});
cssRule('.clearfix::after,.container::after', {
    "clear": "both",
    "content": "\"\"",
    "display": "table"
});
cssRule('.float-left', {
    "float": "left"
});
cssRule('.float-right', {
    "float": "right"
});
cssRule('.relative', {
    "position": "relative"
});
cssRule('.absolute', {
    "position": "absolute"
});
cssRule('.fixed', {
    "position": "fixed"
});
cssRule('.centered', {
    "display": "block",
    "float": "none",
    "marginLeft": "auto",
    "marginRight": "auto"
});
cssRule('.flex-centered', {
    "alignItems": "center",
    "display": [
        "flex",
        "-ms-flexbox"
    ],
    "-ms-flex-align": "center",
    "-ms-flex-pack": "center",
    "justifyContent": "center"
});
cssRule('.m-0', {
    "margin": 0
});
cssRule('.mb-0', {
    "marginBottom": 0
});
cssRule('.ml-0', {
    "marginLeft": 0
});
cssRule('.mr-0', {
    "marginRight": 0
});
cssRule('.mt-0', {
    "marginTop": 0
});
cssRule('.mx-0', {
    "marginLeft": 0,
    "marginRight": 0
});
cssRule('.my-0', {
    "marginBottom": 0,
    "marginTop": 0
});
cssRule('.m-1', {
    "margin": ".2rem"
});
cssRule('.mb-1', {
    "marginBottom": ".2rem"
});
cssRule('.ml-1', {
    "marginLeft": ".2rem"
});
cssRule('.mr-1', {
    "marginRight": ".2rem"
});
cssRule('.mt-1', {
    "marginTop": ".2rem"
});
cssRule('.mx-1', {
    "marginLeft": ".2rem",
    "marginRight": ".2rem"
});
cssRule('.my-1', {
    "marginBottom": ".2rem",
    "marginTop": ".2rem"
});
cssRule('.m-2', {
    "margin": ".4rem"
});
cssRule('.mb-2', {
    "marginBottom": ".4rem"
});
cssRule('.ml-2', {
    "marginLeft": ".4rem"
});
cssRule('.mr-2', {
    "marginRight": ".4rem"
});
cssRule('.mt-2', {
    "marginTop": ".4rem"
});
cssRule('.mx-2', {
    "marginLeft": ".4rem",
    "marginRight": ".4rem"
});
cssRule('.my-2', {
    "marginBottom": ".4rem",
    "marginTop": ".4rem"
});
cssRule('.p-0', {
    "padding": 0
});
cssRule('.pb-0', {
    "paddingBottom": 0
});
cssRule('.pl-0', {
    "paddingLeft": 0
});
cssRule('.pr-0', {
    "paddingRight": 0
});
cssRule('.pt-0', {
    "paddingTop": 0
});
cssRule('.px-0', {
    "paddingLeft": 0,
    "paddingRight": 0
});
cssRule('.py-0', {
    "paddingBottom": 0,
    "paddingTop": 0
});
cssRule('.p-1', {
    "padding": ".2rem"
});
cssRule('.pb-1', {
    "paddingBottom": ".2rem"
});
cssRule('.pl-1', {
    "paddingLeft": ".2rem"
});
cssRule('.pr-1', {
    "paddingRight": ".2rem"
});
cssRule('.pt-1', {
    "paddingTop": ".2rem"
});
cssRule('.px-1', {
    "paddingLeft": ".2rem",
    "paddingRight": ".2rem"
});
cssRule('.py-1', {
    "paddingBottom": ".2rem",
    "paddingTop": ".2rem"
});
cssRule('.p-2', {
    "padding": ".4rem"
});
cssRule('.pb-2', {
    "paddingBottom": ".4rem"
});
cssRule('.pl-2', {
    "paddingLeft": ".4rem"
});
cssRule('.pr-2', {
    "paddingRight": ".4rem"
});
cssRule('.pt-2', {
    "paddingTop": ".4rem"
});
cssRule('.px-2', {
    "paddingLeft": ".4rem",
    "paddingRight": ".4rem"
});
cssRule('.py-2', {
    "paddingBottom": ".4rem",
    "paddingTop": ".4rem"
});
cssRule('.rounded', {
    "borderRadius": ".1rem"
});
cssRule('.circle', {
    "borderRadius": "50%"
});
cssRule('.text-left', {
    "textAlign": "left"
});
cssRule('.text-right', {
    "textAlign": "right"
});
cssRule('.text-center', {
    "textAlign": "center"
});
cssRule('.text-justify', {
    "textAlign": "justify"
});
cssRule('.text-lowercase', {
    "textTransform": "lowercase"
});
cssRule('.text-uppercase', {
    "textTransform": "uppercase"
});
cssRule('.text-capitalize', {
    "textTransform": "capitalize"
});
cssRule('.text-normal', {
    "fontWeight": 400
});
cssRule('.text-bold', {
    "fontWeight": 700
});
cssRule('.text-italic', {
    "fontStyle": "italic"
});
cssRule('.text-large', {
    "fontSize": "1.2em"
});
cssRule('.text-ellipsis', {
    "overflow": "hidden",
    "textOverflow": "ellipsis",
    "whiteSpace": "nowrap"
});
cssRule('.text-clip', {
    "overflow": "hidden",
    "textOverflow": "clip",
    "whiteSpace": "nowrap"
});
cssRule('.text-break', {
    "-webkit-hyphens": "auto",
    "-ms-hyphens": "auto",
    "hyphens": "auto",
    "wordBreak": "break-word",
    "wordWrap": "break-word"
});
cssRule('@media (max-width:1280px)', {
    "$nest": {
        ".col-xl-1,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9": {
            "-ms-flex": "none",
            "flex": "none"
        },
        ".col-xl-12": {
            "width": "100%"
        },
        ".col-xl-11": {
            "width": "91.66666667%"
        },
        ".col-xl-10": {
            "width": "83.33333333%"
        },
        ".col-xl-9": {
            "width": "75%"
        },
        ".col-xl-8": {
            "width": "66.66666667%"
        },
        ".col-xl-7": {
            "width": "58.33333333%"
        },
        ".col-xl-6": {
            "width": "50%"
        },
        ".col-xl-5": {
            "width": "41.66666667%"
        },
        ".col-xl-4": {
            "width": "33.33333333%"
        },
        ".col-xl-3": {
            "width": "25%"
        },
        ".col-xl-2": {
            "width": "16.66666667%"
        },
        ".col-xl-1": {
            "width": "8.33333333%"
        },
        ".hide-xl": {
            "display": "none"
        },
        ".show-xl": {
            "display": "block"
        }
    }
});
cssRule('@media (max-width:960px)', {
    "$nest": {
        ".col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9": {
            "-ms-flex": "none",
            "flex": "none"
        },
        ".col-lg-12": {
            "width": "100%"
        },
        ".col-lg-11": {
            "width": "91.66666667%"
        },
        ".col-lg-10": {
            "width": "83.33333333%"
        },
        ".col-lg-9": {
            "width": "75%"
        },
        ".col-lg-8": {
            "width": "66.66666667%"
        },
        ".col-lg-7": {
            "width": "58.33333333%"
        },
        ".col-lg-6": {
            "width": "50%"
        },
        ".col-lg-5": {
            "width": "41.66666667%"
        },
        ".col-lg-4": {
            "width": "33.33333333%"
        },
        ".col-lg-3": {
            "width": "25%"
        },
        ".col-lg-2": {
            "width": "16.66666667%"
        },
        ".col-lg-1": {
            "width": "8.33333333%"
        },
        ".hide-lg": {
            "display": "none"
        },
        ".show-lg": {
            "display": "block"
        }
    }
});
cssRule('@media (max-width:840px)', {
    "$nest": {
        ".col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9": {
            "-ms-flex": "none",
            "flex": "none"
        },
        ".col-md-12": {
            "width": "100%"
        },
        ".col-md-11": {
            "width": "91.66666667%"
        },
        ".col-md-10": {
            "width": "83.33333333%"
        },
        ".col-md-9": {
            "width": "75%"
        },
        ".col-md-8": {
            "width": "66.66666667%"
        },
        ".col-md-7": {
            "width": "58.33333333%"
        },
        ".col-md-6": {
            "width": "50%"
        },
        ".col-md-5": {
            "width": "41.66666667%"
        },
        ".col-md-4": {
            "width": "33.33333333%"
        },
        ".col-md-3": {
            "width": "25%"
        },
        ".col-md-2": {
            "width": "16.66666667%"
        },
        ".col-md-1": {
            "width": "8.33333333%"
        },
        ".hide-md": {
            "display": "none"
        },
        ".show-md": {
            "display": "block"
        }
    }
});
cssRule('@media (max-width:600px)', {
    "$nest": {
        ".col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9": {
            "-ms-flex": "none",
            "flex": "none"
        },
        ".col-sm-12": {
            "width": "100%"
        },
        ".col-sm-11": {
            "width": "91.66666667%"
        },
        ".col-sm-10": {
            "width": "83.33333333%"
        },
        ".col-sm-9": {
            "width": "75%"
        },
        ".col-sm-8": {
            "width": "66.66666667%"
        },
        ".col-sm-7": {
            "width": "58.33333333%"
        },
        ".col-sm-6": {
            "width": "50%"
        },
        ".col-sm-5": {
            "width": "41.66666667%"
        },
        ".col-sm-4": {
            "width": "33.33333333%"
        },
        ".col-sm-3": {
            "width": "25%"
        },
        ".col-sm-2": {
            "width": "16.66666667%"
        },
        ".col-sm-1": {
            "width": "8.33333333%"
        },
        ".hide-sm": {
            "display": "none"
        },
        ".show-sm": {
            "display": "block"
        }
    }
});
cssRule('@media (max-width:480px)', {
    "$nest": {
        ".col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9": {
            "-ms-flex": "none",
            "flex": "none"
        },
        ".col-xs-12": {
            "width": "100%"
        },
        ".col-xs-11": {
            "width": "91.66666667%"
        },
        ".col-xs-10": {
            "width": "83.33333333%"
        },
        ".col-xs-9": {
            "width": "75%"
        },
        ".col-xs-8": {
            "width": "66.66666667%"
        },
        ".col-xs-7": {
            "width": "58.33333333%"
        },
        ".col-xs-6": {
            "width": "50%"
        },
        ".col-xs-5": {
            "width": "41.66666667%"
        },
        ".col-xs-4": {
            "width": "33.33333333%"
        },
        ".col-xs-3": {
            "width": "25%"
        },
        ".col-xs-2": {
            "width": "16.66666667%"
        },
        ".col-xs-1": {
            "width": "8.33333333%"
        },
        ".hide-xs": {
            "display": "none"
        },
        ".show-xs": {
            "display": "block"
        }
    }
});
cssRule('@keyframes loading', {
    "$nest": {
        "0%": {
            "transform": "rotate(0)"
        },
        "100%": {
            "transform": "rotate(360deg)"
        }
    }
});
cssRule('@keyframes slide-down', {
    "$nest": {
        "0%": {
            "opacity": 0,
            "transform": "translateY(-1.6rem)"
        },
        "100%": {
            "opacity": 1,
            "transform": "translateY(0)"
        }
    }
});


