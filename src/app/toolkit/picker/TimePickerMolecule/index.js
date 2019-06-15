/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { TimePicker } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: TimePickerMolecule
 * -----------------------------------------------------------------------------
 */

export default class TimePickerMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        return (
            <div style={{ height: 400 }}>
                <TimePicker {...this.props} />
            </div>
        );
    }
}
