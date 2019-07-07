import React from 'react';

const Table = ({ children }) => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={245} />
            <col />
            <col width={180} />
        </colgroup>
        <thead>
            <tr>
                <th>Method</th>
                <th>Description</th>
                <th>Returns</th>
            </tr>
        </thead>
        <tbody>{children}</tbody>
    </table>
);

const Row = ({ children, method, returns }) => (
    <tr className='top'>
        <th>{method}</th>
        <td>{children}</td>
        <td>
            <span className='number'>{returns}</span>
        </td>
    </tr>
);

const Methods = () => (
    <Table>
        <Row
            method={
                <>
                    setState(<kbd>newState:</kbd>Object)
                </>
            }>
            Allows external components to syncronously alter the internal state
            object.
        </Row>

        <Row method='hide()' returns='Promise'>
            Programmaticly hide the Alert.
        </Row>

        <Row method='show()' returns='Promise'>
            Programmaticly show the Alert.
        </Row>

        <Row method='toggle()' returns='Promise'>
            Programmaticly hide or show the Alert depending on it's visibility.
        </Row>
    </Table>
);

export default Methods;
