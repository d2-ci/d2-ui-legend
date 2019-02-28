'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDialogStateToAction = undefined;

var _d2UiCore = require('@dhis2/d2-ui-core');

var _LegendItem = require('./LegendItem.store');

var setDialogStateToAction = exports.setDialogStateToAction = _d2UiCore.Action.create('setDialogStateToAction'); // name in debug

setDialogStateToAction.subscribe(function (action) {
  return (0, _LegendItem.setDialogStateTo)(action.data);
});