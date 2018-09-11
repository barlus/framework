import {Action, UserConfirmation} from "./History";
import {Location}                 from "./Location";


export class TransitionManager {

  private prompt: any = null;

  private listeners: Function[] = [];

  public setPrompt(nextPrompt): Function {
    console.warn(this.prompt == null, "A history supports only one prompt at a time");
    this.prompt = nextPrompt;
    return () => {
      if (this.prompt === nextPrompt) {
        this.prompt = null;
      }
    };
  }

  public appendListener(fn: Function): Function {
    let isActive = true;
    const listener = (...args) => {
      if (isActive) {
        fn(...args);
      }
    };
    this.listeners.push(listener);
    return () => {
      isActive = false;
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  };

  public notifyListeners(...args): void {
    this.listeners.forEach(listener => listener(...args));
  };

  public async confirmTransitionTo(location: Location, action: Action, getUserConfirmation: UserConfirmation): Promise<boolean> {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (this.prompt != null) {
      const result = typeof this.prompt === "function" ? this.prompt(location, action) : this.prompt;
      if (typeof result === "string") {
        if (typeof getUserConfirmation === "function") {
          return await getUserConfirmation(result);
        } else {
          console.warn(false, "A history needs a getUserConfirmation function in order to use a prompt message");
          return true;
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        return (result !== false);
      }
    } else {
      return true;
    }
  }
}
