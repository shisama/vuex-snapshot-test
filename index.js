const diff = require("snapshot-diff");
const cloneDeep = require("lodash.clonedeep");

const snapshotStateDiff = (initialState, mutableState) => {
  expect(
    diff(initialState, mutableState, {
      expand: true,
      aAnnotation: "Before",
      bAnnotation: "After"
    })
  ).toMatchSnapshot();
};

const dispatchOrCommit = (store, fn, callbacks) => {
  for (const cb of callbacks) {
    let type = "";
    // eslint-disable-next-line standard/no-callback-literal
    cb(_type => (type = _type));
    it(type, () => {
      const initialState = cloneDeep(store.state);
      cb(fn);
      snapshotStateDiff(initialState, store.state);
      for (const [key, value] of Object.entries(initialState)) {
        store.state[key] = value;
      }
    });
  }
};

const testDispatches = (store, dispatches) => {
  dispatchOrCommit(store, store.dispatch, dispatches);
};

const testCommits = (store, commits) => {
  dispatchOrCommit(store, store.commit, commits);
};

module.exports = ({ store, tests, state, mutations, dispatches, commits }) => {
  if (!!store && !!dispatches) {
    testDispatches(store, dispatches);
  } else if (!!store && !!commits) {
    testCommits(store, commits);
  } else if (!store && !!state && !!mutations && !!tests) {
    for (const { type, ...payload } of tests) {
      const mutation = mutations[type];
      it(type, () => {
        if (typeof mutation !== "function") {
          throw new Error(`${type} is not a function.`);
        }
        let mutableState = cloneDeep(state);
        mutation(mutableState, payload);
        snapshotStateDiff(state, mutableState);
      });
    }
  } else {
    throw Error("Error: You have to pass correct parameters");
  }
};
