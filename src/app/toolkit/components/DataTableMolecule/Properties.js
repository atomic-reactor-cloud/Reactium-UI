import React from 'react';
import _ from 'underscore';
import { DataTable } from 'components/common-ui';

const tableStyle = {
    tableLayout: 'fixed',
};

const Table = ({ children }) => (
    <table style={tableStyle}>
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
        children: 'Reference to the internal state object.',
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
