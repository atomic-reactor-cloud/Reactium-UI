import React from 'react';
import { Alert } from 'components/common-ui';

const Table = ({ children }) => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={245} />
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
    beforeHide: 'Fires before the Alert is hidden.',
    beforeShow: 'Fires before the Alert is shown.',
    dismiss: 'Fires after the Alert has been dismissed.',
    hide: 'Fires after the Alert is hidden.',
    show: 'Fires after the Alert is shown.',
};

const Events = () => (
    <Table>
        {Object.values(Alert.ENUMS.EVENT).map(event => (
            <Row key={`demo-${event}`} event={event}>
                {Info[event]}
            </Row>
        ))}
    </Table>
);

export default Events;
