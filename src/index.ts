import diff from "snapshot-diff";
import cloneDeep from "lodash.clonedeep";

interface Base {
  [key: string]: any;
}
interface TestObject extends Base {
  type: string;
}
interface Mutations extends Base {}

interface Store extends Base {}

interface State extends Base {}

type Tests = Array<TestObject>;

type Dispatches = Array<(dispatch: Function) => void>;

type Commits = Array<(commit: Function) => void>;

export interface Params {
  store?: Store;
  state?: State;
  mutations?: Mutations;
  tests?: Tests;
  dispatches?: Dispatches;
  commits?: Commits;
}

const snapshotStateDiff = <S>(initialState: S, mutableState: S) => {
  expect(
    diff(initialState, mutableState, {
      expand: true,
      aAnnotation: "Before",
      bAnnotation: "After"
    })
  ).toMatchSnapshot();
};

const dispatchOrCommit = (
  store: Store,
  fn: Function,
  callbacks: Dispatches | Commits
) => {
  for (const cb of callbacks) {
    let type = "";
    // eslint-disable-next-line standard/no-callback-literal
    cb((_type: string) => (type = _type));
    it(type, () => {
      const initialState = cloneDeep(store.state);
      cb(fn);
      snapshotStateDiff(initialState, store.state);
      store.replaceState(initialState);
    });
  }
};

const testDispatches = (store: Store, dispatches: Dispatches) => {
  dispatchOrCommit(store, store.dispatch, dispatches);
};

const testCommits = (store: Store, commits: Commits) => {
  dispatchOrCommit(store, store.commit, commits);
};

export default ({
  store,
  tests,
  state,
  mutations,
  dispatches,
  commits
}: Params) => {
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
