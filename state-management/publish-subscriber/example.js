import Publish from "./publish.js";
import Subscriber from "./subscriber.js";

const state = new Publish({
  a: 10,
  b: 20,
});

const addOperater = new Subscriber(() => console.log(`a + b = ${state.a + state.b}`));
const multipleOperater = new Subscriber(() => console.log(`a * b = ${state.a * state.b}`));

addOperater.subscriber(state);
multipleOperater.subscriber(state);

state.notify();

state.changeState({ a: 100, b: 200 });
