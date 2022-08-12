/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}

function createElement(node) {
  if (typeof node === "string") {
    // text node 반환
    return document.createTextNode(node);
  }

  // tag element 생성
  const $el = document.createElement(node.type);

  // 속성 삽입
  Object.entries(node.props || {})
    .filter(([_, value]) => value)
    .forEach(([attr, value]) => $el.setAttribute(attr, value));

  // 재귀적으로 자식 노드들 dom으로 변환
  if (node?.children) {
    node.children.map(createElement).forEach((child) => $el.appendChild(child));
  }

  return $el;
}

const state = [
  { id: 1, completed: false, content: "todo list item 1" },
  { id: 2, completed: true, content: "todo list item 2" },
];

const el = createElement(
  <div id="app">
    <ul>
      {state.map(({ completed, content }) => (
        <li className={completed ? "completed" : null}>
          <input type="checkbox" className="toggle" checked={completed} />
          {content}
          <button className="remove">삭제</button>
        </li>
      ))}
    </ul>
    <form>
      <input type="text" />
      <button type="submit">추가</button>
    </form>
  </div>
);

const $root = document.body.querySelector("#root");

$root.appendChild(el);
