import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';

const labelFunc = ({ label, x, y }) => label || x || y;

const mapData = data =>
    data.map(({ label, value, ...props }) => ({
        y: value,
        x: label,
        label,
        ...props,
    }));

const PieChart = ({
    animate,
    colors,
    data,
    innerRadius,
    labelFunc,
    padding,
    ...props
}) => {
    const chartProps = {
        animate,
        colorScale: colors,
        data: mapData(data),
        innerRadius,
        padAngle: padding,
        labelRadius: 160,
        labels: labelFunc,
        cornerRadius: 1,
        ...props,
    };

    return <VictoryPie {...chartProps} />;
};

PieChart.propTypes = {
    animate: PropTypes.bool,
    colors: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    data: PropTypes.array,
    innerRadius: PropTypes.number,
    labelFunc: PropTypes.func,
    padding: PropTypes.number,
};

PieChart.defaultProps = {
    animate: false,
    colors: 'grayscale',
    innerRadius: 120,
    labelFunc,
    padding: 2,
};

export default PieChart;
