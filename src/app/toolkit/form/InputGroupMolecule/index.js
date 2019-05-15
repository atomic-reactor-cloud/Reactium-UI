/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Button from 'components/common-ui/Button';
import { Feather } from 'components/common-ui/Icon';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: InputGroupMolecule
 * -----------------------------------------------------------------------------
 */

export default class InputGroupMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        return (
            <div>
                <div className='input-group'>
                    <input type='text' placeholder='City' />
                    <input
                        type='text'
                        placeholder='ST'
                        style={{ maxWidth: 50 }}
                        className='text-center'
                    />
                    <Button
                        size={Button.ENUMS.SIZE.XS}
                        color={Button.ENUMS.COLOR.PRIMARY}>
                        <Feather.Search width={18} height={18} />
                    </Button>
                    <input
                        type='text'
                        placeholder='Zip'
                        style={{ maxWidth: 140 }}
                    />
                    <Button
                        size={Button.ENUMS.SIZE.XS}
                        color={Button.ENUMS.COLOR.SECONDARY}>
                        <Feather.Navigation width={18} height={18} />
                    </Button>
                </div>
            </div>
        );
    }
}
