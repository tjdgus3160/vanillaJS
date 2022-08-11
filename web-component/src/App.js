import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";
import Items from "./components/Items.js";
import Component from "./core/Component.js";

export default class App extends Component {
  setup() {
    this.$state = {
      filterType: 0,
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
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector('[data-component="item-appender"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector('[data-component="item-filter"]');

    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this),
    });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this),
    });
  }

  get filteredItems() {
    const { filterType, items } = this.$state;
    return items.filter(
      ({ active }) => filterType === 0 || (filterType === 1 && active) || (filterType === 2 && !active)
    );
  }

  addItem(contents) {
    const { items } = this.$state;
    const newItem = {
      seq: Math.max(0, ...items.map((v) => v.seq)) + 1,
      contents,
      active: false,
    };

    this.setState({ items: [...items, newItem] });
  }

  deleteItem(seq) {
    const items = [...this.$state.items];
    const deleteIndex = items.findIndex((v) => v.seq === seq);

    items.splice(deleteIndex, 1);
    this.setState({ items });
  }

  toggleItem(seq) {
    const items = [...this.$state.items];
    const index = items.findIndex((v) => v.seq === seq);

    items[index].active = !items[index].active;
    this.setState({ items });
  }

  filterItem(filterType) {
    this.setState({ filterType });
  }
}
