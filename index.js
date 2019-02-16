const diff = require("snapshot-diff");
const cloneDeep = require("lodash.clonedeep");

module.exports = ({ state, mutations, tests = [] }) => {
  for (const { type, ...payload } of tests) {
    const mutation = mutations[type];
    test(type, () => {
      if (typeof mutation !== "function") {
        throw new Error(`${type} is not a function.`);
      }
      const mutableState = cloneDeep(state);
      mutation(mutableState, payload);
      expect(
        diff(state, mutableState, {
          expand: true,
          aAnnotation: "Before",
          bAnnotation: "After"
        })
      ).toMatchSnapshot();
    });
  }
};
