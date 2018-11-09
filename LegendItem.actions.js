import { Action } from '@dhis2/d2-ui-core';
import { setDialogStateTo } from './LegendItem.store';

export var setDialogStateToAction = Action.create('setDialogStateToAction'); // name in debug

setDialogStateToAction.subscribe(function (action) {
  return setDialogStateTo(action.data);
});