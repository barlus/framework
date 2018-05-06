import { observable } from '@barlus/mobx';
import { ALL_TODOS } from '../constants';

export class ViewStore {
    @observable todoBeingEdited = null;
    @observable todoFilter = ALL_TODOS;
}