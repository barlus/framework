export type LocationKey = string;
export type LocationState = any;
export type Path = string;
export type Pathname = string;
export type Search = string;
export type Hash = string;
export type Href = string;
export type Action = 'PUSH' | 'POP' | 'REPLACE';
export interface Location {
    pathname: Pathname;
    search: Search;
    state: LocationState;
    hash: Hash;
    key?: LocationKey;
}
export interface LocationDescriptorObject {
    pathname?: Pathname;
    search?: Search;
    state?: LocationState;
    hash?: Hash;
    key?: LocationKey;
}
export interface History {
    length: number;
    action: Action;
    location: Location;
    push(path: Path, state?: LocationState): void;
    push(location: LocationDescriptorObject): void;
    replace(path: Path, state?: LocationState): void;
    replace(location: LocationDescriptorObject): void;
    go(n: number): void;
    goBack(): void;
    goForward(): void;
    block(prompt?: boolean | string | TransitionPromptHook): UnregisterCallback;
    listen(listener: LocationListener): UnregisterCallback;
    createHref(location: LocationDescriptorObject): Href;
}
export type UnregisterCallback = () => void;
export type TransitionPromptHook = (location: Location, action: Action) => string | false | void;
export type LocationListener = (location: Location, action: Action) => void;