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

module.exports = { _filter, _map, _each };
