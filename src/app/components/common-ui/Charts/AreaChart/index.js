import uuid from 'uuid/v4';
import React from 'react';
import PropTypes from 'prop-types';
import { VictoryArea } from 'victory';
import Chart from 'components/common-ui/Charts/utils/Chart';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: AreaChart
 * -----------------------------------------------------------------------------
 */
const AreaChart = props => {
    let { color, data, id, interpolation, opacity, style } = props;

    style = style || {
        data: {
            fill: `url(#${id}-gradient)`,
            fillOpacity: opacity,
            stroke: color,
            strokeWidth: 2,
        },
    };

    const areaProps = {
        data,
        style,
        interpolation,
    };

    return (
        <Chart {...props}>
            <VictoryArea {...areaProps} />
        </Chart>
    );
};

AreaChart.propTypes = {
    ...Chart.propTypes,
    opacity: PropTypes.number,
    style: PropTypes.object,
};

AreaChart.defaultProps = {
    ...Chart.defaultProps,
    dots: true,
    id: uuid(),
    opacity: 0.25,
};

export { AreaChart, AreaChart as default };
