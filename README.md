# vuex-snapshot-test
Snapshot testing library for Vuex.
Inspired by [reducer-tester](https://github.com/akameco/reducer-tester)

## TL;DR

Test Code

```js
import snapshot from "vuex-snapshot-test";
import store from "@/store";

snapshot({
  store, // state: 1
  dispatches: [dispatch => dispatch("increment")]
});
```

Snapshot

```diff
exports[`increment 1`] = `
"Snapshot Diff:
- Before
+ After

  Object {
    \\"counter\\": Object {
-     \\"value\\": 1,
+     \\"value\\": 2,
    },
  }"
`;
```


## Install

```
npm install --save-dev vuex-snapshot-test
```

or

```
yarn add --dev vuex-snapshot-test
```


## Usage

Vuex Store

```js
// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  counter: {
    value: 1
  }
};

const mutations = {
  increment: state => state.counter.value++,
  decrement: state => state.counter.value--,
  multiply: (state, payload) => {
    state.counter.value = state.counter.value * payload.num;
  }
};

const actions = {
  increment: ({ commit }) => commit("increment"),
  decrement: ({ commit }) => commit("decrement"),
  multiply: ({ commit }, num) =>
    commit("multiply", {
      num
    })
};
const store = new Vuex.Store({
  state,
  mutations,
  actions
});
```

Test Code

```js
// store.test.js
import snapshot from "vuex-snapshot-test";
import store from "@/store";

describe("test_describe", () => {
  // pass state, mutations, and tests parameters.
  snapshot({
    state: {
      counter: {
        value: 1
      }
    },
    mutations,
    tests: [
      {
        type: "increment"
      },
      {
        type: "multiply",
        num: 5
      }
    ]
  });

  // pass store and dispatches parameters.
  snapshot({
    store,
    dispatches: [
      dispatch => dispatch("increment"),
      dispatch => dispatch("multiply", 5)
    ]
  });

  // pass store and commits parameters.
  snapshot({
    store,
    commits: [
      commit => commit("increment"),
      commit => commit("decrement"),
      commit => commit("multiply", { num: 5 })
    ]
  });
});

```

Snapshot

```diff
exports[`test_describe decrement 1`] = `
"Snapshot Diff:
- Before
+ After

  Object {
    \\"counter\\": Object {
-     \\"value\\": 1,
+     \\"value\\": 0,
    },
  }"
`;

exports[`test_describe increment 1`] = `
"Snapshot Diff:
- Before
+ After

  Object {
    \\"counter\\": Object {
-     \\"value\\": 1,
+     \\"value\\": 2,
    },
  }"
`;

exports[`test_describe increment 2`] = `
"Snapshot Diff:
- Before
+ After

  Object {
    \\"counter\\": Object {
-     \\"value\\": 1,
+     \\"value\\": 2,
    },
  }"
`;

exports[`test_describe increment 3`] = `
"Snapshot Diff:
- Before
+ After

  Object {
    \\"counter\\": Object {
-     \\"value\\": 1,
+     \\"value\\": 2,
    },
  }"
`;

exports[`test_describe multiply 1`] = `
"Snapshot Diff:
- Before
+ After

  Object {
    \\"counter\\": Object {
-     \\"value\\": 1,
+     \\"value\\": 5,
    },
  }"
`;

exports[`test_describe multiply 2`] = `
"Snapshot Diff:
- Before
+ After

  Object {
    \\"counter\\": Object {
-     \\"value\\": 1,
+     \\"value\\": 5,
    },
  }"
`;

exports[`test_describe multiply 3`] = `
"Snapshot Diff:
- Before
+ After

  Object {
    \\"counter\\": Object {
-     \\"value\\": 1,
+     \\"value\\": 5,
    },
  }"
`;
```


## Contributing
Issues and Pull requests are welcome ;)

## License
This project is licensed under the terms of the
[MIT license](./LICENSE)
