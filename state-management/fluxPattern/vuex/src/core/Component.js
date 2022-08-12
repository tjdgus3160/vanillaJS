import { observable, observe } from "./observer.js";

export class Component {
  state;
  props;
  $target;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
  }

  setup() {
    this.state = observable(this.initState()); // 상태 관찰

    // 상태 변경시 실행될 함수
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  setEvent() {}
  mounted() {}
}
