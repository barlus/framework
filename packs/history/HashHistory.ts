import {TransitionManager} from "./TransitionManager";
import {Location} from "./Location";
import {History, HistoryProps} from "./History";

export class HashHistory extends History{
    private hashType: string;
    private basename: string;
    private allPaths: string[];
    private listenerCount: number = 0;
    private forceNextPop: boolean = false;
    private ignorePath: null | string = null;

    static globalHistory = window.history;
    static hashChangeEvent = "hashchange";
    static hashPathCoders = {
        hashbang: {
            encodePath: path =>
                path.charAt(0) === "!" ? path : "!/" + Location.stripLeadingSlash(path),
            decodePath: path => (path.charAt(0) === "!" ? path.substr(1) : path)
        },
        noslash: {
            encodePath: Location.stripLeadingSlash,
            decodePath: Location.addLeadingSlash
        },
        slash: {
            encodePath: Location.addLeadingSlash,
            decodePath: Location.addLeadingSlash
        }
    };

    constructor(props:Partial<HistoryProps>={}) {
        super();
        this.getUserConfirmation = props.getUserConfirmation;
        this.hashType = props.hashType || "slash";
        this.basename = props.basename ? Location.stripTrailingSlash(Location.addLeadingSlash(props.basename)) : "";
        this.transitionManager = new TransitionManager();
        this.location = this.DOMLocation;
        this.length = window.history.length;
        this.allPaths = [Location.createPath(this.DOMLocation)];
        this.handleHashChange = this.handleHashChange.bind(this);
        const path = HashHistory.hashPath;
        const encodedPath = this.encodePath(path);
        if (path !== encodedPath) {
            HashHistory.replaceHashPath(encodedPath);
        }
    }

    static replaceHashPath(path) {
        const hashIndex = window.location.href.indexOf("#");
        window.location.replace(
            window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + "#" + path
        );
    }

    static pushHashPath(path) {
        window.location.hash = path;
    }

    static get hashPath() {
        // We can't use window.location.hash here because it's not
        // consistent across browsers - Firefox will pre-decode it!
        const href = window.location.href;
        const hashIndex = href.indexOf("#");
        return hashIndex === -1 ? "" : href.substring(hashIndex + 1);
    }

    private get encoder() {
        //add cache
        return HashHistory.hashPathCoders[this.hashType].encodePath;
    }

    private get decoder() {
        //add cache
        return HashHistory.hashPathCoders[this.hashType].decodePath;
    }

    private get DOMLocation() {
        let path = this.decodePath(HashHistory.hashPath);
        if (!(!this.basename || Location.hasBasename(path, this.basename))) {
            console.warn(
                !this.basename || Location.hasBasename(path, this.basename),
                "You are attempting to use a basename on a page whose URL path does not begin " +
                'with the basename. Expected path "' +
                path +
                '" to begin with "' +
                this.basename +
                '".'
            );
        }
        if (this.basename) {
            path = Location.stripBasename(path, this.basename);
        }
        return new Location(path);
    }

    private encodePath(path: string) {
        return this.encoder(path)
    }

    private decodePath(path: string) {
        return this.decoder(path)
    }

    private setState(nextState?) {
        Object.assign(this, nextState);
        this.length = HashHistory.globalHistory.length;
        this.transitionManager.notifyListeners(this.location, this.action);
    }

    private async handlePop(location: Location) {
        if (this.forceNextPop) {
            this.forceNextPop = false;
            this.setState();
        } else {
            const action = "POP";
            const confirmed = await this.transitionManager.confirmTransitionTo(location,action,this.getUserConfirmation);
            if(confirmed){
                this.setState({action, location})
            }else{
                this.revertPop(location);
            }
        }
    }

    private revertPop(fromLocation: Location) {
        const toLocation = this.location;
        // TODO: We could probably make this more reliable by
        // keeping a list of paths we've seen in sessionStorage.
        // Instead, we just default to 0 for paths we don't know.

        let toIndex = this.allPaths.lastIndexOf(Location.createPath(toLocation));

        if (toIndex === -1) {
            toIndex = 0;
        }

        let fromIndex = this.allPaths.lastIndexOf(Location.createPath(fromLocation));

        if (fromIndex === -1) {
            fromIndex = 0;
        }

        let delta = toIndex - fromIndex;
        if (delta) {
            this.forceNextPop = true;
            this.go(delta);
        }
    }

    private handleHashChange (){
        const path = HashHistory.hashPath;
        const encodedPath = this.encodePath(path);

        if (path !== encodedPath) {
            // Ensure we always have a properly-encoded hash.
            HashHistory.replaceHashPath(encodedPath);
        } else {
            const location = this.DOMLocation;
            const prevLocation = this.location;

            if (!this.forceNextPop && Location.areEqual(prevLocation, location)) {
                return;
            } // A hashchange doesn't always == location change.

            if (this.ignorePath === Location.createPath(location)) {
                return;
            } // Ignore this change; we already setState in push/replace.

            this.ignorePath = null;

            this.handlePop(location);
        }
    };

    protected checkDOMListeners(delta:number):void {
        this.listenerCount += delta;
        if (this.listenerCount === 1) {
            window.addEventListener(HashHistory.hashChangeEvent, this.handleHashChange);
        } else if (this.listenerCount === 0) {
            window.removeEventListener(HashHistory.hashChangeEvent, this.handleHashChange);
        }
    }

    public createHref(location: Location): string {
        return "#" + this.encodePath(this.basename + Location.createPath(location));
    }

    public async push(path, state?) {
        console.warn(
            state === undefined,
            "Hash history cannot push state; it is ignored"
        );
        const action = "PUSH";
        const location = new Location(
            path,
            undefined,
            undefined,
            this.location
        );
        const confirmed = await this.transitionManager.confirmTransitionTo(location,action,this.getUserConfirmation);
        if(confirmed){
            const path = Location.createPath(location);
            const encodedPath = this.encodePath(this.basename + path);
            const hashChanged = HashHistory.hashPath !== encodedPath;

            if (hashChanged) {
                // We cannot tell if a hashchange was caused by a PUSH, so we'd
                // rather setState here and ignore the hashchange. The caveat here
                // is that other hash histories in the page will consider it a POP.
                this.ignorePath = path;
                HashHistory.pushHashPath(encodedPath);

                const prevIndex = this.allPaths.lastIndexOf(Location.createPath(this.location));
                const nextPaths = this.allPaths.slice(
                    0,
                    prevIndex === -1 ? 0 : prevIndex + 1
                );

                nextPaths.push(path);
                this.allPaths = nextPaths;

                this.setState({action, location});
            } else {
                console.warn(
                    false,
                    "Hash history cannot PUSH the same path; a new entry will not be added to the history stack"
                );
                this.setState();
            }
        }

    }

    public async replace(path, state?) {
        console.warn(
            state === undefined,
            "Hash history cannot replace state; it is ignored"
        );

        const action = "REPLACE";
        const location = new Location(
            path,
            undefined,
            undefined,
            this.location
        );
        const confirmed = await this.transitionManager.confirmTransitionTo(location,action,this.getUserConfirmation);
        if(confirmed){
            const path = Location.createPath(location);
            const encodedPath = this.encodePath(this.basename + path);
            const hashChanged = HashHistory.hashPath !== encodedPath;

            if (hashChanged) {
                // We cannot tell if a hashchange was caused by a REPLACE, so we'd
                // rather setState here and ignore the hashchange. The caveat here
                // is that other hash histories in the page will consider it a POP.
                this.ignorePath = path;
                HashHistory.replaceHashPath(encodedPath);
            }

            const prevIndex = this.allPaths.indexOf(Location.createPath(this.location));

            if (prevIndex !== -1) {
                this.allPaths[prevIndex] = path;
            }

            this.setState({action, location});
        }
    }

    public go(n) {
        HashHistory.globalHistory.go(n);
    }
}