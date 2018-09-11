import {injectable, singleton, token} from '@barlus/runtime/decor';
import {Service}                      from './service';
import {ComponentOne, ComponentTwo}   from './components';
import {Config}                       from './types';


@singleton
@injectable
export class Application {
  private config: Config;
  private service: Service;
  readonly one: ComponentOne;
  readonly two: ComponentTwo;
  get name() {
    return this.config.application;
  }
  constructor(@token('config') config: Config, service: Service, one: ComponentOne, two: ComponentTwo) {
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