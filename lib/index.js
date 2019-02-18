"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var snapshot_diff_1 = __importDefault(require("snapshot-diff"));
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var snapshotStateDiff = function (initialState, mutableState) {
    expect(snapshot_diff_1.default(initialState, mutableState, {
        expand: true,
        aAnnotation: "Before",
        bAnnotation: "After"
    })).toMatchSnapshot();
};
var dispatchOrCommit = function (store, fn, callbacks) {
    var _loop_1 = function (cb) {
        var type = "";
        cb(function (_type) { return (type = _type); });
        it(type, function () {
            var initialState = lodash_clonedeep_1.default(store.state);
            cb(fn);
            snapshotStateDiff(initialState, store.state);
            for (var _i = 0, _a = Object.entries(initialState); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                store.state[key] = value;
            }
        });
    };
    for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
        var cb = callbacks_1[_i];
        _loop_1(cb);
    }
};
var testDispatches = function (store, dispatches) {
    dispatchOrCommit(store, store.dispatch, dispatches);
};
var testCommits = function (store, commits) {
    dispatchOrCommit(store, store.commit, commits);
};
exports.default = (function (_a) {
    var store = _a.store, tests = _a.tests, state = _a.state, mutations = _a.mutations, dispatches = _a.dispatches, commits = _a.commits;
    if (!!store && !!dispatches) {
        testDispatches(store, dispatches);
    }
    else if (!!store && !!commits) {
        testCommits(store, commits);
    }
    else if (!store && !!state && !!mutations && !!tests) {
        var _loop_2 = function (_b) {
            var type = _b.type, payload = __rest(_b, ["type"]);
            var mutation = mutations[type];
            it(type, function () {
                if (typeof mutation !== "function") {
                    throw new Error(type + " is not a function.");
                }
                var mutableState = lodash_clonedeep_1.default(state);
                mutation(mutableState, payload);
                snapshotStateDiff(state, mutableState);
            });
        };
        for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
            var _b = tests_1[_i];
            _loop_2(_b);
        }
    }
    else {
        throw Error("Error: You have to pass correct parameters");
    }
});
