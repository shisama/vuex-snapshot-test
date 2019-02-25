import Vue from "vue";
import Vuex, {ActionTree, MutationTree} from "vuex";
import snapshot from "../index";

Vue.use(Vuex);

const state = {
  counter: {
    value: 1
  }
};

type State = typeof state;

const mutations: MutationTree<State> = {
  increment: (state: State) => state.counter.value++,
  decrement: (state: State) => state.counter.value--,
  multiply: (state: State, payload: {num: number}) => {
    state.counter.value = state.counter.value * payload.num;
  }
};

const actions: ActionTree<State, State> = {
  increment: ({ commit }) => commit("increment"),
  decrement: ({ commit }) => commit("decrement"),
  multiply: ({ commit }, num: number) =>
    commit("multiply", {
      num
    })
};
// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state,
  mutations,
  actions
});

describe("test", () => {
  snapshot({
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
        type: "multiply",
        num: 5
      }
    ]
  });
  snapshot({
    store,
    dispatches: [
      dispatch => dispatch("increment"),
      dispatch => dispatch("multiply", 5)
    ]
  });
  snapshot({
    store,
    commits: [
      commit => commit("increment"),
      commit => commit("decrement"),
      commit => commit("multiply", { num: 5 })
    ]
  });
});
