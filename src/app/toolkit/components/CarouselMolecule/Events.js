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
    change: 'Fires before the Carousel has changed slides.',
    complete: 'Fires after the transition is complete when changing slides.',
    next: (
        <>
            Fires when the <kbd>next()</kbd> method is called.
        </>
    ),
    pause: (
        <>
            Fires when the <kbd>pause()</kbd> method is called.
        </>
    ),
    play: (
        <>
            Fires when the <kbd>play()</kbd> method is called.
        </>
    ),
    prev: (
        <>
            Fires when the <kbd>prev()</kbd> method is called.
        </>
    ),
    stop: (
        <>
            Fires when the <kbd>stop()</kbd> method is called.
        </>
    ),
};

const Events = () => (
    <Table>
        {Object.entries(Info).map(([event, value]) => (
            <Row key={`demo-${event}`} event={event}>
                {value}
            </Row>
        ))}
    </Table>
);

export default Events;
