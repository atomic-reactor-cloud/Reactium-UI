import React from 'react';
import { Button } from 'components/common-ui';

const Table = ({ children }) => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={135} />
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
        <Row property='appearance' type='String' value='null'>
            The enumerated value for the button appearance:
            <div className='kbd'>
                {Object.values(Button.ENUMS.APPEARANCE).join(', ')}.
            </div>
            <div className='small'>
                Note:{' '}
                <span className='kbd'>{Button.ENUMS.APPEARANCE.CIRCLE}</span>{' '}
                should be used with a fixed width and height where both values
                are the same.
            </div>
        </Row>

        <Row property='block' type='Boolean' value='false'>
            Stretch the button to 100% of it's parent container.
        </Row>

        <Row property='children' type='Node' value='null'>
            <div>Anything that can be rendered:</div>
            <kbd>numbers,</kbd> <kbd>strings,</kbd> <kbd>elements</kbd>
            {' or an '}
            <kbd>array.</kbd>
        </Row>

        <Row property='color' type='String' value={Button.defaultProps.color}>
            The enumerated value for the button color:
            <div className='kbd'>
                {Object.values(Button.ENUMS.COLOR).join(', ')}
            </div>
        </Row>

        <Row property='disabled' type='Boolean' value='false'>
            Turn off button's ability to be clicked.
        </Row>

        <Row property='element' type='Node' value='read only'>
            Reference to the component's{' '}
            <span className='kbd'>{'<button />'}</span> element.
        </Row>

        <Row property='outline' type='Boolean' value='false'>
            Apply the outlined button styling.
        </Row>

        <Row property='readOnly' type='Boolean' value='false'>
            Similar to disabled but makes the button appear like a normal button
            even though it is not clickable.
        </Row>

        <Row property='size' type='String' value={Button.defaultProps.size}>
            The enumerated value for the button size:
            <div className='kbd'>
                {Object.values(Button.ENUMS.SIZE).join(', ')}
            </div>
        </Row>

        <Row property='state' type='Object' value='read only'>
            Reference to the component's state object.
        </Row>
    </Table>
);

export default Properties;
