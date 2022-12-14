import { VuexStore } from "./core/Store.js";

export const store = new VuexStore({
  state: {
    a: 10,
    b: 20,
  },
  mutations: {
    SET_A(state, payload) {
      state.a = payload;
    },
    SET_B(state, payload) {
      state.b = payload;
    },
  },
});
