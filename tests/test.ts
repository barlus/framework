import {injectable, named} from "@barlus/runtime/inject/decorators";
import {container} from "@barlus/runtime/inject/injection";
import {process} from "@barlus/node/process";

const CONFIG = {
    message:'Hello',
    two:'2'
};

type Config =  typeof CONFIG;



container.register({
    token: "config",
    useValue: CONFIG
});




@injectable
class ComponentOne {
    private service: Service;
    constructor(service: Service) {
        this.service = service;
    }
    public a() {
        return this.service.say("One");
    }
}

@injectable
class ComponentTwo {
    private service: Service;
    private config: Config;
    constructor(service: Service, @named("config") config:Config) {
        this.service = service;
        this.config = config;
    }
    public b() {
        return this.service.say(`Two + ${this.config.two}`);
    }
}

@injectable
class ComponentThree {
    private service: Service;
    constructor(service: Service) {
        this.service = service;
    }
    public c() {
        return this.service.say("Three");
    }
}

@injectable
class Application {
    private service: Service;
    private one: ComponentOne;
    private two: ComponentTwo;
    private three: ComponentThree;
    constructor(
        service: Service,
        one: ComponentOne,
        two: ComponentTwo,
        three: ComponentThree
    ) {
        this.service = service;
        this.one = one;
        this.two = two;
        this.three = three;
    }
    start() {
        console.info([
            this.service.say('Started'),
            this.one.a(),
            this.two.b(),
            this.three.c()
        ]);
    }
}

container.resolve(Application).start();


declare const ts;
console.info(`Hello From`);
console.info(`  -> Node: ${process.version} ${process.cwd()}`);
console.info(`  -> TypeScript: ${ts.version} ${ts.path}`);