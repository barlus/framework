import { options } from './options';
import { defer } from './constants';

import { Tag } from './component';

export class RenderQueue {
    static queue(component:Tag,force = false){

    }
    private items: Tag[];

    public renderComponent:(c:Tag, force?:number)=>void;

    constructor(renderer:(c:Tag)=>void) {
        this.items = [];
        this.render = this.render.bind(this, renderer);
        this.renderComponent = renderer;
    }

    add(component: Tag){
        if (!component._dirty && (component._dirty = true) && this.items.push(component) == 1) {
            (options.debounceRendering || defer)(this.render);
        }
    }

    render() {
        const list = this.items;
        this.items = [];
        let p;
        while ((p = list.pop())) {
            if (p._dirty) {
                this.renderComponent(p);
            }
        }
    }
}