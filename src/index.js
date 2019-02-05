const diff = require('snapshot-diff');
const cloneDeep = require('lodash.clonedeep');

module.exports = (state, mutations) => {
  for (const key of Object.keys(mutations)) {
    test(key, () => {
      const mutation = mutations[key];
      if (typeof mutation !== 'function') {
        throw new Error(`${key} is not a function.`);
      }
      const initialState = cloneDeep(state);
      const mutableState = cloneDeep(state);
      mutation(mutableState);
      expect(diff(initialState, mutableState)).toMatchSnapshot();
    })
  }
}