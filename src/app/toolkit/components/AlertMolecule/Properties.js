import React from 'react';
import _ from 'underscore';
import { Alert } from 'components/common-ui';

const Table = ({ children }) => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={135} />
            <col width={110} />
            <col />
            <col width={180} />
        </colgroup>
        <thead>
            <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Description</th>
                <th>Default</th>
            </tr>
        </thead>
        <tbody>{children}</tbody>
    </table>
);

const Row = ({ children, property, type, value = 'null' }) => (
    <tr className='top'>
        <th>{property}</th>
        <th>{type}</th>
        <td>{children}</td>
        <td>
            <span className='number'>{value}</span>
        </td>
    </tr>
);

const Colors = _.without(Object.values(Alert.ENUMS.COLOR), 'clear');

const Properties = () => (
    <Table>
        <Row property='animationSpeed' type='Number' value='0.25'>
            Time in seconds of the hide/show animation.
        </Row>

        <Row property='autoDismiss' type='Number' value='null'>
            Time in seconds before the Alert automatically closes.
        </Row>

        <Row property='children' type='Node' value='null'>
            <div>Anything that can be rendered:</div>
            <kbd>numbers,</kbd> <kbd>strings,</kbd> <kbd>elements,</kbd>
            {' or an '}
            <kbd>array.</kbd>
        </Row>

        <Row property='color' type='String' value={Alert.defaultProps.color}>
            The enumerated value for the Alert color:
            <div className='kbd'>{Colors.join(', ')}.</div>
        </Row>

        <Row
            property='dismissable'
            type='Boolean'
            value={String(Alert.defaultProps.dismissable)}>
            Allow the user to manually close the Alert.
        </Row>

        <Row property='icon' type='Node' value='<Feather.Info />'>
            Specify an Icon component to display with the Alert.
        </Row>

        <Row property='onBeforeHide' type='Function' value='null'>
            <kbd>beforeHide</kbd> event callback.
        </Row>

        <Row property='onBeforeShow' type='Function' value='null'>
            <kbd>beforeShow</kbd> event callback.
        </Row>

        <Row property='onDismiss' type='Function' value='null'>
            <kbd>dismiss</kbd> event callback.
        </Row>

        <Row property='onHide' type='Function' value='null'>
            <kbd>hide</kbd> event callback.
        </Row>

        <Row property='onShow' type='Function' value='null'>
            <kbd>show</kbd> event callback.
        </Row>

        <Row property='state' type='Object' value='read only'>
            Reference to the component's state object.
        </Row>

        <Row property='visible' type='Boolean' value='true'>
            Set the Alert visibility.
        </Row>
    </Table>
);

export default Properties;
