const template1 = document.querySelector("#template1");
const $target = document.querySelector("custom-input");

class CustomInput extends HTMLElement {
  // shadowDOM을 사용할 경우 CSS를 캡슐화할 수 있다
  connectedCallback() {
    this.attachShadow({ mode: "open" }); // shadowRoot 열어주는 함수
    this.shadowRoot.append(
      template1.content.cloneNode(true)
    );
  }

  // HTML 작성
  render() {}

  // 변경 감시할 attrubute 지정
  static get observedAttributes() {
    return ["name"];
  }

  // 속성 변경시 실행되는 함수
  attributeChangedCallback() {
    console.log("상태 변경");
  }
}

customElements.define("custom-input", CustomInput); // custom tag 생성

setTimeout(() => $target.setAttribute("name", "b"), 3000);
