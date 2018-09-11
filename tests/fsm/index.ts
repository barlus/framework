import {BlockingQueue}       from '@barlus/runtime/async/queue';
import * as FSM              from '@barlus/fsm';
import {suite, test, expect} from '@barlus/tester';


interface DummyEvent {
  name: string;
}

@suite
class StateMachineTest {

  private external: BlockingQueue<DummyEvent>;
  private machine: FSM.StateMachine<DummyEvent>;

  @suite.setup
  public setup() {
    var door_closed = true;
    var cook_time = 10;
    var timer = 0;

    this.external = new BlockingQueue<DummyEvent>();
    let machine = this.machine = new FSM.StateMachine<DummyEvent>(this.external);

    let off = machine.addState("off");
    let on = machine.addState("on");
    let exit = machine.addFinal("exit");

    off.addTransition(new FSM.SignalTransition<DummyEvent>(off.finished, exit));
    off.addState("dummy");
    let final = off.addFinal("final");
    machine.initialState = new FSM.Initial(off);

    off.addTransition(on, {
      events(event) {
        return event.name == "turn.on"
      }
    });

    let idle = on.addState("idle");
    let cooking = on.addState("cooking");
    on.initialChild = idle;

    on.addTransition(new FSM.Transition<DummyEvent>(off, {
      events(event) {
        return event.name == "turn.off"
      }
    }));
    on.addTransition(new FSM.Transition<DummyEvent>(final, {
      condition: async () => {
        return timer >= cook_time;
      }
    }));

    idle.addTransition(new FSM.Transition<DummyEvent>(cooking, {
      condition: async () => {
        return door_closed;
      }
    }));

    idle.addTransition(new FSM.Transition<DummyEvent>(cooking, {
      events(event) {
        return event.name == "door.close"
      },
      onTransition: async () => {
        door_closed = true;
      }
    }));

    cooking.addTransition(new FSM.Transition<DummyEvent>(idle, {
      events(event) {
        return event.name == "door.open"
      },
      onTransition: async () => {
        door_closed = false;
      }
    }));

    cooking.addTransition(new FSM.Transition<DummyEvent>(cooking, {
      events(event) {
        return event.name == "time"
      },
      onTransition: async () => {
        timer++;
      }
    }));
  }

  @test
  public async testSimpleStateMachine() {
    let paths = [];
    let finishedReason;
    this.machine.stateChanged.attach((conf) => {
      paths.push(conf.map((state) => {
        return state.name
      }));
    })
    this.machine.stopped.attach(async (reason) => {
      finishedReason = reason;
    })

    this.machine.start();
    await this.machine.stop(true);

    expect(finishedReason).toBe("Interrupt");

    this.external.enqueue({ name: "turn.on" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "door.open" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "door.close" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });
    this.external.enqueue({ name: "time" });

    paths = [];
    await this.machine.start();

    expect(finishedReason).toBe("Finished");
    expect(paths).toEqual([
      [ 'off', 'dummy' ],
      [],
      [ 'on', 'idle' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'idle' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [ 'on' ],
      [ 'on', 'cooking' ],
      [],
      [ 'final' ],
      [],
      [ 'exit' ],
      [] ])
  }
}