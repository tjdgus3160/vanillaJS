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

function updateElement(parent, newNode, oldNode, index = 0) {
  // oldNode만 있는 경우 : oldNode를 parent에서 제거
  if (!newNode && oldNode) {
    return parent.removeChild(parent.childNode[index]);
  }

  // newNode만 있는 경우 : newNode를 parent에 추가
  if (newNode && !oldNode) {
    return parent.appendChild(createElement(newNode));
  }

  // oldNode와 newNode 모두 text 타입인 경우 : 변경된 내용 수정
  if (typeof newNode === "string" && typeof oldNode === "string") {
    if (newNode === oldNode) {
      return;
    }

    return parent.replaceChild(createElement(newNode), parent.childNodes[index]);
  }

  // oldNode와 newNode의 태그 이름(type)이 다른 경우 : oldNode 삭제, newNode 추가
  if (newNode.type !== oldNode.type) {
    return parent.replaceChild(createElement(newNode), parent.childNodes[index]);
  }

  // oldNode와 newNode 속성(attr) 맞추기
  updateAttributes(parent.childNodes[index], newNode.props || {}, oldNode.props || {});

  // newNode와 oldNode의 모든 자식 태그를 순회하며 내용 반복
  const maxLength = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
  }
}

// newNode와 oldNode의 attribute를 비교하여 변경된 부분 수정
function updateAttributes(target, newProps, oldProps) {
  // 달라지거나 추가된 Props를 반영
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === newProps[attr]) {
      continue;
    }

    target.setAttribute(attr, value);
  }

  // 없어진 props를 attribute에서 제거
  for (const attr of Object.keys(oldProps)) {
    if (newProps.hasOwnProperty(attr)) {
      continue;
    }

    target.removeAttribute(attr);
  }
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

const $root = document.querySelector("#root");

updateElement($root, oldNode);
setTimeout(() => updateElement($root, newNode, oldNode), 1000); // 1초 뒤에 DOM 변경
