// array_like, arguments, document.querySelectorAll 모두 사용 가능

export function _filter(list, predi) {
  const new_list = [];

  _each(list, (item) => predi(item) && new_list.push(item));

  return new_list;
}

export function _map(list, mapper) {
  const new_list = [];

  _each(list, (item) => new_list.push(mapper(item)));

  return new_list;
}

export function _each(list, iter) {
  const keys = _keys(list);

  for (let i = 0; i < keys.length; i++) {
    iter(list[keys[i]]);
  }

  return list;
}

export function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(a, b);
  };
}

export function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2 ? fn(a, b) : (b) => fn(b, a);
  };
}

// const _get1 = _curryr((obj, key) => (obj === null ? undefined : obj[key]));

export function _get() {
  const args = arguments;

  return _curryr((obj, key) => (obj === null ? undefined : obj[key])).apply(null, args);
}

export function _rest(list, num = 1) {
  return Array.prototype.slice.call(list, num);
}

export function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    memo = list[0];
    list = _rest(list);
  }

  _each(list, (item) => (memo = iter(memo, item)));

  return memo;
}

export function _pipe() {
  const fns = arguments;

  return function (arg) {
    return _reduce(fns, (arg, fn) => fn(arg), arg);
  };
}

export function _go(arg) {
  const fns = _rest(arguments);

  return _pipe.apply(null, fns)(arg);
}

export function _keys(obj) {
  return typeof obj === "object" ? Object.keys(obj) : [];
}

function _identity(val) {
  return val;
}

export function _values(data) {
  return _map(data, _identity);
}

export function _pluck(data, key) {
  return _map(data, _get(key));
}

function _negate(func) {
  return function (val) {
    return !func(val);
  };
}

export function _reject(data, predi) {
  return _filter(data, _negate(predi));
}

export function _compact(data) {
  return _filter(data, _identity);
}
