'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.legendItemStore$ = exports.legendItemStore = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.openEditDialogFor = openEditDialogFor;
exports.onFieldChange = onFieldChange;
exports.onFormStatusChange = onFormStatusChange;
exports.setDialogStateTo = setDialogStateTo;

var _TextField = require('material-ui/TextField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _rxjs = require('rxjs');

var _d = require('d2');

var _camelCaseToUnderscores = require('d2-utilizr/lib/camelCaseToUnderscores');

var _camelCaseToUnderscores2 = _interopRequireDefault(_camelCaseToUnderscores);

var _ColorPicker = require('./ColorPicker.component');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _d2UiForms = require('@dhis2/d2-ui-forms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_d.config.i18n.strings.add('required');
_d.config.i18n.strings.add('should_be_lower_than_end_value');
_d.config.i18n.strings.add('should_be_higher_than_start_value');

var legendItemStore = exports.legendItemStore = _d2UiCore.Store.create();

// FormBuilder currently requires an event to be passed for fields
function createFakeEvent(color) {
    return {
        target: {
            value: color
        }
    };
}

function openEditDialogFor(model) {
    legendItemStore.setState({
        model: model,
        open: true
    });
}

var formFieldsConfigs = [{
    name: 'name',
    component: _TextField2.default,
    validators: [{
        validator: _d2UiForms.Validators.isRequired,
        message: _d2UiForms.Validators.isRequired.message
    }]
}, {
    name: 'startValue',
    component: _TextField2.default,
    props: {
        type: 'number'
    },
    validators: [{
        validator: function validator(value) {
            return value !== '';
        },
        message: 'required'
    }]
}, {
    name: 'endValue',
    component: _TextField2.default,
    props: {
        type: 'number'
    },
    validators: [{
        validator: function validator(value) {
            return value !== '';
        },
        message: 'required'
    }]
}, { // Defined in data-table/data-value/Color.component.js
    name: 'color',
    component: (0, _d2UiCore.mapProps)(function (props) {
        return {
            color: props.value,
            onChange: function onChange(color) {
                props.onChange(createFakeEvent(color));
            }
        };
    }, _ColorPicker2.default)
}];

// Called when a field is changed
function onFieldChange(fieldName, value) {
    var model = legendItemStore.getState().model;

    model[fieldName] = value;

    legendItemStore.setState((0, _extends3.default)({}, legendItemStore.getState(), {
        model: model
    }));
}

function onFormStatusChange(_ref) {
    var valid = _ref.valid;

    legendItemStore.setState((0, _extends3.default)({}, legendItemStore.getState(), {
        isValid: valid
    }));
}

function setDialogStateTo(open) {
    legendItemStore.setState((0, _extends3.default)({}, legendItemStore.getState(), {
        open: open
    }));
}

var legendItemStore$ = exports.legendItemStore$ = _rxjs.Observable.combineLatest(legendItemStore, _rxjs.Observable.of(formFieldsConfigs), _rxjs.Observable.fromPromise((0, _d.getInstance)()), function (state, fieldConfigs, d2) {
    return (0, _extends3.default)({}, state, {
        fieldConfigs: fieldConfigs.map(function (fieldConfig) {
            return (0, _extends3.default)({}, fieldConfig, {
                props: (0, _extends3.default)({}, fieldConfig.props, {
                    floatingLabelText: d2.i18n.getTranslation((0, _camelCaseToUnderscores2.default)(fieldConfig.name))
                }),
                validators: (fieldConfig.validators || []).map(function (validator) {
                    return (0, _extends3.default)({}, validator, {
                        message: d2.i18n.getTranslation(validator.message)
                    });
                })
            });
        })
    });
}) // Return a combined object (will return an array if we don't pass it)
.map(function (state) {
    return (0, _extends3.default)({}, state, {
        fieldConfigs: state.fieldConfigs.map(function (fieldConfig) {
            return (0, _extends3.default)({}, fieldConfig, {
                value: state.model[fieldConfig.name]
            });
        })
    });
});