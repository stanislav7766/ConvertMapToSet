'use strict';

const compose = (...funcs) =>
  (...args) => (funcs.reduce((args, fn) => [fn(...args)], args));

const functorConverter = map => {
  const f = obj => {
    const newMap = new Map();
    for (const key in obj) newMap.set(key, obj[key]);
    return functorConverter(newMap);
  };
  f.getMap = () => map;
  f.getMapKeys = () => map.keys();// return iterable obj of keys
  f.getMapValues = () => map.values();
  f.getMapKV = () => [map.keys(), map.values()];
  f.printElems = args => { // args - mapIterator
    const elems = [...args];
    console.log('elems: ', ...elems);
    return elems;
  };
  f.createSet = (elems) => {
  //if printElems in compose, elems-[]
  //else elems - mapIterator
    const set = new Set();
    for (const elem of elems) set.add(elem);
    return set;
  };
  f.createSetKV = (elems) => {
    const keys = [];
    const values = [];
    for (const elem of elems[0]) keys.push(elem);
    for (const elem of elems[1]) values.push(elem);
    const set = new Set();
    keys.forEach((el, i) => set.add([el, values[i]]));
    return set;
  };
  f.mapKVToSet = () => compose(f.getMapKV, f.printElems, f.createSetKV)();
  f.mapKeysToSet = () => compose(f.getMapKeys, f.printElems, f.createSet)();
  f.mapValuesToSet = () => compose(f.getMapValues, f.printElems, f.createSet)();
  return f;
};

//usage

const converter = functorConverter()({ a: [1, 2], b: { b1: 1, b2: 2 }, c: 3 });
const set = converter.mapKVToSet();
console.log(set);
// const setOfKeys = converter.mapKeysToSet();
// console.log(setOfKeys);
// const setOfValues = converter.mapValuesToSet();
// console.log(setOfValues);
