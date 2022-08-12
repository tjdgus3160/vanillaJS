import { updateElement } from "./Real-DOM.js";

export class Component {
  $target;
  $state;

  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }

  setup() {}
  template() {
    return "";
  }
  render() {
    const { $target } = this;

    // 기존 Node를 복제한 후에 새로운 템플릿 삽입
    const newNode = $target.cloneNode(true);
    newNode.innerHTML = this.template();

    // DIFF알고리즘 적용
    const oldChildNodes = [...$target.childNodes];
    const newChildNodes = [...newNode.childNodes];
    const maxLength = Math.max(oldChildNodes.length, newChildNodes.length);

    for (let i = 0; i < maxLength; i++) {
      updateElement($target, newChildNodes[i], oldChildNodes[i]);
    }

    // 이벤트를 등록한다.
    requestAnimationFrame(() => this.setEvent());
  }

  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
