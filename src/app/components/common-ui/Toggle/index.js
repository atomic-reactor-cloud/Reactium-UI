/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';
import ENUMS from './enums';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: Toggle
 * -----------------------------------------------------------------------------
 */
const cn = ({ className, color = ENUMS.COLOR.PRIMARY, label, labelAlign }) => {
    const lbl = `ar-toggle-label-${labelAlign}`;
    const clr = `ar-toggle-${color}`;

    return classnames({
        [className]: !!className,
        [lbl]: !!label,
        [clr]: true,
        'ar-toggle': true,
    });
};

const Toggle = ({
    className,
    htmlFor,
    id,
    label,
    labelAlign,
    labelStyle,
    name,
    style,
    title,
    ...props
}) => (
    <label
        aria-label={label}
        aria-labelledby={!label && name}
        className={cn({ labelAlign, label, className })}
        htmlFor={id || name}
        style={style}
        title={title}>
        <span
            className={classnames({ ['sr-only']: !label })}
            style={labelStyle}>
            {label || title || name}
        </span>
        <input {...props} />
        <span />
    </label>
);

Toggle.ENUMS = ENUMS;

Toggle.propTypes = {
    className: PropTypes.string,
    label: PropTypes.any,
    labelAlign: PropTypes.oneOf(Object.values(ENUMS.ALIGN)),
    labelStyle: PropTypes.object,
    style: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.oneOf(Object.values(ENUMS.TYPE)),
};

Toggle.defaultProps = {
    labelAlign: ENUMS.ALIGN.LEFT,
    type: ENUMS.TYPE.CHECKBOX,
};

export {
    Toggle as default,
    ENUMS,
};
