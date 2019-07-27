import React from 'react';
import _ from 'underscore';
import { Checkpoints } from 'components/common-ui';

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
        children: 'The active Checkpoint.',
        property: 'index',
        type: 'Number',
        value: Checkpoints.defaultProps.index,
    },
    {
        children: (
            <>
                {'The location vertical location of the labels: '}
                <kbd>{Object.values(Checkpoints.ENUMS.ALIGN).join(', ')}</kbd>.
            </>
        ),
        property: 'labelAlign',
        type: 'String',
        value: Checkpoints.defaultProps.labelAlign,
    },
    {
        children: (
            <>
                {'Array of Checkpoint objects: '}
                <kbd>label:</kbd>
                <span className='number'>{'Node, '}</span>
                <kbd>icon:</kbd>
                <span className='number'>{'Node, '}</span>
                <kbd>value:</kbd>
                <span className='number'>{'Number|String'}</span>.
            </>
        ),
        property: 'points',
        type: 'Array',
    },
    {
        children:
            'Disable progress updates by clicking the Checkpoint elements.',
        property: 'readOnly',
        type: 'Boolean',
        value: String(Checkpoints.defaultProps.readOnly),
    },
    {
        children: (
            <>
                <kbd>{Checkpoints.ENUMS.EVENT.CHANGE}</kbd> event callback.
            </>
        ),
        property: 'onChange',
        type: 'Function',
    },
    {
        children: (
            <>
                <kbd>{Checkpoints.ENUMS.EVENT.COMPLETE}</kbd> event callback.
            </>
        ),
        property: 'onComplete',
        type: 'Function',
    },
    {
        children: 'Reference to the internal state object',
        property: 'state',
        type: 'Object',
        value: 'read only',
    },
    {
        children: 'Get the current value of the Checkpoints.',
        property: 'value',
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
