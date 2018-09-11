import {injectable, token} from '@barlus/runtime/decor';
import {Config}            from './types';


@injectable
export class Service {
  private config: Config;
  constructor(@token("config") config: Config) {
    this.config = config;
  }
  say(message: string) {
    return `Service ${this.config.service.serviceName} say ${message}`;
  }
}