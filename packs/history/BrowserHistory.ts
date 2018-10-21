import {TransitionManager}                  from "./TransitionManager";
import {Location, LocationDescriptorObject} from "./Location";
import {History, HistoryProps}              from "./History";


export class BrowserHistory extends History {
  private basename: string;
  private allKeys: string[];
  private forceRefresh: boolean;
  private listenerCount: number = 0;
  private keyLength: number;
  private forceNextPop: boolean = false;
  private ignorePath: null | string = null;

  static globalHistory = window.history;
  static popStateEvent = "popstate";

  constructor(props: Partial<HistoryProps> = {}) {
    super();
    this.getUserConfirmation = props.getUserConfirmation;
    this.keyLength = props.keyLength || 6;
    this.forceRefresh = props.forceRefresh || false;

    this.basename = props.basename ? Location.stripTrailingSlash(Location.addLeadingSlash(props.basename)) : "";
    this.transitionManager = new TransitionManager();

    this.location = this.getDomLocation(BrowserHistory.historyState);
    this.length = window.history.length;
    this.allKeys = [ this.location.key ];

    this.handleHashChange = this.handleHashChange.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
  }

  static get historyState() {
    try {
      return window.history.state || {};
    } catch (e) {
      // IE 11 sometimes throws when accessing window.history.state
      // See https://github.com/ReactTraining/history/pull/289
      return {};
    }
  }

  private createKey(): string {
    return Math.random()
      .toString(36)
      .substr(2, this.keyLength);
  }

  private setState(nextState?) {
    Object.assign(this, nextState);
    this.length = BrowserHistory.globalHistory.length;
    this.transitionManager.notifyListeners(this.location, this.action);
  }

  private getDomLocation(historyState) {
    const { key, state } = historyState || {} as any;
    const { pathname, search, hash } = window.location;

    let path = pathname + search + hash;

    if (!(!this.basename || Location.hasBasename(path, this.basename))) {
      console.warn(
        "You are attempting to use a basename on a page whose URL path does not begin " +
        'with the basename. Expected path "' +
        path +
        '" to begin with "' +
        this.basename +
        '".'
      )
    }

    if (this.basename) {
      path = Location.stripBasename(path, this.basename);
    }

    return new Location(path, state, key);
  }

  private handleHashChange() {
    this.handlePop(this.getDomLocation(BrowserHistory.historyState));
  };

  private handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (event.state === undefined && navigator.userAgent.indexOf("CriOS") === -1) {
      return;
    }
    this.handlePop(this.getDomLocation(event.state));
  }

  private async handlePop(location: Location) {
    if (this.forceNextPop) {
      this.forceNextPop = false;
      this.setState();
    } else {
      const action = "POP";
      const confirmed = await this.transitionManager.confirmTransitionTo(location, action, this.getUserConfirmation);
      if (confirmed) {
        this.setState({ action, location });
      } else {
        this.revertPop(location);
      }
    }
  }

  private revertPop(fromLocation: Location) {
    const toLocation = this.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    let toIndex = this.allKeys.indexOf(toLocation.key);

    if (toIndex === -1) {
      toIndex = 0;
    }

    let fromIndex = this.allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) {
      fromIndex = 0;
    }

    const delta = toIndex - fromIndex;

    if (delta) {
      this.forceNextPop = true;
      this.go(delta);
    }
  }

  protected checkDOMListeners(delta) {
    this.listenerCount += delta;
    if (this.listenerCount === 1) {
      window.addEventListener(BrowserHistory.popStateEvent, this.handlePopState);
    } else if (this.listenerCount === 0) {
      window.removeEventListener(BrowserHistory.popStateEvent, this.handlePopState);
    }
  }

  public createHref(location: LocationDescriptorObject): string {
    return this.basename + Location.createPath(location);
  }

  public async push(path, state?) {
    if (typeof path === "object" && path.state !== undefined && state !== undefined) {
      console.warn(
        "You should avoid providing a 2nd state argument to push when the 1st " +
        "argument is a location-like object that already has state; it is ignored"
      );
    }

    const action = "PUSH";
    const location = new Location(path, state, this.createKey(), this.location);
    const confirmed = await this.transitionManager.confirmTransitionTo(location, action, this.getUserConfirmation);
    if (confirmed) {
      const href = this.createHref(location);
      const { key, state } = location;

      BrowserHistory.globalHistory.pushState({ key, state }, null, href);

      if (this.forceRefresh) {
        window.location.href = href;
      } else {
        const prevIndex = this.allKeys.indexOf(this.location.key);
        const nextKeys = this.allKeys.slice(
          0,
          prevIndex === -1 ? 0 : prevIndex + 1
        );

        nextKeys.push(location.key);
        this.allKeys = nextKeys;

        this.setState({ action, location });
      }
    }
  }

  public async replace(path, state?) {
    if (typeof path === "object" && path.state !== undefined && state !== undefined) {
      console.warn(
        "You should avoid providing a 2nd state argument to replace when the 1st " +
        "argument is a location-like object that already has state; it is ignored"
      );
    }

    const action = "REPLACE";
    const location = new Location(path, state, this.createKey(), this.location);
    const confirmed = await this.transitionManager.confirmTransitionTo(location, action, this.getUserConfirmation);
    if (confirmed) {
      const href = this.createHref(location);
      const { key, state } = location;

      BrowserHistory.globalHistory.replaceState({ key, state }, null, href);

      if (this.forceRefresh) {
        window.location.replace(href);
      } else {
        const prevIndex = this.allKeys.indexOf(this.location.key);

        if (prevIndex !== -1) {
          this.allKeys[ prevIndex ] = location.key;
        }

        this.setState({ action, location });
      }
    }
  }

  public go(n) {
    BrowserHistory.globalHistory.go(n);
  }

}