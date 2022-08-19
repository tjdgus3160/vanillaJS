// array_like, arguments, document.querySelectorAll 모두 사용 가능

function _filter(list, predi) {
  const new_list = [];

  _each(list, (item) => predi(item) && new_list.push(item));

  return new_list;
}

function _map(list, mapper) {
  const new_list = [];

  _each(list, (item) => new_list.push(mapper(item)));

  return new_list;
}

function _each(list, iter) {
  for (const item of list) {
    iter(item);
  }

  return list;
}

function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(a, b);
  };
}

function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(b, a);
  };
}

// const _get1 = _curryr((obj, key) => (obj === null ? undefined : obj[key]));

function _get() {
  const args = arguments;

  return _curryr((obj, key) => (obj === null ? undefined : obj[key])).apply(null, args);
}

function _rest(list, num = 1) {
  return Array.prototype.slice.call(list, num);
}

function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    memo = list[0];
    list = _rest(list);
  }

  _each(list, (item) => (memo = iter(memo, item)));

  return memo;
}

function _pipe() {
  const fns = arguments;

  return function (arg) {
    return _reduce(fns, (arg, fn) => fn(arg), arg);
  };
}

function _go(arg) {
  const fns = _rest(arguments);

  return _pipe.apply(null, fns)(arg);
}

module.exports = { _filter, _map, _curry, _curryr, _get, _reduce, _pipe, _go };
