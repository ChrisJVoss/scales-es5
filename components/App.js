"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Entry = require("./Entry.js");

var _Entry2 = _interopRequireDefault(_Entry);

var _ScaleUI = require("./ScaleUI");

var _ScaleUI2 = _interopRequireDefault(_ScaleUI);

var _ReportGenerator = require("./ReportGenerator");

var _ReportGenerator2 = _interopRequireDefault(_ReportGenerator);

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _store = require("../store");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var App = function App() {
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: _store.store },
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/",
        component: _Entry2.default
      }),
      _react2.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/scaleUI",
        component: _ScaleUI2.default
      }),
      _react2.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/report",
        component: _ReportGenerator2.default
      })
    )
  );
}; /*eslint no-console: ["error", { allow: ["error", "log"] }] */
exports.default = App;
