const diff = require('snapshot-diff');

module.exports = (state, mutations) => {
  for (const key of Object.keys(mutations)) {
    test(key, () => {
      const mutation = mutations[key];
      if (typeof mutation !== 'function') {
        throw new Error(`${key} is not a function.`);
      }
      const initialState = Object.assign({}, state);
      const mutableState = Object.assign({}, state);
      mutation(mutableState);
      expect(diff(initialState, mutableState)).toMatchSnapshot();
    })
  }
}