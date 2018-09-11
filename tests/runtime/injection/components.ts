import {injectable, token, inject} from '@barlus/runtime/decor';
import {Service}                   from './service';
import {Config}                    from './types';


@injectable
export class ComponentOne {

  @inject
  private service: Service;

  @inject
  @token("config")
  private config: Config;

  public doOne() {
    return this.service.say(this.config.componentOne.message);
  }
}

@injectable
export class ComponentTwo {
  private service: Service;
  @inject
  @token("config")
  private config: Config;
  constructor(service: Service) {
    this.service = service;
  }
  public doTwo() {
    return this.service.say(this.config.componentTwo.message);
  }
}

