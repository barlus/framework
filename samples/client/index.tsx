import "@barlus/runtime"
import * as React from "@barlus/nerv"
//import * as Dev from "@barlus/nerv/devtools"
// import { Provider } from '@barlus/storex';
// import { RoutesStore } from './stores';
import { DocApp } from './comps/DocPage';

import { DocTypography } from './docs/elements/DocTypography';
import { DocTables } from './docs/elements/DocTables';
import { DocButtons } from './docs/elements/DocButtons';
import { DocForms } from './docs/elements/DocForms';
import { DocTags } from './docs/elements/DocTags';
import { DocMedia } from './docs/elements/DocMedia';
import { DocIcons } from './docs/elements/DocIcons';

import { DocGrid } from './docs/layout/DocGrid';
import { DocResponsive } from './docs/layout/DocResponsive';
import { DocNavbar } from './docs/layout/DocNavbar';

import { DocAccordions } from './docs/components/DocAccordions';
import { DocAvatars } from './docs/components/DocAvatars';
import { DocBadges } from './docs/components/DocBadges';
import { DocBars } from './docs/components/DocBars';
import { DocBreadcrumbs } from './docs/components/DocBreadcrumbs';
import { DocCards } from './docs/components/DocCards';
import { DocChips } from './docs/components/DocChips';
import { DocCodes } from './docs/components/DocCodes';
import { DocEmpty } from './docs/components/DocEmpty';
import { DocMenus } from './docs/components/DocMenus';
import { DocModals } from './docs/components/DocModals';
import { DocNavs } from './docs/components/DocNavs';
import { DocPagination } from './docs/components/DocPagination';
import { DocPanels } from './docs/components/DocPanels';
import { DocPopovers } from './docs/components/DocPopovers';
import { DocSteps } from './docs/components/DocSteps';
import { DocTabs } from './docs/components/DocTabs';
import { DocTiles } from './docs/components/DocTiles';
import { DocToasts } from './docs/components/DocToasts';
import { DocTooltips } from './docs/components/DocTooltips';

import { DocColors } from './docs/utilities/DocColors';
import { DocCursors } from './docs/utilities/DocCursors';
import { DocDisplay } from './docs/utilities/DocDisplay';
import { DocDivider } from './docs/utilities/DocDividers';
import { DocLoading } from './docs/utilities/DocLoading';
import { DocPosition } from './docs/utilities/DocPosition';
import { DocShape } from './docs/utilities/DocShape';
import { DocText } from './docs/utilities/DocText';

import { DocAutocomplete } from './docs/experimental/DocAutocomplete';
import { DocCalendars } from './docs/experimental/DocCalendars';
import { DocCarousels } from './docs/experimental/DocCarousels';
import { DocComparison } from './docs/experimental/DocComparison';
import { DocFilters } from './docs/experimental/DocFilters';
import { DocMeters } from './docs/experimental/DocMeters';
import { DocSideview } from './docs/experimental/DocSideview';
import { DocParallax } from './docs/experimental/DocParallax';
import { DocProgress } from './docs/experimental/DocProgress';
import { DocSliders } from './docs/experimental/DocSliders';
import { DocTimelines } from './docs/experimental/DocTimelines';



//import "./styles";

const DOCS = {
    ELEMENTS: {
        DocTypography,
        DocTables,
        DocButtons,
        DocForms,
        DocIcons,
        DocTags,
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
//const routerStore = new RoutesStore(DOCS);
//Dev.initDevTools();
React.render(
    <DocApp docs={DOCS}/>,
    document.getElementById('root')
);
