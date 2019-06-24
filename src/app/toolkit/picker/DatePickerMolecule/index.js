/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import moment from 'moment';
import React, { Component } from 'react';
import { DatePicker } from 'components/common-ui';
import { Feather } from 'components/common-ui/Icon';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: DatePickerMolecule
 * -----------------------------------------------------------------------------
 */

export default class DatePickerMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        const style = { minHeight: 420 };
        const iframe = {
            iDocument: this.props.iDocument,
            iWindow: this.props.iWindow,
            width: 296,
        };

        const col =
            'col-xs-12 col-sm-6 mb-xs-20 mb-sm-0 flex middle column top';

        return (
            <>
                <div className='row mb-xs-10'>
                    <div className={col} style={style}>
                        <h4 className='mb-xs-8'>
                            Single Select & Keyboard Edit
                        </h4>
                        <DatePicker value='04/22/1978' {...iframe} />
                    </div>
                    <div className={col} style={style}>
                        <h4 className='mb-xs-8'>Range & Keyboard Edit</h4>
                        <DatePicker
                            placeholder='Select Dates'
                            {...iframe}
                            range
                            value='04/01/2019 - 04/30/2019'
                        />
                    </div>
                </div>
                <div className='row mb-xs-10'>
                    <div className={col} style={style}>
                        <h4 className='mb-xs-8'>Multi Select</h4>
                        <DatePicker
                            {...iframe}
                            multiple
                            value='04/22/2019, 04/24/2019, 04/01/2019'
                        />
                    </div>
                    <div className={col} style={style}>
                        <h4 className='mb-xs-8'>
                            Customize UI - No Keyboard Edit
                        </h4>
                        <DatePicker
                            readOnly
                            {...iframe}
                            nav={false}
                            maxDate={moment()
                                .endOf('month')
                                .toDate()}
                            minDate={moment()
                                .startOf('month')
                                .toDate()}
                            labels={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                            icon={{
                                closed: <Feather.ChevronDown />,
                                opened: <Feather.ChevronUp />,
                            }}
                        />
                    </div>
                </div>
            </>
        );
    }
}
