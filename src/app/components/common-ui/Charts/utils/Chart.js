import op from 'object-path';
import uuid from 'uuid/v4';
import React from 'react';
import PropTypes from 'prop-types';
import Colors from 'components/common-ui/colors';
import Gradient from 'components/common-ui/Charts/utils/Gradient';

import { VictoryAxis, VictoryChart, VictoryScatter } from 'victory';

const ENUMS = {
    COLORS: Colors,
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
    dotStyle,
    id,
    interpolation,
    onClick,
    onHover,
    tickCount,
    tickFormat,
    xAxis,
    xAxisStyle,
    xGrid,
    xLabel,
    yAxis,
    yAxisStyle,
    yGrid,
    yLabel,
}) => {
    const renderDots = style => {
        if (!dots) {
            return;
        }

        const dotProps = {
            data,
            interpolation,
            style,
            name: 'dots',
        };

        const fill = {
            hide: () => null,
            show: props => ({
                style: {
                    ...style.data,
                    fill: color,
                },
            }),
            toggle: props =>
                op.get(props, 'style.fill') === color ? hide() : show(),
        };

        const label = {
            hide: () => null,
            show: props => ({ text: Math.ceil(props.y) }),
            toggle: props => (!op.get(props, 'text') ? show() : hide()),
        };

        const events = [
            {
                target: 'data',
                eventHandlers: {
                    onMouseOver: () => {
                        return [
                            {
                                target: 'data',
                                mutation: fill.show,
                            },
                            {
                                target: 'labels',
                                mutation: label.show,
                            },
                        ];
                    },
                    onMouseOut: () => {
                        return [
                            {
                                target: 'data',
                                mutation: fill.hide,
                            },
                            {
                                target: 'labels',
                                mutation: label.hide,
                            },
                        ];
                    },
                    onClick: () => {
                        return [
                            {
                                target: 'data',
                                mutation: props => {
                                    if (typeof onClick === 'function') {
                                        onClick(props);
                                    }
                                    return fill.show(props);
                                },
                            },
                        ];
                    },
                },
            },
        ];

        return (
            <VictoryScatter {...dotProps} events={events} labels={() => null} />
        );
    };

    const renderX = style => {
        if (!xAxis) {
            return;
        }

        if (!xGrid) {
            delete style.grid;
            delete style.ticks;
        }

        return <VictoryAxis label={xLabel} style={style} />;
    };

    const renderY = style => {
        if (!yAxis) {
            return;
        }

        if (!yGrid) {
            delete style.grid;
            delete style.ticks;
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
                    {renderX(xAxisStyle)}
                    {renderY(yAxisStyle)}
                    {children}
                    {renderDots(dotStyle)}
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
    dotStyle: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    interpolation: PropTypes.oneOf(Object.values(ENUMS.INTERPOLATION)),
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    style: PropTypes.object,
    tickCount: PropTypes.number,
    tickFormat: PropTypes.func,
    xAxis: PropTypes.bool,
    xAxisStyle: PropTypes.object,
    xGrid: PropTypes.bool,
    xLabel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    yAxis: PropTypes.bool,
    yAxisStyle: PropTypes.object,
    yGrid: PropTypes.bool,
    yLabel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Chart.defaultProps = {
    color: Colors['color-blue'],
    dots: false,
    dotStyle: {
        data: {
            fill: Colors['color-white'],
            stroke: Colors['color-blue'],
            strokeWidth: 2,
        },
        labels: {
            fontSize: 8,
            fill: Colors['color-black'],
        },
    },
    id: uuid(),
    interpolation: ENUMS.INTERPOLATION.CARDINAL,
    tickFormat: t => Math.ceil(t),
    tickCount: 3,
    xAxis: true,
    xAxisStyle: {
        axis: { opacity: 0 },
        axisLabel: { fontSize: 9 },
        grid: { stroke: Colors['color-grey-light'], opacity: 0.75 },
        ticks: {
            stroke: Colors['color-grey-light'],
            opacity: 0.75,
            size: 5,
        },
        tickLabels: {
            fontSize: 7,
            padding: 5,
        },
    },
    xGrid: true,
    yAxis: true,
    yGrid: true,
    yAxisStyle: {
        axis: { opacity: 0 },
        axisLabel: { fontSize: 9 },
        grid: { stroke: Colors['color-grey-light'], opacity: 0.75 },
        ticks: {
            stroke: Colors['color-grey-light'],
            opacity: 0.75,
            size: 5,
        },
        tickLabels: {
            fontSize: 7,
            padding: 5,
        },
    },
};

Chart.ENUMS = ENUMS;

export { Chart, Chart as default };
