/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';
import moment from 'moment';
import { AreaChart } from 'components/common-ui/Charts';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: AreaChartMolecule
 * -----------------------------------------------------------------------------
 */

const AreaChartMolecule = props => {
    return (
        <div className='flex-center'>
            <div className='flex-grow' style={{ maxWidth: 700 }}>
                <AreaChart {...props} />
            </div>
        </div>
    );
};

AreaChartMolecule.dependencies = () => {
    return typeof module !== 'undefined' ? model.children : [];
};

// Default properties
AreaChartMolecule.defaultProps = {
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
    dots: true,
    xLabel: moment().format('YYYY'),
    yLabel: 'Crunches',
};

export default AreaChartMolecule;
