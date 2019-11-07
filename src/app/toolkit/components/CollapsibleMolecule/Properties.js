import React from 'react';
import _ from 'underscore';
import { Collapsible } from 'components/common-ui';

const Table = ({ children }) => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={150} />
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

const data = [
    {
        children: 'Time in seconds of the collapse/expand animation.',
        property: 'animationSpeed',
        type: 'Number',
        value: Collapsible.defaultProps.animationSpeed,
    },
    {
        children: 'Initial expanded state.',
        property: 'expanded',
        type: 'Boolean',
        value: String(Collapsible.defaultProps.expanded),
    },
    {
        children: (
            <>
                {'The orientation of the collapsible.'}
                <br />
                {'Valid values: '}
                <kbd>
                    {Object.values(Collapsible.ENUMS.DIRECTION).join(', ')}
                </kbd>
            </>
        ),
        property: 'direction',
        type: 'String',
        value: String(Collapsible.defaultProps.direction),
    },
    {
        children: (
            <>
                <kbd>beforeCollapse</kbd>
                {' event callback.'}
            </>
        ),
        property: 'onBeforeCollapse',
        type: 'Function',
    },
    {
        children: (
            <>
                <kbd>beforeExpand</kbd>
                {' event callback.'}
            </>
        ),
        property: 'onBeforeExpand',
        type: 'Function',
    },
    {
        children: (
            <>
                <kbd>collapse</kbd>
                {' event callback.'}
            </>
        ),
        property: 'onCollapse',
        type: 'Function',
    },
    {
        children: (
            <>
                <kbd>expand</kbd>
                {' event callback.'}
            </>
        ),
        property: 'onExpand',
        type: 'Function',
    },
    {
        children: 'Reference to the internal state object',
        property: 'state',
        type: 'Object',
        value: 'read only',
    },
];

const Properties = () => (
    <Table>
        {data.map((item, i) => (
            <Row key={`property-row-${i}`} {...item} />
        ))}
    </Table>
);

export default Properties;
