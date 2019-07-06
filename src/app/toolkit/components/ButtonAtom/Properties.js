import React from 'react';
import { Button } from 'components/common-ui';

const Properties = () => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={135} />
            <col width={110} />
            <col />
            <col width={100} />
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
                    <div>The enumerated value for the button appearance:</div>
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
                <td>
                    <div>
                        Stretch the button to 100% of it's parent container.
                    </div>
                </td>
                <td>
                    <span className='number'>false</span>
                </td>
            </tr>
            <tr className='top'>
                <th>color</th>
                <th>String</th>
                <td>
                    <div>The enumerated value for the button color:</div>
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
                <td>
                    <div>Turn off button's ability to be clicked.</div>
                </td>
                <td>
                    <span className='number'>false</span>
                </td>
            </tr>
            <tr className='top'>
                <th>outline</th>
                <th>Boolean</th>
                <td>
                    <div>Apply the outlined button styling.</div>
                </td>
                <td>
                    <span className='number'>false</span>
                </td>
            </tr>

            <tr className='top'>
                <th>readOnly</th>
                <th>Boolean</th>
                <td>
                    <div>
                        Similar to disabled but makes the button appear like a
                        normal button even though it is not clickable.
                    </div>
                </td>
                <td>
                    <span className='number'>false</span>
                </td>
            </tr>
            <tr className='top'>
                <th>size</th>
                <th>String</th>
                <td>
                    <div>The enumerated value for the button size:</div>
                    <div className='kbd'>
                        {Object.values(Button.ENUMS.SIZE).join(', ')}
                    </div>
                </td>
                <td>
                    <span className='number'>{Button.ENUMS.SIZE.SM}</span>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colSpan={4}>
                    <small>HTML</small>
                    <span className='number'>{' <button /> '}</span>
                    <small>attributes are also valid properties.</small>
                </td>
            </tr>
        </tfoot>
    </table>
);

export default Properties;
