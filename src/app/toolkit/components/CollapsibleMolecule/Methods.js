import React from 'react';

const Table = ({ children }) => (
    <table style={{ tableLayout: 'fixed' }}>
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
        children: (
            <>
                {'Collapses the Collapsible with an animation and sets the '}
                <kbd>expanded</kbd>
                {' state to  '}
                <kbd>false</kbd>.
            </>
        ),
        method: 'collapse()',
        returns: 'Promise',
    },
    {
        children: (
            <>
                {'Expands the Collapsible with an animation and sets the '}
                <kbd>expanded</kbd>
                {' state to '}
                <kbd>true</kbd>.
            </>
        ),
        method: 'expand()',
        returns: 'Promise',
    },
    {
        children: (
            <>
                {
                    'Collapses or expands the Collapsible with an animation and sets the '
                }
                <kbd>expanded</kbd>
                {' state to opposite of the current value.'}
            </>
        ),
        method: 'toggle()',
        returns: 'Promise',
    },
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
