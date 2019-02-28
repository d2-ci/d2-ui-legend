'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('material-ui/TextField/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FlatButton = require('material-ui/FlatButton/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Dialog = require('material-ui/Dialog/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _d3Scale = require('d3-scale');

var _d3Format = require('d3-format');

var _d = require('d2');

var _uid = require('d2/uid');

var _ColorScaleSelect = require('./ColorScaleSelect.component');

var _ColorScaleSelect2 = _interopRequireDefault(_ColorScaleSelect);

var _LegendItems = require('./LegendItems.component');

var _LegendItems2 = _interopRequireDefault(_LegendItems);

var _LegendItem = require('./LegendItem.store');

var _d2UiCore = require('@dhis2/d2-ui-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_d.config.i18n.strings.add('start_value');
_d.config.i18n.strings.add('end_value');
_d.config.i18n.strings.add('required');
_d.config.i18n.strings.add('cancel');
_d.config.i18n.strings.add('proceed');
_d.config.i18n.strings.add('needs_to_be_bigger_than_start_value');
_d.config.i18n.strings.add('are_you_sure');
_d.config.i18n.strings.add('this_will_replace_the_current_legend_items');
_d.config.i18n.strings.add('create_legend_items');

var Legend = function (_Component) {
    (0, _inherits3.default)(Legend, _Component);

    function Legend() {
        var _ref;

        (0, _classCallCheck3.default)(this, Legend);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Legend.__proto__ || (0, _getPrototypeOf2.default)(Legend)).call.apply(_ref, [this].concat(args)));

        _this.onStartValueChange = function (event) {
            _this.setState({ startValue: event.target.value }, _this.validateForm);
        };

        _this.onEndValueChange = function (event) {
            _this.setState({ endValue: event.target.value }, _this.validateForm);
        };

        _this.onColorScaleChange = function (colorScheme) {
            _this.setState({ colorScheme: colorScheme });
        };

        _this.createLegendItems = function () {
            var _this$state = _this.state,
                startValue = _this$state.startValue,
                endValue = _this$state.endValue,
                colorScheme = _this$state.colorScheme;

            var scale = (0, _d3Scale.scaleLinear)().domain([startValue, endValue]).rangeRound([0, colorScheme.length]);
            var step = (endValue - startValue) / colorScheme.length;
            var precision = (0, _d3Format.precisionFixed)(step); // https://github.com/d3/d3-format#precisionFixed

            var items = colorScheme.map(function (color, index) {
                var legend = {};

                legend.id = (0, _uid.generateUid)();
                legend.startValue = scale.invert(index).toFixed(precision);
                legend.endValue = scale.invert(index + 1).toFixed(precision);
                legend.color = color;
                legend.name = legend.startValue + ' - ' + legend.endValue;

                return legend;
            });

            _this.props.onItemsChange(items);
        };

        _this.deleteItem = function (modelToDelete) {
            var newItems = _this.props.items.filter(function (model) {
                return model !== modelToDelete;
            });
            _this.props.onItemsChange(newItems);
        };

        _this.updateItem = function (newItems) {
            var modelToUpdate = _LegendItem.legendItemStore.getState() && _LegendItem.legendItemStore.getState().model;
            var isNewLegendItem = newItems.every(function (model) {
                return model !== modelToUpdate;
            });

            return _this.props.onItemsChange([].concat(newItems, isNewLegendItem ? modelToUpdate : []));
        };

        _this.validateForm = function () {
            var _this$state2 = _this.state,
                startValue = _this$state2.startValue,
                endValue = _this$state2.endValue;

            // Check if start or end value is empty

            if (startValue === '' || endValue === '') {
                _this.setState({
                    errorMessage: {
                        startValue: startValue === '' ? _this.i18n.getTranslation('required') : '',
                        endValue: endValue === '' ? _this.i18n.getTranslation('required') : ''
                    },
                    createLegendDisabled: true
                });
                return;
            }

            // Check if end value is less than start value
            if (Number(endValue) <= Number(startValue)) {
                _this.setState({
                    errorMessage: {
                        startValue: Number(startValue) >= Number(endValue) ? _this.i18n.getTranslation('should_be_lower_than_end_value') : '',
                        endValue: Number(endValue) <= Number(startValue) ? _this.i18n.getTranslation('should_be_higher_than_start_value') : ''
                    },
                    createLegendDisabled: true
                });
                return;
            }

            // All OK
            _this.setState({
                errorMessage: {
                    startValue: '',
                    endValue: ''
                },
                createLegendDisabled: false
            });
        };

        _this.displayWarning = function () {
            _this.setState({ warningDialogOpen: true });
        };

        _this.handleClose = function () {
            _this.setState({ warningDialogOpen: false }, function () {
                return _this.createLegendItems();
            } // Callback for after state update
            );
        };

        _this.state = {
            startValue: 0,
            endValue: 100,
            warningDialogOpen: false,
            errorMessage: {},
            createLegendDisabled: false
        };

        _this.i18n = _this.context.d2.i18n;
        return _this;
    }

    // Check if end value is bigger than start value


    // Display warning that current legend items will be deleted


    (0, _createClass3.default)(Legend, [{
        key: 'render',
        value: function render() {
            var actions = [_react2.default.createElement(_FlatButton2.default, {
                label: this.i18n.getTranslation('cancel'),
                secondary: true,
                onClick: this.handleClose
            }), _react2.default.createElement(_FlatButton2.default, {
                label: this.i18n.getTranslation('proceed'),
                primary: true,
                onClick: this.handleClose
            })];

            var styles = {
                textField: {
                    marginRight: 20,
                    minWidth: '150px',
                    flex: '1 1 auto'
                },
                errorStyle: {
                    float: 'left'
                },
                button: {
                    flex: '1 0 auto',
                    minWidth: '150px',
                    marginLeft: 20
                },
                legendGenerator: {
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '40px'
                },
                colorScaleSelect: {}
            };

            return _react2.default.createElement(
                _d2UiCore.Column,
                null,
                _react2.default.createElement(
                    _d2UiCore.Row,
                    { style: styles.legendGenerator },
                    _react2.default.createElement(_TextField2.default, {
                        type: 'number',
                        style: styles.textField,
                        floatingLabelText: this.i18n.getTranslation('start_value'),
                        value: this.state.startValue,
                        onChange: this.onStartValueChange,
                        errorText: this.state.errorMessage.startValue,
                        errorStyle: styles.errorStyle
                    }),
                    _react2.default.createElement(_TextField2.default, {
                        type: 'number',
                        style: styles.textField,
                        floatingLabelText: this.i18n.getTranslation('end_value'),
                        value: this.state.endValue,
                        onChange: this.onEndValueChange,
                        errorText: this.state.errorMessage.endValue,
                        errorStyle: styles.errorStyle
                    }),
                    _react2.default.createElement(_ColorScaleSelect2.default, {
                        style: styles.colorScaleSelect,
                        onChange: this.onColorScaleChange
                    }),
                    _react2.default.createElement(_RaisedButton2.default, {
                        style: styles.button,
                        label: this.i18n.getTranslation('create_legend_items'),
                        onClick: this.displayWarning,
                        disabled: this.state.createLegendDisabled
                    })
                ),
                _react2.default.createElement(_LegendItems2.default, {
                    items: this.props.items,
                    updateItem: this.updateItem,
                    deleteItem: this.deleteItem
                }),
                _react2.default.createElement(
                    _Dialog2.default,
                    {
                        title: this.i18n.getTranslation('are_you_sure'),
                        actions: actions,
                        modal: false,
                        open: this.state.warningDialogOpen,
                        onRequestClose: this.handleClose,
                        autoScrollBodyContent: true
                    },
                    this.i18n.getTranslation('this_will_replace_the_current_legend_items')
                )
            );
        }
    }]);
    return Legend;
}(_react.Component);

Legend.propTypes = {
    items: _propTypes2.default.array.isRequired
};

Legend.contextTypes = {
    d2: _propTypes2.default.object
};

exports.default = Legend;