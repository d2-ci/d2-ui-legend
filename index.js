'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorbrewer = exports.ColorPicker = exports.ColorScaleSelect = exports.ColorScale = undefined;

var _ColorScale = require('./ColorScale.component');

Object.defineProperty(exports, 'ColorScale', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ColorScale).default;
  }
});

var _ColorScaleSelect = require('./ColorScaleSelect.component');

Object.defineProperty(exports, 'ColorScaleSelect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ColorScaleSelect).default;
  }
});

var _ColorPicker = require('./ColorPicker.component');

Object.defineProperty(exports, 'ColorPicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ColorPicker).default;
  }
});

var _colorbrewer = require('./colorbrewer');

Object.defineProperty(exports, 'colorbrewer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_colorbrewer).default;
  }
});

var _Legend = require('./Legend.component');

var _Legend2 = _interopRequireDefault(_Legend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Legend2.default;