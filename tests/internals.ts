import '@barlus/runtime';
import {internal,Internal} from '@barlus/runtime';


export class Parent {
    @internal '#':TheParent;
    readonly zero:string;
    constructor(){
        internal.of(this).parentInternal();
    }
}

class TheParent<T={}> extends Internal<Parent&T> {
    __veryUnsafeFunction(){}
    parentInternal(){
        this.target.zero = 'ZERO';
    }
}

export class Child extends Parent {
    @internal '#':TheChild;
    readonly one:string;
    readonly two:string;
    constructor(){
        super();

        internal.of(this).parentInternal();
        internal.of(this).childInternal();
    }
}

class TheChild<T={}> extends TheParent<Child&T> {
    childInternal(){
        this.target.one = 'ONE'+this.target.zero;
        this.target.two = 'TWO';
    }
}

