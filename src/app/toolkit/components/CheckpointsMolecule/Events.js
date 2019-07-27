import React from 'react';
import { Checkpoints } from 'components/common-ui';

const Table = ({ children }) => (
    <table style={{ tableLayout: 'fixed' }}>
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

const Info = {
    change: 'Fires after the value of the Checkpoints has changed.',
    complete: 'Fires after the Checkpoints are complete.',
};

const Events = () => (
    <Table>
        {Object.values(Checkpoints.ENUMS.EVENT).map(event => (
            <Row key={`demo-${event}`} event={event}>
                {Info[event]}
            </Row>
        ))}
    </Table>
);

export default Events;
