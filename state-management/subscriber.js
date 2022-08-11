export default class Subscriber {
  #fn;

  constructor(subscribe) {
    // subscribe : 상태 변화 시 실행할 함수
    this.#fn = subscribe;
  }

  subscriber(publisher) {
    publisher.addSubscriber(this.#fn);
  }
}
