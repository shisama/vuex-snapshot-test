const diff = require("snapshot-diff");
const cloneDeep = require("lodash.clonedeep");

module.exports = param => {
  const { store, tests, state, mutations, dispatches, commits } = param;
  if (!!store && !!store.state && !!store.dispatch && !!dispatches) {
    const dispatch = store.dispatch;
    for (const cb of dispatches) {
      let type = "";
      // eslint-disable-next-line standard/no-callback-literal
      cb(_type => (type = _type));
      it(type, () => {
        const initialState = cloneDeep(store.state);
        cb(dispatch);
        expect(
          diff(initialState, store.state, {
            expand: true,
            aAnnotation: "Before",
            bAnnotation: "After"
          })
        ).toMatchSnapshot();
        for (const [key, value] of Object.entries(initialState)) {
          store.state[key] = value;
        }
      });
    }
  } else if (!!store && !!store.state && !!store.commit && !!commits) {
    const commit = store.commit;
    for (const cb of commits) {
      let type = "";
      // eslint-disable-next-line standard/no-callback-literal
      cb(_type => (type = _type));
      it(type, () => {
        const initialState = cloneDeep(store.state);
        cb(commit);
        expect(
          diff(initialState, store.state, {
            expand: true,
            aAnnotation: "Before",
            bAnnotation: "After"
          })
        ).toMatchSnapshot();
        for (const [key, value] of Object.entries(initialState)) {
          store.state[key] = value;
        }
      });
    }
  } else if (!store && !!state && !!mutations) {
    for (const { type, ...payload } of tests) {
      const mutation = mutations[type];
      test(type, () => {
        if (typeof mutation !== "function") {
          throw new Error(`${type} is not a function.`);
        }
        let mutableState = cloneDeep(state);
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
  } else {
    throw Error("Error: You have to pass correct parameters");
  }
};
