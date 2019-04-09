'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colorbrewer = require('./colorbrewer');

var _colorbrewer2 = _interopRequireDefault(_colorbrewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns one color scale based on a code and number of classes
function ColorScale(_ref) {
    var scale = _ref.scale,
        classes = _ref.classes,
        style = _ref.style,
        _onClick = _ref.onClick;

    var colors = _colorbrewer2.default[scale][classes];

    var styles = {
        scale: (0, _extends3.default)({
            marginRight: 30,
            paddingLeft: 0,
            height: 36,
            cursor: 'pointer',
            boxShadow: '0 1px 6px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.12)',
            display: 'inline-block'
        }, style)
    };

    var items = colors.map(function (color, index) {
        var styles = {
            marginLeft: 0,
            display: 'inline-block',
            backgroundColor: color,
            width: 36,
            height: '100%'
        };

        return _react2.default.createElement('li', { key: index, style: styles });
    });

    return _react2.default.createElement(
        'ul',
        { style: styles.scale, onClick: function onClick(event) {
                return _onClick(event, scale);
            } },
        items
    );
}
exports.default = ColorScale;