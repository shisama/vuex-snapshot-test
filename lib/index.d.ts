interface Base {
    [key: string]: any;
}
interface TestObject extends Base {
    type: string;
}
interface Mutations extends Base {
}
interface Store extends Base {
}
interface State extends Base {
}
declare type Tests = Array<TestObject>;
declare type Dispatches = Array<(dispatch: Function) => void>;
declare type Commits = Array<(commit: Function) => void>;
export interface Params {
    store?: Store;
    state?: State;
    mutations?: Mutations;
    tests?: Tests;
    dispatches?: Dispatches;
    commits?: Commits;
}
declare const _default: ({ store, tests, state, mutations, dispatches, commits }: Params) => void;
export default _default;
