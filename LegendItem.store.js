import _extends from 'babel-runtime/helpers/extends';
import TextField from 'material-ui/TextField/TextField';
import { Observable } from 'rxjs';
import { getInstance, config } from 'd2';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';
import ColorPicker from './ColorPicker.component';

import { Store } from '@dhis2/d2-ui-core';
import { Validators } from '@dhis2/d2-ui-forms';
import { mapProps } from '@dhis2/d2-ui-core';

config.i18n.strings.add('required');
config.i18n.strings.add('should_be_lower_than_end_value');
config.i18n.strings.add('should_be_higher_than_start_value');

export var legendItemStore = Store.create();

// FormBuilder currently requires an event to be passed for fields
function createFakeEvent(color) {
    return {
        target: {
            value: color
        }
    };
}

export function openEditDialogFor(model) {
    legendItemStore.setState({
        model: model,
        open: true
    });
}

var formFieldsConfigs = [{
    name: 'name',
    component: TextField,
    validators: [{
        validator: Validators.isRequired,
        message: Validators.isRequired.message
    }]
}, {
    name: 'startValue',
    component: TextField,
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
    component: TextField,
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
    component: mapProps(function (props) {
        return {
            color: props.value,
            onChange: function onChange(color) {
                props.onChange(createFakeEvent(color));
            }
        };
    }, ColorPicker)
}];

// Called when a field is changed
export function onFieldChange(fieldName, value) {
    var model = legendItemStore.getState().model;

    model[fieldName] = value;

    legendItemStore.setState(_extends({}, legendItemStore.getState(), {
        model: model
    }));
}

export function onFormStatusChange(_ref) {
    var valid = _ref.valid;

    legendItemStore.setState(_extends({}, legendItemStore.getState(), {
        isValid: valid
    }));
}

export function setDialogStateTo(open) {
    legendItemStore.setState(_extends({}, legendItemStore.getState(), {
        open: open
    }));
}

export var legendItemStore$ = Observable.combineLatest(legendItemStore, Observable.of(formFieldsConfigs), Observable.fromPromise(getInstance()), function (state, fieldConfigs, d2) {
    return _extends({}, state, {
        fieldConfigs: fieldConfigs.map(function (fieldConfig) {
            return _extends({}, fieldConfig, {
                props: _extends({}, fieldConfig.props, {
                    floatingLabelText: d2.i18n.getTranslation(camelCaseToUnderscores(fieldConfig.name))
                }),
                validators: (fieldConfig.validators || []).map(function (validator) {
                    return _extends({}, validator, {
                        message: d2.i18n.getTranslation(validator.message)
                    });
                })
            });
        })
    });
}) // Return a combined object (will return an array if we don't pass it)
.map(function (state) {
    return _extends({}, state, {
        fieldConfigs: state.fieldConfigs.map(function (fieldConfig) {
            return _extends({}, fieldConfig, {
                value: state.model[fieldConfig.name]
            });
        })
    });
});