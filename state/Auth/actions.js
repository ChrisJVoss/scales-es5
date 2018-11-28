"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutUser = exports.loginUser = undefined;

var _types = require("./types");

var _config = require("../../config");

var loginUser = (exports.loginUser = function loginUser(_ref) {
  var email = _ref.email,
    password = _ref.password;

  console.log("login", email, password);
  return function(dispatch) {
    dispatch({ type: _types.LOGIN_USER });
    _config.Auth.signInWithEmailAndPassword(email, password)
      .then(function(user) {
        console.log("1", user);
        loginUserSuccess(dispatch, user);
      })
      .catch(function(error) {
        console.log("2", error);
        loginUserFail(dispatch);
      });
  };
});

var loginUserSuccess = function loginUserSuccess(dispatch, user) {
  console.log("success", user);
  dispatch({
    type: _types.LOGIN_USER_SUCCESS,
    payload: user
  });
};

var loginUserFail = function loginUserFail(dispatch) {
  dispatch({ type: _types.LOGIN_USER_FAIL });
};

var logoutUser = (exports.logoutUser = function logoutUser() {
  _config.Auth.signOut();
  return { type: _types.LOGOUT_USER };
});
