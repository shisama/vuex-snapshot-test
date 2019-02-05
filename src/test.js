const Vue = require('vue');
const Vuex = require('vuex');
const mutationsSnapshooter = require('.');

Vue.use(Vuex);

const state = {
  counter: {
    value: 0
  }
}

const mutations = {
  increment: state => state.counter.value++,
  decrement: state => state.counter.value--
}

const actions = {
  increment: ({
    commit
  }) => commit('increment'),
  decrement: ({
    commit
  }) => commit('decrement')
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

mutationsSnapshooter(state, mutations);