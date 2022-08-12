import { updateElement } from "./core/Virtual-DOM.js";

/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}

const oldState = [
  { id: 1, completed: false, content: "todo list item 1" },
  { id: 2, completed: true, content: "todo list item 2" },
];

const newState = [
  { id: 1, completed: true, content: "todo list item 1 update" },
  { id: 2, completed: true, content: "todo list item 2" },
  { id: 3, completed: false, content: "todo list item 3" },
];

const render = (state) => (
  <div id="app">
    <ul>
      {state.map(({ completed, content }) => (
        <li class={completed ? "completed" : null}>
          <input type="checkbox" class="toggle" checked={completed} />
          {content}
          <button class="remove">삭제</button>
        </li>
      ))}
    </ul>
    <form>
      <input type="text" />
      <button type="submit">추가</button>
    </form>
  </div>
);

const oldNode = render(oldState);
const newNode = render(newState);

const $root = document.querySelector("#virtualDOM");

updateElement($root, oldNode);
setTimeout(() => updateElement($root, newNode, oldNode), 1000); // 1초 뒤에 DOM 변경
