let currentObserver = null;

// 연속적으로 상태값이 바뀔경우 맨 마자믹만 적용
const debouncdFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback); // 현재 등록된 callback 취소
    currentCallback = requestAnimationFrame(callback); // 1프레임 뒤에 실행
  };
};

export const observe = (fn) => {
  currentObserver = debouncdFrame(fn);
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
        // 값이 변경되지 않는 경우
        if (_value === value || JSON.stringify(_value) === JSON.stringify(value)) {
          return;
        }

        _value = value;

        // observers에 등록된 모든 observer(fn)를 실행
        observers.forEach((fn) => fn());
      },
    });
  }

  return obj;
};
