const Vue = require('vue');
const Vuex = require('vuex');
const mutationsSnapshooter = require('.');

Vue.use(Vuex);

const state = {
  count: 0
}

const mutations = {
  increment: state => state.count++,
  decrement: state => state.count--
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