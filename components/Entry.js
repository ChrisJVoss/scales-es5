"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _nodeMachineId = require("node-machine-id");

var _reactRedux = require("react-redux");

var _compose = require("recompose/compose");

var _compose2 = _interopRequireDefault(_compose);

var _reactRouterDom = require("react-router-dom");

var _reactRouter = require("react-router");

var _actions = require("../state/Auth/actions");

var _actions2 = require("../state/SortForms/actions");

var _styles = require("@material-ui/core/styles");

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _CircularProgress = require("@material-ui/core/CircularProgress");

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var styles = function styles(theme) {
  return {
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      display: "block",
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    button: {
      margin: theme.spacing.unit
    },
    progress: {
      margin: theme.spacing.unit * 2
    },
    noSetting: {
      display: "flex",
      justifyContent: "center"
    }
  };
};

var Entry = (function(_Component) {
  _inherits(Entry, _Component);

  function Entry(props) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(
      this,
      (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, props)
    );

    _this.state = {
      email: "",
      password: ""
    };
    _this.onEmailChange = _this.onEmailChange.bind(_this);
    _this.onPasswordChange = _this.onPasswordChange.bind(_this);
    _this.signIn = _this.signIn.bind(_this);
    return _this;
  }

  _createClass(Entry, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        var machineId = (0, _nodeMachineId.machineIdSync)({ original: true });
        this.props.getSettings(machineId);
      }
    },
    {
      key: "onEmailChange",
      value: function onEmailChange(event) {
        this.setState({ email: event.target.value });
      }
    },
    {
      key: "onPasswordChange",
      value: function onPasswordChange(event) {
        this.setState({ password: event.target.value });
      }
    },
    {
      key: "signIn",
      value: function signIn() {
        var _state = this.state,
          email = _state.email,
          password = _state.password;

        this.props.loginUser({ email: email, password: password });
      }
    },
    {
      key: "render",
      value: function render() {
        var _props = this.props,
          classes = _props.classes,
          user = _props.user,
          loading = _props.loading,
          noSettings = _props.noSettings;

        if (noSettings) {
          return _react2.default.createElement(
            "div",
            { className: classes.noSetting },
            _react2.default.createElement(
              "h5",
              null,
              "This machine is not configured. Please contact IT support to add the machine ID to Firestore."
            )
          );
        }
        if (user) {
          return _react2.default.createElement(_reactRouter.Redirect, {
            to: "/scaleUI"
          });
        }
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("h3", null, "Please sign in."),
          _react2.default.createElement(_TextField2.default, {
            className: classes.textField,
            label: "Email",
            margin: "normal",
            variant: "outlined",
            onChange: this.onEmailChange,
            value: this.state.email
          }),
          _react2.default.createElement(_TextField2.default, {
            className: classes.textField,
            label: "Password",
            margin: "normal",
            variant: "outlined",
            onChange: this.onPasswordChange,
            value: this.state.password
          }),
          this.props.loading
            ? _react2.default.createElement(_CircularProgress2.default, {
                className: classes.progress
              })
            : _react2.default.createElement(
                _Button2.default,
                {
                  className: classes.button,
                  variant: "contained",
                  color: "primary",
                  onClick: this.signIn
                },
                "Login"
              ),
          _react2.default.createElement(
            "div",
            { style: { color: "red" } },
            this.props.error
          )
        );
      }
    }
  ]);

  return Entry;
})(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var _state$auth = state.auth,
    user = _state$auth.user,
    error = _state$auth.error,
    loading = _state$auth.loading;
  var noSettings = state.sortForms.noSettings;

  return { user: user, error: error, loading: loading, noSettings: noSettings };
};

exports.default = (0, _compose2.default)(
  _reactRouterDom.withRouter,
  (0, _styles.withStyles)(styles),
  (0, _reactRedux.connect)(mapStateToProps, {
    loginUser: _actions.loginUser,
    getSettings: _actions2.getSettings
  })
)(Entry);
