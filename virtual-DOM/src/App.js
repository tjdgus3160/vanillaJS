import { Component } from "./core/Component.js";

export class App extends Component {
  setup() {
    this.$state = { items: ["item1", "item2"] };
  }

  template() {
    const { items } = this.$state;

    return `
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <button>추가</button>
    `;
  }

  setEvent() {
    const $addButton = this.$target.querySelector("button");

    $addButton.removeEventListener("click", this.addItem);
    $addButton.addEventListener("click", this.addItem);
  }

  // 아이템 추가
  addItem = () => {
    const { items } = this.$state;

    this.setState({ items: [...items, `item${items.length + 1}`] });
  };
}
