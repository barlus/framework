import {injectable, named} from '@barlus/runtime/inject/decorators';
import {Config} from './types';

@injectable
export class Service {
    private config:Config;
    constructor(@named("config") config:Config){
        this.config = config;
    }
    say(message: string) {
        return `Service ${this.config.service.serviceName} say ${message}`;
    }
}