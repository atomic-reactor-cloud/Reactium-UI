/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import { AreaChart } from 'components/common-ui/Charts';
import moment from 'moment';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: AreaChartMolecule
 * -----------------------------------------------------------------------------
 */

class AreaChartMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        return <AreaChart {...this.props} />;
    }
}

const d = moment();

// Default properties
AreaChartMolecule.defaultProps = {
    data: [
        {
            y: 20,
            x: moment().format('M/DD'),
        },
        {
            y: 50,
            x: moment()
                .add(1, 'days')
                .format('M/DD'),
        },
        {
            y: 80,
            x: moment()
                .add(2, 'days')
                .format('M/DD'),
        },
        {
            y: 50,
            x: moment()
                .add(3, 'days')
                .format('M/DD'),
        },
        {
            y: 100,
            x: moment()
                .add(4, 'days')
                .format('M/DD'),
        },
    ],
    donts: true,
    xLabel: moment().format('YYYY'),
    yLabel: 'Crunches',
};

export default AreaChartMolecule;
