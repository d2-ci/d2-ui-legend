import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { generateUid } from 'd2/uid';
import FloatingActionButton from 'material-ui/FloatingActionButton/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Table from '@dhis2/d2-ui-table';
import EditLegendItem from './EditLegendItem.component';
import { openEditDialogFor } from './LegendItem.store';

var LegendItems = function (_Component) {
    _inherits(LegendItems, _Component);

    function LegendItems() {
        var _ref;

        _classCallCheck(this, LegendItems);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = LegendItems.__proto__ || _Object$getPrototypeOf(LegendItems)).call.apply(_ref, [this].concat(args)));

        _this.onAddLegendItem = function () {
            var legend = {
                id: generateUid(),
                color: '#FFA500' // Orange is default
            };

            openEditDialogFor(legend);
        };

        _this.state = {
            editDialogOpen: false
        };
        return _this;
    }

    _createClass(LegendItems, [{
        key: 'render',
        value: function render() {
            var props = this.props;

            var actions = {
                edit: openEditDialogFor,
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

            return React.createElement(
                'div',
                { style: styles.component },
                React.createElement(
                    FloatingActionButton,
                    { style: styles.button, onClick: this.onAddLegendItem },
                    React.createElement(ContentAdd, null)
                ),
                React.createElement(Table, {
                    rows: orderedItems,
                    columns: ['name', 'startValue', 'endValue', 'color'],
                    primaryAction: function primaryAction() {},
                    contextMenuActions: actions
                }),
                React.createElement(EditLegendItem, { onItemUpdate: function onItemUpdate() {
                        return props.updateItem(props.items);
                    } })
            );
        }
    }]);

    return LegendItems;
}(Component);

LegendItems.contextTypes = {
    d2: PropTypes.object
};

LegendItems.propTypes = {
    items: PropTypes.array.isRequired
};

LegendItems.defaultProps = {
    items: []
};

export default LegendItems;