import uuid from 'uuid/v4';
import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar } from 'victory';
import Colors from 'components/common-ui/colors';
import Chart from 'components/common-ui/Charts/utils/Chart';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: BarChart
 * -----------------------------------------------------------------------------
 */
const BarChart = props => {
    const { data, style } = props;

    const barProps = {
        data,
        style,
    };

    return (
        <Chart {...props}>
            <VictoryBar {...barProps} />
        </Chart>
    );
};

BarChart.propTypes = {
    ...Chart.propTypes,
    style: PropTypes.object,
};

BarChart.defaultProps = {
    ...Chart.defaultProps,
    dots: false,
    id: uuid(),
    style: {
        data: {
            fill: Chart.defaultProps.color,
            fillOpacity: 0.25,
            stroke: Chart.defaultProps.color,
            strokeWidth: 2,
        },
    },
    xAxisStyle: {
        ...Chart.defaultProps.xAxisStyle,
        axis: { stroke: Colors['color-grey-light'], strokeWidth: 3 },
    },
    yAxisStyle: {
        ...Chart.defaultProps.yAxisStyle,
        axisLabel: {
            fontSize: 9,
            padding: 36,
        },
        ticks: {
            stroke: Colors['color-grey-light'],
            opacity: 0.75,
            size: 15,
        },
        tickLabels: {
            fontSize: 7,
            padding: 5,
        },
    },
};

export { BarChart, BarChart as default };
