"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _redux = require("redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require("./state/Auth/reducers");

var _reducers2 = _interopRequireDefault(_reducers);

var _reducers3 = require("./state/SortForms/reducers");

var _reducers4 = _interopRequireDefault(_reducers3);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var store = (exports.store = (0, _redux.createStore)(
  (0, _redux.combineReducers)({
    auth: _reducers2.default,
    sortForms: _reducers4.default
  }),
  (0, _redux.applyMiddleware)(_reduxThunk2.default)
));
