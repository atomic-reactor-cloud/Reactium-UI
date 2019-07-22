import React from 'react';

const Table = ({ children }) => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={140} />
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

const Properties = () => (
    <Table>
        <Row property='animationSpeed' type='Number' value='0.5'>
            Time in seconds of the animation transition.
        </Row>
        <Row property='autoplay' type='Boolean' value='false'>
            Automatically navigate to the next slide.
        </Row>
        <Row property='duration' type='Number' value='10'>
            Time in seconds each slide is displayed when <kbd>autoplay</kbd> is
            true.
        </Row>
        <Row property='loop' type='Boolean' value='false'>
            Continuously cycle through the slides when <kbd>autoplay</kbd> is
            true.
        </Row>
        <Row property='pauseOnHover' type='Boolean' value='true'>
            Pause the carousel on mouse over when <kbd>autoplay</kbd> is true.
        </Row>
        <Row property='startIndex' type='Number' value='0'>
            The index of the visible slide.
        </Row>
        <Row property='swipeable' type='Boolean' value='true'>
            Allow swiping on mobile devices.
        </Row>
    </Table>
);

export default Properties;
