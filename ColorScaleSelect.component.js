'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Popover = require('material-ui/Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _SelectField = require('material-ui/SelectField/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _d = require('d2');

var _ColorScale = require('./ColorScale.component');

var _ColorScale2 = _interopRequireDefault(_ColorScale);

var _colorbrewer = require('./colorbrewer');

var _colorbrewer2 = _interopRequireDefault(_colorbrewer);

var _d2UiCore = require('@dhis2/d2-ui-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_d.config.i18n.strings.add('number_of_items');

// Allowed color scales from ColorBrewer (needs to have at least 9 classes)
var scales = ['YlOrRd', 'Reds', 'YlGn', 'Greens', 'Blues', 'BuPu', 'RdPu', 'PuRd', 'Greys', 'YlOrBr_reverse', 'Reds_reverse', 'YlGn_reverse', 'Greens_reverse', 'Blues_reverse', 'BuPu_reverse', 'RdPu_reverse', 'PuRd_reverse', 'Greys_reverse', 'PuOr', 'BrBG', 'PRGn', 'PiYG', 'RdBu', 'RdGy', 'RdYlBu', 'Spectral', 'RdYlGn', 'Paired', 'Pastel1', 'Set1', 'Set3'];

// Renders a color scale component consisting of a changeable color scale and number of classes

var ColorScaleSelect = function (_Component) {
    (0, _inherits3.default)(ColorScaleSelect, _Component);

    function ColorScaleSelect() {
        var _ref;

        (0, _classCallCheck3.default)(this, ColorScaleSelect);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = ColorScaleSelect.__proto__ || (0, _getPrototypeOf2.default)(ColorScaleSelect)).call.apply(_ref, [this].concat(args)));

        _this.showColorScales = function (event) {
            _this.setState({ open: true, anchorEl: event.currentTarget });
        };

        _this.onColorScaleSelect = function (event, scale) {
            _this.setState({ scale: scale, open: false });
            _this.props.onChange(_this.getColorBrewerScale(scale, _this.state.classes));
        };

        _this.onClassesChange = function (event, index, value) {
            _this.setState({ classes: value });
            _this.props.onChange(_this.getColorBrewerScale(_this.state.scale, value));
        };

        _this.onColorScalePopoverClose = function () {
            _this.setState({ open: false });
        };

        _this.state = {
            open: false,
            anchorEl: null,
            scale: 'YlOrRd',
            classes: 5
        };

        _this.i18n = _this.context.d2.i18n;
        return _this;
    }

    (0, _createClass3.default)(ColorScaleSelect, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.onChange(this.getColorBrewerScale(this.state.scale, this.state.classes));
        }

        // Show popover with allowed color scales


        // Called when a new color scale is selected in the popover


        // Called when the number of classes is changed

    }, {
        key: 'getColorBrewerScale',


        // Returns a color brewer scale for a number of classes
        value: function getColorBrewerScale(scale, classes) {
            return _colorbrewer2.default[scale][classes];
        }

        // Called when popover is closed

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var styles = {
                scale: {
                    width: 36 * this.state.classes,
                    minWidth: 36 * this.state.classes,
                    flex: '0 0 auto'
                },
                popover: {
                    maxHeight: '60%',
                    overflowY: 'scroll'
                },
                popoverScale: {
                    display: 'block',
                    overflow: 'visible',
                    margin: '10px 0',
                    marginLeft: 20,
                    width: 36 * this.state.classes,
                    minWidth: 36 * this.state.classes,
                    whiteSpace: 'nowrap'
                }
            };
            var colorScales = scales.map(function (scale, index) {
                return _react2.default.createElement(_ColorScale2.default, { key: index, scale: scale, classes: _this2.state.classes, style: styles.popoverScale, onClick: _this2.onColorScaleSelect });
            });

            return _react2.default.createElement(
                _d2UiCore.Row,
                { style: (0, _extends3.default)({ alignItems: 'center' }, this.props.style) },
                _react2.default.createElement(
                    _SelectField2.default,
                    { floatingLabelText: this.i18n.getTranslation('number_of_items'), value: this.state.classes, onChange: this.onClassesChange },
                    _react2.default.createElement(_MenuItem2.default, { value: 3, primaryText: '3' }),
                    _react2.default.createElement(_MenuItem2.default, { value: 4, primaryText: '4' }),
                    _react2.default.createElement(_MenuItem2.default, { value: 5, primaryText: '5' }),
                    _react2.default.createElement(_MenuItem2.default, { value: 6, primaryText: '6' }),
                    _react2.default.createElement(_MenuItem2.default, { value: 7, primaryText: '7' }),
                    _react2.default.createElement(_MenuItem2.default, { value: 8, primaryText: '8' }),
                    _react2.default.createElement(_MenuItem2.default, { value: 9, primaryText: '9' })
                ),
                _react2.default.createElement(_ColorScale2.default, { scale: this.state.scale, classes: this.state.classes, style: (0, _extends3.default)({}, styles.scale, { margin: '0 20px 0 20px' }), onClick: this.showColorScales }),
                _react2.default.createElement(
                    _Popover2.default,
                    {
                        style: styles.popover,
                        open: this.state.open,
                        anchorEl: this.state.anchorEl,
                        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
                        targetOrigin: { horizontal: 'left', vertical: 'top' },
                        onRequestClose: this.onColorScalePopoverClose
                    },
                    _react2.default.createElement(
                        _d2UiCore.Column,
                        null,
                        colorScales
                    )
                )
            );
        }
    }]);
    return ColorScaleSelect;
}(_react.Component);

ColorScaleSelect.contextTypes = {
    d2: _propTypes2.default.object
};

exports.default = ColorScaleSelect;