"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require("./types");

var INITIAL_STATE = {
  user: null,
  error: "",
  loading: false
};

exports.default = function() {
  var state =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _types.LOGIN_USER:
      return Object.assign({}, state, { loading: true, error: "" });
    case _types.LOGIN_USER_SUCCESS:
      return Object.assign({}, INITIAL_STATE, { user: action.payload });
    case _types.LOGIN_USER_FAIL:
      return Object.assign({}, INITIAL_STATE, {
        error: "Invalid Email or Password",
        loading: false
      });
    case _types.LOGOUT_USER:
      return Object.assign({}, { user: null, error: "", loading: false });
    default:
      return state;
  }
};
