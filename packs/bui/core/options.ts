import { Tag } from "./component";
import { defer } from './constants'
import {PreactElement} from "./node";

export const options = {
	syncComponentUpdates: true,
	debounceRendering: defer,
	event(e:any){},
    onElementCreated(element: PreactElement) { },
	afterMount(component: Tag) { },
	afterUpdate(component: Tag) { },
	beforeUnmount(component: Tag) { },
};
