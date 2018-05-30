import * as React from '@barlus/nerv';
import { RouterState, RouterStore } from '../router-store';
import { routerStateToUrl } from '../adapters/generate-url';

function isLeftClickEvent(event: MouseEvent) {
    return event.button === 0;
}

function isModifiedEvent(event: MouseEvent) {
    return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export interface LinkProps {
    routerStore: RouterStore;
    toState: RouterState;
    className?: string;
    activeClassName?: string;
}

/**
 * Creates an anchor tag that links to a router state. Redirects to the target
 * state without reloading the entire app, thus avoiding potential flickers.
 *
 * Example:
 *     const home = new RouterState('home');
 *     ...
 *     <link routerStore={routerStore} toState={home}>
 *         Home
 *     </link>
 *
 * link accepts `className` and `activeClassName` as optional
 * properties. `className` is always applied to the anchor tag.
 * `activeClassName` is applied in addition if the current `routerState`
 * matches the state specified by the `link`. This feature is
 * useful for highlighting the active link in a navbar.
 *
 * @see RouterLink for simpler way to create anchor tags.
 */
export class Link extends React.Component<LinkProps, {}> {
    render() {
        const {
            routerStore,
            toState,
            className,
            activeClassName,
            children
        } = this.props;

        const isActive = routerStore.routerState.isEqual(toState);
        const joinedClassName =
            (className ? className : '') +
            (isActive && activeClassName ? ' ' + activeClassName : '');

        return (
            <a
                className={joinedClassName}
                href={routerStateToUrl(routerStore, toState)}
                onClick={this.handleClick}
            >
                {children}
            </a>
        );
    }

    handleClick = (event: MouseEvent) => {
        // Ignore if link is clicked using a modifier key or not left-clicked
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return undefined;
        }

        // Prevent default action which reloads the app
        event.preventDefault();

        // Change the router state to trigger a refresh
        const { routerStore, toState } = this.props;
        return routerStore.goTo(toState);
    };
}
