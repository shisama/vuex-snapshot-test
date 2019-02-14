const Vue = require('vue');
const Vuex = require('vuex');
const tester = require('..');

Vue.use(Vuex);

const state = {
  counter: {
    value: 1
  }
}

const mutations = {
  increment: state => state.counter.value++,
  decrement: state => state.counter.value--,
  multiple: (state, payload) => state.counter.value = state.counter.value * payload.weight
}

const actions = {
  increment: ({
    commit
  }) => commit('increment'),
  decrement: ({
    commit
  }) => commit('decrement'),
  multiple: ({
    commit
  }) => commit('multiple')
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

tester({
  state,
  mutations,
  tests: [{
      type: 'increment'
    },
    {
      type: 'multiple',
      weight: 5
    }
  ]
});