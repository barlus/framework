import "@barlus/runtime"
import * as React from "@barlus/nerv"
import * as Dev from "@barlus/nerv/devtools"
import { Provider } from '@barlus/storex';
import { RoutesStore } from './stores';
import { DocApp } from './comps/DocPage';
import { DocAccordions } from './docs/DocAccordions';
import { DocAutocomplete } from './docs/DocAutocomplete';
import { DocAvatars } from './docs/DocAvatars';
import { DocBadges } from './docs/DocBadges';
import { DocBars } from './docs/DocBars';
import { DocBreadcrumbs } from './docs/DocBreadcrumbs';
import { DocButtons } from './docs/DocButtons';
import { DocCalendars } from './docs/DocCalendars';
import { DocCards } from './docs/DocCards';
import { DocCarousels } from './docs/DocCarousels';
import { DocChips } from './docs/DocChips';
import { DocCodes } from './docs/DocCodes';
import { DocColors } from './docs/DocColors';
import { DocCursors } from './docs/DocCursors';
import { DocDisplay } from './docs/DocDisplay';
import { DocDivider } from './docs/DocDividers';
import { DocEmpty } from './docs/DocEmpty';
import { DocFilters } from './docs/DocFilters';
import { DocForms } from './docs/DocForms';
import { DocGrid } from './docs/DocGrid';
import { DocIcons } from './docs/DocIcons';
import { DocLabels } from './docs/DocLabels';
import { DocLoading } from './docs/DocLoading';
import { DocMedia } from './docs/DocMedia';
import { DocMenus } from './docs/DocMenus';
import { DocMeters } from './docs/DocMeters';
import { DocModals } from './docs/DocModals';
import { DocNavbar } from './docs/DocNavbar';
import { DocNavs } from './docs/DocNavs';
import { DocPagination } from './docs/DocPagination';
import { DocPanels } from './docs/DocPanels';
import { DocParallax } from './docs/DocParallax';
import { DocPopovers } from './docs/DocPopovers';
import { DocPosition } from './docs/DocPosition';
import { DocProgress } from './docs/DocProgress';
import { DocResponsive } from './docs/DocResponsive';
import { DocShape } from './docs/DocShape';
import { DocSideview } from './docs/DocSideview';
import { DocComparison } from './docs/DocComparison';
import { DocSliders } from './docs/DocSliders';
import { DocSteps } from './docs/DocSteps';
import { DocTabs } from './docs/DocTabs';
import { DocText } from './docs/DocText';
import { DocTiles } from './docs/DocTiles';
import { DocTimelines } from './docs/DocTimelines';
import { DocToasts } from './docs/DocToasts';
import { DocTooltips } from './docs/DocTooltips';
import { DocTypography } from "./docs/DocTypography";
import { DocTables } from "./docs/DocTables";
import "./styles";

const DOCS = {
    ELEMENTS: {
        DocTypography,
        DocTables,
        DocButtons,
        DocForms,
        DocIcons,
        DocLabels,
        DocMedia
    },
    LAYOUT: {
        DocGrid,
        DocResponsive,
        DocNavbar,
    },
    COMPONENTS: {
        DocAccordions,
        DocAvatars,
        DocBadges,
        DocBars,
        DocBreadcrumbs,
        DocCards,
        DocChips,
        DocCodes,
        DocEmpty,
        DocMenus,
        DocModals,
        DocNavs,
        DocPagination,
        DocPanels,
        DocPopovers,
        DocSteps,
        DocTabs,
        DocTiles,
        DocToasts,
        DocTooltips,
    },
    UTILITIES: {
        DocColors,
        DocCursors,
        DocDisplay,
        DocDivider,
        DocLoading,
        DocPosition,
        DocShape,
        DocText,
    },
    EXPERIMENTAL: {
        DocAutocomplete,
        DocCalendars,
        DocCarousels,
        DocComparison,
        DocFilters,
        DocMeters,
        DocSideview,
        DocParallax,
        DocProgress,
        DocSliders,
        DocTimelines,
    }
};
const routerStore = new RoutesStore(DOCS);
Dev.initDevTools();
React.render(
    <Provider router={routerStore}>
        <DocApp docs={DOCS}/>
    </Provider>,
    document.body
);
