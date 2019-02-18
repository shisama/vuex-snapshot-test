import Vue from "vue";
import Vuex from "vuex";
import snapshot from "../index";

Vue.use(Vuex);

const state = {
  counter: {
    value: 1
  }
};

type State = typeof state;

interface Action {
  commit: Function;
}

const mutations = {
  increment: (state: State) => state.counter.value++
};

const actions = {
  increment: ({ commit }: Action) => commit("increment")
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
