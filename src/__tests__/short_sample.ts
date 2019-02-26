import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import Vuex, { ActionTree, MutationTree } from "vuex";
import snapshot from "../index";

Vue.use(Vuex);

const state = {
  counter: {
    value: 0
  }
};

type State = typeof state;

const mutations: MutationTree<State> = {
  increment: (state: State) => state.counter.value++
};

const actions: ActionTree<State, State> = {
  increment: ({ commit }) => commit("increment")
};
// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state,
  mutations,
  actions
});

snapshot({
  store,
  dispatches: [dispatch => dispatch("increment")]
});
