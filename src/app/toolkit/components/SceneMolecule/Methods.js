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
        children: 'Programmaticly add new children.',
        method: (
            <>
                addChildren(<kbd>children:</kbd>Array)
            </>
        ),
    },
    {
        children:
            'Programmaticly remove children by specifying an array of child id attributes or indices.',
        method: (
            <>
                removeChildren(<kbd>children:</kbd>Array)
            </>
        ),
    },
    {
        children: (
            <>
                <div className='mb-xs-8'>Navigate to the specified panel.</div>
                <div className='strong number'>options</div>
                <p className='pl-xs-16'>
                    {
                        ' The animation options used to display the child. If options is a '
                    }
                    <kbd>String</kbd>
                    {', the values specified via '}
                    <kbd>props</kbd>
                    {' are used.'}
                </p>
                <div className='strong number'>options.animation</div>
                <p className='pl-xs-16'>
                    See <kbd>animation</kbd> property.
                </p>
                <div className='strong number'>options.animationSpeed</div>
                <p className='pl-xs-16'>
                    See <kbd>animationSpeed</kbd> property.
                </p>
                <div className='strong number'>options.direction</div>
                <p className='pl-xs-8'>
                    See <kbd>direction</kbd> property.
                </p>
                <div className='strong number'>options.panel</div>
                <p className='pl-xs-16'>
                    The <kbd>id</kbd> attribute or index of the child to
                    display.
                </p>
                <div className='strong number'>noHistory</div>
                <p className='pl-xs-16'>
                    Bypass adding the change event to the history stack.
                </p>
                <div className='strong number'>clearHistory</div>
                <p className='pl-xs-16'>
                    Clear the history before adding the change event to the
                    history stack.
                </p>
            </>
        ),
        method: (
            <>
                navTo(
                <div className='ml-xs-16'>
                    <kbd>options:</kbd>Object|String,
                </div>
                <div className='ml-xs-16'>
                    <kbd>noHistory:</kbd>Boolean,
                </div>
                <div className='ml-xs-16'>
                    <kbd>clearHistory:</kbd>Boolean
                </div>
                )
            </>
        ),
        returns: 'Promise',
    },
    {
        children: (
            <>
                {
                    'Navigate up the history stack. The opposite animation will be used when displaying the previous child. For instance if you used a '
                }
                <kbd>cover</kbd>
                {' animation to show the current child, a '}
                <kbd>reveal</kbd>
                {' animation will be used to display the previous child.'}
            </>
        ),
        method: 'back()',
        returns: 'Promise',
    },
    {
        children: 'Clear the history stack.',
        method: 'clearHistory()',
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
