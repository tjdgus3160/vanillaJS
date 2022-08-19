// ** 일급함수 + 클로저
// 반환되는 함수는 순수함수(참조만 할 뿐 변경x)
function add_maker(a) {
  return function (b) {
    return a + b;
  };
}
const add5 = add_maker(5);
add5(5); // 10

// ** 함수형 프로그래밍 코드 형태(순수함수들의 조합)
function f4(f1, f2, f3) {
  return f3(f1() + f2());
}

f4(
  function () {
    return 2;
  },
  function () {
    return 1;
  },
  function (a) {
    return a * a;
  }
);

// 객체 지향 => dog.move();
// 함수형 => move(dog);

// ** 예제
const { _filter, _map, _curry, _curryr, _get } = require("./_");

const users = [
  { id: 1, name: "ID", age: 30 },
  { id: 2, name: "BJ", age: 32 },
  { id: 3, name: "JM", age: 32 },
  { id: 4, name: "PJ", age: 27 },
  { id: 5, name: "HA", age: 25 },
  { id: 6, name: "JE", age: 26 },
  { id: 7, name: "JI", age: 31 },
  { id: 8, name: "MP", age: 23 },
];

// 30살 이상의 이름
const names = _map(
  _filter(users, (user) => user.age >= 30),
  _get("name")
);

// curry, curryr
const add = _curry((a, b) => a + b);
const sub = _curryr((a, b) => a - b);

const add3 = add(3);
const sub5 = sub(5);

add3(5); // 8
sub5(10); // 5

// _get
const get_name = _get("name");

get_name(users[1]);
