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

var _Chrome = require('react-color/lib/components/chrome/Chrome');

var _Chrome2 = _interopRequireDefault(_Chrome);

var _d3Color = require('d3-color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorPicker = function (_Component) {
    (0, _inherits3.default)(ColorPicker, _Component);

    function ColorPicker() {
        var _ref;

        (0, _classCallCheck3.default)(this, ColorPicker);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = ColorPicker.__proto__ || (0, _getPrototypeOf2.default)(ColorPicker)).call.apply(_ref, [this].concat(args)));

        _this.handleOpen = function () {
            _this.setState({ open: true });
        };

        _this.handleClose = function () {
            _this.setState({ open: false });
        };

        _this.handleChange = function (color) {
            var hexColor = color.hex.toUpperCase();

            _this.setState({ color: hexColor });
            _this.props.onChange(hexColor);
        };

        _this.state = {
            open: false,
            color: _this.props.color
        };
        return _this;
    }

    (0, _createClass3.default)(ColorPicker, [{
        key: 'render',
        value: function render() {
            var color = this.state.color;

            var styles = {
                wrapper: {
                    position: 'relative',
                    overflow: 'visible'
                },
                color: {
                    backgroundColor: color,
                    color: (0, _d3Color.hcl)(color).l < 70 ? '#fff' : '#000',
                    textAlign: 'center',
                    position: 'relative',
                    width: 90,
                    height: 36,
                    lineHeight: 2.5,
                    marginTop: 10,
                    boxShadow: '0 1px 6px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.12)',
                    cursor: 'pointer'
                },
                cover: {
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                picker: {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000
                }
            };

            return _react2.default.createElement(
                'div',
                { style: styles.wrapper },
                _react2.default.createElement(
                    'div',
                    {
                        style: styles.color,
                        role: 'button',
                        onClick: this.handleOpen,
                        tabIndex: 0
                    },
                    color
                ),
                this.state.open && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('div', {
                        style: styles.cover,
                        role: 'button',
                        onClick: this.handleClose,
                        tabIndex: 0
                    }),
                    _react2.default.createElement(
                        'div',
                        { style: styles.picker },
                        _react2.default.createElement(_Chrome2.default, {
                            color: this.state.color,
                            onChange: this.handleChange
                        })
                    )
                )
            );
        }
    }]);
    return ColorPicker;
}(_react.Component);

exports.default = ColorPicker;