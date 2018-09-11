import {TransitionManager}                  from "./TransitionManager";
import {Location, LocationDescriptorObject} from "./Location";
import {History, HistoryProps}              from "./History";


export class MemoryHistory extends History {
  public length: number;
  public location: Location;
  public index: number;
  private initialEntries: any[];
  private initialIndex: number;
  private keyLength: number;
  private entries: any[];

  constructor(props: Partial<HistoryProps> = {}) {
    super();
    this.getUserConfirmation = props.getUserConfirmation;
    this.transitionManager = new TransitionManager();
    this.keyLength = 6;
    this.initialIndex = 0;
    this.initialEntries = [ '/' ];
    this.index = MemoryHistory.clamp(this.initialIndex, 0, this.initialEntries.length - 1);
    this.entries = this.initialEntries.map(
      entry =>
        typeof entry === "string"
          ? new Location(entry, undefined, this.createKey())
          : new Location(entry, undefined, entry.key || this.createKey())
    );
    this.location = this.entries[ this.index ];
    this.length = this.entries.length;
  }

  private createKey(): string {
    return Math.random()
      .toString(36)
      .substr(2, this.keyLength);
  }

  static clamp(n, lowerBound, upperBound) {
    return Math.min(Math.max(n, lowerBound), upperBound);
  }

  protected checkDOMListeners() {
  }

  private setState(nextState?) {
    Object.assign(this, nextState);
    this.length = this.entries.length;
    this.transitionManager.notifyListeners(this.location, this.action);
  }

  public createHref(location: LocationDescriptorObject): string {
    return Location.createPath(location);
  }

  public async push(path, state?) {
    console.warn(
      !(
        typeof path === "object" &&
        path.state !== undefined &&
        state !== undefined
      ),
      "You should avoid providing a 2nd state argument to push when the 1st " +
      "argument is a location-like object that already has state; it is ignored"
    );
    const action = "PUSH";
    const location = new Location(path, state, this.createKey(), this.location);
    const confirmed = await this.transitionManager.confirmTransitionTo(location, action, this.getUserConfirmation);
    if (confirmed) {
      const prevIndex = this.index;
      const nextIndex = prevIndex + 1;

      const nextEntries = this.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(
          nextIndex,
          nextEntries.length - nextIndex,
          location
        );
      } else {
        nextEntries.push(location);
      }

      this.setState({
        action,
        location,
        index: nextIndex,
        entries: nextEntries
      });
    }

  }

  public async replace(path, state?) {
    console.warn(
      !(
        typeof path === "object" &&
        path.state !== undefined &&
        state !== undefined
      ),
      "You should avoid providing a 2nd state argument to replace when the 1st " +
      "argument is a location-like object that already has state; it is ignored"
    );

    const action = "REPLACE";
    const location = new Location(path, state, this.createKey(), this.location);
    const confirmed = await this.transitionManager.confirmTransitionTo(location, action, this.getUserConfirmation);
    if (confirmed) {
      this.entries[ this.index ] = location;

      this.setState({ action, location });
    }
  }

  public async go(n) {
    const nextIndex = MemoryHistory.clamp(this.index + n, 0, this.entries.length - 1);

    const action = "POP";
    const location = this.entries[ nextIndex ];
    const confirmed = await this.transitionManager.confirmTransitionTo(location, action, this.getUserConfirmation);
    if (confirmed) {
      this.setState({
        action,
        location,
        index: nextIndex
      });
    } else {
      // Mimic the behavior of DOM histories by
      // causing a render after a cancelled POP.
      this.setState();
    }
  }

  public canGo(n) {
    const nextIndex = this.index + n;
    return nextIndex >= 0 && nextIndex < this.entries.length;
  };

}