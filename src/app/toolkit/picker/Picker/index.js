/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Picker } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: Picker
 * -----------------------------------------------------------------------------
 */

export default class PickerMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        return (
            <div style={{ minHeight: 400 }}>
                <Picker
                    readOnly
                    placeholder='Select something'
                    iDocument={this.props.iDocument}
                    iWindow={this.props.iWindow}>
                    {(provided, snapshot) => (
                        <div
                            className='p-20 ar-picker-wrapper'
                            style={{ width: '100%' }}>
                            Your UI Hear
                        </div>
                    )}
                </Picker>
            </div>
        );
    }
}
