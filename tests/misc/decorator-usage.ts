import {dec} from './decorator-define';


@dec
class Target {
  @dec
  field;
  @dec
  method() {
  }
}