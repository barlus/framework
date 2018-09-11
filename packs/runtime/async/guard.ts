export class AsyncGuard<P = void> {
  private block() {
    //console.info("NEW PROMISE")
    this.promise = new Promise<P>((resolve, reject) => {
      this.resolve = resolve;
    });
  }
  //If the guard is already unlocked it will stay unlocked
  async wait() {
    return this.promise;
  }

  //If the guard is already unlocked it would lock itself after this call
  async lock() {
    let promise = this.wait();
    if (!this.locked) {
      this.block();
    }
    return promise;
  }

  //Will unlock all pending locks, if there is no pending locks then the guard would get to unlocked state if the optimistic flag is set
  unlock(payload?: P, optimistic: boolean = true) {
    if (!this.resolve) {
      if (!optimistic) {
        return; //do not create resolved promise, skip the unlock routine
      }
      this.block();
    }
    this.resolve(payload);
    this.resolve = null;
  }

  get locked() {
    return !!this.resolve;
  }

  constructor() {
    this.block();
  }

  private promise: Promise<P> = null;
  private resolve: (t: P) => void = null;
}