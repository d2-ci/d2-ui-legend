'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EditLegendItem = EditLegendItem;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatButton = require('material-ui/FlatButton/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Dialog = require('material-ui/Dialog/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _d = require('d2');

var _LegendItem = require('./LegendItem.store');

var _LegendItem2 = require('./LegendItem.actions');

var _d2UiCore = require('@dhis2/d2-ui-core');

var _d2UiForms = require('@dhis2/d2-ui-forms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_d.config.i18n.strings.add('ok');
_d.config.i18n.strings.add('cancel');
_d.config.i18n.strings.add('edit_legend_item');

function isCloseDisabled(isValid) {
    var model = _LegendItem.legendItemStore.getState() && _LegendItem.legendItemStore.getState().model;

    if (model && (model.startValue === undefined || model.endValue === undefined || model.name === undefined)) {
        return true;
    }

    if (model && !model.dirty) {
        return false;
    }

    return !isValid;
}

// props, context
function EditLegendItem(_ref, _ref2) {
    var _ref$fieldConfigs = _ref.fieldConfigs,
        fieldConfigs = _ref$fieldConfigs === undefined ? [] : _ref$fieldConfigs,
        _ref$open = _ref.open,
        open = _ref$open === undefined ? false : _ref$open,
        onItemUpdate = _ref.onItemUpdate,
        isValid = _ref.isValid;
    var d2 = _ref2.d2;

    var onCancel = function onCancel() {
        (0, _LegendItem2.setDialogStateToAction)(false);
    };

    var onClose = function onClose() {
        (0, _LegendItem2.setDialogStateToAction)(false);
        onItemUpdate();
    };

    var actions = [_react2.default.createElement(_FlatButton2.default, {
        label: d2.i18n.getTranslation('cancel'),
        secondary: true,
        onClick: onCancel
    }), _react2.default.createElement(_FlatButton2.default, {
        label: d2.i18n.getTranslation('ok'),
        primary: true,
        onClick: onClose,
        disabled: isCloseDisabled(isValid)
    })];

    return _react2.default.createElement(
        _Dialog2.default,
        {
            title: d2.i18n.getTranslation('edit_legend_item'),
            modal: true,
            open: open,
            onRequestClose: onClose,
            actions: actions,
            autoScrollBodyContent: true
        },
        _react2.default.createElement(_d2UiForms.FormBuilder, {
            fields: fieldConfigs,
            onUpdateField: _LegendItem.onFieldChange,
            onUpdateFormStatus: _LegendItem.onFormStatusChange
        })
    );
}
EditLegendItem.contextTypes = {
    d2: _propTypes2.default.object
};

exports.default = (0, _d2UiCore.withStateFrom)(_LegendItem.legendItemStore$, EditLegendItem);