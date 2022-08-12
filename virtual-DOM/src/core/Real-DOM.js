export function updateElement(parent, newNode, oldNode) {
  // oldNode만 있는 경우
  if (!newNode && oldNode) {
    return oldNode.remove();
  }

  // newNode만 있는 경우
  if (newNode && !oldNode) {
    return parent.appendChild(newNode);
  }

  // oldNode와 newNode 모두 text 타입인 경우
  if (newNode instanceof Text && oldNode instanceof Text) {
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }

  // oldNode와 newNode의 태그 이름이 다른 경우
  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);

    oldNode.remove();
    parent.appendChild(newNode, index);
    return;
  }

  // oldNode와 newNode 속성(attr) 맞추기
  updateAttributes(oldNode, newNode);

  // newNode와 oldNode의 모든 자식 태그를 순회하며 내용 반복
  const newChildren = Array.from(newNode.childNodes);
  const oldChildren = Array.from(oldNode.childNodes);
  const maxLength = Math.max(newChildren.length, oldChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}

function updateAttributes(oldNode, newNode) {
  const oldProps = [...oldNode.attributes];
  const newProps = [...newNode.attributes];

  // 달라지거나 추가된 Props를 반영
  for (const { name, value } of newProps) {
    if (value === oldNode.getAttribute(name)) {
      continue;
    }

    oldNode.setAttribute(name, value);
  }

  // 없어진 props를 attribute에서 제거
  for (const { name } of oldProps) {
    if (newNode.getAttribute(name) !== undefined || !newNode.hasAttribute(name)) {
      continue;
    }

    oldNode.removeAttribute(name);
  }
}
