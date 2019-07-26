import React from 'react';
import { Scene } from 'components/common-ui';

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
    beforeChange: 'Fires before the active child is changed.',
    change: 'Fires after the active child is changed.',
};

const Events = () => (
    <Table>
        {Object.values(Scene.ENUMS.EVENT).map(event => (
            <Row key={`demo-${event}`} event={event}>
                {Info[event]}
            </Row>
        ))}
    </Table>
);

export default Events;
