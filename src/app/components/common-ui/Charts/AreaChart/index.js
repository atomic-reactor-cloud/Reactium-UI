import _ from 'underscore';
import uuid from 'uuid/v4';
import React from 'react';
import PropTypes from 'prop-types';
import {
    VictoryArea,
    VictoryAxis,
    VictoryChart,
    VictoryLabel,
    VictoryScatter,
    VictoryPortal,
} from 'victory';
import Colors from 'components/common-ui/colors';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: AreaChart
 * -----------------------------------------------------------------------------
 */
const AreaChart = ({
    color,
    data,
    dots,
    opacity,
    tickCount,
    tickFormat,
    xLabel,
    yLabel,
    ...props
}) => {
    const id = uuid();

    const areaStyle = {
        data: {
            fill: `url(#${id}-gradient)`,
            fillOpacity: opacity,
            stroke: color,
            strokeWidth: 2,
        },
    };

    const dotStyle = {
        data: {
            fill: Colors['color-white'],
            stroke: color,
            strokeWidth: 2,
        },
    };

    const chartProps = {
        data,
        style: areaStyle,
        ...props,
    };

    const dotProps = {
        data,
        interpolation: props.interpolation,
        style: dotStyle,
    };

    const tickLabelProps = {
        dy: -2,
        style: {
            fontSize: 7,
        },
    };

    const axisLabelProps = {
        style: {
            fontSize: 10,
        },
    };

    return (
        <>
            <svg
                style={{
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    top: -500000,
                    left: -500000,
                }}>
                <defs>
                    <linearGradient
                        id={`${id}-gradient`}
                        x1='0%'
                        y1='0%'
                        x2='0%'
                        y2='100%'>
                        <stop offset='0%' stopColor={color} stopOpacity={1} />
                        <stop
                            offset='100%'
                            stopColor={color}
                            stopOpacity={0.25}
                        />
                    </linearGradient>
                </defs>
            </svg>
            <VictoryChart>
                <VictoryArea {...chartProps} />
                <VictoryAxis
                    label={xLabel}
                    axisComponent={<div />}
                    axisLabelComponent={<VictoryLabel {...axisLabelProps} />}
                    tickLabelComponent={<VictoryLabel {...tickLabelProps} />}
                />
                <VictoryAxis
                    label={yLabel}
                    dependentAxis
                    crossAxis
                    tickFormat={tickFormat}
                    axisComponent={<div />}
                    axisLabelComponent={<VictoryLabel {...axisLabelProps} />}
                    tickCount={tickCount}
                    tickLabelComponent={
                        <VictoryLabel {...tickLabelProps} dy={0} />
                    }
                />
                {dots && (
                    <VictoryPortal>
                        <VictoryScatter {...dotProps} />
                    </VictoryPortal>
                )}
            </VictoryChart>
        </>
    );
};

AreaChart.propTypes = {
    animate: PropTypes.bool,
    color: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    data: PropTypes.array,
    dots: PropTypes.bool,
    interpolation: PropTypes.string,
    opacity: PropTypes.number,
    tickCount: PropTypes.number,
    tickFormat: PropTypes.func,
    xLabel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    yLabel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

AreaChart.defaultProps = {
    color: Colors['color-blue'],
    interpolation: 'natural',
    opacity: 0.3,
    tickFormat: t => Math.ceil(t),
    tickCount: 3,
};

export default AreaChart;
