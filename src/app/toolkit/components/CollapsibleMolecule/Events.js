import React from 'react';
import { Collapsible } from 'components/common-ui';

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
    beforeCollapse: 'Fires before the Collapsible is collapsed.',
    beforeExpand: 'Fires before the Collapsible is expanded.',
    collapse: 'Fires after the Collapsible is collapsed.',
    expand: 'Fires after the Collapsible is expanded.',
};

const Events = () => (
    <Table>
        {Object.values(Collapsible.ENUMS.EVENT).map(event => (
            <Row key={`demo-${event}`} event={event}>
                {Info[event]}
            </Row>
        ))}
    </Table>
);

export default Events;
