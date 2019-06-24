import uuid from 'uuid/v4';
import React from 'react';
import PropTypes from 'prop-types';
import Colors from 'components/common-ui/colors';
import Gradient from 'components/common-ui/Charts/utils/Gradient';

import {
    VictoryAxis,
    VictoryChart,
    VictoryScatter,
    VictoryTooltip,
} from 'victory';

const ENUMS = {
    INTERPOLATION: {
        BASIS: 'basis',
        CARDINAL: 'cardinal',
        CATMULLROM: 'catmullRom',
        LINEAR: 'linear',
        MONOTONEX: 'monotoneX',
        MONOTONEY: 'monotoneY',
        NATURAL: 'natural',
        STEP: 'step',
        STEP_AFTER: 'stepAfter',
        STEP_BEFORE: 'stepBefore',
    },
};

/**
 * -----------------------------------------------------------------------------
 * Functional Component: Chart
 * -----------------------------------------------------------------------------
 */
const Chart = ({
    children,
    color,
    data,
    dots,
    id,
    interpolation,
    tickCount,
    tickFormat,
    xAxis,
    xGrid,
    xLabel,
    yAxis,
    yGrid,
    yLabel,
}) => {
    const renderDots = style => {
        if (!dots) {
            return;
        }

        style = style || {
            data: {
                fill: Colors['color-white'],
                stroke: color,
                strokeWidth: 2,
            },
        };

        const dotProps = {
            data,
            interpolation,
            style,
        };

        return <VictoryScatter {...dotProps} />;
    };

    const renderX = () => {
        if (!xAxis) {
            return;
        }

        const style = {
            axis: { opacity: 0 },
            axisLabel: {
                fontSize: 9,
            },
            tickLabels: {
                fontSize: 7,
                padding: 5,
            },
        };

        if (xGrid) {
            style.grid = { stroke: Colors['color-grey-light'], opacity: 0.75 };
            style.ticks = {
                stroke: Colors['color-grey-light'],
                opacity: 0.75,
                size: 5,
            };
        }

        return <VictoryAxis label={xLabel} style={style} />;
    };

    const renderY = () => {
        if (!yAxis) {
            return;
        }

        const style = {
            axis: { opacity: 0 },
            axisLabel: {
                fontSize: 9,
            },
            tickLabels: {
                fontSize: 7,
                padding: 5,
            },
        };

        if (yGrid) {
            style.grid = { stroke: Colors['color-grey-light'], opacity: 0.75 };
            style.ticks = {
                stroke: Colors['color-grey-light'],
                opacity: 0.75,
                size: 5,
            };
        }

        return (
            <VictoryAxis
                crossAxis
                dependentAxis
                label={yLabel}
                style={style}
                tickCount={tickCount}
                tickFormat={tickFormat}
            />
        );
    };

    const render = () => {
        return (
            <>
                <Gradient color={color} id={id} />
                <VictoryChart>
                    {renderX()}
                    {renderY()}
                    {children}
                    {renderDots()}
                    <VictoryTooltip data={data} />
                </VictoryChart>
            </>
        );
    };

    return render();
};

Chart.propTypes = {
    animate: PropTypes.bool,
    color: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    data: PropTypes.array,
    dots: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    interpolation: PropTypes.oneOf(Object.values(ENUMS.INTERPOLATION)),
    tickCount: PropTypes.number,
    tickFormat: PropTypes.func,
    xAxis: PropTypes.bool,
    xGrid: PropTypes.bool,
    xLabel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    yAxis: PropTypes.bool,
    yGrid: PropTypes.bool,
    yLabel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Chart.defaultProps = {
    color: Colors['color-blue'],
    id: uuid(),
    interpolation: ENUMS.INTERPOLATION.CARDINAL,
    tickFormat: t => Math.ceil(t),
    tickCount: 3,
    xAxis: true,
    xGrid: true,
    yAxis: true,
    yGrid: true,
};

Chart.ENUMS = ENUMS;

export default Chart;
