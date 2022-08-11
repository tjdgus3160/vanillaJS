export default class Publish {
  #state;
  #observers = new Set();

  constructor(state) {
    this.#state = state;
    Object.keys(state).forEach((key) =>
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
      })
    );
  }

  // 내부에 변화가 생김
  changeState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.notify();
  }

  // 구독자 등록
  addSubscriber(subscriber) {
    this.#observers.add(subscriber);
  }

  // 구독자에게 알림
  notify() {
    this.#observers.forEach((fn) => fn());
  }
}
