const diff = require('snapshot-diff');
const cloneDeep = require('lodash.clonedeep');

module.exports = ({
  state,
  mutations,
  test: tests,
}) => {
  for (const {
      type,
      ...payload
    } of tests) {
    const mutation = mutations[type];
    test(type, () => {
      if (typeof mutation !== 'function') {
        throw new Error(`${type} is not a function.`);
      }
      const initialState = cloneDeep(state);
      const mutableState = cloneDeep(state);
      console.log(type, payload, mutableState);
      mutation(mutableState, payload);
      expect(diff(initialState, mutableState)).toMatchSnapshot();
    })
  }
}