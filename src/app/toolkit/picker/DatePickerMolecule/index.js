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
        return <DatePicker {...this.props} />;
    }
}

// Default properties
DatePickerMolecule.defaultProps = {};

export default DatePickerMolecule;
