import {IExpectation} from './expectation';

export interface IBooleanExpectation extends IExpectation<boolean> {
    /**
     * Asserts that the item is true
     */
    toBeTrue(message?: string): this;

    /**
     * Asserts that the item is false
     */
    toBeFalse(message?: string): this;
}
