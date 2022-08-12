let currentStateKey = 0; // useState가 실행 된 횟수
const states = []; // state를 보관할 배열

function useState(initState) {
  const key = currentStateKey;

  if (states.length === key) {
    states.push(initState);
  }

  const state = states[key];
  const setState = (newState) => {
    if (newState === state || JSON.stringify(newState) === JSON.stringify(state)) {
      return;
    }

    states[key] = newState;
    render();
  };

  currentStateKey += 1;

  return [state, setState];
}
function CounterAndMeow() {
  const [count, setCount] = useState(1);
  const [cat, setCat] = useState("야옹! ");

  function countMeow(newCount) {
    setCount(newCount);
    setCat("야옹! ".repeat(Math.max(0, newCount)));
  }

  window.increment = () => countMeow(count + 1);
  window.decrement = () => countMeow(count - 1);

  return `
      <div>
        <p>고양이가 ${count}번 울어서 ${cat} </p>
        <button onclick="increment()">증가</button>
        <button onclick="decrement()">감소</button>
      </div>
    `;
}

function debounceFrame(callback) {
  let nextFrameCallback = -1;

  return () => {
    cancelAnimationFrame(nextFrameCallback);
    nextFrameCallback = requestAnimationFrame(callback);
  };
}

let renderCount = 0;
const render = debounceFrame(() => {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <div>
      renderCount: ${renderCount}
        ${CounterAndMeow()}
      </div>
    `;
  renderCount += 1;
  currentStateKey = 0;
});

render();
