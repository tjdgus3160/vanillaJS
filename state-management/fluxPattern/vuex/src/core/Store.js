import { observable } from "./observer.js";

export class VuexStore {
  #state; // private 변수
  #mutations;
  #actions;
  state = {};

  constructor({ state, mutations, actions }) {
    this.#state = observable(state);
    this.#mutations = mutations;
    this.#actions = actions;

    // state를 직접 수정하지 못하도록 정의
    Object.keys(state).forEach((key) => {
      Object.defineProperty(this.state, key, {
        get: () => this.#state[key],
      });
    });
  }

  commit(action, payload) {
    // state는 오직 commit을 통해서 수정
    this.#mutations[action](this.#state, payload);
  }

  // vuex dispatch
  dispatch(action, payload) {
    return this.#actions[action](
      {
        state: this.#state,
        commit: this.commit.bind(this),
        dispatch: this.dispatch.bind(this),
      },
      payload
    );
  }
}
