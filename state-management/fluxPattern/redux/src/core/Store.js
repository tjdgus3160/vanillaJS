import { observable } from "./observer.js";

export const createStore = (reducer) => {
  // reducer 실행시 반환되는 객체 옵저버블로 변환
  const state = observable(reducer());

  // getState가 실제 state가 아닌 frozenState를 반환
  const frozenState = {};
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key],
    });
  });

  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (!state[key]) {
        continue;
      }

      state[key] = value;
    }
  };

  const getState = () => frozenState;

  return { getState, dispatch };
};
