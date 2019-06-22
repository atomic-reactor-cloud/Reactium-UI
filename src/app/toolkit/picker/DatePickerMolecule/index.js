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

export default class DatePickerMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            // minDate: new Date('06/10/2019'),
            // maxDate: new Date(),
            range: false,
        };
    }

    render() {
        return (
            <div style={{ height: 400 }}>
                <DatePicker {...this.state} {...this.props} />
            </div>
        );
    }
}
