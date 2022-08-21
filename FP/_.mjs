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

  for (const key of keys) {
    iter(list[key]);
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

export function _find(list, predi) {
  const keys = _keys(list);

  for (const key of keys) {
    if (!predi(list[key])) {
      continue;
    }

    return list[key];
  }
}

export function _find_index(list, predi) {
  const keys = _keys(list);

  for (let i = 0; i < keys.length; i++) {
    if (!predi(list[keys[i]])) {
      continue;
    }

    return i;
  }

  return -1;
}

export function _some(data, predi = _identity) {
  return _find_index(data, predi) !== -1;
}

export function _every(data, predi = _identity) {
  return _find_index(data, _negate(predi)) == -1;
}

export function _min(data) {
  return _reduce(data, (a, b) => (a < b ? a : b));
}

export function _max(data) {
  return _reduce(data, (a, b) => (a < b ? b : a));
}

export function _min_by(data, iter) {
  return _reduce(data, (a, b) => (iter(a) < iter(b) ? a : b));
}

export function _max_by(data, iter) {
  return _reduce(data, (a, b) => (iter(a) < iter(b) ? b : a));
}
