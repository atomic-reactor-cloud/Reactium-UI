/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { BarChart } from 'components/common-ui/Charts';
import moment from 'moment';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: BarChartMolecule
 * -----------------------------------------------------------------------------
 */

class BarChartMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        return (
            <div className='flex-center'>
                <div className='flex-grow' style={{ maxWidth: 700 }}>
                    <BarChart {...this.props} />
                </div>
            </div>
        );
    }
}

// Default properties
BarChartMolecule.defaultProps = {
    data: [
        {
            y: 20,
            x: moment()
                .subtract(4, 'days')
                .format('M/DD'),
        },
        {
            y: 50,
            x: moment()
                .subtract(3, 'days')
                .format('M/DD'),
        },
        {
            y: 80,
            x: moment()
                .subtract(2, 'days')
                .format('M/DD'),
        },
        {
            y: 50,
            x: moment()
                .subtract(1, 'days')
                .format('M/DD'),
        },
        {
            y: 100,
            x: moment().format('M/DD'),
        },
    ],
    xLabel: moment().format('YYYY'),
    yLabel: 'Crunches',
};

export default BarChartMolecule;
