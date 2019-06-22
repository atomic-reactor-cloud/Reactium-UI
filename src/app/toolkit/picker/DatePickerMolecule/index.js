/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { DatePicker } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: DatePickerMolecule
 * -----------------------------------------------------------------------------
 */

class DatePickerMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{ height: 400 }}>
                <DatePicker {...this.props} />
            </div>
        );
    }
}

// Default properties
DatePickerMolecule.defaultProps = {};

export default DatePickerMolecule;
