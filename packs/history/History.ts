import {Location,LocationState, LocationDescriptorObject, Path, Href} from "./Location";
import {TransitionManager} from "./TransitionManager";
export type Action = 'PUSH' | 'POP' | 'REPLACE';
export type UnregisterCallback = () => void;
export type TransitionPromptHook = (location: Location, action: Action) => string | false | void;
export type LocationListener = (location: Location, action: Action) => void;
export type UserConfirmation = (message:string) => Promise<boolean>;
export interface HistoryProps {
    forceRefresh: boolean,
    getUserConfirmation: UserConfirmation,
    keyLength: number,
    basename: string,
    hashType: string,
}
export abstract class History{
    public length: number;
    public action: Action;
    public location: Location;

    protected getUserConfirmation: UserConfirmation;
    protected transitionManager:TransitionManager;
    protected isBlocked:boolean;
    protected abstract checkDOMListeners(delta:number):void;

    constructor(props: Partial<HistoryProps> = {}){}
    public goBack():void {
        return this.go(-1);
    }
    public goForward():void {
        return this.go(1);
    }
    public block(prompt: boolean | string | TransitionPromptHook = false):UnregisterCallback {
        const unblock = this.transitionManager.setPrompt(prompt);
        if (!this.isBlocked) {
            this.checkDOMListeners(1);
            this.isBlocked = true;
        }
        return () => {
            if (this.isBlocked) {
                this.isBlocked = false;
                this.checkDOMListeners(-1);
            }
            return unblock();
        };
    }
    public listen(listener: LocationListener): UnregisterCallback {
        const unListen = this.transitionManager.appendListener(listener);
        this.checkDOMListeners(1);
        return () => {
            this.checkDOMListeners(-1);
            unListen();
        };
    }

    public abstract push(path: Path, state?: LocationState): void;

    public abstract push(location: LocationDescriptorObject): void;

    public abstract replace(path: Path, state?: LocationState): void;

    public abstract replace(location: LocationDescriptorObject): void;

    public abstract go(n: number): void;

    public abstract createHref(location: LocationDescriptorObject): Href;

}