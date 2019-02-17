interface Params {
  store?: Object,
  state?: Object,
  mutations?: Object,
  tests?: Array<Object>,
  dispatches?: Array<(dispatch: Function) => void>,
  commits?: Array<(commit: Function) => void>
}
declare module "vuex-snapshot-test" {
  export default function(params: Params): void;
}
