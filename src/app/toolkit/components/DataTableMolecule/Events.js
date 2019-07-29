import React from 'react';
import { DataTable } from 'components/common-ui';

const tableStyle = {
    tableLayout: 'fixed',
};

const Table = ({ children }) => (
    <table style={tableStyle}>
        <colgroup>
            <col width={260} />
            <col />
        </colgroup>
        <thead>
            <tr>
                <th>Event</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>{children}</tbody>
    </table>
);

const Row = ({ children, event }) => (
    <tr className='top'>
        <th>{event}</th>
        <td>{children}</td>
    </tr>
);

const data = {
    change: 'Fires after the value of the DataTable has changed.',
};

const Events = () => (
    <Table>
        {Object.values(DataTable.ENUMS.EVENT).map(event => (
            <Row key={`demo-${event}`} event={event}>
                {data[event]}
            </Row>
        ))}
    </Table>
);

export default Events;
