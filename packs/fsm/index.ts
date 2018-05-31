import { signal, Signal } from "@barlus/runtime/decor/signal";
import { internal, Internal } from "@barlus/runtime/internal"
import { AsyncGuard } from "@barlus/runtime/async/guard"

type HistoryType = "Shallow" | "Deep";
type TransitionType = "Internal" | "External";
type StopReason = "Finished" | "Stopped" | "External" | "Interrupt"
type PseudoState<EventType> = Initial<EventType> | History<EventType>;
type Dictionary<T=any> = {
    [s: string]: T;
}

function isInitialState<E=any>(state: AbstractState<E>): state is Initial<E> { return state instanceof Initial }
function isHistoryState<E=any>(state: AbstractState<E>): state is History<E> { return state instanceof History }
function isFinalState<E=any>(state: AbstractState<E>): state is Final<E> { return state instanceof Final }
function isExclusiveState<E=any>(state: AbstractState<E>): state is State<E> { return state instanceof State }
function isParallelState<E=any>(state: AbstractState<E>): state is Parallel<E> { return state instanceof Parallel }

function isRealState<E=any>(state: AbstractState<E>): state is RealState<E> { return isFinalState(state) || isCompositeState(state) }
function isTargetState<E=any>(state: AbstractState<E>): state is TargetState<E> { return isRealState(state) || isHistoryState(state) }
function isCompositeState<E=any>(state: AbstractState<E>): state is CompositeState<E> { return isParallelState(state) || isExclusiveState(state) }

const SPECIAL: unique symbol = Symbol("Special");

interface EventCarrier<EventType> {
    event: EventType,
    [SPECIAL]?: any
}

const PARENT = Symbol("parent");
abstract class AbstractState<EventType> {
    get machine(): StateMachine<EventType> {
        let parent = this.parentState;
        while (parent) {
            if (parent instanceof StateMachine) {
                return parent;
            }
            parent = parent.parentState;
        }
        return null;
    }
    get parentState(): CompositeState<EventType> {
        return this[PARENT];
    }
    private [PARENT]: CompositeState<EventType>
}
class InitialPrivate<EventType, T = {}> extends Internal<T & Initial<EventType>>{
    transition: UnconditionalTransition<EventType, RealState<EventType>>;
}
export class Initial<EventType> extends AbstractState<EventType> {
    get parentState(): State<EventType> {
        let parent = super.parentState;
        if (isExclusiveState(parent)) {
            return parent;
        }
        return;
    }
    get transition(): UnconditionalTransition<EventType, RealState<EventType>> {
        return internal.of(this).transition;
    }
    set transition(transition: UnconditionalTransition<EventType, RealState<EventType>>) {
        if (internal.of(this).transition !== transition) {
            internal.of(this).transition = transition;
            transition[PARENT] = this;
            this.transitionChanged();
        }
    }
    constructor(target: RealState<EventType>) {
        super();
        this.transition = new UnconditionalTransition<EventType, RealState<EventType>>(target);
    }
    @signal transitionChanged: Signal<() => void>;
    @internal "#": InitialPrivate<EventType>
}
export type TargetState<EventType> = RealState<EventType> | History<EventType>

class HistoryPrivate<EventType> extends Internal<History<EventType>>{
    configuration: RealState<EventType>[];
    type: HistoryType = "Shallow";
    transition: UnconditionalTransition<EventType, RealState<EventType>>;
}
export class History<EventType> extends AbstractState<EventType> {
    get historyType(): HistoryType {
        return internal.of(this).type;
    }
    set historyType(type: HistoryType) {
        if (internal.of(this).type !== type) {
            internal.of(this).type = type;
            this.historyTypeChanged();
        }
    }
    get transition(): UnconditionalTransition<EventType, RealState<EventType>> {
        return internal.of(this).transition;
    }
    set transition(transition: UnconditionalTransition<EventType, RealState<EventType>>) {
        if (internal.of(this).transition !== transition) {
            internal.of(this).transition = transition;
            transition[PARENT] = this;
            this.transitionChanged();
        }
    }
    constructor(target: RealState<EventType>) {
        super()
        this.transition = new UnconditionalTransition<EventType, RealState<EventType>>(target);
    }

    @signal historyTypeChanged: Signal<() => void>;
    @signal transitionChanged: Signal<() => void>;
    @internal "#": HistoryPrivate<EventType>
}
class RealStatePrivate<EventType, T = {}> extends Internal<T & RealState<EventType>>{
    onEntry?(event?: EventCarrier<EventType>): Promise<EventType[] | void>;
    onExit?(event?: EventCarrier<EventType>): Promise<EventType[] | void>;
    options?: StateObserver<EventType>;
}
export interface StateObserver<EventType> {
    onEntry?(event?: EventType, carrier?: EventCarrier<EventType>): Promise<EventType[] | void>
    onExit?(event?: EventType, carrier?: EventCarrier<EventType>): Promise<EventType[] | void>
}
export abstract class RealState<EventType> extends AbstractState<EventType> {
    get index(): number {
        let parent = this.parentState
        if (!parent) {
            return -1;
        }
        return parent.childStates.indexOf(this);
    }
    get name(): string {
        let parent = this.parentState
        if (!parent) {
            return;
        }
        let it = internal.of(parent).childStates.entries();
        let result = it.next();
        while (!result.done) {
            if (result.value[1] == this) {
                return result.value[0]
            }
            result = it.next();
        }
    }

    protected async onEntry(event?: EventType, carrier?: EventCarrier<EventType>): Promise<EventType[] | void> {
        let that = internal.of(this);
        await this.entered(event)
        await this.activeChanged(true, event);

        let options = that.options;
        if (options && options.onEntry) {
            return options.onEntry.apply(this, [event, carrier]);
        }
    }
    protected async onExit(event?: EventType, carrier?: EventCarrier<EventType>): Promise<EventType[] | void> {
        await this.exited(event)
        let that = internal.of(this);
        this.activeChanged(false, event);

        let options = that.options;
        if (options && options.onExit) {
            return options.onExit.apply(this, [event, carrier]);
        }
    }
    constructor(options?: StateObserver<EventType>) {
        super()
        let that = internal.of(this);
        that.onEntry = carrier => this.onEntry(carrier.event, carrier);
        that.onExit = carrier => this.onExit(carrier.event, carrier);
        if (options) {
            that.options = options;
        }
    }
    @signal entered: Signal<(event: EventType) => void>;
    @signal exited: Signal<(event: EventType) => void>;
    @signal activeChanged: Signal<(active: boolean, event: EventType) => void>;
    @internal "#": RealStatePrivate<EventType>;
}
export class Final<EventType> extends RealState<EventType> {
    get parentState(): State<EventType> {
        let parent = super.parentState;
        if (isExclusiveState(parent)) {
            return parent;
        }
        return null;
    }
}

class CompositeStatePrivate<EventType, T = {}> extends RealStatePrivate<EventType, T & CompositeState<EventType>>{
    transitions: Transition<EventType>[] = [];
    historyStates: History<EventType>[] = [];
    childStates: Map<string, RealState<EventType>>;
}
export abstract class CompositeState<EventType> extends RealState<EventType> {
    addTransition(state: TargetState<EventType>, observer?: TransitionMatch<EventType> & TransitionObserver<EventType>): Transition<EventType>
    addTransition(transition: Transition<EventType>): void
    addTransition(target: any, observer?: any): Transition<EventType> | void {
        if (target instanceof Transition) {
            return this.addTransitionDirect(target);
        }
        else if (isTargetState(target)) {
            return this.addTransitionDefault(target, observer);
        }
        /*        else if (target instanceof Promise) {
                    let transition = new Transition<EventType, TargetState<EventType>>(null, observer);
                    target.then(state => {
                        transition.targetState = state;
                    })
                    this.addTransitionDirect(transition);
                    return transition;
                }
                else if (typeof target === "string") {
                    return this.addTransition(this.child(target));
                }
        */
        else {
            console.error(target, arguments);
            throw new Error("Incorrect target");
        }
    }
    private addTransitionDirect(transition: Transition<EventType>): void {
        for (let target of transition.targetStates) {
            if ((target.machine !== this.machine) && target.machine && this.machine) {
                console.warn("cannot add transition to a state in a different state machine");
                return;
            }
        }
        transition.sourceState = this;
        internal.of(this).transitions.push(transition);
    }
    private addTransitionDefault(target: TargetState<EventType>, observer?: TransitionMatch<EventType> & TransitionObserver<EventType>): Transition<EventType> {
        let transition = new Transition<EventType, TargetState<EventType>>(target, observer);
        this.addTransitionDirect(transition);
        return transition;
    }
    removeTransition(transition: Transition<EventType>): void {
        if (transition.sourceState !== this) {
            console.warn("transitions source state is different from this state");
            return;
        }
        delete transition[PARENT];
        let index = internal.of(this).transitions.indexOf(transition);
        if (index >= 0) {
            internal.of(this).transitions.splice(index, 1);
        }
    }
    get transitions(): Transition<EventType>[] {
        return internal.of(this).transitions
    }
    get historyStates(): History<EventType>[] {
        return internal.of(this).historyStates;
    }
    addHistory(history: History<EventType>): void {
        internal.of(this).historyStates.push(history);
        history[PARENT] = this;
    }

    // descendant(child: string, ...descendants: string[]): Promise<RealState<EventType>> {
    //     return this.child(child).then(state => {
    //         if (isCompositeState(state)) {
    //             if (descendants.length) {
    //                 return this.descendant(descendants.shift(), ...descendants);
    //             }
    //             return state;
    //         }
    //         else {
    //             this.references[child].reject();
    //         }
    //     });
    // }

    // child(name: string): Promise<RealState<EventType>> {
    //     let child = internal.of(this).childStates.get(name);
    //     if (child) {
    //         return Promise.resolve(child);
    //     }

    //     if (!this.references[name]) {
    //         this.references[name] = new AsyncDefer<RealState<EventType>>();
    //     }
    //     return this.references[name].promise;
    // }
    // private references: Dictionary<AsyncDefer<RealState<EventType>>> = {};

    protected addChild<S extends RealState<EventType>>(name: string, state: S): S {
        if (!internal.of(this).childStates) {
            internal.of(this).childStates = new Map<string, RealState<EventType>>()
        }
        internal.of(this).childStates.set(name, state);
        state[PARENT] = this;
        state["__name"] = name;
        /*  if (this.references[name]) {
              this.references[name].accept(state);
              delete this.references[name];
          }*/
        return state;
    }

    addState(name: string, state?: State<EventType> | StateObserver<EventType>): State<EventType> {
        if (state instanceof State) {
            return this.addChild(name, state);
        } else {
            return this.addChild(name, new State<EventType>(state));
        }
    }
    addParallel(name: string, state?: Parallel<EventType> | StateObserver<EventType>): Parallel<EventType> {
        if (state instanceof Parallel) {
            return this.addChild(name, state);
        } else {
            return this.addChild(name, new Parallel<EventType>(state));
        }
    }
    get childStates(): RealState<EventType>[] {
        if (internal.of(this).childStates) {
            return [...internal.of(this).childStates.values()];
        }
        return [];
    }
    @signal finished: Signal<(final: Final<EventType>) => void>;
    @internal "#": CompositeStatePrivate<EventType>;
}
export class Parallel<EventType> extends CompositeState<EventType> {
    get childStates(): CompositeState<EventType>[] {
        return super.childStates as CompositeState<EventType>[];
    }
}
class StatePrivate<EventType, T={}> extends CompositeStatePrivate<EventType, State<EventType> & T>{
    initial: Initial<EventType>;
}
export class State<EventType> extends CompositeState<EventType>{
    get initialState(): Initial<EventType> {
        if (!internal.of(this).initial) {
            let childStates = this.childStates;
            if (childStates.length) {
                //if initial state is empty then the child state is an initial state, addind default initial state
                this.initialState = new Initial(childStates[0]);
            }
        }
        return internal.of(this).initial;
    }
    set initialState(state: Initial<EventType>) {
        state[PARENT] = this;
        internal.of(this).initial = state;
        this.initialStateChanged();
    }
    set initialChild(state: RealState<EventType>) {
        if (!internal.of(this).initial) {
            this.initialState = new Initial(state);
        } else {
            internal.of(this).initial.transition.targetState = state;
        }
    }
    get initialChild(): RealState<EventType> {
        return this.initialState.transition.targetState;
    }
    addFinal(name: string, state?: Final<EventType> | StateObserver<EventType>): Final<EventType> {
        if (state instanceof Final) {
            return this.addChild(name, state);
        } else {
            return this.addChild(name, new Final<EventType>(state));
        }
    }
    @signal initialStateChanged: Signal<() => void>;
    @internal "#": StatePrivate<EventType>;
}
class Interpreter<EventType>{
    protected beginSelectTransitions(carrier: EventCarrier<EventType>): void { }
    protected endSelectTransitions(carrier: EventCarrier<EventType>): void { }
    protected beginMicrostep(carrier: EventCarrier<EventType>): void { }
    protected endMicrostep(carrier: EventCarrier<EventType>): void { }
    protected beginMacrostep(): void { }
    protected endMacrostep(): void { }
    protected noMicrostep(): void { }

    private async macrostep(): Promise<void> {
        while (this.running) {
            let carrier: EventCarrier<EventType> = { event: null };
            let enabledTransitions = await this.selectTransitions(carrier, true); //eventless
            if (enabledTransitions.length === 0) {
                if (this.internalEventQueue.length === 0) {
                    return;
                }
                carrier = this.internalEventQueue.shift();
                enabledTransitions = await this.selectTransitions(carrier, false);
            }
            if (enabledTransitions.length) {
                await this.microstep(carrier, enabledTransitions);
            }
        }
    }
    //https://www.w3.org/TR/scxml/#mainEventLoop
    private async run(): Promise<void> {
        await this.enterStates({ event: null }, [this.root.initialState.transition]);
        this.beginMacrostep();
        while (this.running) {
            await this.macrostep();

            if (!this.running) {
                break;
            }

            //invoke

            this.endMacrostep();
            let data = await Promise.race([this.externalEventIterator.next(), this.interrupt.wait()]);
            this.beginMacrostep();
            if (!data) {
                break;
            }
            //consider on-data as a cancel event
            if (data.done) {
                this.cancel("External");
                continue;
            }
            let carrier = { event: data.value };
            let enabledTransitions = await this.selectTransitions(carrier, false);
            if (enabledTransitions.length) {
                await this.microstep(carrier, enabledTransitions);
            }
            else {
                this.noMicrostep();
            }
        }
        this.endMacrostep();
        await this.exitInterpreter();
        this.stopper.unlock();
    }
    //https://www.w3.org/TR/scxml/#exitInterpreter
    private async exitInterpreter(): Promise<void> {
        let statesToExit = [...this.configuration];
        statesToExit.sort(this.stateExitCompare.bind(this));
        return this.leaveStates({ event: null }, statesToExit);
    }
    //https://www.w3.org/TR/scxml/#selectTransitions
    private async selectTransitions(carrier: EventCarrier<EventType>, eventless: boolean): Promise<Transition<EventType>[]> {
        this.beginSelectTransitions(carrier);
        let atomics = [...this.configuration].filter(this.isAtomic, this).sort(this.stateEntryCompare.bind(this));
        let enabledTransitions: Transition<EventType>[] = [];
        for (let state of atomics) {
            let lst = [...this.getProperAncestors(state, null)];
            if (isCompositeState(state)) {
                lst.unshift(state);
            }
            done:
            for (let s of lst) {
                for (let t of s.transitions) {
                    if (carrier[SPECIAL] && !t.isSpecial()) {
                        continue;
                    }
                    if (eventless) {
                        if (!t.isEventLess()) {
                            continue;
                        }
                    }
                    else {
                        if (!internal.of(t).events(carrier)) {
                            continue;
                        }
                    }

                    let decision = await Promise.race([internal.of(t).condition(carrier), this.interrupt.wait()]);
                    if (decision === undefined) {
                        break done;
                    }
                    if (decision) {
                        enabledTransitions.push(t);
                        break done;
                    }
                }
            }
        }
        enabledTransitions = this.removeConflictingTransitions(enabledTransitions);
        this.endSelectTransitions(carrier);
        return enabledTransitions;
    }
    //https://www.w3.org/TR/scxml/#removeConflictingTransitions
    private removeConflictingTransitions(enabledTransitions: Transition<EventType>[]): Transition<EventType>[] {
        let filteredTransitions: Transition<EventType>[] = [];
        enabledTransitions.sort(this.transitionStateEntryCompare.bind(this));

        for (let t1 of enabledTransitions) {
            let t1Preempted = false;
            let exitSetT1 = this.computeExitSet([t1]);
            let t2It = 0;
            while (t2It < filteredTransitions.length) {
                let t2 = filteredTransitions[t2It];
                if (t1 === t2) {
                    // Special case: someone added the same transition object to a state twice. In this
                    // case, t2 (which is already in the list) "preempts" t1.
                    t1Preempted = true;
                    break;
                }

                let exitSetT2 = this.computeExitSet([t1]);
                let intersection = [...exitSetT1].filter(x => exitSetT2.has(x));
                if (intersection.length === 0) {
                    // No conflict, no cry. Next patient please.
                    ++t2It;
                }
                else {
                    // Houston, we have a conflict. Check which transition can be removed.
                    if (t2.sourceState && this.isDescendant(t1.sourceState, t2.sourceState)) {
                        // t1 preempts t2, so we can remove t2
                        filteredTransitions.splice(t2It, 1);
                    } else {
                        // t2 preempts t1, so there's no use in looking further and we don't need to add
                        // t1 to the list.
                        t1Preempted = true;
                        break;
                    }
                }
            }
            if (!t1Preempted) {
                filteredTransitions.push(t1);
            }
        }

        return filteredTransitions;
    }
    //https://www.w3.org/TR/scxml/#microstep
    private async microstep(carrier: EventCarrier<EventType>, enabledTransitions: Transition<EventType>[]): Promise<void> {
        this.beginMicrostep(carrier);
        await this.exitStates(carrier, enabledTransitions);
        await this.executeTransitionsContent(carrier, enabledTransitions);
        await this.enterStates(carrier, enabledTransitions);
        this.endMicrostep(carrier);
    }
    //https://www.w3.org/TR/scxml/#exitStates
    private async exitStates(carrier: EventCarrier<EventType>, enabledTransitions: Transition<EventType>[]): Promise<void> {
        let statesToExitSet = this.computeExitSet(enabledTransitions);

        let statesToExit = [...statesToExitSet];
        statesToExit.sort(this.stateExitCompare.bind(this));
        for (let s of statesToExit) {
            if (isCompositeState(s)) {
                for (let h of s.historyStates) {
                    let ph = internal.of(h);
                    ph.configuration.length = 0;
                    for (let a of this.configuration) {
                        if (h.historyType === "Deep") {
                            if (this.isAtomic(a) && this.isDescendant(a, s)) {
                                ph.configuration.push(a);
                            }
                            else if (a.parentState === s) {
                                ph.configuration.push(a)
                            }
                        }
                    }
                }
            }
        }
        return this.leaveStates(carrier, statesToExit);
    }
    private async leaveStates(carrier: EventCarrier<EventType>, statesToExit: RealState<EventType>[]): Promise<void> {
        let wait: Promise<EventType[] | void>[] = [];
        for (let s of statesToExit) {
            this.configuration.delete(s);
            wait.push(internal.of(s).onExit(carrier));
        }
        let events = await Promise.race([Promise.all(wait), this.interrupt.wait()]);
        this.pushPotentialEvents(events);
        await this.stateChanged([...this.configuration]);
    }
    //https://www.w3.org/TR/scxml/#addAncestorStatesToEnter
    private addAncestorStatesToEnter(state: RealState<EventType>, ancestor: CompositeState<EventType>,
        statesToEnter: Set<RealState<EventType>>,
        statesForDefaultEntry: Set<State<EventType>>): void {
        for (let anc of this.getProperAncestors(state, ancestor)) {
            statesToEnter.add(anc);
            if (isParallelState(anc)) {
                for (let child of anc.childStates) {
                    if (isCompositeState(child) && !this.containsDecendantOf(statesToEnter, child)) {
                        this.addDescendantStatesToEnter(child, statesToEnter, statesForDefaultEntry);
                    }
                }
            }
        }
    }
    //https://www.w3.org/TR/scxml/#computeEntrySet
    private computeEntrySet(enabledTransitions: Transition<EventType>[],
        statesToEnter: Set<RealState<EventType>>,
        statesForDefaultEntry: Set<State<EventType>>): void {
        for (let t of enabledTransitions) {
            for (let s of t.targetStates) {
                this.addDescendantStatesToEnter(s, statesToEnter, statesForDefaultEntry)
            }
            let ancestor = this.getTransitionDomain(t);
            for (let s of this.getEffectiveTargetStates(t)) {
                this.addAncestorStatesToEnter(s, ancestor, statesForDefaultEntry, statesForDefaultEntry);
            }
        }
    }
    //https://www.w3.org/TR/scxml/#computeExitSet
    private computeExitSet(enabledTransitions: Transition<EventType>[]): Set<RealState<EventType>> {
        let statesToExit = new Set<RealState<EventType>>();
        for (let t of enabledTransitions) {
            if (t.targetStates.length) {
                let domain = this.getTransitionDomain(t);
                for (let s of this.configuration) {
                    if (this.isDescendant(s, domain)) {
                        statesToExit.add(s);
                    }
                }
            }
        }
        return statesToExit;
    }
    //https://www.w3.org/TR/scxml/#enterStates
    private async enterStates(carrier: EventCarrier<EventType>, enabledTransitions: Transition<EventType>[]): Promise<void> {
        let statesToEnter = new Set<RealState<EventType>>();
        let statesForDefaultEntry = new Set<State<EventType>>();

        this.computeEntrySet(enabledTransitions, statesToEnter, statesForDefaultEntry);
        let statesToEnterSorted = [...statesToEnter].sort(this.stateEntryCompare.bind(this));
        let wait: Promise<void | EventType[]>[] = [];
        for (let s of statesToEnterSorted) {
            this.configuration.add(s);
            if (isHistoryState(s)) {
                wait.push(this.executeTransitionContent(carrier, s.transition));
            }
            if (isRealState(s)) {
                wait.push(internal.of(s).onEntry(carrier));
            }
            if (isExclusiveState(s)) {
                if (statesForDefaultEntry.has(s)) {
                    wait.push(this.executeTransitionContent(carrier, s.initialState.transition))
                }
            }
            if (isFinalState(s)) {
                let parent = s.parentState;
                if (parent) {
                    if (parent !== this.root) {
                        await parent.finished(s);
                    }
                    let grandparent = parent.parentState;
                    if (grandparent && isParallelState(grandparent)) {
                        if (grandparent.childStates.every(this.isInFinalState, this)) {
                            await grandparent.finished(s);
                        }
                    }
                }
            }
        }

        let events = await Promise.race([Promise.all(wait), this.interrupt.wait()]);
        this.pushPotentialEvents(events);

        await this.stateChanged([...this.configuration]);

        for (let state of this.configuration) {
            if (isFinalState(state)) {
                if (state.parentState === this.root) {
                    await this.root.finished(state);
                    await this.cancel("Finished");
                    break;
                }
            }
        }
    }
    //https://www.w3.org/TR/scxml/#findLCCA
    private findLCA(states: RealState<EventType>[], onlyCompound: boolean = false): CompositeState<EventType> {
        if (states.length === 0) {
            return null;
        }
        let ancestors = this.getProperAncestors(states[0], this.root.parentState);
        for (let anc of ancestors) {
            if (onlyCompound && !this.isCompound(anc)) {
                continue;
            }
            let ok = true;
            for (let j = states.length - 1; (j > 0) && ok; --j) {
                if (!this.isDescendant(states[j], anc)) {
                    ok = false
                }
            }
            if (ok) {
                return anc;
            }
        }
        return null;
    }

    //https://www.w3.org/TR/scxml/#findLCCA
    private findLCCA(states: RealState<EventType>[]): CompositeState<EventType> {
        return this.findLCA(states, true);
    }
    //https://www.w3.org/TR/scxml/#isInFinalState
    private isInFinalState(state: CompositeState<EventType>): boolean {
        if (this.isCompound(state)) {
            return state.childStates.some(s => { return isFinalState(s) && this.configuration.has(s) })
        } else if (isParallelState(state)) {
            return state.childStates.every(this.isInFinalState, this);
        }
        else {
            return false;
        }
    }
    private transitionStateEntryCompare(t1: Transition<EventType>, t2: Transition<EventType>): number {
        let s1 = t1.sourceState, s2 = t2.sourceState;
        if (s1 === s2) {
            return Math.sign(s1.transitions.indexOf(t2) - s1.transitions.indexOf(t1));
        }
        else if (this.isDescendant(s1, s2)) {
            return -1;
        }
        else if (this.isDescendant(s2, s1)) {
            return 1;
        }
        else {
            let lca = this.findLCA([s1, s2]);
            let s1Depth = this.descendantDepth(s1, lca);
            let s2Depth = this.descendantDepth(s2, lca);
            if (s1Depth === s2Depth) {
                return Math.sign(this.indexOfDescendant(s2, lca) - this.indexOfDescendant(s1, lca));
            }
            else {
                return Math.sign(s2Depth - s1Depth);
            }
        }
    }
    //https://www.w3.org/TR/scxml/#Predicates
    private stateEntryCompare(s1: RealState<EventType>, s2: RealState<EventType>): number {
        if (s1.parentState === s2.parentState) {
            return Math.sign(s2.index - s1.index);
        }
        else if (isCompositeState(s2) && this.isDescendant(s1, s2)) {
            return 1;
        }
        else if (isCompositeState(s1) && this.isDescendant(s2, s1)) {
            return -1;
        }
        else {
            let lca = this.findLCA([s1, s2]);
            return Math.sign(this.indexOfDescendant(s2, lca) - this.indexOfDescendant(s1, lca));
        }
    }
    //https://www.w3.org/TR/scxml/#Predicates
    private stateExitCompare(s1: RealState<EventType>, s2: RealState<EventType>): number {
        if (s1.parentState === s2.parentState) {
            return Math.sign(s1.index - s2.index);
        }
        else if (isCompositeState(s2) && this.isDescendant(s1, s2)) {
            return -1;
        }
        else if (isCompositeState(s1) && this.isDescendant(s2, s1)) {
            return 1;
        }
        else {
            let lca = this.findLCA([s1, s2]);
            return Math.sign(this.indexOfDescendant(s1, lca) - this.indexOfDescendant(s2, lca));
        }
    }

    //https://www.w3.org/TR/scxml/#getTransitionDomain
    private getTransitionDomain(transition: Transition<EventType>): CompositeState<EventType> {
        let effectiveTargetStates = this.getEffectiveTargetStates(transition);
        if (effectiveTargetStates.length === 0) {
            return null;
        }

        let sourceState = transition.sourceState;
        if (transition.transitionType === "Internal" && this.isCompound(sourceState)
            && effectiveTargetStates.every(s => this.isDescendant(s, sourceState))) {
            return sourceState;
        }
        else {
            return this.findLCCA(sourceState ? [sourceState, ...effectiveTargetStates] : effectiveTargetStates);
        }
    }
    private isCompound(state: RealState<EventType>): state is State<EventType> {
        if (!(isExclusiveState(state))) {
            return false;
        }
        if (state instanceof StateMachine && state !== this.root) {
            return false;
        }
        return state.childStates.length !== 0;
    }
    private isAtomic(state: RealState<EventType>): state is RealState<EventType> {
        if (isExclusiveState(state)) {
            return state.childStates.length === 0 || ((state instanceof StateMachine) && (state !== this.root))
        }
        return isFinalState(state);
    }
    //https://www.w3.org/TR/scxml/#addDescendantStatesToEnter
    private addDescendantStatesToEnter(state: TargetState<EventType>,
        statesToEnter: Set<RealState<EventType>>,
        statesForDefaultEntry: Set<State<EventType>>): void {
        if (isHistoryState(state)) {
            let historyConfiguration = internal.of(state).configuration;
            if (historyConfiguration.length) {
                for (let s of historyConfiguration) {
                    this.addDescendantStatesToEnter(s, statesToEnter, statesForDefaultEntry);
                }
                for (let s of historyConfiguration) {
                    this.addAncestorStatesToEnter(s, state.parentState, statesToEnter, statesForDefaultEntry);
                }
            } else {
                let defaultHistoryContent = state.transition.targetStates;
                if (defaultHistoryContent.length) {
                    throw Error("History transition target MUST NOT be empty");
                }
                for (let s of defaultHistoryContent) {
                    this.addDescendantStatesToEnter(s, statesToEnter, statesForDefaultEntry);
                }
                for (let s of defaultHistoryContent) {
                    this.addAncestorStatesToEnter(s, state.parentState, statesToEnter, statesForDefaultEntry);
                }
            }
        } else if (isRealState(state)) {
            statesToEnter.add(state);
            if (this.isCompound(state)) {
                statesForDefaultEntry.add(state);
                for (let s of state.initialState.transition.targetStates) {
                    this.addDescendantStatesToEnter(s, statesToEnter, statesForDefaultEntry);
                }
                for (let s of state.initialState.transition.targetStates) {
                    this.addAncestorStatesToEnter(s, state.parentState, statesToEnter, statesForDefaultEntry);
                }
            } else if (isParallelState(state)) {
                for (let child of state.childStates) {
                    if (!this.containsDecendantOf(statesToEnter, child)) {
                        this.addDescendantStatesToEnter(child, statesToEnter, statesForDefaultEntry);
                    }
                }
            }
        }
        else {
            throw new Error("Woops, found unknown type of state");
        }
    }
    private pushPotentialEvents(collection: void | (void | EventType[])[]): void {
        if (Array.isArray(collection)) {
            for (let events of collection) {
                if (Array.isArray(events)) {
                    this.push(...events.map(e => { return { event: e } }));
                }
            }
        }
    }
    private async executeTransitionsContent(carrier: EventCarrier<EventType>, enabledTransitions: Transition<EventType>[]): Promise<EventType[] | void> {
        let wait = enabledTransitions.map(transition => this.executeTransitionContent(carrier, transition));
        let events = await Promise.race([Promise.all(wait), this.interrupt.wait()]);
        this.pushPotentialEvents(events);
    }
    private executeTransitionContent(carrier: EventCarrier<EventType>, transition: Transition<EventType>): Promise<EventType[] | void> {
        return internal.of(transition).onTransition(carrier);
    }
    private isDescendant(descendant: RealState<EventType>, ancestor: CompositeState<EventType>): boolean {
        for (let it = descendant.parentState; it; it = it.parentState) {
            if (it === ancestor) {
                return true;
            }
        }
        return false;
    }
    private containsDecendantOf(descendants: Set<RealState<EventType>>, ancestor: CompositeState<EventType>): boolean {
        for (let state of descendants) {
            if (this.isDescendant(state, ancestor)) {
                return true;
            }
        }
        return false;
    }
    private descendantDepth(descendant: RealState<EventType>, ancestor: CompositeState<EventType>): number {
        let depth = 0;
        for (let it = descendant; it && it !== ancestor; it = it.parentState) {
            ++depth;
        }
        return depth;
    }
    private getProperAncestors(state: RealState<EventType>, upperBound: CompositeState<EventType>): CompositeState<EventType>[] {
        let result: CompositeState<EventType>[] = [];
        for (let it = state.parentState; it && it !== upperBound; it = it.parentState) {
            result.push(it);
        }
        return result;
    }
    private indexOfDescendant(descendant: RealState<EventType>, ancestor: CompositeState<EventType>): number {
        let childStates = ancestor.childStates;
        for (let i = 0; i < childStates.length; ++i) {
            let child = childStates[i];
            if ((child === descendant) || (isCompositeState(child) && this.isDescendant(descendant, child))) {
                return i;
            }
        }
        return -1;
    }
    //https://www.w3.org/TR/scxml/#getEffectiveTargetStates
    private getEffectiveTargetStates(transition: Transition<EventType>): RealState<EventType>[] {
        let targets: RealState<EventType>[] = [];
        for (let s of transition.targetStates) {
            if (isHistoryState(s)) {
                let historyConfiguration = internal.of(s).configuration;
                if (historyConfiguration.length) {
                    // There is a saved history, so apply that.
                    targets.push(...historyConfiguration);
                } else if (s.transition) {
                    // No saved history, take all default transition targets.
                    targets.push(...this.getEffectiveTargetStates(s.transition));
                } else {
                    throw new Error("Woops, we found a history state without a default state. That's not valid!")
                }
            } else if (isRealState(s)) {
                targets.push(s);
            }
            else {
                throw new Error("Woops, found unknown type of state");
            }
        }
        return targets.filter((s, i) => targets.indexOf(s) === i)
    }
    private get root(): State<EventType> {
        return this.rootState;
    }
    push(...carriers: EventCarrier<EventType>[]): void {
        this.internalEventQueue.push(...carriers);
    }
    async start(root: State<EventType>) {
        if (this.running) {
            console.warn("the machine is already running");
            return;
        }

        this.rootState = root;
        this.running = true;
        this.stopper.lock();
        this.interrupt.lock();

        await this.started();
        await this.runningChanged(true);
        await this.run();
    }
    async stop(): Promise<void> {
        return this.cancel("Stopped")
    }
    private async cancel(reason: StopReason): Promise<void> {
        this.running = false;
        if (reason === "Interrupt") {
            this.interrupt.unlock();
        }
        await this.stopper.wait();
        this.rootState = null;
        await this.stopped(reason);
        await this.runningChanged(false);
    }

    isInState(state: RealState<EventType>): boolean {
        return this.configuration.has(state);
    }

    constructor(externalGenerator: AsyncIterator<EventType> | AsyncIterable<EventType>) {
        this.externalEventIterator = externalGenerator[Symbol.asyncIterator] ? externalGenerator[Symbol.asyncIterator]() : externalGenerator;
    }

    private configuration: Set<RealState<EventType>> = new Set<RealState<EventType>>();
    private internalEventQueue: EventCarrier<EventType>[] = [];
    private running = false;
    private stopper = new AsyncGuard();
    private interrupt = new AsyncGuard();
    private rootState: State<EventType>
    private externalEventIterator: AsyncIterator<EventType>;
    @signal stateChanged: Signal<(configuration: RealState<EventType>[]) => void>;
    @signal runningChanged: Signal<(running: boolean) => void>;
    @signal started: Signal<() => void>;
    @signal stopped: Signal<(reason: StopReason) => void>;
}

class StateMachinePrivate<EventType> extends StatePrivate<EventType, StateMachine<EventType>>{
    interpreter: Interpreter<EventType>
}
export class StateMachine<EventType> extends State<EventType> {
    protected async onEntry(event?: EventType): Promise<EventType[] | void> {
        this.start();
        return super.onEntry(event);
    }
    protected async onExit(event?: EventType): Promise<EventType[] | void> {
        await this.stop();
        return super.onExit(event);
    }
    get interpreter(): Interpreter<EventType> {
        return internal.of(this).interpreter;
    }

    async start() {
        return this.interpreter.start(this);
    }
    async stop(): Promise<void> {
        return this.interpreter.stop();
    }

    constructor(externalGenerator: AsyncIterator<EventType> | AsyncIterable<EventType>, options?: StateObserver<EventType>, interpreter?: Interpreter<EventType>) {
        super(options)
        interpreter = interpreter || new Interpreter(externalGenerator);
        interpreter.started.attach(this.started);
        interpreter.stopped.attach(this.stopped);
        interpreter.runningChanged.attach(this.runningChanged);
        interpreter.stateChanged.attach(this.stateChanged);
        internal.of(this).interpreter = interpreter;
    }
    @signal runningChanged: Signal<(running: boolean) => void>;
    @signal started: Signal<() => void>;
    @signal stopped: Signal<(reason: StopReason) => void>;
    @signal stateChanged: Signal<(configuration: RealState<EventType>[]) => void>;
    @internal "#": StateMachinePrivate<EventType>;
}

class TransitionPrivate<EventType, TargetStateType extends AbstractState<EventType>> extends Internal<Transition<EventType>>{
    condition?(carrier?: EventCarrier<EventType>): Promise<boolean>;
    onTransition?(carrier?: EventCarrier<EventType>): Promise<EventType[] | void>;
    events?(carrier?: EventCarrier<EventType>): boolean
    transitionType: TransitionType = "Internal"
    targetStates: TargetStateType[] = [];
    options?: TransitionMatch<EventType> & TransitionObserver<EventType>;
}
export interface TransitionMatch<EventType> {
    events?(event?: EventType, carrier?: EventCarrier<EventType>): boolean;
    condition?(event?: EventType, carrier?: EventCarrier<EventType>): Promise<boolean>;
}
export interface TransitionObserver<EventType> {
    onTransition?(event?: EventType, carrier?: EventCarrier<EventType>): Promise<EventType[] | void>;
}
export class Transition<EventType, TargetStateType extends TargetState<EventType> = TargetState<EventType>>  {
    get sourceState(): CompositeState<EventType> {
        let parent = this[PARENT];
        if (isCompositeState(parent)) {
            return parent;
        }
    }
    set sourceState(source: CompositeState<EventType>) {
        this[PARENT] = source;
    }
    get machine(): StateMachine<EventType> {
        let source = this.sourceState;
        if (source) {
            return source.machine;
        }
        let parent = this[PARENT]
        if (isHistoryState(parent)) {
            return parent.machine;
        }
    }
    get targetState(): TargetStateType {
        if (internal.of(this).targetStates.length) {
            return internal.of(this).targetStates[0];
        }
    }
    set targetState(target: TargetStateType) {
        if (target) {
            internal.of(this).targetStates.length = 1;
            internal.of(this).targetStates[0] = target;
        }
        else {
            internal.of(this).targetStates.length = 0;
        }
        this.targetStateChanged()
    }
    get targetStates(): TargetStateType[] {
        return internal.of(this).targetStates;
    }
    set targetStates(states: TargetStateType[]) {
        internal.of(this).targetStates = states;
        this.targetStatesChanged();
    }
    get transitionType(): TransitionType {
        return internal.of(this).transitionType;
    }
    set transitionType(type: TransitionType) {
        internal.of(this).transitionType = type;
        this.transitionTypeChanged();
    }

    isEventLess(): boolean {
        return !internal.of(this).options || !internal.of(this).options.events;
    }
    isSpecial(): boolean {
        return false;
    }

    protected async onTransition(event?: EventType, carrier?: EventCarrier<EventType>): Promise<EventType[] | void> {
        let options = internal.of(this).options;
        if (options && options.onTransition) {
            return options.onTransition.apply(this, [event, carrier]);
        }
        await this.triggered(event);
    }

    protected events(event?: EventType, carrier?: EventCarrier<EventType>): boolean {
        let options = internal.of(this).options;
        if (options && options.events) {
            return options.events.apply(this, [event, carrier]);
        }
        return true;
    }

    protected condition(event?: EventType, carrier?: EventCarrier<EventType>): Promise<boolean> {
        let options = internal.of(this).options;
        if (options && options.condition) {
            return options.condition.apply(this, [event, carrier]);
        }
        return Promise.resolve(true);
    }
    constructor(target: TargetStateType | TargetStateType[], options?: TransitionMatch<EventType> & TransitionObserver<EventType>) {
        if (Array.isArray(target)) {
            this.targetStates = target;
        } else {
            this.targetState = target;
        }
        internal.of(this).condition = carrier => this.condition(carrier.event, carrier);
        internal.of(this).events = carrier => this.events(carrier.event, carrier);
        internal.of(this).onTransition = carrier => this.onTransition(carrier.event, carrier);
        if (options) {
            internal.of(this).options = options;
        }
    }
    private [PARENT]: CompositeState<EventType> | PseudoState<EventType>;
    @signal targetStatesChanged: Signal<() => void>;
    @signal targetStateChanged: Signal<() => void>;
    @signal triggered: Signal<(event: EventType) => void>;
    @signal transitionTypeChanged: Signal<() => void>;
    @internal "#": TransitionPrivate<EventType, TargetStateType>;
}
export class UnconditionalTransition<EventType, TargetStateType extends TargetState<EventType>> extends Transition<EventType, TargetStateType> {
    protected async condition(): Promise<true> {
        return true
    }
    constructor(target: TargetStateType, options?: TransitionObserver<EventType>) {
        super(target, options);
        this.targetState = target;
    }
}

export class SignalTransition<EventType> extends Transition<EventType> {
    isEventLess(): boolean {
        return false;
    }
    isSpecial(): boolean {
        return true;
    }
    protected events(event?: EventType, carrier?: EventCarrier<EventType>): boolean {
        let special = carrier[SPECIAL];
        if (!special) {
            return false;
        }
        return this.signal === special;
    }
    constructor(signal: Signal<Function>, target: TargetState<EventType>, options?: TransitionObserver<EventType>) {
        super(target, options)
        this.signal = signal;
        signal.attach((...args: any[]) => {
            let carrier = {
                event: null,
                [SPECIAL]: signal,
                args: args
            };
            this.machine.interpreter.push(carrier);
        })
    }
    private signal: Signal<Function>
}
