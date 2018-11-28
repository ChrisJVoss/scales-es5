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

var _compose = require("recompose/compose");

var _compose2 = _interopRequireDefault(_compose);

var _reactRedux = require("react-redux");

var _actions = require("../state/SortForms/actions");

var _styles = require("@material-ui/core/styles");

var _Paper = require("@material-ui/core/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

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

var styles = {
  root: { margin: 50 }
};

var DrumModal = (function(_Component) {
  _inherits(DrumModal, _Component);

  function DrumModal() {
    _classCallCheck(this, DrumModal);

    return _possibleConstructorReturn(
      this,
      (DrumModal.__proto__ || Object.getPrototypeOf(DrumModal)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(DrumModal, [
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(
          _Paper2.default,
          { className: classes.root },
          _react2.default.createElement("h3", null, "This is a modal!"),
          _react2.default.createElement(_TextField2.default, {
            value: this.props.drumId,
            onChange: function onChange(event) {
              return _this2.props.handleDrumIdChange(event);
            }
          })
        );
      }
    }
  ]);

  return DrumModal;
})(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var drumId = state.SortForms.drumId;

  return { drumId: drumId };
};

exports.default = (0, _compose2.default)(
  (0, _styles.withStyles)(styles),
  (0, _reactRedux.connect)(mapStateToProps, {
    handleDrumIdChange: _actions.handleDrumIdChange
  })
)(DrumModal);
