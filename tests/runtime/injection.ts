import {suite, test, expect} from '@barlus/tester';
import {container}           from '@barlus/runtime/injection';
import {Config}              from './injection/types';
import {Application}         from './injection/application';


@suite
class InjectionTest {
  private config: Config;

  @suite.setup
  public setup() {
    this.config = {
      application: 'I Am HttpApplication',
      service: {
        serviceName: 'Service Name'
      },
      componentOne: {
        message: 'I Am Component One'
      },
      componentTwo: {
        message: 'I Am Component Two'
      }
    };
    container.useValue<Config>("config", this.config);
  }

  @test
  @test.case("config injection")
  public testBasicSum() {
    const config: Config = container.resolve("config");
    expect(config).toBe(this.config);
  }

  @test
  @test.case("application test")
  public testApplicationObject() {
    const app = container.resolve(Application);
    expect(app).toBeDefined();
    expect(app.name).toBe(this.config.application);
    expect(app).toBe(container.resolve(Application));
    expect(app.one).toBeDefined();
    expect(app.two).toBeDefined();
    expect(app.one.doOne()).toBe("Service Service Name say I Am Component One");
    expect(app.two.doTwo()).toBe("Service Service Name say I Am Component Two");
  }
}