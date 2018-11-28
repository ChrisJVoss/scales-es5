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

var _reactRedux = require("react-redux");

var _compose = require("recompose/compose");

var _compose2 = _interopRequireDefault(_compose);

var _reactRouterDom = require("react-router-dom");

var _reactRouter = require("react-router");

var _styles = require("@material-ui/core/styles");

var _actions = require("../state/SortForms/actions");

var _Table = require("@material-ui/core/Table");

var _Table2 = _interopRequireDefault(_Table);

var _TableBody = require("@material-ui/core/TableBody");

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableCell = require("@material-ui/core/TableCell");

var _TableCell2 = _interopRequireDefault(_TableCell);

var _TableHead = require("@material-ui/core/TableHead");

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TableRow = require("@material-ui/core/TableRow");

var _TableRow2 = _interopRequireDefault(_TableRow);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _Print = require("@material-ui/icons/Print");

var _Print2 = _interopRequireDefault(_Print);

var _ArrowBack = require("@material-ui/icons/ArrowBack");

var _ArrowBack2 = _interopRequireDefault(_ArrowBack);

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

var theme = (0, _styles.createMuiTheme)({
  typography: {
    useNextVariants: true
  }
});

var styles = function styles(theme) {
  return {
    "@media print": {
      root: {
        width: "100%",
        height: "100%"
      },
      noPrint: {
        display: "none"
      }
    },
    header: { fontWeight: 700, color: "black" },
    noPrint: {
      marginTop: 15,
      marginBottom: 15,
      marginRight: 10
    }
  };
};

var ReportGenerator = (function(_Component) {
  _inherits(ReportGenerator, _Component);

  function ReportGenerator(props) {
    _classCallCheck(this, ReportGenerator);

    var _this = _possibleConstructorReturn(
      this,
      (
        ReportGenerator.__proto__ || Object.getPrototypeOf(ReportGenerator)
      ).call(this, props)
    );

    _this.state = {
      goBack: false
    };
    _this.onBackClick = _this.onBackClick.bind(_this);
    _this.createRows = _this.createRows.bind(_this);
    return _this;
  }

  _createClass(ReportGenerator, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {}
    },
    {
      key: "onBackClick",
      value: function onBackClick() {
        this.setState({ goBack: true });
      }
    },
    {
      key: "createRows",
      value: function createRows(sortForms) {
        console.log(sortForms);
        return sortForms.map(function(form) {
          return _react2.default.createElement(
            _TableRow2.default,
            { key: form.BoxId },
            _react2.default.createElement(
              _TableCell2.default,
              { numeric: true },
              form.BoxId
            ),
            _react2.default.createElement(
              _TableCell2.default,
              null,
              form.SortedBy
            ),
            _react2.default.createElement(
              _TableCell2.default,
              { numeric: true },
              form.Contents.Alkaline ? form.Contents.Alkaline : 0
            ),
            _react2.default.createElement(
              _TableCell2.default,
              { numeric: true },
              form.Contents.NiCd ? form.Contents.NiCd : 0
            ),
            _react2.default.createElement(
              _TableCell2.default,
              { numeric: true },
              form.Contents["Ni-MH"] ? form.Contents["Ni-MH"] : 0
            ),
            _react2.default.createElement(
              _TableCell2.default,
              { numeric: true },
              form.Contents["Li-Ion"] ? form.Contents["Li-Ion"] : 0
            ),
            _react2.default.createElement(
              _TableCell2.default,
              { numeric: true },
              form.Contents.Lithium ? form.Contents.Lithium : 0
            ),
            _react2.default.createElement(
              _TableCell2.default,
              { numeric: true },
              form.Contents.Lead ? form.Contents.Lead : 0
            ),
            _react2.default.createElement(
              _TableCell2.default,
              { numeric: true },
              form.Contents.Other ? form.Contents.Other : 0
            ),
            _react2.default.createElement(
              _TableCell2.default,
              { numeric: true },
              form.TotalWeight
            ),
            _react2.default.createElement(
              _TableCell2.default,
              { numeric: true },
              form.CellPhoneCount
            )
          );
        });
      }
    },
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        console.log(this.props.forms);
        var classes = this.props.classes;

        if (this.state.goBack) {
          return _react2.default.createElement(_reactRouter.Redirect, {
            to: "/scaleUI"
          });
        }
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            _Button2.default,
            { className: classes.noPrint, onClick: this.onBackClick },
            _react2.default.createElement(_ArrowBack2.default, null)
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              className: classes.noPrint,
              onClick: function onClick() {
                return window.print();
              }
            },
            _react2.default.createElement(_Print2.default, null)
          ),
          _react2.default.createElement(_TextField2.default, {
            id: "date1",
            label: "From Date",
            type: "date",
            value: this.props.dateStart,
            onChange: function onChange(event) {
              return _this2.props.setDate("dateStart", event.target.value);
            },
            className: classes.noPrint
          }),
          _react2.default.createElement(_TextField2.default, {
            id: "date2",
            label: "To Date",
            type: "date",
            value: this.props.dateEnd,
            onChange: function onChange(event) {
              return _this2.props.setDate("dateEnd", event.target.value);
            },
            className: classes.noPrint
          }),
          _react2.default.createElement(
            _Button2.default,
            {
              className: classes.noPrint,
              color: "primary",
              variant: "contained",
              onClick: function onClick() {
                return _this2.props.getSortForms(
                  _this2.props.dateStart,
                  _this2.props.dateEnd
                );
              }
            },
            "Get Forms"
          ),
          _react2.default.createElement(
            _Typography2.default,
            { style: { float: "right" } },
            "Units: lbs"
          ),
          _react2.default.createElement(
            _Table2.default,
            { padding: "dense", className: classes.root },
            _react2.default.createElement(
              _TableHead2.default,
              null,
              _react2.default.createElement(
                _TableRow2.default,
                null,
                _react2.default.createElement(
                  _TableCell2.default,
                  { numeric: true, className: classes.header },
                  "C2R"
                ),
                _react2.default.createElement(
                  _TableCell2.default,
                  { className: classes.header },
                  "Sorted By"
                ),
                _react2.default.createElement(
                  _TableCell2.default,
                  { numeric: true, className: classes.header },
                  "Alk"
                ),
                _react2.default.createElement(
                  _TableCell2.default,
                  { numeric: true, className: classes.header },
                  "NiCd"
                ),
                _react2.default.createElement(
                  _TableCell2.default,
                  { numeric: true, className: classes.header },
                  "Ni-MH"
                ),
                _react2.default.createElement(
                  _TableCell2.default,
                  { numeric: true, className: classes.header },
                  "Li-Ion"
                ),
                _react2.default.createElement(
                  _TableCell2.default,
                  { numeric: true, className: classes.header },
                  "Lithium"
                ),
                _react2.default.createElement(
                  _TableCell2.default,
                  { numeric: true, className: classes.header },
                  "SSLA"
                ),
                _react2.default.createElement(
                  _TableCell2.default,
                  { numeric: true, className: classes.header },
                  "Other"
                ),
                _react2.default.createElement(
                  _TableCell2.default,
                  { numeric: true, className: classes.header },
                  "Total"
                ),
                _react2.default.createElement(
                  _TableCell2.default,
                  { numeric: true, className: classes.header },
                  "Cell Phones"
                )
              )
            ),
            _react2.default.createElement(
              _TableBody2.default,
              null,
              this.createRows(this.props.forms)
            )
          )
        );
      }
    }
  ]);

  return ReportGenerator;
})(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var _state$sortForms = state.sortForms,
    forms = _state$sortForms.forms,
    dateStart = _state$sortForms.dateStart,
    dateEnd = _state$sortForms.dateEnd;

  console.log(forms);
  return { forms: forms, dateStart: dateStart, dateEnd: dateEnd };
};

exports.default = (0, _compose2.default)(
  _reactRouterDom.withRouter,
  (0, _styles.withStyles)(styles, { theme: theme }),
  (0, _reactRedux.connect)(mapStateToProps, {
    getSortForms: _actions.getSortForms,
    setDate: _actions.setDate
  })
)(ReportGenerator);
