"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(
  _possibleConstructorReturn2
);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _nodeMachineId = require("node-machine-id");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

var _serialport = require("serialport");

var _serialport2 = _interopRequireDefault(_serialport);

var _compose = require("recompose/compose");

var _compose2 = _interopRequireDefault(_compose);

var _reactRouterDom = require("react-router-dom");

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _electron = require("electron");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _actions = require("../state/SortForms/actions");

var _actions2 = require("../state/Auth/actions");

var _parserReadline = require("@serialport/parser-readline");

var _parserReadline2 = _interopRequireDefault(_parserReadline);

var _ScaleDisplayCard = require("./ScaleDisplayCard");

var _ScaleDisplayCard2 = _interopRequireDefault(_ScaleDisplayCard);

var _styles = require("@material-ui/core/styles");

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Modal = require("@material-ui/core/Modal");

var _Modal2 = _interopRequireDefault(_Modal);

var _Paper = require("@material-ui/core/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _ArrowForward = require("@material-ui/icons/ArrowForward");

var _ArrowForward2 = _interopRequireDefault(_ArrowForward);

var _ExitToApp = require("@material-ui/icons/ExitToApp");

var _ExitToApp2 = _interopRequireDefault(_ExitToApp);

var _yellow = require("@material-ui/core/colors/yellow");

var _yellow2 = _interopRequireDefault(_yellow);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var styles = function styles(theme) {
  return {
    button: {
      margin: theme.spacing.unit
    },
    yellowButton: {
      color: "#000000",
      backgroundColor: _yellow2.default[500],
      "&:hover": {
        backgroundColor: _yellow2.default[700]
      }
    },
    barCode: { margin: 10, width: "100%", maxWidth: 350, paddingRight: 10 },
    rootModal: {
      width: 150,
      height: 150,
      transform: "translate(-50%, -50%)"
    }
  };
}; /*eslint no-console: ["error", { allow: ["error", "log"] }] */

var ScaleUI = (function(_Component) {
  (0, _inherits3.default)(ScaleUI, _Component);

  function ScaleUI(props) {
    (0, _classCallCheck3.default)(this, ScaleUI);

    var _this = (0, _possibleConstructorReturn3.default)(
      this,
      (ScaleUI.__proto__ || (0, _getPrototypeOf2.default)(ScaleUI)).call(
        this,
        props
      )
    );

    _this.state = {
      machineId: "",
      parser: new _parserReadline2.default({ delimiter: "\r\n" }),
      scalePorts: {},
      unitOfMeasurement: _this.props.settings.units,
      bucketSwaps: {},
      boxes: [],
      chemistries: _this.props.settings.chemistries,
      pailToSwap: "",
      chemToSwap: "",
      goToReport: false,
      boxId: "",
      scanDrumModalOpen: false,
      drumId: "",
      cellCountModalOpen: false,
      cellCount: ""
    };
    _this.zeroOut = _this.zeroOut.bind(_this);
    _this.boxCompleteClick = _this.boxCompleteClick.bind(_this);
    _this.sendNetWeight = _this.sendNetWeight.bind(_this);
    _this.sendGrossWeight = _this.sendGrossWeight.bind(_this);
    _this.sendTareWeight = _this.sendTareWeight.bind(_this);
    _this.unitSelector = _this.unitSelector.bind(_this);
    _this.swapBucket = _this.swapBucket.bind(_this);
    _this.convertToCorrectUnits = _this.convertToCorrectUnits.bind(_this);
    _this.goToForms = _this.goToForms.bind(_this);
    _this.onboxIdChange = _this.onboxIdChange.bind(_this);
    _this.zeroAllScales = _this.zeroAllScales.bind(_this);
    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleOpen = _this.handleOpen.bind(_this);
    _this.handleDrumIdChange = _this.handleDrumIdChange.bind(_this);
    _this.submitPailSwap = _this.submitPailSwap.bind(_this);
    _this.handleCellCountChange = _this.handleCellCountChange.bind(_this);
    _this.submitBoxComplete = _this.submitBoxComplete.bind(_this);
    _this.handleBoxCompleteOpen = _this.handleBoxCompleteOpen.bind(_this);
    _this.onExitClick = _this.onExitClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ScaleUI, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.helper();
        var machineId = (0, _nodeMachineId.machineIdSync)({ original: true });
        this.setState(
          { machineId: machineId },
          this.props.getPails(machineId, this.state.chemistries)
        );
        this.props.getPailWeights(machineId);
      }
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.pailListener();
        for (var scale in this.state.scalePorts) {
          var path = this.state.scalePorts[scale].portPath;
          path.close();
        }
      }
    },
    {
      key: "helper",
      value: (function() {
        var _ref = (0, _asyncToGenerator3.default)(
          /*#__PURE__*/ _regenerator2.default.mark(function _callee() {
            var allPorts, filteredPorts;
            return _regenerator2.default.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _context.next = 2;
                      return _serialport2.default.list();

                    case 2:
                      allPorts = _context.sent;
                      filteredPorts = {};

                      console.log(allPorts);
                      allPorts.forEach(function(port) {
                        if (
                          port.manufacturer === "FTDI" ||
                          port.manufacturer === "Prolific Technology Inc."
                        ) {
                          filteredPorts[port.locationId] = (0,
                          _assign2.default)(
                            {
                              portPath: new _serialport2.default(port.comName, {
                                lock: false
                              })
                            },
                            port
                          );
                        }
                      });
                      this.setState({
                        scalePorts: filteredPorts
                      });
                      this.startCollecting();

                    case 8:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              this
            );
          })
        );

        function helper() {
          return _ref.apply(this, arguments);
        }

        return helper;
      })()
    },
    {
      key: "startCollecting",
      value: function startCollecting() {
        var _this2 = this;

        var _loop = function _loop(scale) {
          var path = _this2.state.scalePorts[scale].portPath;
          path
            .pipe(new _parserReadline2.default({ delimiter: "\r\n" }))
            .on("data", function(data) {
              var scalePorts = (0, _assign2.default)(
                {},
                _this2.state.scalePorts
              );
              scalePorts[scale].scaleData = _this2.convertToCorrectUnits(
                data.slice(7, 13),
                _this2.state.unitOfMeasurement,
                scale,
                data.slice(13, 17)
              );
              scalePorts[scale].units = data.slice(13, 17);
              scalePorts[scale].stable =
                data.slice(1, 2) === "S"
                  ? "indicatorStable"
                  : "indicatorUnstable";
              scalePorts[scale].sign = data.slice(6, 7) === "+" ? "+" : "-";
              _this2.setState({ scalePorts: scalePorts });
            });
        };

        for (var scale in this.state.scalePorts) {
          _loop(scale);
        }
      }
    },
    {
      key: "boxCompleteClick",
      value: function boxCompleteClick() {
        if (this.state.stable === "indicatorUnstable") {
          alert("Please wait till the scale is stable");
          return;
        }
        if (this.state.boxId === "") {
          alert("Please scan the container");
          return;
        }
        var boxes = this.state.boxes.slice();
        var box = {
          BoxId: this.state.boxId.slice(11, 23),
          CellPhoneCount: this.state.cellCount,
          Contents: {},
          TotalWeight: 0,
          Unit: this.state.unitOfMeasurement,
          SortedBy: this.props.user.user.uid,
          SortedOn: new _firebase2.default.firestore.Timestamp(
            Date.parse(new Date()) / 1000,
            0
          )
        };
        var totalWeight = 0;
        var count = 0;
        for (var scale in this.state.scalePorts) {
          var swappedWeight = this.state.bucketSwaps[scale] || [0];
          var weight =
            parseFloat(this.state.scalePorts[scale].scaleData) +
            swappedWeight.slice().reduce(function(acc, cV) {
              return acc + cV;
            });
          if (weight && weight !== 0) {
            box.Contents[this.state.chemistries[count]] = parseFloat(
              weight.toFixed(2)
            );

            totalWeight += weight;
          }
          count++;
        }
        box.TotalWeight = parseFloat(totalWeight.toFixed(2));
        boxes.push(box);
        this.props.uploadBox(box);
        this.props.mergeBoxIntoPails(box, this.props.pails);
        this.setState({
          boxes: boxes,
          bucketSwaps: {},
          boxId: "",
          cellCount: ""
        });
        this.zeroAllScales();
      }
    },
    {
      key: "zeroAllScales",
      value: function zeroAllScales() {
        for (var scale in this.state.scalePorts) {
          this.state.scalePorts[scale].portPath.write(
            Buffer.from([0x5a, 0xd, 0xa]),
            "utf8",
            function(error) {
              return console.log("err: ", error);
            }
          );
        }
        for (var _scale in this.state.scalePorts) {
          this.state.scalePorts[_scale].portPath.write(
            Buffer.from([0x5a, 0xd, 0xa]),
            "utf8",
            function(error) {
              return console.log("err: ", error);
            }
          );
        }
      }
    },
    {
      key: "zeroOut",
      value: function zeroOut() {
        console.log(this.state);
        console.log(this.props);
        this.zeroAllScales();
      }
    },
    {
      key: "goToForms",
      value: function goToForms() {
        this.setState({ goToReport: true });
      }
    },
    {
      key: "sendNetWeight",
      value: function sendNetWeight() {
        this.state.scalePorts.A9076Y4J.portPath.write(
          Buffer.from([0x4e, 0xd, 0xa])
        );
        console.log("NetWeight");
      }
    },
    {
      key: "sendGrossWeight",
      value: function sendGrossWeight() {
        this.state.scalePorts.A9076Y4J.portPath.write(
          Buffer.from([0x47, 0xd, 0xa])
        );
        console.log("GrossWeight");
      }
    },
    {
      key: "sendTareWeight",
      value: function sendTareWeight() {
        this.state.scalePorts.A9076Y4J.portPath.write(
          Buffer.from([0x54, 0xd, 0xa])
        );
        console.log("TareWeight");
      }
    },
    {
      key: "unitSelector",
      value: function unitSelector() {
        var unit = document.getElementById("unitSelect").value;
        this.setState({ unitOfMeasurement: unit });
      }
    },
    {
      key: "swapBucket",
      value: function swapBucket(chemistry, pails) {
        if (this.state.stable === "indicatorUnstable") {
          alert("Please wait till the scale is stable");
          return;
        }
        this.setState({
          scanDrumModalOpen: true,
          pailToSwap: pails[chemistry],
          chemToSwap: chemistry
        });
        console.log("SwapBucket", pails[chemistry], this.state.drumId);
      }
    },
    {
      key: "convertToCorrectUnits",
      value: function convertToCorrectUnits(
        scaleData,
        correctUnit,
        scale,
        units
      ) {
        var weight = 0;
        if (units === "  " + correctUnit) {
          return parseFloat(scaleData);
        }
        if (units === "  oz" && correctUnit === "lb") {
          weight = parseFloat(scaleData, 10) / 16;
        }
        if (units === "  oz" && correctUnit === "kg") {
          weight = parseFloat(scaleData, 10) / 35.274;
        }
        if (units === "lboz" && correctUnit === "lb") {
          var oz = parseFloat(scaleData.slice(4, 6), 10);
          var lb = parseFloat(scaleData.slice(0, 3), 10);
          weight = lb + oz / 16;
        }
        if (units === "lboz" && correctUnit === "kg") {
          var _oz = parseFloat(scaleData.slice(4, 6), 10);
          var _lb = parseFloat(scaleData.slice(0, 3), 10);
          weight = _lb / 2.205 + _oz / 16 / 2.205;
        }
        if (units === "  lb" && correctUnit === "kg") {
          weight = parseFloat(scaleData, 10) / 2.205;
        }
        if (units === "  kg" && correctUnit === "lb") {
          weight = parseFloat(scaleData, 10) * 2.205;
        }
        return parseFloat(weight.toFixed(2));
      }
    },
    {
      key: "onboxIdChange",
      value: function onboxIdChange(event) {
        this.setState({ boxId: event.target.value });
      }
    },
    {
      key: "submitPailSwap",
      value: function submitPailSwap() {
        if (this.state.drumId === "") {
          alert("Please enter a drum identification number.");
          return;
        }
        this.props.swapBucket(
          this.state.pailToSwap,
          this.state.drumId,
          this.state.machineId
        );
        this.setState({
          scanDrumModalOpen: false,
          drumId: "",
          pailToSwap: "",
          chemToSwap: ""
        });
      }
    },
    {
      key: "handleOpen",
      value: function handleOpen() {
        this.setState({ scanDrumModalOpen: true });
      }
    },
    {
      key: "handleClose",
      value: function handleClose() {
        this.setState({ scanDrumModalOpen: false });
      }
    },
    {
      key: "handleDrumIdChange",
      value: function handleDrumIdChange(event) {
        this.setState({ drumId: event.target.value });
      }
    },
    {
      key: "handleCellCountChange",
      value: function handleCellCountChange(event) {
        this.setState({ cellCount: event.target.value });
      }
    },
    {
      key: "handleBoxCompleteOpen",
      value: function handleBoxCompleteOpen() {
        this.setState({ cellCountModalOpen: true });
      }
    },
    {
      key: "handleBoxCompleteClose",
      value: function handleBoxCompleteClose() {
        this.setState({ cellCountModalOpen: false });
      }
    },
    {
      key: "onExitClick",
      value: function onExitClick() {
        this.props.logoutUser();
      }
    },
    {
      key: "submitBoxComplete",
      value: function submitBoxComplete() {
        if (this.state.cellCount === "") {
          alert("Please enter the number of cell phones");
          return;
        }
        this.boxCompleteClick();
        this.setState({ cellCountModalOpen: false });
      }
    },
    {
      key: "renderScales",
      value: function renderScales() {
        var count = 0;
        var scaleList = [];
        for (var scale in this.state.scalePorts) {
          var wrongUnit = false;
          var weight = this.state.scalePorts[scale].scaleData || 0.0;
          if (
            this.state.scalePorts[scale].scaleData &&
            this.state.scalePorts[scale].units.slice(2) !==
              this.state.unitOfMeasurement
          ) {
            wrongUnit = true;
          }
          var totalWeight = this.props.pailWeights[
            this.state.chemistries[count]
          ];

          if (this.state.scalePorts[scale].sign === "+") {
            totalWeight = parseFloat(totalWeight) + weight;
            totalWeight = totalWeight.toFixed(2);
          }
          if (this.state.scalePorts[scale].sign === "-") {
            totalWeight = parseFloat(totalWeight) - weight;
            totalWeight = totalWeight.toFixed(2);
          }

          if (totalWeight === "NaN") {
            totalWeight = "0";
          }

          scaleList.push(
            _react2.default.createElement(_ScaleDisplayCard2.default, {
              weight: weight,
              sign: this.state.scalePorts[scale].sign || "",
              units: this.state.unitOfMeasurement,
              wrongUnit: wrongUnit ? " Check Units" : null,
              scaleName: this.state.chemistries[count],
              key: scale,
              swapBucket: this.swapBucket.bind(
                this,
                this.state.chemistries[count],
                this.props.pails
              ),
              indicator: this.state.scalePorts[scale].stable,
              totalWeight: totalWeight || "0.0"
            })
          );
          count++;
        }
        return scaleList;
      }
    },
    {
      key: "render",
      value: function render() {
        var _props = this.props,
          classes = _props.classes,
          user = _props.user;

        if (this.state.goToReport) {
          return _react2.default.createElement(_reactRouter.Redirect, {
            to: "/report"
          });
        }
        if (!user) {
          return _react2.default.createElement(_reactRouter.Redirect, {
            to: "/"
          });
        }
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            _Modal2.default,
            { open: this.state.scanDrumModalOpen, onClose: this.handleClose },
            _react2.default.createElement(
              _Paper2.default,
              {
                style: {
                  width: "50%",
                  height: 150,
                  transform: "translate(50%, 50%)"
                }
              },
              _react2.default.createElement(
                "div",
                { style: { margin: 15, textAlign: "center" } },
                _react2.default.createElement(
                  "h4",
                  null,
                  "Please scan the drum."
                ),
                _react2.default.createElement(_TextField2.default, {
                  value: this.state.drumId,
                  onChange: this.handleDrumIdChange,
                  label: "Drum ID",
                  variant: "outlined",
                  autoFocus: true
                }),
                _react2.default.createElement(
                  _Button2.default,
                  {
                    className: classes.button,
                    color: "primary",
                    onClick: this.submitPailSwap
                  },
                  "Submit"
                )
              )
            )
          ),
          _react2.default.createElement(
            _Modal2.default,
            {
              open: this.state.cellCountModalOpen,
              onClose: this.handleBoxCompleteClose
            },
            _react2.default.createElement(
              _Paper2.default,
              {
                style: {
                  width: "50%",
                  height: 150,
                  transform: "translate(50%, 50%)"
                }
              },
              _react2.default.createElement(
                "div",
                { style: { margin: 15, textAlign: "center" } },
                _react2.default.createElement(
                  "h4",
                  null,
                  "How many cell phones were included?."
                ),
                _react2.default.createElement(_TextField2.default, {
                  value: this.state.cellCount,
                  onChange: this.handleCellCountChange,
                  label: "Cell Phones",
                  variant: "outlined",
                  autoFocus: true
                }),
                _react2.default.createElement(
                  _Button2.default,
                  {
                    className: classes.button,
                    color: "primary",
                    onClick: this.submitBoxComplete
                  },
                  "Submit"
                )
              )
            )
          ),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              _Button2.default,
              {
                className: classes.button,
                color: "secondary",
                onClick: this.onExitClick
              },
              _react2.default.createElement(_ExitToApp2.default, null)
            ),
            _react2.default.createElement(
              _Button2.default,
              {
                style: { float: "right" },
                className: classes.button,
                color: "secondary",
                onClick: this.goToForms
              },
              "Print Forms",
              _react2.default.createElement(_ArrowForward2.default, {
                style: { marginLeft: 5 }
              })
            )
          ),
          _react2.default.createElement(
            "div",
            { style: { display: "flex" } },
            _react2.default.createElement("h1", null, "Scale System")
          ),
          _react2.default.createElement(_TextField2.default, {
            label: "Bar Code",
            variant: "outlined",
            className: classes.barCode,
            onChange: this.onboxIdChange,
            value: this.state.boxId,
            autoFocus: true
          }),
          _react2.default.createElement(
            _Button2.default,
            {
              className: classes.button,
              color: "primary",
              onClick: this.handleBoxCompleteOpen,
              variant: "contained"
            },
            "Complete Box"
          ),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              _Grid2.default,
              { container: true, spacing: 16 },
              this.renderScales()
            ),
            _react2.default.createElement(
              _Button2.default,
              {
                className: (0, _classnames2.default)(
                  classes.button,
                  classes.yellowButton
                ),
                color: "primary",
                variant: "contained",
                onClick: this.zeroOut
              },
              "Tare/Zero All Scales"
            )
          )
        );
      }
    }
  ]);
  return ScaleUI;
})(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var _state$sortForms = state.sortForms,
    fetching = _state$sortForms.fetching,
    pails = _state$sortForms.pails,
    pailWeights = _state$sortForms.pailWeights,
    pailListener = _state$sortForms.pailListener,
    settings = _state$sortForms.settings;
  var user = state.auth.user;

  return {
    fetching: fetching,
    user: user,
    pails: pails,
    pailWeights: pailWeights,
    pailListener: pailListener,
    settings: settings
  };
};

exports.default = (0, _compose2.default)(
  _reactRouterDom.withRouter,
  (0, _styles.withStyles)(styles),
  (0, _reactRedux.connect)(mapStateToProps, {
    uploadBox: _actions.uploadBox,
    swapBucket: _actions.swapBucket,
    createPail: _actions.createPail,
    mergeBoxIntoPails: _actions.mergeBoxIntoPails,
    createDrum: _actions.createDrum,
    getPails: _actions.getPails,
    getPailWeights: _actions.getPailWeights,
    logoutUser: _actions2.logoutUser
  })
)(ScaleUI);
