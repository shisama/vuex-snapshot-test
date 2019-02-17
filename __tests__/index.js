const Vue = require("vue");
const Vuex = require("vuex");
const tester = require("..");

Vue.use(Vuex);

const state = {
  counter: {
    value: 1
  }
};

const mutations = {
  increment: state => state.counter.value++,
  decrement: state => state.counter.value--,
  multiple: (state, payload) => {
    state.counter.value = state.counter.value * payload.weight;
  }
};

const actions = {
  increment: ({ commit }) => commit("increment"),
  decrement: ({ commit }) => commit("decrement"),
  multiple: ({ commit }, weight) =>
    commit("multiple", {
      weight
    })
};
// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state,
  mutations,
  actions
});

describe("test vuex-snapshot-test", () => {
  tester({
    state: {
      counter: {
        value: 3
      }
    },
    mutations,
    tests: [
      {
        type: "increment"
      },
      {
        type: "multiple",
        weight: 5
      }
    ]
  });
  tester({
    store,
    dispatches: [
      dispatch => dispatch("increment"),
      dispatch => dispatch("multiple", 5)
    ]
  });
  tester({
    store,
    commits: [
      commit => commit("increment"),
      commit => commit("decrement"),
      commit => commit("multiple", { weight: 5 })
    ]
  });
});
