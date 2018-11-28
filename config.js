"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = exports.Firestore = undefined;

var _app = require("firebase/app");

var _app2 = _interopRequireDefault(_app);

require("firebase/firestore");

require("firebase/auth");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var config = {
  apiKey: "AIzaSyCd9cbVa3xzD5j4GMRt0EbwwRqPX1mMK14",
  authDomain: "scales-fb.firebaseapp.com",
  databaseURL: "https://scales-fb.firebaseio.com",
  projectId: "scales-fb",
  storageBucket: "scales-fb.appspot.com",
  messagingSenderId: "1093898943462"
};

var firebaseApp = _app2.default.initializeApp(config);
var firestore = firebaseApp.firestore();
firestore.settings({ timestampsInSnapshots: true });

var Firestore = (exports.Firestore = firestore);
var Auth = (exports.Auth = firebaseApp.auth());
