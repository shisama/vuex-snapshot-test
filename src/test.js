const diff = require('snapshot-diff');
const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

const state = {
  count: 0
}

const mutations = {
  increment: state => state.count++,
  decrement: state => state.count--
}

const actions = {
  increment: ({commit}) => commit('increment'),
  decrement: ({commit}) => commit('decrement')
}

const store = new Vuex.Store({state, mutations, actions});

for (const mutation in mutations) {
  const name = `${mutation}`;
  test(name, () => {
    const initialState = Object.assign({}, state);
    const mutatedState = Object.assign({}, state);
    mutations[name](mutatedState);
    expect(diff(initialState, mutatedState)).toMatchSnapshot();
  })
}