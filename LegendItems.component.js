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

var _uid = require('d2/uid');

var _FloatingActionButton = require('material-ui/FloatingActionButton/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

var _d2UiTable = require('@dhis2/d2-ui-table');

var _d2UiTable2 = _interopRequireDefault(_d2UiTable);

var _EditLegendItem = require('./EditLegendItem.component');

var _EditLegendItem2 = _interopRequireDefault(_EditLegendItem);

var _LegendItem = require('./LegendItem.store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LegendItems = function (_Component) {
    (0, _inherits3.default)(LegendItems, _Component);

    function LegendItems() {
        var _ref;

        (0, _classCallCheck3.default)(this, LegendItems);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = LegendItems.__proto__ || (0, _getPrototypeOf2.default)(LegendItems)).call.apply(_ref, [this].concat(args)));

        _this.onAddLegendItem = function () {
            var legend = {
                id: (0, _uid.generateUid)(),
                color: '#FFA500' // Orange is default
            };

            (0, _LegendItem.openEditDialogFor)(legend);
        };

        _this.state = {
            editDialogOpen: false
        };
        return _this;
    }

    (0, _createClass3.default)(LegendItems, [{
        key: 'render',
        value: function render() {
            var props = this.props;

            var actions = {
                edit: _LegendItem.openEditDialogFor,
                delete: props.deleteItem
            };

            var styles = {
                component: {
                    position: 'relative'
                },
                button: {
                    float: 'right',
                    position: 'absolute',
                    right: 20,
                    top: -29
                }
            };

            var orderedItems = props.items.sort(function (left, right) {
                return Number(left.startValue) - Number(right.startValue);
            });

            return _react2.default.createElement(
                'div',
                { style: styles.component },
                _react2.default.createElement(
                    _FloatingActionButton2.default,
                    { style: styles.button, onClick: this.onAddLegendItem },
                    _react2.default.createElement(_add2.default, null)
                ),
                _react2.default.createElement(_d2UiTable2.default, {
                    rows: orderedItems,
                    columns: ['name', 'startValue', 'endValue', 'color'],
                    primaryAction: function primaryAction() {},
                    contextMenuActions: actions
                }),
                _react2.default.createElement(_EditLegendItem2.default, { onItemUpdate: function onItemUpdate() {
                        return props.updateItem(props.items);
                    } })
            );
        }
    }]);
    return LegendItems;
}(_react.Component);

LegendItems.contextTypes = {
    d2: _propTypes2.default.object
};

LegendItems.propTypes = {
    items: _propTypes2.default.array.isRequired
};

LegendItems.defaultProps = {
    items: []
};

exports.default = LegendItems;