/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import moment from 'moment';
import React, { Component } from 'react';
import { TimePicker } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: TimePickerMolecule
 * -----------------------------------------------------------------------------
 */

export default class TimePickerMolecule extends Component {
    static defaultProps = {
        selected: moment()
            .format('hh:mm:ss:A')
            .split(':'),
        value: TimePicker.formatTime('blah s 09:00:30 A test'),
    };

    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    // onChange = e => console.log(e);

    render() {
        return (
            <div style={{ height: 400 }}>
                <TimePicker {...this.props} name='toolkit-timepicker-demo' />
            </div>
        );
    }
}
