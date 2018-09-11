import {spyOnProperty} from '@barlus/tester';
import {suite}         from '@barlus/tester';
import {test}          from '@barlus/tester';
import {expect}        from '@barlus/tester';


class Model {
  private _hello;
  get hello() {
    return this._hello
  }
  set hello(value) {
    this._hello = value;
  }
}

@suite
class BasicTest {
  @test
  async testBasicSum() {
    let object = new Model();
    let spy = spyOnProperty(object, 'hello');
    object.hello = 'Hello';
    expect(spy).toHaveBeenSetTo('Hello');
  }
}
