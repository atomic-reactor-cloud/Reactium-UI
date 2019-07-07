import React from 'react';
import { Button } from 'components/common-ui';

const Properties = () => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={135} />
            <col width={110} />
            <col />
            <col width={130} />
        </colgroup>
        <thead>
            <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Description</th>
                <th>Default</th>
            </tr>
        </thead>
        <tbody>
            <tr className='top'>
                <th>appearance</th>
                <th>String</th>
                <td>
                    The enumerated value for the button appearance:
                    <div className='kbd'>
                        {Object.values(Button.ENUMS.APPEARANCE).join(', ')}
                    </div>
                    <div className='small'>
                        Note:{' '}
                        <span className='kbd'>
                            {Button.ENUMS.APPEARANCE.CIRCLE}
                        </span>{' '}
                        should be used with a fixed width and height where both
                        values are the same.
                    </div>
                </td>
                <td>
                    <span className='number'>null</span>
                </td>
            </tr>
            <tr className='top'>
                <th>block</th>
                <th>Boolean</th>
                <td>Stretch the button to 100% of it's parent container.</td>
                <td>
                    <span className='number'>false</span>
                </td>
            </tr>
            <tr className='top'>
                <th>color</th>
                <th>String</th>
                <td>
                    The enumerated value for the button color:
                    <div className='kbd'>
                        {Object.values(Button.ENUMS.COLOR).join(', ')}
                    </div>
                </td>
                <td>
                    <span className='number'>{Button.ENUMS.COLOR.PRIMARY}</span>
                </td>
            </tr>
            <tr className='top'>
                <th>disabled</th>
                <th>Boolean</th>
                <td>Turn off button's ability to be clicked.</td>
                <td>
                    <span className='number'>false</span>
                </td>
            </tr>
            <tr className='top'>
                <th>element</th>
                <th>Node</th>
                <td>
                    Reference to the component's{' '}
                    <span className='kbd'>{'<button />'}</span> element.
                </td>
                <td>
                    <span className='number'>read only</span>
                </td>
            </tr>
            <tr className='top'>
                <th>outline</th>
                <th>Boolean</th>
                <td>Apply the outlined button styling.</td>
                <td>
                    <span className='number'>false</span>
                </td>
            </tr>

            <tr className='top'>
                <th>readOnly</th>
                <th>Boolean</th>
                <td>
                    Similar to disabled but makes the button appear like a
                    normal button even though it is not clickable.
                </td>
                <td>
                    <span className='number'>false</span>
                </td>
            </tr>
            <tr className='top'>
                <th>size</th>
                <th>String</th>
                <td>
                    The enumerated value for the button size:
                    <div className='kbd'>
                        {Object.values(Button.ENUMS.SIZE).join(', ')}
                    </div>
                </td>
                <td>
                    <span className='number'>{Button.ENUMS.SIZE.SM}</span>
                </td>
            </tr>
            <tr className='top'>
                <th>state</th>
                <th>Object</th>
                <td>Reference to the component's state object.</td>
                <td>
                    <span className='number'>read only</span>
                </td>
            </tr>
        </tbody>
    </table>
);

export default Properties;
