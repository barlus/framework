import {suite,test,expect,spyOnProperty} from '@barlus/tester';
import {container} from '@barlus/runtime/inject/injection';
import {Config} from './injection/types';
import {Application} from './injection/application';


@suite
class InjectionTest {
    private config:Config;

    @suite.setup
    public setup(){
        this.config = {
            application:'I Am Application',
            service:{
                serviceName:'Service Name'
            },
            componentOne:{
                message:'I Am Component One'
            },
            componentTwo:{
                message:'I Am Component Two'
            }
        };
        container.useValue<Config>("config",this.config);

    }

    @test
    @test.case("config injection")
    public testBasicSum(){
        const config:Config = container.resolve("config");
        expect(config).toBe(this.config);
    }

    @test
    @test.case("application test")
    public testApplicationObject(){
        const app = container.resolve(Application);
        expect(app).toBeDefined();
        expect(app.name).toBe(this.config.application);
        expect(app).not.toBe(container.resolve(Application));
    }
}