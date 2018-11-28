"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPailWeights = exports.getPails = exports.createDrum = exports.swapBucket = exports.createPail = exports.mergeBoxIntoPails = exports.uploadBox = exports.getSortForms = exports.getSettings = exports.setDate = undefined;

var _types = require("./types");

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

var _config = require("../../config.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var setDate = (exports.setDate = function setDate(dateType, date) {
  return { type: _types.DATE_SET, payload: { dateType: dateType, date: date } };
});

var getSettings = (exports.getSettings = function getSettings(machineId) {
  return function(dispatch) {
    var settings = {};
    _config.Firestore.collection("Admin")
      .where("Machines", "array-contains", machineId)
      .get()
      .then(function(snapshot) {
        snapshot.forEach(function(doc) {
          var data = doc.data();
          settings.chemistries = data.Chemistries;
          settings.units = data.Units;
        });
        console.log(settings);
        if (
          Object.keys(settings).length === 0 &&
          settings.constructor === Object
        ) {
          console.log("no settings");
          dispatch({ type: _types.FAILED_TO_GET_SETTINGS });
        } else {
          dispatch({ type: _types.GOT_SETTINGS, payload: settings });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
});

var getSortForms = (exports.getSortForms = function getSortForms(
  dateStart,
  dateEnd
) {
  console.log("called");
  return function(dispatch) {
    dispatch({ type: _types.GETTING_SORT_FORMS });
    var timeStart = Date.parse(dateStart) / 1000;
    var timestampStart = new _firebase2.default.firestore.Timestamp(
      timeStart,
      0
    );
    var timeEnd = Date.parse(dateEnd) / 1000;
    var timestampEnd = new _firebase2.default.firestore.Timestamp(timeEnd, 0);
    var forms = [];
    _config.Firestore.collection("BoxDocuments")
      .where("SortedOn", ">=", timestampStart)
      .where("SortedOn", "<=", timestampEnd)
      .get()
      .then(function(snapshot) {
        snapshot.forEach(function(doc) {
          forms.push(doc.data());
        });
        console.log(forms);
        dispatch({ type: _types.GOT_SORT_FORMS, payload: forms });
      })
      .catch(function(err) {
        return console.error(err);
      });
  };
});

var uploadBox = (exports.uploadBox = function uploadBox(box) {
  console.log(box);
  return function(dispatch) {
    _config.Firestore.collection("BoxDocuments")
      .add(Object.assign({}, box))
      .then(function(docRef) {
        console.log("successful write ", docRef);
        dispatch({ type: _types.UPLOAD_SUCCESSFUL });
      })
      .catch(function(err) {
        return console.log("there was an error", err);
      });
  };
});

var mergeBoxIntoPails = (exports.mergeBoxIntoPails = function mergeBoxIntoPails(
  box,
  pailIds
) {
  console.log(box, pailIds);
  return function(dispatch) {
    dispatch({ type: _types.MERGING_BOX_TO_PAIL });
    for (var chemistry in box.Contents) {
      console.log();
      _config.Firestore.collection("PailDocuments")
        .doc(pailIds[chemistry])
        .update({
          Boxes: _firebase2.default.firestore.FieldValue.arrayUnion({
            BoxId: box.BoxId,
            Weight: box.Contents[chemistry]
          })
        })
        .then(function() {
          return console.log("successfuly merged box!");
        });
    }
  };
});

var createPail = (exports.createPail = function createPail(
  chemistries,
  machineId
) {
  return function(dispatch) {
    chemistries.forEach(function(chemistry) {
      _config.Firestore.collection("PailDocuments")
        .add({
          MachineId: machineId,
          Completed: false,
          Chemistry: chemistry,
          Boxes: [],
          DrumId: null
        })
        .then(function(docRef) {
          return dispatch({
            type: _types.CREATED_PAILS,
            payload: _defineProperty({}, chemistry, docRef.id)
          });
        })
        .catch(function(err) {
          return console.log(err);
        });
    });
  };
});

var swapBucket = (exports.swapBucket = function swapBucket(
  pailRef,
  drumId,
  machineId
) {
  console.log(pailRef, drumId);
  return function(dispatch) {
    _config.Firestore.collection("PailDocuments")
      .doc(pailRef)
      .get()
      .then(function(doc) {
        var data = doc.data();
        console.log(data);
        _config.Firestore.collection("DrumDocuments")
          .doc(drumId)
          .set(
            {
              Boxes: _firebase2.default.firestore.FieldValue.arrayUnion.apply(
                null,
                data.Boxes
              ),
              DrumId: drumId
            },
            { merge: true }
          )
          .then(function(docRef) {
            console.log("Succesfully added " + pailRef + " to drum: " + drumId);
            _config.Firestore.collection("PailDocuments")
              .doc(pailRef)
              .update({
                Completed: true
              })
              .then(function() {
                console.log("successfully updated pail");
                dispatch(createPail([data.Chemistry], machineId));
              });
            dispatch({ type: _types.SWAPPED_BUCKET });
          });
      });
  };
});

var createDrum = (exports.createDrum = function createDrum(drumId) {
  return function(dispatch) {
    _config.Firestore.collection("DrumDocuments")
      .add({
        DrumId: drumId,
        Boxes: []
      })
      .then(function(docRef) {
        return dispatch({ type: _types.CREATED_DRUM });
      });
  };
});

var getPails = (exports.getPails = function getPails(machineId, chemistries) {
  return function(dispatch) {
    var pails = {};
    _config.Firestore.collection("PailDocuments")
      .where("Completed", "==", false)
      .where("MachineId", "==", machineId)
      .get()
      .then(function(snapshot) {
        snapshot.forEach(function(doc) {
          var data = doc.data();
          pails[data.Chemistry] = doc.id;
        });
        var missingChems = [];
        chemistries.forEach(function(chem) {
          if (!pails.hasOwnProperty(chem)) {
            missingChems.push(chem);
          }
        });
        if (missingChems.length > 0) {
          dispatch(createPail(missingChems, machineId));
        }
        dispatch({ type: _types.GOT_PAILS, payload: pails });
      });
  };
});
/*
export const getChemistries = () => {
  return dispatch => {

  }
}
*/

var getPailWeights = (exports.getPailWeights = function getPailWeights(
  machineId
) {
  return function(dispatch) {
    var weights = {};
    var listener = _config.Firestore.collection("PailDocuments")
      .where("Completed", "==", false)
      .where("MachineId", "==", machineId)
      .onSnapshot(function(snapshot) {
        snapshot.forEach(function(doc) {
          var data = doc.data();
          var weight = data.Boxes.reduce(function(acc, cV) {
            return acc + cV.Weight;
          }, 0);
          weights[data.Chemistry] = weight.toFixed(2);
        });
        dispatch({
          type: _types.PAIL_WEIGHTS,
          payload: { weights: weights, listener: listener }
        });
      });
  };
});
