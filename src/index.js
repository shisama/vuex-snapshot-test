const diff = require('snapshot-diff');

module.exports = (state, mutations) => {
  for (const mutation in mutations) {
    const name = `${mutation}`;
    test(name, () => {
      const initialState = Object.assign({}, state);
      const mutatedState = Object.assign({}, state);
      mutations[name](mutatedState);
      expect(diff(initialState, mutatedState)).toMatchSnapshot();
    })
  }
}