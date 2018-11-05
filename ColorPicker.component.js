import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';
import { hcl } from 'd3-color';

var ColorPicker = function (_Component) {
    _inherits(ColorPicker, _Component);

    function ColorPicker() {
        var _ref;

        _classCallCheck(this, ColorPicker);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ColorPicker.__proto__ || _Object$getPrototypeOf(ColorPicker)).call.apply(_ref, [this].concat(args)));

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

    _createClass(ColorPicker, [{
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
                    color: hcl(color).l < 70 ? '#fff' : '#000',
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
                    position: 'absolute',
                    top: -207,
                    left: 120
                }
            };

            return React.createElement(
                'div',
                { style: styles.wrapper },
                React.createElement(
                    'div',
                    { style: styles.color, onClick: this.handleOpen },
                    color
                ),
                this.state.open ? React.createElement(
                    'div',
                    { is: 'popover' },
                    React.createElement('div', { style: styles.cover, onClick: this.handleClose }),
                    React.createElement(
                        'div',
                        { style: styles.picker },
                        React.createElement(ChromePicker, { color: this.state.color, onChange: this.handleChange })
                    )
                ) : null
            );
        }
    }]);

    return ColorPicker;
}(Component);

export default ColorPicker;