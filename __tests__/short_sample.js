const Vue = require("vue");
const Vuex = require("vuex");
const snapshot = require("..");

Vue.use(Vuex);

const state = {
  counter: {
    value: 1
  }
};

const mutations = {
  increment: state => state.counter.value++
};

const actions = {
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
