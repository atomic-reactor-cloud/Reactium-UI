import React from 'react';

const tableStyle = {
    tableLayout: 'fixed',
};

const Table = ({ children }) => (
    <table style={tableStyle}>
        <colgroup>
            <col width={260} />
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

const Row = ({ children, method, returns = 'null' }) => (
    <tr className='top'>
        <th>{method}</th>
        <td>{children}</td>
        <td>
            <span className='number'>{returns}</span>
        </td>
    </tr>
);

const data = [
    {
        children:
            'Allows external components to syncronously alter the internal state object.',
        method: (
            <>
                setState(<kbd>newState:</kbd>Object)
            </>
        ),
    },
];

const Methods = () => (
    <Table>
        {data.map((item, i) => (
            <Row key={`method-row-${i}`} {...item} />
        ))}
    </Table>
);

export default Methods;
