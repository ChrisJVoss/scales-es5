"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardActions = require("@material-ui/core/CardActions");

var _CardActions2 = _interopRequireDefault(_CardActions);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _styles = require("@material-ui/core/styles");

var _FiberManualRecordRounded = require("@material-ui/icons/FiberManualRecordRounded");

var _FiberManualRecordRounded2 = _interopRequireDefault(
  _FiberManualRecordRounded
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var theme = (0, _styles.createMuiTheme)({
  typography: {
    useNextVariants: true
  }
});

var styles = {
  indicatorUnstable: {
    color: "#e20000",
    boxShadow: "0px 0px 6px 1px #e20000"
  },
  indicatorStable: {
    color: "#87bb53",
    boxShadow: "0px 0px 6px 1px #87bb53"
  },
  indicator: {
    display: "block",
    borderRadius: 16,
    float: "right"
  }
};

function ScaleDisplay(props) {
  var classes = props.classes;

  return _react2.default.createElement(
    _Grid2.default,
    {
      item: true,
      xs: 12,
      sm: 6,
      lg: 3
    },
    _react2.default.createElement(
      _styles.MuiThemeProvider,
      { theme: theme },
      _react2.default.createElement(
        _Card2.default,
        null,
        _react2.default.createElement(
          _CardContent2.default,
          null,
          _react2.default.createElement(
            _Typography2.default,
            { variant: "body2", color: "textSecondary", gutterBottom: true },
            props.scaleName
          ),
          _react2.default.createElement(_FiberManualRecordRounded2.default, {
            className: classes[props.indicator] + " " + classes.indicator
          }),
          _react2.default.createElement(
            _Typography2.default,
            { variant: "h5", component: "h2" },
            props.sign + " " + props.weight,
            " " + props.units
          ),
          _react2.default.createElement(
            _Typography2.default,
            {
              variant: "body2",
              color: "textSecondary",
              style: { color: "red" }
            },
            props.wrongUnit
          ),
          _react2.default.createElement(
            _Typography2.default,
            { variant: "h6" },
            props.totalWeight
          )
        ),
        _react2.default.createElement(
          _CardActions2.default,
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              size: "small",
              color: "primary",
              onClick: function onClick() {
                return props.swapBucket(props.scaleName);
              }
            },
            "Swap Bucket"
          )
        )
      )
    )
  );
}

exports.default = (0, _styles.withStyles)(styles)(ScaleDisplay);
