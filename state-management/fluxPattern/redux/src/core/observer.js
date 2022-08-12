let currentObserver = null;

export const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

export const observable = (obj) => {
  const stateKeys = Object.keys(obj);

  for (const key of stateKeys) {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) {
          // currentObserver를 observers에 등록
          observers.add(currentObserver);
        }

        return _value;
      },
      set(value) {
        _value = value;

        // observers에 등록된 모든 observer(fn)를 실행
        observers.forEach((fn) => fn());
      },
    });
  }

  return obj;
};
