import React from 'react';
import { Button } from 'components/common-ui';

const Methods = () => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={245} />
            <col />
        </colgroup>
        <thead>
            <tr>
                <th>Method</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr className='top'>
                <th>
                    setState(<kbd>newState</kbd>:Object)
                </th>
                <td>
                    Allows external components to syncronously alter the
                    internal state object.
                </td>
            </tr>
        </tbody>
    </table>
);

export default Methods;
