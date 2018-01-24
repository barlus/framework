import {injectable, named} from '@barlus/runtime/inject/decorators';
import {Service} from './service';
import {Config} from './types';


@injectable
export class ComponentOne {
    private service: Service;
    private config: Config;
    constructor(service: Service, @named("config") config:Config)  {
        this.service = service;
    }
    public doOne() {
        return this.service.say(this.config.componentOne.message);
    }
}

@injectable
export class ComponentTwo {
    private service: Service;
    private config: Config;
    constructor(service: Service, @named("config") config:Config) {
        this.service = service;
        this.config = config;
    }
    public doTwo() {
        return this.service.say(this.config.componentTwo.message);
    }
}

