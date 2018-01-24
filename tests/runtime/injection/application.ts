import {injectable,named} from '@barlus/runtime/inject/decorators';
import {Service} from './service';
import {ComponentOne, ComponentTwo} from './components';
import {Config} from './types';

@injectable
export class Application {
    private config: Config;
    private service: Service;
    private one: ComponentOne;
    private two: ComponentTwo;
    get name(){
        return this.config.application;
    }
    constructor(@named('config') config: Config, service: Service, one: ComponentOne, two: ComponentTwo) {
        this.config = config;
        this.service = service;
        this.one = one;
        this.two = two;
    }
    start() {
        console.info([
            this.service.say('Started'),
            this.one.doOne(),
            this.two.doTwo()
        ]);
    }
}