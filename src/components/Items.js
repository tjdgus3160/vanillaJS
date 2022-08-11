import Component from "../core/Component.js";

export default class Items extends Component {
  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(({ active }) => !isFilter || (isFilter === 1 && active) || (isFilter === 2 && !active));
  }

  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: "item1",
          active: false,
        },
        {
          seq: 2,
          contents: "item2",
          active: true,
        },
      ],
    };
  }

  template() {
    return `
      <header>
        <input type="text" class="appender" placeholder="아이템 내용 입력"/>
      </header>
      <main>
        <ul>
          ${this.filteredItems
            .map(
              ({ contents, active, seq }) =>
                `
              <li data-seq="${seq}">
                ${contents}
                <button class="toggleBtn" style="color: ${active ? "#09F" : "#F09"}">
                ${active ? "활성" : "비활성"}
              </button>
              <button class="deleteBtn">삭제</button>
            </li>
          `
            )
            .join("")}
        </ul>
      </main>
      <footer>
        <button class="filterBtn" data-is-filter="0">전체 보기</button>
        <button class="filterBtn" data-is-filter="1">활성 보기</button>
        <button class="filterBtn" data-is-filter="2">비활성 보기</button>
      </footer>
        `;
  }

  setEvent() {
    this.addEvent("keyup", ".appender", ({ key, target }) => {
      if (key !== "Enter") {
        return;
      }

      const { items } = this.$state;
      const newItem = {
        seq: Math.max(0, ...items.map((v) => v.seq)) + 1,
        contents: target.value,
        active: false,
      };

      this.setState({ items: [...items, newItem] });
    });

    this.addEvent("click", ".deleteBtn", ({ target }) => {
      const items = [...this.$state.items];
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      const deleteIndex = items.findIndex((v) => v.seq === seq);

      items.splice(deleteIndex, 1);
      this.setState({ items });
    });

    this.addEvent("click", ".toggleBtn", ({ target }) => {
      const items = [...this.$state.items];
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      const itemIndex = items.findIndex((v) => v.seq === seq);

      items[itemIndex].active = !items[itemIndex].active;
      this.setState({ items });
    });

    this.addEvent("click", ".filterBtn", ({ target }) => this.setState({ isFilter: Number(target.dataset.isFilter) }));
  }
}
