"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require("./types");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var INITIAL_STATE = {
  settings: {},
  forms: [],
  fetching: false,
  pails: {},
  drumId: "",
  dateStart: "2018-01-01",
  dateEnd: "2018-12-31",
  pailWeights: {},
  pailListener: function pailListener() {},
  noSettings: false
};

exports.default = function() {
  var state =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _types.GETTING_SORT_FORMS:
      return Object.assign({}, state, { fetching: true });
    case _types.GOT_SORT_FORMS:
      return Object.assign({}, state, {
        forms: action.payload,
        fetching: false
      });
    case _types.UPLOAD_SUCCESSFUL:
      return Object.assign({}, state);
    case _types.MERGING_BUCKET:
      return Object.assign({}, state);
    case _types.UPLOADING_MERGE:
      return Object.assign({}, state);
    case _types.CREATED_PAILS:
      return Object.assign({}, state, {
        pails: Object.assign({}, state.pails, action.payload)
      });
    case _types.MERGING_BOX_TO_PAIL:
      return Object.assign({}, state);
    case _types.CREATED_DRUM:
      return Object.assign({}, state);
    case _types.SWAPPED_BUCKET:
      return Object.assign({}, state);
    case _types.GOT_PAILS:
      return Object.assign({}, state, {
        pails: Object.assign({}, state.pails, action.payload)
      });
    case _types.DATE_SET:
      return Object.assign(
        {},
        state,
        _defineProperty({}, action.payload.dateType, action.payload.date)
      );
    case _types.PAIL_WEIGHTS:
      return Object.assign({}, state, {
        pailWeights: action.payload.weights,
        pailListener: action.payload.listener
      });
    case _types.GOT_SETTINGS:
      return Object.assign({}, state, {
        settings: action.payload,
        noSettings: false
      });
    case _types.FAILED_TO_GET_SETTINGS:
      return Object.assign({}, state, { noSettings: true });
    default:
      return state;
  }
};
