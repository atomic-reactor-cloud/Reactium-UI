/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React from 'react';
import ENUMS from './enums';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Feather } from 'components/common-ui/Icon';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: Radio
 * -----------------------------------------------------------------------------
 */
const cn = ({ className, color = ENUMS.COLOR.DANGER, label, labelAlign }) => {
    const lbl = `ar-radio-label-${labelAlign}`;
    const clr = `ar-radio-${color}`;

    return classnames({
        [className]: !!className,
        [lbl]: !!label,
        [clr]: true,
        'ar-radio': true,
    });
};

const Radio = ({
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
        <span>
            <span />
        </span>
    </label>
);

Radio.ENUMS = ENUMS;

Radio.propTypes = {
    className: PropTypes.string,
    label: PropTypes.any,
    labelAlign: PropTypes.oneOf(Object.values(ENUMS.ALIGN)),
    labelStyle: PropTypes.object,
    style: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.oneOf(Object.values(ENUMS.TYPE)),
};

Radio.defaultProps = {
    labelAlign: ENUMS.ALIGN.LEFT,
    type: ENUMS.TYPE.CHECKBOX,
};

export { Radio as default, ENUMS };
